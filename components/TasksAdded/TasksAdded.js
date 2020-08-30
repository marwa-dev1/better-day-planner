import { useState, useContext, useEffect } from 'react'
import style from './TasksAdded.module.css'
import { TasksContext } from '../TaskContext/TasksContext'
import {MdDelete} from 'react-icons/md'
import {IoMdCheckmarkCircleOutline, IoIosArrowUp,IoIosArrowDown} from 'react-icons/io'
import SlideToggle from "react-slide-toggle";
import {DateContext} from '../DateContext/DateContext'
import {writeData, readData} from '../../hooks-functions/handleDBrequest'
import { DairyContext } from '../DairyContext/DairyContext'
import SmallLoader from '../SmallLoader/SmallLoader'

const filterOutId = (list, id) => {
    return list.filter((e,j)=>e.id!==id)
} 

const filterOutIndex = (list, i) => {
    return list.filter((e,j)=>i!==j)
} 


function TasksAdded({userId}) {
    const dateSelected = useContext(DateContext);
    const dairyObj = useContext(DairyContext);

    const stringDate = dateSelected.date.day +'-'+dateSelected.date.month + '-' + dateSelected.date.year;
    const tasksList = useContext(TasksContext);
    const [arrow, setArrow] = useState(false);



    const completeTask = (i) =>{
        let tempCopy = [...tasksList.tasks];
        tempCopy[i].completed = true;
        tasksList.setCompletedTasks(completedTask => [...tasksList.completedTasks, tempCopy[i]]);
        tasksList.setTasks(filterOutIndex(tasksList.tasks, i));
    }

    const deleteTask = (id) => {
        tasksList.setTasks(filterOutId(tasksList.tasks, id));
    }

    return (
        <>
        <div className={style.saveButtonFixed} onClick={()=>writeData(userId, stringDate, {tasks:tasksList.tasks, completedTasks: tasksList.completedTasks}, dairyObj.dairy )} id="ninth">
            <p>
                Save
            </p>
        </div>
        <div className={style.taskListContainer}>
            <div className={style.inner}>
            <SlideToggle
                render={({ toggle, setCollapsibleElement }) => (
                    <div  onClick={()=>setArrow(!arrow)} id="third">
                        <div className={style.titleContainer}>
                            <h4>Tasks of The Day:</h4>
                            <div onClick={toggle} className={style.arrowIcon}>
                                {arrow?<IoIosArrowDown/>:<IoIosArrowUp/>}
                            </div>
                        </div>
                        <div ref={setCollapsibleElement}>
                            {   
                                tasksList.tasks && tasksList.tasks.length>0?
                                tasksList.tasks.filter(e=>e.completed==false).map((e,i)=>{
                                    return(
                                        !e.completed?
                                        <>
                                        {i>0?
                                            <hr></hr>
                                            :<></>
                                        }
                                        
                                        <div key={i} className={style.taskContainer}>
                                            <div className={style.taskTextContent}>
                                                <h4>
                                                    {e.title}
                                                </h4>
                                                <p>
                                                    <br/>
                                                    {e.description}
                                                </p>
                                            </div>

                                            <div className={style.taskOptions}>
                                                        <IoMdCheckmarkCircleOutline onClick={()=>completeTask(i)} color="green"/>
                                                        <MdDelete onClick={()=>deleteTask(e.id)} color="red"/>
                                            </div>
                                        </div>
                                        </>:<></>
                                    )
                                }):<p>No Task Added</p>
                            }
                        </div>
                    </div>
                )}/>
            </div>
        </div>
        </>
    )
}

export default TasksAdded
