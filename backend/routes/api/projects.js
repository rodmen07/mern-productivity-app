var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const User = mongoose.model('User');
const { isProduction } = require('../../config/keys');
const { requireUser } = require('../../config/passport');
const { userOnProject, projectParams, taskProtector } = require('../../config/util');
const jbuilder = require('jbuilder');
const { Task } = require('../../models/Project');

// 645a748b33dbf64bdcb0e658

router.get('/:projectid', requireUser, async (req,res,next)=>{
    const projectId = req.params.projectid
    // console.log(req.user._id, "THIS IS THE LOGGED IN USER")

    // get the project
    const project = await Project.findOne({"_id":`${projectId}`})
    // console.log("I AM HERE!!");
    //Probably needs task populate, not collaborator populate

    // console.log(userOnProject(project, req.user._id), "USERONPROJECT?")
    console.log(project, "PROJECT!!");
    // const allP = await Project.find()

    // console.log(returnedProject, "RPRP");
    // return res.json(allP);

    // need to make sure the currently logged in user is either a collaborator or an admin of the project
    if (project && userOnProject(project, req.user._id)) {

        let baseProject = Object.fromEntries(
            [
                ['_id', project._id],
                ['title', project.title],
                ['description', project.description],
                ['adminId', project.adminId],
                ['startDate', project.startDate],
                ['endDate', project.endDate],
                ['tasks', project.tasks],
            ]
        )

        let nestedProject = Object.fromEntries([
            [project._id, baseProject]
        ])

        return res.json(nestedProject);
    } else {
        return res.json("Nothing was found");
    }
});

router.post('/:projectId/tasks', requireUser, async (req,res,next)=>{

    console.log("in POST /:projectId/tasks");

    const projectId = req.params.projectId;


    // find the project
    const project = await Project.findOne({"_id":`${projectId}`})

    if (project && userOnProject(project, req.user._id)) {

        const newTask = new Task (req.body);
        // console.log(newTask, "newTask")

        // TODO - check whether there is an assignee on the task and if so and the following are true, add this task to their list. a) user exists, b) user has this project on their list

        project.tasks.push(newTask);

        try {
            const savedProject = await project.save();

            const returnedTask = savedProject.tasks.id(newTask._id);

            // embed the project id into the task, for Ryder ;)
            const manipulatedTask = {
                ...returnedTask.toObject(),
                projectId: project._id
              };

            return res.json(manipulatedTask);
        } catch (error) {
            return res.json(error);
        }
    } else {
        return res.json("No project or save not permitted");
    }
})

router.patch('/:projectId/tasks/:taskId', requireUser, async (req,res,next)=>{

    console.log("in PATCH /:projectId/tasks/:taskId");

    const projectId = req.params.projectId;
    const taskId = req.params.taskId;
    // console.log(taskId, "taskId");
    
    const project = await Project.findOne({"_id":`${projectId}`})
    console.log(project.tasks,"project tasks")
    const task = project.tasks.id(taskId);

    console.log(task, "task");

    if (project && userOnProject(project, req.user._id) && task) {
        console.log("HERE!");
        
        // the special version to be sent to the back end
        const updatedTask = {
            ...task.toObject(),
            projectId: project._id,
            ...req.body,
          };
        
        // updating the task with the body
        Object.assign(task, req.body)

        // saving the project, which will save the task
        await project.save();
        
        return res.json(updatedTask);

    } else {
        return res.json("No project or save not permitted");
    }
})

router.delete('/:projectId/tasks/:taskId', requireUser, async (req,res,next)=>{
    
    const projectId = req.params.projectId;
    const taskId = req.params.taskId;

    const project = await Project.findOne({"_id":`${projectId}`})
    const task = project.tasks.id(taskId);

    let user;
    
    if (project && task && userOnProject(project, req.user._id)) {
        
        // first check whether this task is assigned to a user
        user = await User.findOne({ assignedTasks: taskId });
        
        // if so we need to delete that task from the user's assigned tasks
        if(user) {
            const assignedTaskIndex = user.assignedTasks.findIndex((tId) => tId.toString() === taskId);
            
            // delete the element at the discovered index
            user.assignedTasks.splice(assignedTaskIndex,1);

            await user.save();
            console.log(user, "user post save");
        }

        // now we remove that task from the project
        const taskIndex = project.tasks.findIndex((t) => t._id.toString() === taskId);

        project.tasks.splice(taskIndex, 1);

        await project.save();

        return res.json({msg: "Deletion complete"});
    } else {

        return res.json({msg: "project or task not found or insufficient priveleges"});
    }


});

router.post('/', async (req,res,next) =>{
    //This is probably done
    const adminId = req.body.adminId;
    const newProject = new Project({
        title: req.body.title,
        description: req.body.description,
        adminId: req.body.adminId,
        collaborators: [req.body.adminId],
        tasks: [],
        startDate: req.body.startDate,
        endDate: req.body.endDate
    });
    console.log(adminId,"adminId")
    const owner = await User.findOne({"_id":`${adminId}`})
    if(await newProject.save()){
        owner.projects.push(newProject)
        await owner.save();
        console.log(newProject._id,"Project _id")
        return res.json(newProject);
    }else{
        return res.json({message:"Error"})
    }
});

router.patch('/:projectId', requireUser, async (req,res,next) =>{
    //This is where new collaborators will probably go

    // console.log(req.params, "PARAMS");

    const projectId = req.params.projectId

    // console.log(req.body, "REQUEST BOD")
    // console.log(req.body.project, "REQUEST PROJ")

    const project = await Project.findOne({"_id":`${projectId}`})

    if (project && userOnProject(project, req.user._id)) {
        // const strongProj = projectParams(req.body.project);
        // console.log(strongProj, "Strong Proj");

        const updatedProject = await Project.findOneAndUpdate(
            { _id: projectId },
            { $set: req.body },
            { new: true }
        );
        
        return res.json(updatedProject);
    } else {
        return res.json({message:"Error"})
    }
});


router.delete('/:projectId', requireUser, async (req,res,next) =>{
    //Probably has to somehow DeleteMany Collaborators or iterate somehow
    const projectId = req.params.projectId;

    const project = await Project.findOne({"_id":`${projectId}`});
    console.log(project, "PROJECT!!");
    console.log("HERE I AM!!");
    console.log(req.user._id, "loged in as")

    if (project && userOnProject(project, req.user._id)) {
        console.log("There I AM!!");
        const deleteResult = await Project.deleteOne({"_id":`${projectId}`});
        console.log(deleteResult.ok, "DELETE OK");
        console.log(deleteResult, "DELETE Result");
        if(deleteResult.deletedCount === 1) {
            return res.json({message: "Successful Delete"});
        } else {
            return res.json({message:"Issue with Delete"});
        }
    }
    {
        return res.json({message:"Not found or permitted"});
    }
});

module.exports = router;
