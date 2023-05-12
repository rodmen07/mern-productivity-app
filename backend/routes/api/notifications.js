var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const User = mongoose.model('User');
const Notification = mongoose.model('Notification')
const { isProduction } = require('../../config/keys');
const { requireUser } = require('../../config/passport');
const { userOnProject, projectParams, taskProtector, stringifyCompare } = require('../../config/util');
const { Task } = require('../../models/Project');


router.get('/:userid', async (req, res, next)=>{
    const userId = req.params.userid 
    const user = await User.findOne({"_id":`${userId}`})
    //Users show needs full populate on tasks, projects, and needs to hide password 
    //Might need to delete the password hash in memory or select subset
    const taskIds = user.assignedTasks;
    const projectIds = user.projects;
    console.log(projectIds,"user in Notifications")
    const userTaskNotifications = await Notification.find({"task": {$in:taskIds},"target":"task"})
    const userAdminNotifications = await Notification.find({"admin": `${userId}`,"target":"task"})
    const userProjectNotifications = await Notification.find({"project": {$in:projectIds},"target":"project"})
    const notificationArray = [...userTaskNotifications,...userAdminNotifications,...userProjectNotifications];
    return res.json(notificationArray)
  });
  
router.delete('/:userId/:notificationid', requireUser, async(req, res, next)=> {
    const userId = req.params.userid
    const notificationId = req.params.notificationid
    const notification = await Notification.findOne({"_id":`${notificationId}`});

    if(!notification){
        return res.json({message:"No project found"})
    }
    const deleteResult = await Project.deleteOne({"_id":`${notificationId}`});

    if(deleteResult.deleteCount === 1){
        return res.json({message: "Successful Delete"})
    }

})

  module.exports = router;
