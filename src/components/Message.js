import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import {Alert} from 'react-bootstrap'
import {PRACT_RESET} from '../constants/practitionerConstants'
import {PROFILE_RESET} from '../constants/userContants'
import { EMAIL_RESET } from '../constants/emailConstants'
import { useCustomTheme } from '../hooks/useCustomTheme'

const Message = ({variant, children}) => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(true)
    const { isDarkMode, colors } = useCustomTheme()
    
    if (show){
        window.setTimeout(function() {
            setShow(false)
            dispatch({type:PRACT_RESET})
            dispatch({type:PROFILE_RESET})
            dispatch({type:EMAIL_RESET})
        }, 3000)

        // Map variant to appropriate theme colors
        const getAlertStyle = () => {
            const baseStyle = {
                width: "25rem",
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: '10px',
                backdropFilter: 'blur(10px)',
                color: colors.text.primary
            };
            
            if (variant === 'danger') {
                return { ...baseStyle, borderColor: '#f56565', backgroundColor: isDarkMode ? 'rgba(245, 101, 101, 0.1)' : 'rgba(245, 101, 101, 0.05)' };
            } else if (variant === 'success') {
                return { ...baseStyle, borderColor: '#48bb78', backgroundColor: isDarkMode ? 'rgba(72, 187, 120, 0.1)' : 'rgba(72, 187, 120, 0.05)' };
            } else if (variant === 'warning') {
                return { ...baseStyle, borderColor: '#ed8936', backgroundColor: isDarkMode ? 'rgba(237, 137, 54, 0.1)' : 'rgba(237, 137, 54, 0.05)' };
            }
            
            return baseStyle;
        };

        return (
            <div style={{position: "relative", right:"1px"}}>
                <Alert 
                  style={getAlertStyle()} 
                  variant={variant} 
                  onClose={() => setShow(false)} 
                  dismissible>
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
