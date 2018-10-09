import React from 'react';

import classes from './SingleCar.css';

const singleCar = (props) => {
    return (
        <div className={classes.singleCar} onClick={props.clicked}>
            <p style={{color: 'orangered'}} className=""><span>🚗</span> {props.brand}</p>
            <p style={{fontWeight: 'bold'}} >nr rejestracyjny: {props.id}</p>
            <p className="">vin: {props.vin}</p>
        </div>
    )
    
};

export default singleCar;