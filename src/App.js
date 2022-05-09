import { useState } from "react"
import {initialWorkouts, generateWorkout} from "./Workouts.js"
import "./App.css"

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)
  const [showDoneOnly, setShowDoneOnly] = useState(false)

  const addNewWorkout = () => {
    const newWorkout = generateWorkout()
    setWorkouts([...workouts, newWorkout])
  }

  const deleteWorkout = (workout) => {
    setWorkouts(workouts.filter(wo => wo !== workout))
  }

  const completeWorkout = (workout) => {
    const updatedWorkouts = workouts.map(item => (item === workout) ? { ...item, done: !item.done } : item)
    setWorkouts(updatedWorkouts)
  }

  const toggleDoneOnly = () => {
    setShowDoneOnly(!showDoneOnly)
  }

  const showWorkouts = () => {
    if (!showDoneOnly) return workouts
    return workouts.filter(workout => workout.done)
  }

  const replace = (workout) => {
    const updatedWorkouts = workouts.map(item => (item === workout) ? generateWorkout() : item)
    setWorkouts(updatedWorkouts)
  }

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <label>Show done</label>
      <input type="checkbox" onChange={toggleDoneOnly} />
      <ul>
        {showWorkouts().map((workout, index) => (
          <li key={index}>
            <p>
              {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest
            </p>
            {!workout.done &&
              <button onClick={e=>completeWorkout(workout)}>Done</button>}
            {workout.done &&
             <p>✅</p>}
            <button onClick={e=>deleteWorkout(workout)}>Delete</button>
            <button onClick={e=>replace(workout)}>Replace</button>
          </li>
        ))}
      </ul>

    </div>
  )
}

export default App
