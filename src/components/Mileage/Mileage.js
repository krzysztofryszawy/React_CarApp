import React from 'react';
import classes from './Mileage.css';
import Button from '../UI/Button/Button'

const mileage = (props) => {
    
    
    let mil = (
            <div onClick={props.click} className={classes.Mileage}>
            <p> Przebieg samochodu: {props.currentMileage} km </p>
            </div>
        )

    if (props.active) { // wykonuje się gdy w state jest isActive=true, aktywuje komponent
        mil = (
            <div  className={[classes.above, classes.Mileage].join(' ')}>
            <p> Przebieg samochodu: {props.currentMileage} km </p>
                    <Button clicked={props.changeMileageHandler} btnType='Proceed'>WPROWADŹ STAN LICZNIKA</Button>
                    <Button clicked={props.click} btnType='Cancel'>WRÓĆ</Button>
            </div>
        )
    }
    
    return (
        
        mil
    )
    
};

export default mileage;