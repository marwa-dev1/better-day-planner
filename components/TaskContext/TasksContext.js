import {createContext, useState, useContext, useEffect} from 'react'
import { DateContext } from '../DateContext/DateContext';
import firebase from 'firebase';

export const TasksContext = createContext();

export const TaskProvider = ({children,userId}) => {
    const [ tasks, setTasks ] = useState([]);
    const [ completedTasks, setCompletedTasks ] = useState([]);
    const dateSelected = useContext(DateContext);
    const [loading, setLoading] = useState(true); 
    


    useEffect(() => {
        const getFromDb = async (list, date) => {
            const dbTasks = await firebase.database().ref(userId).child(date);
            await dbTasks.once('value', function(snapshot) {
                updateList(list, snapshot.val());
            }).then(e=>{
                setLoading(false);
            }).catch();
        }
        getFromDb(tasks, dateSelected.stringDate);
    }, [dateSelected])
    
    const updateList = (list, e) => {
        if(e && e.tasks){
            setTasks(tasks=>[...tasks, ...e.tasks]);
        }
        if(e && e.completedTasks){
            setCompletedTasks(completedTasks=>[...completedTasks, ...e.completedTasks]);
        }
    }

    return(
        <TasksContext.Provider
            value={{
                tasks:tasks,
                setTasks,
                completedTasks: completedTasks,
                setCompletedTasks,
                loading
            }}
        >
            {children}
        </TasksContext.Provider>
    )
}