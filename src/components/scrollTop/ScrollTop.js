import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollTop = () => {

    const location = useLocation();

    useEffect(()=>{
        if(window.scrollY > 0){
            window.scrollTo({
                top:0,
                behavior:"smooth"
            })
        }
    },[location])

  return 
  
  
}

export default ScrollTop
