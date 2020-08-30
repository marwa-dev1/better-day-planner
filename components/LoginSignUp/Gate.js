import {useState, useEffect} from 'react'
import style from '../../lib/login.module.css'
import Header from '../Header/Header'
import Login from './Login'
import SignUp from './SignUp'

function login() {
    const [login, setLogin] = useState(true);
    return (
        <>
        <Header/>
        <div className={style.body}>
            <div className={style.main}>
                <div className={style.optionContainer}>
                    <div onClick={()=>setLogin(true)}>Login</div>
                    <div onClick={()=>setLogin(false)}>SignUp</div>
                </div>
                {login?<Login/>:<SignUp/>}
            </div>
        </div>
        </>
    )
}

export default login
