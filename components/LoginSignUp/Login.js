import style from '../../lib/login.module.css'
import firebase from 'firebase'
import { useState } from 'react'
import Loader from '../Loader/Loader';

function Login() {
    const [ username, setUsername] = useState('');
    const [ password, setPassword] = useState('');
    const [ err, setErr ] = useState('');

    const [loading, setLoading] = useState(false);

    const handleUsername = (e) => {
        setErr('');
        setUsername(e.target.value)
    }
    const handlePassword = (e) => {
        setErr('');
        setPassword(e.target.value)
    }

    const login = (e) => {

        if(username=='' || password==''){
            setErr('Cannot be empty!');
            return;
        }

        setLoading(true);

        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(username, password).then((u)=>{
            setLoading(false);
        }).catch((error) => {
            setLoading(false);
            setErr('Check Username and/or password!');
        });
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
                <h3 className={style.title}>Login</h3>
                <form className={style.form1}>
                    <input className={style.un} value={username} onChange={handleUsername} type="text" align="center" placeholder="Username" />
                    <input className={style.pass} value={password} onChange={handlePassword} type="password" align="center" placeholder="Password" />
                    {err?<p className={style.emailErr}>{err}</p>:<></>}
                    <a className={style.submit} align="center" onClick={login}>Log in</a>
                    {/* <p className={style.forgot} align="center"><a href="#"></a></p> */}
                </form>
                        
        </div>
    )
}

export default Login
