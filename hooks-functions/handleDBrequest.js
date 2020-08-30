import * as firebase from 'firebase'
import {config} from '../firebase/config'
import {useState, useEffect, useContext} from 'react'
import {DateContext} from '../components/DateContext/DateContext'

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}


export const writeData = async (user, date, childTasks, childDairy) => {
   firebase.database().ref(`/${user}`).child(date).set(childTasks);
   console.log(childDairy);
   firebase.database().ref(`/${user}/${date}`).child('dairy').set(childDairy);
}
  
export const  readData = async (ref, child) => {
    let r = await firebase.database().ref(`/${ref}`).child(child);
    let arr = [];
    await r.once('value', snapshot => {
      arr.push(snapshot.val()); 
    });
    return arr;
}



export const useGetTasksFromDb = () => {
    const dateSelected = useContext(DateContext);
    const date = dateSelected.stringDate;
    const [tasksFromDb, setTasksFromDb] = useState();
    useEffect(()=>{
        readData('/user-b', date).then(res=>{
            setTasksFromDb(res);
        });
    }, [])
    return tasksFromDb;
};

export const deleteDate = async (ref, id) => {

}

export const setComplete = async (ref, id) => {

}
