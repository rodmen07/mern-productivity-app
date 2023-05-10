import React from 'react';
import ProjectCreateForm from '../Project_CRUD/ProjectCreateForm/ProjectCreateForm';
import TaskCreateForm from '../Task_CRUD/TaskCreateForm/TaskCreateForm';
import ProjectShow from '../Project_CRUD/ProjectShow/ProjectShow';
import ProjectUpdateForm from '../Project_CRUD/ProjectUpdateForm/ProjectUpdateForm';
import TaskRecomendation from '../UserHome/TaskRecommendation/TaskRecommendation';
import ProjectDelete from '../Project_CRUD/ProjectDelete/ProjectDelete';
import './TestIndex.css';

export default function TestPage () {
  return (
      <div className="testingComponents">
        <ProjectCreateForm />
        <ProjectShow projectId="645b1d32fb7e41fd035603a9"/>
        <ProjectUpdateForm projectId="645b1d32fb7e41fd035603a9"/>
        <ProjectDelete/>
        <TaskCreateForm />
        <TaskRecomendation title="Productivity App" description="The goal of this project is to develop a producitivty web app utilizing a MERN stack" startDate="2023-05-09T00:00:00.000Z" endDate="2023-05-10T00:00:00.000Z" />
      </div>
  );
}
