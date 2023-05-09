import React, { useState } from 'react';
import './TaskCreateForm.css';
import  {useDispatch} from 'react-redux';
import { createTask } from '../../../store/task';

const TaskCreateForm = ({ users }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignee, setAssignee] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate input values
    if (!title || !description || !dueDate || !assignee) {
      // Display an error message if any input field is empty
      alert('Please fill in all fields.');
      return;
    }

    // Create a new task object with input values
    const newTask = {
      title: title,
      description: description,
      dueDate: dueDate,
      assignee: assignee,
    };

    try {
      // Send a POST request to the server to save the new task
      const response = dispatch(createTask(newTask));

      // Update the UI to indicate that the task has been created
      alert('Task created successfully!');
      setTitle('');
      setDescription('');
      setDueDate('');
      setAssignee('');
    } catch (err) {
      // Display an error message if there's an error sending the request
      alert('Failed to create task. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Task Name:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label htmlFor="dueDate">Due Date:</label>
      <input
        type="date"
        id="dueDate"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <label htmlFor="assignee">Assignee:</label>
      <select
        id="assignee"
        value={assignee}
        onChange={(e) => setAssignee(e.target.value)}
      >
        <option value="">Select an assignee</option>
        {users?.map(user => (
          <option key={user._id} value={user._id}>{user.name}</option>
        ))}
      </select>
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskCreateForm;