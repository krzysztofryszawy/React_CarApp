import React, {Component} from 'react';
import classes from './CreateCar.css';
import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-instance';

class createCar extends Component {
    
    state = {
        
    }
    


    render () {

        const changeState = (e) => {
            const key = e.target.name
            this.setState({[key]: e.target.value})
        }


         const saveCarHandler = () => {
             
                const databaseCarName = `/${this.state.regNumber}`

                const newCarData = {
                    databaseCarName: databaseCarName,
                    vin: this.state.vin,
                    productionYear: this.state.productionYear,
                    name: this.state.name,
                    regNumber: this.state.regNumber,
                    timingbeltChangeDate: this.state.timingbeltChangeDate,
                    mileage: this.state.mileage,
                    lastInspectionDate: this.state.lastInspectionDate,
                    lastOilChangeDate: this.state.lastOilChangeDate,
                    lastOilChangeMileage: this.state.lastOilChangeMileage,
                    oilType: this.state.oilType,
                    lastInsuranceDate: this.state.lastInsuranceDate,
                    lastAirconditionServiceDate: this.state.lastAirconditionServiceDate,
                    tires: this.state.tires,
                }

                
             let newCar = {regNumber: this.state.regNumber, name: databaseCarName, brand: this.state.name, vin:this.state.vin}
            
             axios.get('allCars.json')
                .then(response => {
                    let currentCars = response
                    let modifiedCars = ([...currentCars.data])
                    modifiedCars.push(newCar)
                    this.setState({modifiedCars: modifiedCars})
//                    console.log(modifiedCars)
            })
             
             



console.log(this.state)
//                axios.post('/allCars.json', newCar)
//                       .then(response => {
//                            console.log(response)
//                        })
//                        .catch(error => {
//                            console.log(error)
//                        });
//
//                
//             
//             
//
//                axios.put(databaseCarName, newCarData)
//                           .then(response => {
//                            })
//                            .catch(error => {
//                                console.log(error)
//                            });
            }        


            let content = ( <div className={classes.createCarclass}>
                                <div>
                                    <label>numer rejestracji</label>
                                    <input  type="text" name="regNumber"  onChange={changeState}/>
                                </div>
                                <div>
                                    <label>marka</label>
                                    <input  type="text" name="name"  onChange={changeState}/>
                                </div>
                                <div>
                                    <label>numer VIN</label>
                                    <input  type="text" name="vin" onChange={changeState}/>
                                </div>
                                <div>
                                    <label>aktualny przebieg pojazdu</label>
                                    <input  type="number" step="1" name="mileage" onChange={changeState}/>
                                </div>
                                <div className={classes.confirmation} style={{height: '4em'}}>
                                    <Button btnType='Proceed' clicked={saveCarHandler}>ZAPISZ</Button>
                                    <Button btnType='Cancel' clicked={this.props.createCarSwitcher}>WRÓĆ</Button>
                                </div>           
                            </div>)

            return (
                <div>
                    {content}
                </div>
            )
    }
    
}

export default createCar;