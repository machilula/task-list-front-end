// import { useState } from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = ({ id, title, isComplete, onCompleteTask, onDeleteTask }) => {
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

  const onTaskToggle = () => {
    onCompleteTask(id);
  };

  const onDeleteTaskClick = () => {
    onDeleteTask(id);
  };

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={onTaskToggle}
      >
        {title}
      </button>
      <button
        className="tasks__item__remove button"
        onClick={onDeleteTaskClick}
      >x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onCompleteTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired
};

export default Task;
