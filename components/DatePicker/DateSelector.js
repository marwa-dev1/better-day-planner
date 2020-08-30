import { useState, useContext, useEffect } from "react";
import DatePicker from "react-datepicker";
import {subDays, addDays} from 'date-fns'
import style from './DateSelector.module.css'
import SlideToggle from "react-slide-toggle";
import {IoIosArrowUp,IoIosArrowDown} from 'react-icons/io'
import { DateContext } from "../DateContext/DateContext";
import {formattedDate, stringifyDate} from '../../hooks-functions/formattedDate'
import { TasksContext } from "../TaskContext/TasksContext";
import {DairyContext} from '../DairyContext/DairyContext'

const ExampleCustomInput = ({ value, onClick }) => (
  <div className={style.datePickerCustomInputContainer} onClick={onClick}>
      <span>Date:</span>
      <input className={style.input} name="date" placeholder="date" value={value} disabled/>
  </div>
);

function DateSelector() {
  const DateSelected = useContext(DateContext);
  const [startDate, setStartDate] = useState(new Date());
  const [formattedD, setFormattedD] = useState(formattedDate(startDate));
  const [stringD, setStringD] = useState(stringifyDate(formattedD));
  const [clickableDates, setClickableDates] = useState({min:30, max:8});
  const [arrow, setArrow] = useState(false);
  const tasksList = useContext(TasksContext);
  const dairyObj = useContext(DairyContext);
  const changing = {
    min: 30,
    max: 8
  }

  const confirmed = {
    min:0,
    max:0
  }

  const handleSubmit = () => {
    tasksList.setTasks([]);
    tasksList.setCompletedTasks([]);
    dairyObj.setDairy({text:'', user:''})
    setClickableDates(confirmed);
    DateSelected.setDate(formattedD);
    DateSelected.setStringDate(''+stringD);
  }

  const handleDateChange = date => {
    setStartDate(date);
    setFormattedD(formattedDate(date));
    const formatted = formattedDate(date);
    setStringD(''+stringifyDate(formatted));
  };

  useEffect(()=>{
    setFormattedD(formattedDate(startDate));
    const formatted = formattedDate(startDate);
    setStringD(''+stringifyDate(formatted));
  }, [startDate])

  return (
    <div className={style.main} id="first">
      <div className={style.innerMain}>
      <SlideToggle
        render={({ toggle, setCollapsibleElement }) => (
          <div 
              onClick={()=>setArrow(!arrow)}
          >
            <div className={style.titleContainer}>
              <h4>Choose A Day:</h4>
              <div onClick={toggle} className={style.arrowIcon}>
                {arrow?<IoIosArrowDown/>:<IoIosArrowUp/>}
              </div>
            </div>
            <div ref={setCollapsibleElement}>
              <div>
              <div className={style.datePickerContainer}  id="first-2"> 
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  minDate={clickableDates.min==0?subDays(startDate, clickableDates.min):subDays(new Date(), clickableDates.min)}
                  maxDate={clickableDates.max==0?addDays(startDate, clickableDates.max):addDays(new Date(), clickableDates.max)}
                  shouldCloseOnSelect={false}
                  customInput={<ExampleCustomInput/>}
                  inline
                />
              </div>
              <div className={style.btnsContainer}>
                <button className={style.button} onClick={handleSubmit} id="first-3"> Confirm</button>
                <button className={style.button} onClick={()=>setClickableDates(changing)} id="first-1"> Change Date</button>
              </div>
              </div>
            </div>
          </div>
        )}
      />
      </div>
    </div>
  );
}

export default DateSelector;
