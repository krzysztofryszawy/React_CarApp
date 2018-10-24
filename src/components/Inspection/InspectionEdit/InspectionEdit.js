import React, {Component} from 'react';
import classes from './InspectionEdit.css';
import Button from '../../UI/Button/Button'

class InspectionEdit extends Component {
    
    state = {
        currentMileage: this.props.currentMileage,
        lastInspectionDate: this.props.lastInspectionDate,
        newInspectionDate: this.props.newInspectionDate
    }
    
    render (props) {

        

//        console.log(this.state.newInspectionDate)

        const changeInspectionDate = (e) => {
            this.setState({newInspectionDate: e.target.value})
        }
        
        const changeMileage = (e) => {
            this.setState({currentMileage: Number(e.target.value)})
        }

        const sendNewData = () => {
            this.props.confirm(this.state.newInspectionDate, this.state.currentMileage)
        }

            return (
                <div className={classes.background}>
                  <div className={classes.inspectionEditclass}>
                        <h3>Edycja - badanie techniczne</h3>
                        
                        <label>Zarejestruj nowy przegląd techniczny, wprowadź datę jego wykonania</label>
                        <input type="date" value={this.state.newInspectionDate} onChange={changeInspectionDate} min={this.props.lastInspectionDate} required/>
                        
                        <label>Warto także wprowadzić aktualny przebieg pojazdu (nieobowiązkowe)</label>
                        <input  type="number" step="1" name="przebieg" min={this.props.currentMileage} value={this.state.currentMileage} onChange={changeMileage}/>
                   
                        <div className={classes.confirmation}>
                            <Button btnType='Proceed' clicked={sendNewData}>ZATWIERDŹ</Button>
                            <Button btnType='Cancel' clicked={this.props.cancel}>WRÓĆ</Button>
                        </div>
                    </div>
                </div>
            )

    }  
};

export default InspectionEdit;