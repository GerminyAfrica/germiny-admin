import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import {Alert} from 'react-bootstrap'
import {PRACT_RESET} from '../constants/practitionerConstants'
import {PROFILE_RESET} from '../constants/userContants'
import { EMAIL_RESET } from '../constants/emailConstants'

const Message = ({variant, children}) => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(true)
    if (show){
        window.setTimeout(function() {
            setShow(false)
            dispatch({type:PRACT_RESET})
            dispatch({type:PROFILE_RESET})
            dispatch({type:EMAIL_RESET})
        }, 3000)

        return (
            <div style={{position: "relative", right:"1px"}}>
                <Alert style= {{width:"25rem"}} variant={variant} onClose={() => setShow(false)} dismissible>
                    {children}
                    
                </Alert>
            </div>
        )
    }
    return <h2></h2>;
}


Message.defaultProps = {
    variant:'info',
}
export default Message
