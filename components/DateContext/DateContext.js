import {createContext, useState, useEffect} from 'react'
import {formattedDate, stringifyDate} from '../../hooks-functions/formattedDate'
export const DateContext = createContext();

export const DateProvider = ({children}) => {
    const [date, setDate ] = useState(formattedDate(new Date()));
    const [ stringDate, setStringDate ] = useState(""+stringifyDate(date));
    return (
        <DateContext.Provider
            value={{
                date, setDate, stringDate, setStringDate
            }}
        >
                {children}
        </DateContext.Provider>
    )
}