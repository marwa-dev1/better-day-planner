import {useState, useEffect, useContext} from 'react'
import style from './Kudos.module.css'
import {GiAchievement, GiTrophyCup} from 'react-icons/gi'
import { TasksContext } from '../TaskContext/TasksContext'


function Kudos() {
    const tasksList = useContext(TasksContext);
    const kudos = tasksList.completedTasks.length*9;
    return (
        <div className={style.main} >
            <div className={style.inner} id="fifth">
                <div className={style.icon}>
                    <img src="/gold-trophy-icon.png"/>
                </div>
                <div className={style.text}>
                    <p> {kudos} Kudos </p>
                    <p> Earned For This Day </p>
                </div>
            </div>
        </div>
    )
}

export default Kudos
