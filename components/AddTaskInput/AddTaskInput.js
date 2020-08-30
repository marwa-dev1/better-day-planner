import {useState, useEffect, useContext} from 'react'
import { TasksContext } from '../TaskContext/TasksContext';
import style from './AddTaskInput.module.css'
import SlideToggle from "react-slide-toggle";
import {IoIosArrowUp,IoIosArrowDown} from 'react-icons/io'
import {DateContext} from '../DateContext/DateContext'
import uniqid from 'uniqid'
import {formattedDate, stringifyDate} from '../../hooks-functions/formattedDate';


function AddTaskInput() {
    const dateSelected = useContext(DateContext);
    let todaysDate = new Date();
    todaysDate = formattedDate(todaysDate);
    if(
        parseInt(dateSelected.date.month) < parseInt(todaysDate.month)
        ||
        (   
            parseInt(dateSelected.date.month) == parseInt(todaysDate.month)
            &&
            parseInt(dateSelected.date.day) < parseInt(todaysDate.day)
        )
    ) return <></>;

    const emptyTaskTemplate = {
        id: '',
        title: '',
        description:'',
        date:dateSelected.date, 
        user: '',
        completed: false,
        notCompleted: false, 
    }

    const [ task, setTask ] = useState(()=>emptyTaskTemplate);

    const tasksList = useContext(TasksContext);
    const [arrow, setArrow] = useState(false)

    const handleTitleChange = e => {
        const taskObj = {
            ...task,
            title: e.target.value
        }
        setTask(taskObj);
    }

    const handleDescriptionChange = e =>{
        const taskObj = {
            ...task,
            description: e.target.value
        }
        setTask(taskObj);
    }

    const addToList = () => {
        if(task.title==''){
            alert("Can't add empty task");
            return;
        }
        const tempTask = {
            ...task,
            id: uniqid(),
            completed: false,
            date: dateSelected.date
        }
        setTask(tempTask);
        tasksList.setTasks(tasksList.tasks.concat([tempTask]));
    }

    const addByEnter = e => {
        if(e.keyCode === 13){
            e.preventDefault();
            addToList();
        }
    }

    const clearFields = () => {
        setTask(emptyTaskTemplate)
    }

    return (
        <div className={style.main}>
            <div className={style.innerMain} id="second">
            <SlideToggle
                render={({ toggle, setCollapsibleElement }) => (
                    <div  onClick={()=>setArrow(!arrow)}>
                        <div className={style.titleContainer}>
                            <h4>Add a new task for the day:</h4>
                            <div onClick={toggle} className={style.arrowIcon}>
                                {arrow?<IoIosArrowDown/>:<IoIosArrowUp/>}
                            </div>
                        </div>
                        <div ref={setCollapsibleElement}>
                            <div className={style.inputContainer}>
                                <p>Title</p>
                                <textarea className={style.input} type="text" value={task.title} onChange={handleTitleChange}/>
                                <p>Short Description</p>
                                <textarea className={style.input} type="text" value={task.description} onChange={handleDescriptionChange}/>
                            </div>
                            <div className={style.btnsContainer}>
                                <button className={style.button} onClick={addToList} onKeyUp={addByEnter} >Add</button>
                                <button className={style.button} onClick={clearFields}>Clear</button>
                            </div>
                        </div>
                    </div>
                )}
                />
            </div>
        </div>
    )
}

export default AddTaskInput
