import React, {Component} from 'react';
import classes from './OilEdit.css';
import Button from '../../UI/Button/Button'

class OilEdit extends Component {
    
    state = {
        lastOilChangeDate: this.props.lastOilChangeDate,
        newOilChangeDate: new Date().toISOString().substr(0, 10),
        currentMileage: this.props.currentMileage,
        oilType: this.props.oilType,
    }
    
    render (props) {

        

//        console.log(this.state.newInspectionDate)

        const changeOilChangeDate = (e) => {
            this.setState({newOilChangeDate: e.target.value})
        }
        
        const changeMileage = (e) => {
            this.setState({currentMileage: Number(e.target.value)})
        }
        
        const changeOilType = (e) => {
            this.setState({oilType: e.target.value})
        }
        
//callback passing two parameters to setState in carApp component
        const sendNewData = () => {
            this.props.confirm(this.state.newOilChangeDate, this.state.currentMileage, this.state.oilType)
        }

            return (
                <div className={classes.background}>
                  <div className={classes.oilEditclass}>
                        <h3>Edycja - wymiana oleju</h3>
                        
                        <label>Wprowadź datę wymiany oleju</label>
                          <input type="date" value={this.state.newOilChangeDate} onChange={changeOilChangeDate} min={this.props.lastOilChangeDate} required/>
                          
                        <label>Wprowadź przy jakim przebiegu wykonano wymianę</label>
                        <input  type="number" step="1" name="przebieg" min={this.props.currentMileage} value={this.state.currentMileage} onChange={changeMileage}/>
                        
                        <label>TYP OLEJU</label>
                        <input  type="text" value={this.state.oilType} onChange={changeOilType}/>

                        <div className={classes.confirmation}>
                            <Button btnType='Proceed' clicked={sendNewData}>ZATWIERDŹ</Button>
                            <Button btnType='Cancel' clicked={this.props.cancel}>WRÓĆ</Button>
                        </div>
                    </div>
                </div>
            )

    }  
};

export default OilEdit;