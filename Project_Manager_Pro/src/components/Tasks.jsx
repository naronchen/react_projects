import NewTasks from "./NewTask";
import CurrentTasks from "./CurrentTasks";

const URL = import.meta.env.VITE_APP_URL;
const PUBLIC = import.meta.env.VITE_APP_PUBLIC ;
const SECRET_KEY = import.meta.env.VITE_APP_SECRET;

function Tasks() {

    return (
        <div> 
            <NewTasks />
            <CurrentTasks />
        </div>
       
    )
}

export default Tasks 