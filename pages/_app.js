import '../style.css'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react'


export default function App({ Component, pageProps }) {

    const [isOpen , setIsOpen ] = useState(true);

    return (
      <>
      <Component {...pageProps} />
      </>
    )
  }
