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
             
                const databaseCarName = `/${this.state.regNumber}.json`

                const newCarData = {
                    databaseCarName: databaseCarName, //jest
                    vin: this.state.vin,//jest
                    productionYear: this.state.productionYear,//jest
                    brand: this.state.brand,//jest
                    regNumber: this.state.regNumber,//jest
                    timingbeltChangeDate: this.state.timingbeltChangeDate,//jest
                    mileage: this.state.mileage,//jest
                    lastInspectionDate: this.state.lastInspectionDate,//jest
                    lastOilChangeDate: this.state.lastOilChangeDate,//jest
                    lastOilChangeMileage: this.state.lastOilChangeMileage,//jest
                    oilType: this.state.oilType,//jest
                    lastInsuranceDate: this.state.lastInsuranceDate,//jest
                    lastAirconditionServiceDate: this.state.lastAirconditionServiceDate,//jest
                    tires: this.state.tires,//jest
                }

                
                let newCar = {regNumber: this.state.regNumber, jsonName: databaseCarName, brand: this.state.brand, vin:this.state.vin}
            
                 axios.get('allCars.json')
                    .then(response => {
                        let currentCars = response
                        let modifiedCars = ([...currentCars.data])
                        modifiedCars.push(newCar)
                        this.setState({modifiedCars: modifiedCars}, () => saveModifiedCars())
                
                })
             
                let saveModifiedCars = () => {
                    axios.put('/allCars.json', this.state.modifiedCars)
                           .then(response => {
                                console.log(response)
                                this.props.createCarSwitcher()
                                this.props.reloadTrigger(true)
                            })
                            .catch(error => {
                                console.log(error)
                            });
                }


                        console.log(databaseCarName)
             

//                
             


                axios.put(databaseCarName, newCarData)
                           .then(response => {
                                console.log(response)
                            })
                            .catch(error => {
                                console.log(error)
                            });
            }        


         
         
         
         
            let content = ( <div className={classes.createCarclass}>
                                <div>
                                    <label>numer rejestracji</label>
                                    <input name="regNumber" type="text" onChange={changeState}/>
                                </div>
                                <div>
                                    <label>marka</label>
                                    <input name="brand"  type="text"  onChange={changeState}/>
                                </div>
                                <div>
                                    <label>numer VIN</label>
                                    <input name="vin"  type="text" onChange={changeState}/>
                                </div>
                                <div>
                                    <label>rok produkcji</label>
                                    <input name="productionYear"  type="text" onChange={changeState}/>
                                </div>
                                <div>
                                    <label>przebieg przy ostatniej wymianie oleju</label>
                                    <input name="lastOilChangeMileage"  type="text" onChange={changeState}/>
                                </div>
                                <div>
                                    <label>aktualny przebieg pojazdu</label>
                                    <input   name="mileage" type="number" step="1" onChange={changeState}/>
                                </div>
                                <div>
                                    <label>zastosowany olej</label>
                                    <input name="oilType"  type="text" onChange={changeState}/>
                                </div>
                                <div>
                                    <label>typ aktualnie używanych opon (zimowe/letnie)</label>
                                    <input name="tires"  type="text" onChange={changeState}/>
                                </div>
                                <div>
                                    <label>Wprowadź datę ostatniego przeglądu</label>
                                    <input name="lastInspectionDate" type="date" onChange={changeState}/>
                                </div>
                                <div>
                                    <label>Wprowadź datę ostatniej wymiany oleju</label>
                                    <input name="lastOilChangeDate" type="date" onChange={changeState}/>
                                </div>                                
                                <div>
                                    <label>Wprowadź datę ostatniej wymiany rozrządu</label>
                                    <input name="timingbeltChangeDate" type="date" onChange={changeState}/>
                                </div>                                
                                <div>
                                    <label>Wprowadź datę rozpoczęcia aktualnego ubezpieczenia OC</label>
                                    <input name="lastInsuranceDate" type="date" onChange={changeState}/>
                                </div>                                
                                <div>
                                    <label>Wprowadź datę ostatniego serwisu klimatyzacji</label>
                                    <input name="lastAirconditionServiceDate" type="date" onChange={changeState}/>
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