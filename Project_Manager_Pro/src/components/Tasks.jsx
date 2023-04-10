import NewTasks from "./NewTask";

const URL = import.meta.env.VITE_APP_URL;
const PUBLIC = import.meta.env.VITE_APP_PUBLIC ;
const SECRET_KEY = import.meta.env.VITE_APP_SECRET;

function Tasks() {

    return (
        <div> 
            
             <NewTasks />

        </div>
       
    )
}

export default Tasks 