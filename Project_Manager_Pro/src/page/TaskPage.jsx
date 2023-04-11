import { useParams } from 'react-router-dom'
import {supabase} from '../client'
import {useEffect, useState, useRef} from 'react'
import './TaskPage.css'

function TaskPage() {
    // here I update the task
    const [task, setTask] = useState(null)
    const [content, setContent] = useState(''); // State to track the task content
    // const inputRef = useRef(null); // Ref to store reference to the input element
    const [deadline, setDeadline] = useState(''); // State to track the task deadline
    const [inProgress, setInProgress] = useState(false) // State to track "in progress" status
    const [completed, setCompleted] = useState(false) // State to track "completed" status

    let id = useParams().taskid



    const handleContentChange = (event) => {
      // setIsEditing(true)
      setContent(event.target.value); // Update content state with input value
      // console.log("content:", content)
    }

    const handleDeadlineChange = (event) => {
      setDeadline(event.target.value);
    }
    const handleCompletedChange = (event) => {
      setInProgress(false)
      setCompleted(event.target.checked)
    }
  
    // const handleContentBlur = () => {
    //   setIsEditing(false); // Disable editing mode when input field is blurred
    // }
    const handleInProgressChange = (event) => {
      setCompleted(false)
      setInProgress(event.target.checked)
    }
    useEffect(() => {
      const fetchTask = async () => {
        const {data, error} = await supabase
          .from('tasks')
          .select('*')
          .eq('id', id)
          
        if (error) {
          console.log(error)
        } else {
          setTask(data[0])
          setContent(data[0]?.content || '');
          setDeadline(data[0]?.deadline || '');
          setInProgress(data[0]?.inprogress || false) // Set "in progress" status from fetched data
          setCompleted( data[0]?.finished || false) // Set "completed" status from fetched data

        }
      }
      fetchTask()
    }, [id])


    const updateTask = async () => {
      try {
        // Convert deadline value to valid timestamp format
        const updatedDeadline = new Date(deadline).toISOString();
    
        const { data, error } = await supabase
          .from('tasks')
          .update({ content: content, 
                    deadline: updatedDeadline, 
                    inprogress: inProgress,
                    finished: completed
                  }) // Use updatedDeadline
          .eq('id', id);
    
        if (error) {
          console.log(error);
        } else {
          console.log('Task updated successfully:', data);
          alert('🚀 Task updated successfully!'); // Show success message
          window.location.href = '/';
        }
      } catch (error) {
        console.log(error);
      }
    }

    const deleteTask = async () => {
      try {
        const { error } = await supabase
          .from('tasks')
          .delete()
          .eq('id', id)
  
        if (error) {
          console.log(error)
        } else {
          console.log('Task deleted successfully')
          alert('🗑️ Task deleted successfully!')
          window.location.href = '/'
        }
      } catch (error) {
        console.log(error)
      }
    }
    

    const addHoursToUTC = (dateString, hours) => {
      const date = new Date(dateString);
      date.setUTCHours(date.getUTCHours() - hours);
      return date.toISOString().substring(0, 16);
    };

    return (
      <div className="task-page-container">
        <h2>Task Page 🚀</h2>
        <hr className="divider" />
        <input
          type="text"
          defaultValue={task?.content}
          onChange={handleContentChange}
          className="input-like-h3"
        />
        <br />
        <input
          type="datetime-local"
          value={deadline ? addHoursToUTC(deadline, 4) : ''}
          onChange={handleDeadlineChange}
          className="input-like-h3"
        />
        <br />


      <div style={{ textAlign: 'center' }}>
        <span >
            <label className="checkbox-label">
              <input 
                type="checkbox"
                checked={inProgress} // Bind "in progress" status to the checkbox
                onChange={handleInProgressChange}
              />
              <span className="checkbox-custom"></span>
              <span className="checkbox-label-text">In Progress ✈ </span>
          </label>
          <label className="checkbox-label">
            <input 
              type="checkbox"
              checked={completed} // Bind "completed" status to the checkbox
              onChange={handleCompletedChange}
            />
            <span className="checkbox-custom"></span>
            <span className="checkbox-label-text">Completed ! 🍺</span>
          </label>
        </span>
      </div>


        <br />
        <button onClick={updateTask} className="button-update">
          Update Task
        </button>
        <button onClick={deleteTask} className="button-delete">
          Delete Task
        </button>
      </div>
    )
  
    
  }
  
  export default TaskPage