import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState, useEffect } from 'react';
import NewTaskForm from './components/NewTaskForm';
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

const toggleTaskCompleteApi = id => {
  return axios.patch(`${kbaseURL}/tasks/${id}/mark_complete`)
    .then( response => {
      const newTask = convertFromApi(response.data.task);
      return newTask;
    })
    .catch( error =>{
      console.log(error);
    });
};

const toggleTaskIncompleteApi = id => {
  return axios.patch(`${kbaseURL}/tasks/${id}/mark_incomplete`)
    .then( response => {
      const newTask = convertFromApi(response.data.task);
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
    const currentTask = taskData.find(task => task.id === id);
    const apiCall = currentTask.isComplete ? toggleTaskIncompleteApi : toggleTaskCompleteApi;
    apiCall(id)
      .then((response) => {
        setTaskData(taskData => taskData.map(task => 
          task.id === id ? { ...task, isComplete: response.isComplete } : task
        ));
      })
      .catch(error => {
        console.error(error);
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

  const handleSubmit = (data) => {
    axios.post(`${kbaseURL}/tasks`, data)
      .then(response => {
        // const newTask = convertFromApi(response.data.task);
        setTaskData(taskData => [convertFromApi(response.data.task), ...taskData]);
      })
      .catch(error => {
        console.error(error);
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
        <div>
          <NewTaskForm handleSubmit={handleSubmit} />
        </div>
      </main>
    </div>
  );
};

export default App;
