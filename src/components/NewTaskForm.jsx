import { useState } from 'react';

const NewTaskForm = ({ handleSubmit }) => {
  const [title, setTitle] = useState('');

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const onHandleSubmit = event => {
    event.preventDefault();
    const newTask = {
      title,
      description: ''
    };
    handleSubmit(newTask);
    setTitle('');
  };

  return (
    <form onSubmit={onHandleSubmit}>
      <label htmlFor='title'>Task title: </label>
      <input type='text' id='title' name='title' value={title} onChange={handleTitleChange}/>
      <div>
        <input type='submit' value='Create New Task'/>
      </div>
    </form>
  );
};

export default NewTaskForm;