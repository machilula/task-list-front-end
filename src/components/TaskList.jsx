import PropTypes from 'prop-types';
import Task from './Task.jsx';
import './TaskList.css';

// const TaskList = ({ tasks }) => {
//   const getTaskListJSX = (tasks) => {
//     return tasks.map((task) => {
//       return (
//         <Task
//           key={task.id}
//           id={task.id}
//           title={task.title}
//           isComplete={task.isComplete}
//         />
//       );
//     });
//   };
//   return <ul className="tasks__list no-bullet">{getTaskListJSX(tasks)}</ul>;
// };

// TaskList.propTypes = {
//   tasks: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       title: PropTypes.string.isRequired,
//       isComplete: PropTypes.bool.isRequired,
//     })
//   ).isRequired,
// };

// export default TaskList;

const TaskList = ({ taskData, onCompleteTask, onDeleteTask }) => {
  const taskComponents = taskData.map((task) => {
    return (
      <Task
        key={task.id}
        id={task.id}
        title={task.title}
        isComplete={task.isComplete}
        onCompleteTask={onCompleteTask}
        onDeleteTask={onDeleteTask}
      />);
  });
  return (<ul className="tasks__list no-bullet">{taskComponents}</ul>);
};

TaskList.propTypes = {
  taskData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onCompleteTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired
};

export default TaskList;