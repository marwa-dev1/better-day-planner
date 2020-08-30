import {useState, useEffect} from 'react'
import style from './Header.module.css'
import firebase from 'firebase'
import {GiAchievement, GiTrophyCup} from 'react-icons/gi'
import {IoIosRefreshCircle} from 'react-icons/io'

function Header({loggedIn, userId}) {
    const [kudos, setKudos] = useState(0);

    const logout = () => {
        firebase.auth().signOut();
    }

    useEffect(() => {
        if(loggedIn){
            setKudos(0);
            updateKudos();
        }
    }, [])

    const updateKudos = () => {
        setKudos(0);
        firebase.database().ref(userId).once('value', snapshot => {
            snapshot.forEach(e=>{
                setKudos(prev=>prev+e.val().completedTasks.length*9)
            });
        })
    }

    return (
        <div className={style.main}>
            <div className={style.title}>
                <h3>
                    Better Day Planner
                </h3>
            </div>
        {loggedIn?
            <div className={style.rightSide}>
                <div className={style.totalKudos} id="eighth">
                    <GiTrophyCup size={28}/>
                    <h4>Total Kudos: <span>{kudos==0?'':kudos}</span></h4>
                    <IoIosRefreshCircle size={23} className={style.updateIcon} onClick={updateKudos}/>
                </div>
                <div className={style.verticalDivider}>

                </div>
                <div className={style.logout} onClick={logout}>
                    <h4> Logout </h4>
                </div>
            </div>
        :<></>}
        </div>
    )
}

export default Header
