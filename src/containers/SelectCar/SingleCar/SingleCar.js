import React from 'react';

import classes from './SingleCar.css';

const singleCar = (props) => {
    return (
        <div className={classes.singleCar} onClick={props.clicked}>
            <p style={{color: 'orangered'}} className=""><span role="img" aria-label="car">🚗</span> {props.brand}</p>
            <p style={{fontWeight: 'bold'}} >nr rejestracyjny: {props.regNumber}</p>
            <p className="">vin: {props.vin}</p>
        </div>
    )
    
};

export default singleCar;