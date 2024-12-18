import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const kbaseURL = 'http://127.0.0.1:5000';

const convertFromApi = (apiTask) => {
  const newTask = {
    id: apiTask.id,
    title: apiTask.title,
    isComplete: apiTask.is_complete
  };
  return newTask;
};

const getAllTasksApi = () => {
  return axios.get(`${kbaseURL}/tasks`)
    .then( response => {
      const apiTasks = response.data;
      const newTasks = apiTasks.map(convertFromApi);
      return newTasks;
    })
    .catch(error => {
      console.log(error);
    });
};

const toggleTaskCompletionApi = id => {
  return axios.patch(`${kbaseURL}/tasks/${id}`)
    .then( response => {
      const newTask = convertFromApi(response.data);
      return newTask;
    })
    .catch( error =>{
      console.log(error);
    });
};

const delTaskApi = id => {
  return axios.delete(`${kbaseURL}/tasks/${id}`)
    .catch( error => {
      console.log(error);
    });
};

const App = () => {
  const [taskData, setTaskData] = useState([]);

  const getAllTasks = () => {
    getAllTasksApi()
      .then(tasks => {
        setTaskData(tasks);
      });
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const handleCompleteTask = (id) => {
    toggleTaskCompletionApi(id)
      .then((apiTask) => {
        setTaskData(taskData => taskData.map(task =>{
          if (task.id === id) {
            return {...task, isComplete: !task.isComplete};
          } else {
            return task;
          }
        }));
      });
  };

  const handleDeleteTask = (id) => {
    delTaskApi(id)
      .then(() => {
        setTaskData(taskData => taskData.filter(task => {
          return task.id !== id;
        }));
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList
            taskData={taskData}
            onCompleteTask={handleCompleteTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
