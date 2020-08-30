import {useState, useContext} from 'react'
import { DairyContext } from '../DairyContext/DairyContext'
import style from './AddDairyInput.module.css'
import SlideToggle from "react-slide-toggle";
import {IoIosArrowUp,IoIosArrowDown} from 'react-icons/io'
import {DateContext} from '../DateContext/DateContext'
import {formattedDate, stringifyDate} from '../../hooks-functions/formattedDate';

function AddDairyInput() {
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

    const [ dairy, setDairy ] = useState(()=> {
        return{
            text:'',
            date:'', 
            user:''
        }
    });
    const [arrow, setArrow] = useState(false)

    const handleDairyChange = e =>{
        setDairy(e.target.value);
    }

    const DairyObj = useContext(DairyContext);

    const addDairy = () => {
        if(dairy.text==''){
            alert("Can't add empty dairy");
            return;
        }
        DairyObj.setDairy({
            text: dairy,
            date: new Date(),
            user:''
        });
    }

    return (
        <div className={style.main}>
            <div className={style.innerMain} id="sixth">
            <SlideToggle
                render={({ toggle, setCollapsibleElement }) => (
                <div 
                    onClick={()=>setArrow(!arrow)}
                >
                    <div className={style.titleContainer}>
                        <h4>  Add Today's Dairy Notes  </h4>
                        <div onClick={toggle} className={style.arrowIcon}>
                            {arrow?<IoIosArrowDown/>:<IoIosArrowUp/>}
                        </div>
                    </div>
                    <div ref={setCollapsibleElement}>
                        <textarea value={dairy.text} onChange={handleDairyChange} className={style.dairyField}/>
                        <div className={style.btnContainer}>
                            <button onClick={addDairy} className={style.button}>
                                Add Dairy
                            </button>
                        </div>
                    </div>
                </div>
                )}
            />
            </div>
        </div>
    )
}

export default AddDairyInput
