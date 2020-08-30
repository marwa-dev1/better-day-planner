import {useState, useEffect} from 'react'
import style from '../lib/index.module.css'
import DateSelector from '../components/DatePicker/DateSelector'
import AddTaskInput from '../components/AddTaskInput/AddTaskInput'
import TasksAdded from '../components/TasksAdded/TasksAdded'
import { TaskProvider } from '../components/TaskContext/TasksContext'
import AddDairyInput from '../components/AddDairyInput/AddDairyInput'
import { DairyProvider } from '../components/DairyContext/DairyContext'
import DairyAdded from '../components/DairyAdded/DairyAdded'
import TasksDone from '../components/TasksDone/TasksDone'
import TasksUndone from '../components/TasksUndone/TasksUndone'
import Kudos from '../components/Kudos/Kudos'
import Header from '../components/Header/Header'
import { DateProvider } from '../components/DateContext/DateContext'
import firebase from 'firebase'
import Gate from '../components/LoginSignUp/Gate'
import Loader from '../components/Loader/Loader'

import Joyride from 'react-joyride';

export default function Home() {

  const [user, setuser] = useState(null);
  const [showChild, setShowChild] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(()=>{
    setShowChild(true);
  },[])

  useEffect(() => {
    authListener(); 
  }, [user]);

  const authListener = () => {
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        setuser(user);
        setLoading(false)
      }
      else{
        setuser(null);
        setLoading(false);
      }
    });
  }

  if(loading || !showChild){
    return <Loader/>
  }

  return (
    <>
      {/* rest of guide */}
    <Header loggedIn={user?true:false} userId={user?user.uid:''}/>    
    {user?
    <>
    <Joyride
      continuous={true} 
      showProgress={true}
      showSkipButton={true}
      steps={steps}
    />
    <div className={style.mainContainer} id="body-container">
      <div className={style.mainGrid}>
      <DateProvider>
      <DairyProvider userId={user.uid}>
        <TaskProvider userId={user.uid}>
            <div>
                {/* First */}
                <DateSelector/>
                {/* Second */}
                <AddTaskInput/>
            </div>
            <div >
                {/* third */}
              <TasksAdded userId={user.uid}/>
            </div>
            <div>
                {/* forth */}
            <TasksDone/>
            {/* <TasksUndone/> */}
            </div>
            <div>
                {/* fifth */}
              <Kudos/>
                {/* sixth */}
              <AddDairyInput/>
                {/* seventh */}
              <DairyAdded/>
            </div>
          </TaskProvider>
        </DairyProvider>
      </DateProvider>
      </div>
    </div>
    </>:
    <Gate/>
    }
    </>
  )
}


const steps=[
  {target: '#body-container', content:'Let us start this quick guide tour! click next', placement: 'center'},
  { target: '#first', content: 'First, everything depends on the date chosen. All the tasks and diaries will be saved in the corresponding day.' },
    { target: '#first-1', content: 'To change a date, first you click "Change Date"' }, 
    { target: '#first-2', content: 'Then you click the preferred day. You can plan for the next 8 days. If you click any of the previous days, you can only view tasks and dairies but you -obviously- cannot add new ones '}, 
    { target: '#first-3', content: 'Finally, YOU HAVE TO CLICK CONFIRM IN ORDER FOR THE TASKS AND DAIRIES TO BE SAVED IN THE DATE YOU CHOSE' }, 
  { target: '#second', content: 'Here, you can write your tasks and add them' },
  { target: '#third', content: 'You will see the added tasks here with options to mark them as "completed" or to "delete" them', placement:"auto" },
  { target: '#forth', content: 'All the "completed tasks will be added here'},
  { target: '#fifth', content: 'For each completed tasks you will get 9 kudos'},
  { target: '#sixth', content: 'In addition, you can add your dairies in this section'},
  { target: '#seventh', content: 'You will see the diaries you wrote here'},
  { target: '#eighth', content: 'Click the refresh icon to see the total kudos you got since day 1. If you have not completed any tasks and saved, you will not see any'},
  { target: '#ninth', content: 'DO NOT FORGET TO SAVE before changing the date or loggin out. Otherwise, all your planning and progress will be lost'}
]