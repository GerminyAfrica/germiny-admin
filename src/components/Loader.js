import React from 'react'
import { Spinner } from "react-bootstrap"
import { useCustomTheme } from '../hooks/useCustomTheme'

 
const Loader = () => {
    const { isDarkMode, colors } = useCustomTheme()
    
    return (
        <Spinner
            animation='border'
            variant={isDarkMode ? "light" : "dark"}
            role='status'
            style={{
                width:'100px',
                height:'100px',
                margin:"auto",
                display:"block",
                color: colors.text.primary
            }}
        >
            <span className='sr-only'>Loading...</span> 
        </Spinner>
    )
}

export default Loader
