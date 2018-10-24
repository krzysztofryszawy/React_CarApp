import React from 'react';
import classes from './Oil.css';

import moment from 'moment';
import Button from '../UI/Button/Button'

const oil = (props) => {
    
    const currentMileage = props.currentMileage;
    const lastOilChangeMileage = props.lastOilChangeMileage;
    const now = moment();
    const lastOilChangeDate = moment(props.lastOilChangeDate);
    const nextOilChangeDate = lastOilChangeDate.clone().add(1, 'year').subtract(1, 'day'); 
    const timeLeftOilChange = moment.duration(nextOilChangeDate.diff(now));
    let daysOilChange = Math.floor(timeLeftOilChange.asDays());
    
    
//    console.log(currentMileage-lastOilChangeMileage)
    
    let oilClass = classes.oilClass
    if (daysOilChange < 30 ||  currentMileage-lastOilChangeMileage >= 14000 ) {
        oilClass = [classes.oilClass, classes.warning].join(' ') 
    }
    
    
    
    let oilInsp = (
            <div onClick={props.click} className={oilClass}>
                <p> Do wymiany oleju zostało {15000-(currentMileage-lastOilChangeMileage)} km</p>
                <p>albo {daysOilChange} dni</p>
                <p> Data: {nextOilChangeDate.format('D MMMM YYYY')} </p>
            </div>
        )
    
    if (!props.active && currentMileage-lastOilChangeMileage > 15000) {
        oilInsp = (
            <div onClick={props.click} className={oilClass}>
                <p> Należy wymienić olej, przekroczono przebieg o {Math.abs(15000-(currentMileage-lastOilChangeMileage))} km</p>
            </div>
        )
    }
    
    if (props.active) { // is executed when state isActive=true
    
        if (currentMileage-lastOilChangeMileage >= 15000) {
        oilInsp = (
            <div  className={[classes.above, classes.oilClass].join(' ')}>
                <p> Należy wymienić olej, przekroczono maksymalny przebieg o {Math.abs(15000-(currentMileage-lastOilChangeMileage))} km</p>
                    <Button clicked={props.changeOilDateHandler} btnType='Proceed'>WYMIEŃ OLEJ</Button>
                    <Button clicked={props.click} btnType='Cancel'>WRÓĆ</Button>
            </div>
        )
        } else {
        
            oilInsp = (
                <div  className={[classes.above, classes.oilClass].join(' ')}>
                    <p> Do wymiany oleju zostało {15000-(currentMileage-lastOilChangeMileage)} km</p>
                    <p>albo {daysOilChange} dni</p>
                    <p> Data: {nextOilChangeDate.format('D MMMM YYYY')} </p>
                        <Button clicked={props.changeOilDateHandler} btnType='Proceed'>WYMIEŃ OLEJ</Button>
                        <Button clicked={props.click} btnType='Cancel'>WRÓĆ</Button>
                </div>
            )
        }
    }

    return (
        oilInsp
    )
    
};

export default oil;