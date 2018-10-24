import React from 'react';
import classes from './Inspection.css';

import moment from 'moment';
import Button from '../UI/Button/Button'

const inspection = (props) => {
    
    const now = moment();
    const lastInspectionDate = moment(props.lastInspectionDate);
    const nextInspectionDate = lastInspectionDate.clone().add(1, 'year'); 
    const timeLeftInspection = moment.duration(nextInspectionDate.diff(now));
    const daysInspection = Math.floor(timeLeftInspection.asDays());
    
//    console.log(daysInspection)
    
    let inspClass = classes.inspection
    if (daysInspection < 30 ) {
        inspClass = [classes.inspection, classes.warning].join(' ') 
    }
    
    
    let insp = (
            <div onClick={props.click} className={inspClass}>
                <p>{daysInspection} dni do przeglądu technicznego</p>
                <p> Data: {nextInspectionDate.format('D MMMM YYYY')} </p>
            </div>
        )
    
    if (props.active) { // is executed when state isActive=true
        insp = (
            <div  className={[classes.above, classes.inspection].join(' ')}>
                    <p>{daysInspection} dni do przeglądu technicznego</p>
                    <p> Data: {nextInspectionDate.format('D MMMM YYYY')} </p>
                    <Button clicked={props.changeInspectionDateHandler} btnType='Proceed'>ZRÓB PRZEGLĄD</Button>
                    <Button clicked={props.click} btnType='Cancel'>WRÓĆ</Button>
            </div>
        )
    }

    return (
        insp
    )
    
};

export default inspection;