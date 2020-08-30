import { useState, useContext } from 'react'
import style from './TasksDone.module.css'
import { TasksContext } from '../TaskContext/TasksContext'
import {MdDelete} from 'react-icons/md'
import {IoIosCheckmarkCircle, IoIosArrowUp,IoIosArrowDown} from 'react-icons/io'
import SlideToggle from "react-slide-toggle";
import SmallLoader from '../SmallLoader/SmallLoader'


function TasksDone() {
    const tasksList = useContext(TasksContext);
    const [arrow, setArrow] = useState(false);

    return (
        <div className={style.taskListContainer}>
            <div className={style.inner}>
            <SlideToggle
                render={({ toggle, setCollapsibleElement }) => (
                    <div  onClick={()=>setArrow(!arrow)} id="forth">
                        <div className={style.titleContainer}>
                            <h4>Completed Taks:</h4>
                            <div onClick={toggle} className={style.arrowIcon}>
                                {arrow?<IoIosArrowDown/>:<IoIosArrowUp/>}
                            </div>
                        </div>
                        <div ref={setCollapsibleElement}>
                            {   tasksList.completedTasks && tasksList.completedTasks.length>0?
                                tasksList.completedTasks.map((e,i)=>{
                                    return(
                                        e.completed?
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
                                            </div>
                                            <div className={style.taskOptions}>
                                                <IoIosCheckmarkCircle color="rgb(20, 180, 20)" size={30}/>
                                            </div>
                                        </div>
                                        </>:<></>
                                    )
                                }):<p>Haven't completed any task yet</p>
                            }
                        </div>
                    </div>
                )}/>
            </div>
        </div>
    )
}

export default TasksDone
