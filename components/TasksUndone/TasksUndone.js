import { useState, useContext } from 'react'
import style from './TasksUndone.module.css'
import { TasksContext } from '../TaskContext/TasksContext'
import {MdDelete} from 'react-icons/md'
import {IoMdCheckmarkCircleOutline, IoIosArrowUp,IoIosArrowDown} from 'react-icons/io'
import SlideToggle from "react-slide-toggle";


function TasksUndone() {
    const tasksList = useContext(TasksContext);
    const [arrow, setArrow] = useState(false);

    return (
        <div className={style.taskListContainer}>
            <div className={style.inner}>
            <SlideToggle
                render={({ toggle, setCollapsibleElement }) => (
                    <div  onClick={()=>setArrow(!arrow)}>
                        <div className={style.titleContainer}>
                            <h4>Uncompleted Tasks:</h4>
                            <div onClick={toggle} className={style.arrowIcon}>
                                {arrow?<IoIosArrowDown/>:<IoIosArrowUp/>}
                            </div>
                        </div>
                        <div ref={setCollapsibleElement}>
                            {
                                tasksList.tasks.map((e,i)=>{
                                    return(
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
                                                    {e.date.day}-{e.date.month}-{e.date.year}
                                                </p>
                                            </div>
                                        </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                )}/>
            </div>
        </div>
    )
}

export default TasksUndone
