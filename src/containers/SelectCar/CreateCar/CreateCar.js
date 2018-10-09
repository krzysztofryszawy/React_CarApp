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

        
//wywolywane przyciskiem OK
        const showState = () => {
            console.log(this.state)
            
        }

     const saveCarHandler = () => {
            const newCarData = {
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
            
            axios.put("/RZ123ZX.json", newCarData)
                       .then(response => {
//                            this.setState({loading: false});
                        })
                        .catch(error => {
//                            this.setState({loading: false});
                        });
        }        
        
        
            let content = ( <div className={classes.createCarclass}>
               <div>
                    <label>numer rejestracji</label>
                    <input  type="text" name="regNumber"  onChange={changeState}/>
               </div>

               <div>
                    <label>marka</label>
                    <input  type="text" step="1" name="name" min={''}  onChange={changeState}/>
               </div>

               <div>
                    <label>numer VIN</label>
                    <input  type="text" step="1" name="vin" min={''}  onChange={changeState}/>
               </div>
               
               <div>
                    <label>aktualny przebieg pojazdu</label>
                    <input  type="number" step="1" name="mileage" min={''} onChange={changeState}/>
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