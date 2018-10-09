import React from 'react';
import classes from './MainInfo.css';


const mainInfo = (props) => {
    
    let howOld = 2018-+props.productionYear
    
    return (
        <article className={classes.main} onClick={props.clicked} >
            <h3>marka: {props.brand}</h3>
            <h3>nr rejestracyjny: {props.regNumber}</h3>
            <h3>VIN: {props.vin}</h3>
            <div>
                <h3>Samochód ma {howOld} lat</h3>
            </div>
        </article>
    )
    
};

export default mainInfo;

