
import { supabase } from '../client'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './CurrentTasks.css'

function CurrentTasks() {
    const [tasks, setTasks] = useState([])
    useEffect(() => {

        const fetchTasks = async () => {
            const { data, error } = await supabase.from('tasks')
                                                    .select()
            if (error) { console.log(error)} 
            else { 
                
                console.log("data:", data)
                setTasks(data)}
        }

        fetchTasks()
    }, [])
    
    const subtractDate = (date) => {
        const today = new Date()
        const taskDate = new Date(date)
        const diff = taskDate.getTime() - today.getTime()
        const diffDays = Math.ceil(diff / (1000 * 3600 * 24))
        const formattedDeadline = taskDate.toLocaleDateString(); // Get formatted date string
        if (diffDays === 0) {
            return `due today -_0`;
        } else if (diffDays === 1) {
            return `due tmr -_0`;
          } else if (diffDays > 1) {
            return `${diffDays} days left`;
          } else {
            return `overdue by ${-diffDays} days`;
          }
    }

    const renderTasks = (tasks, condition) => {
        return (
          <ul>
            {tasks.map((task) => {
              if (condition(task)) {
                return (
                  <Link
                    key={task.id}
                    to={`/task/${task.id}`}
                    className="task-card"
                    style={{ borderLeftColor: task.color }}
                  >
                    <span className="task-content">{task.content}</span>
                    <span className="task-deadline">{subtractDate(task.deadline)}</span>
                  </Link>
                );
              }
              return null; // Render nothing for other cases
            })}
          </ul>
        );
      };

    return (
        <div> 
            <ul className="task-sections">
                <div>
                    <h2>Tasks in Queue</h2>
                    {renderTasks(tasks, (task) => !task.inprogress && !task.finished)}
                </div>

                <div>
                    <h2>Tasks in Progress</h2>
                    {renderTasks(tasks, (task) => task.inprogress)}
                </div>
                <div>
                    <h2>Tasks Completed</h2>
                    {renderTasks(tasks, (task) => task.finished)}
                </div>
            </ul>
        </div>
       
    )
}

export default CurrentTasks 