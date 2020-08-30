import {createContext, useState, useContext, useEffect} from 'react'
import { DateContext } from '../DateContext/DateContext';
import firebase from 'firebase';

export const DairyContext = createContext();

export const DairyProvider = ({children, userId}) => {
    const dateSelected = useContext(DateContext);

    const [dairy, setDairy] = useState({
            text:'',
            date:'',
        }
    );

    useEffect(() => {
        const getFromDb = async (dairy, date) => {
            const dbDairy = await firebase.database().ref(`${userId}/${date}`).child('dairy');
            await dbDairy.once('value', function(snapshot) {
                updateDairy(dairy, snapshot.val());
            });
        }
        getFromDb(dairy, dateSelected.stringDate);
    }, [dateSelected]);

    const updateDairy = (dairy, e) => {
        if(e){
            setDairy(e);
        }
    }

    return(
        <DairyContext.Provider
            value={{
                dairy:dairy,
                setDairy
            }}
        >
            {children}
        </DairyContext.Provider>
    )
}
