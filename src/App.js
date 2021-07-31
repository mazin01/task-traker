import Header from "./components/header"
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Footer from "./components/footer"
import About from "./components/about"
import Tasks from "./components/tasks";
import AddTask from "./components/addTask";
import { useState, useEffect } from "react";

const App = () => {
  const [ShowAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

//fetch tasks
  const fetchTasks = async () => {
    const res = await fetch("https://api.jsonbin.io/b/6104b3fe2ccb97077c1545c2/tasks")
    const data = await res.json()
    
    return data
  }

  //fetch task
  const fetchTask = async (id) => {
    const res = await fetch(`https://api.jsonbin.io/b/6104b3fe2ccb97077c1545c2/tasks/${id}`)
    const data = await res.json()
    
    return data
  }

//Add Task
const addTask =async (task) => {
  const res = await fetch('https://api.jsonbin.io/b/6104b3fe2ccb97077c1545c2/tasks',
  {
    method: "POST",
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(task)
  })
  const data = await res.json()
  setTasks([...tasks, data])

  //const id = Math.floor(Math.random() * 10000) + 1
  //const newTask = {id, ...task}
  //setTasks([...tasks, newTask])
}

// Delete Task
const deleteTask = async(id) => {
  await fetch(`https://api.jsonbin.io/b/6104b3fe2ccb97077c1545c2/tasks/${id}`, {method : "DELETE",})

  setTasks(tasks.filter((task) => task.id !== id))
}

// Toggle Reminder
const toggleReminder = async (id) => {
  const taskToToggle =await fetchTask(id)
  const updTask = { ...taskToToggle, 
  reminder : !taskToToggle.reminder}

  const res = await fetch(`https://api.jsonbin.io/b/6104b3fe2ccb97077c1545c2/tasks/${id}`
  , {method: 'PUT',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(updTask)})

  const data = await res.json()

  setTasks(tasks.map((task) => task.id === id ?
  {...task, reminder: data.reminder} : task)
  )
}

  return (
    <Router>
    <div className="container">
      <Header onAdd={() => setShowAddTask(!ShowAddTask)} showAdd={ShowAddTask} />
      <Route path='/' exact render={(props) => (
        <>
          {ShowAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ?
      (<Tasks tasks={tasks} onDelete=
      {deleteTask} onToggle={toggleReminder} />) : ('No Tasks To Show')}
        </>
      )} />
      <Route path='/about' component={About} />
      <Footer />
    </div>
    </Router>
  );
}

export default App;
