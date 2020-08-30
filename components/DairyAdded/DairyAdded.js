import { useContext, useEffect, useState } from 'react'
import style from './DairyAdded.module.css'
import { DairyContext } from '../DairyContext/DairyContext'
import SlideToggle from "react-slide-toggle";
import {IoIosArrowUp,IoIosArrowDown} from 'react-icons/io'

function DairyAdded() {
    const [arrow, setArrow] = useState(false)
    const dairy = useContext(DairyContext);

    return (
        <div className={style.main}>
            <div className={style.innerMain} id="seventh">
            <SlideToggle
                render={({ toggle, setCollapsibleElement }) => (
                    <div  onClick={()=>setArrow(!arrow)}>
                        <div className={style.titleContainer}>
                            <h4>Today's Dairy</h4>
                            <div onClick={toggle} className={style.arrowIcon}>
                                {arrow?<IoIosArrowDown/>:<IoIosArrowUp/>}
                            </div>
                        </div>
                        <div ref={setCollapsibleElement}>
                            <p className={style.dairyText}>
                                {dairy.dairy.text?dairy.dairy.text:"No Dairy Added For this Day"}
                            </p>
                        </div>
                    </div>
                )}/>
            </div>
        </div>
    )
}

export default DairyAdded