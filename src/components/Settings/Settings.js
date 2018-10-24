import React from 'react'
import classes from './Settings.css';


const settings = (props) => {
    
    return(
        <div className={classes.background}>
            <h4>WYBIERZ KTÓRE MODUŁY WYŚWIETLAĆ</h4>
            <div className={classes.settings}>
                 {props.children}
            </div>
        </div>
        
        
    
    
    )
    
    
}

export default settings