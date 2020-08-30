import {useState, useEffect} from 'react'
import style from '../../lib/login.module.css'
import firebase from 'firebase'
import Loader from '../Loader/Loader';

function SignUp() {
    const [ username, setUsername] = useState('');
    const [ password, setPassword] = useState('');
    const [ password2, setPassword2] = useState('');
    const [ err, setErr ] = useState(null);
    const [ redu, setRedu ] = useState(false);
    const [ redp, setRedp ] = useState(false);
    const [ noMatch, setNoMatch ] = useState(false);
    const [ passwordShort, setPasswordShort ] = useState(false);

    const [loading, setLoading] = useState(false);

    const ucs = style.un + ' ' + style.redBorder;
    const pcs = style.pass + ' ' + style.redBorder;

    const handleUsername = (e) => {
        setErr(null);
        setRedu(false);
        setUsername(e.target.value);
    }
    const handlePassword = (e) => {
        setRedp(false);
        setPassword(e.target.value);
        setPasswordShort(false);
    }
    const handlePassword2 = (e) => {
        setNoMatch(false);
        setPassword2(e.target.value);
    }

    const signup = (e) => {
        if(username==''){
            setRedu(true);
            return;
        }
        if(password == ''){
            setRedp(true);
            return;
        }
        if(password !== password2){
            setNoMatch(true);
            return;
        }
        setLoading(true);
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(username, password).then(()=>{
            setLoading(false);
        })
        .catch((error) => {
            if(error.message === "Password should be at least 6 characters"){
                setPasswordShort(true);
            } else setErr('Email Address Is Not Valid!');
            setLoading(false);
          })
    }

    if(loading){
        return( 
        <div className={style.gateLoaderContainer}>
            <Loader/>
        </div>
        )
    }

    return (
        <div>
                <h3 className={style.title}>Sign up</h3>
                <form className={style.form1}>
                    <input className={redu?ucs:style.un} value={username} onChange={handleUsername} type="text" align="center" placeholder="Username" />
                        {err?<p className={style.emailErr}>{err}</p>:<></>}
                    <input className={redp?pcs:style.pass} value={password} onChange={handlePassword} type="password" align="center" placeholder="Password" />
                        {passwordShort?<p className={style.pass2err}>Password should be at least 6 characters</p>:<></>}
                    <input className={style.pass} value={password2} onChange={handlePassword2} type="password" align="center" placeholder="Confirm Password" />
                        {noMatch?<p className={style.pass2err}>Passwords Don't Match !</p>:<></>}
                    <a className={style.submit} align="center" onClick={signup}>Sign Up</a>
                </form>        
        </div>
    )
}

export default SignUp
