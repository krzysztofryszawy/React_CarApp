import React, {Component} from 'react';
import classes from './MileageEdit.css';
import Button from '../../UI/Button/Button'

class MileageEdit extends Component {
    
    state = {
        currentMileage: this.props.currentMileage ,
    }

    render (props) {
        
//        console.log(`props.currentMileage: ${this.props.currentMileage}`)
//        console.log(`state.currentMileage: ${this.state.currentMileage}`)
      
        
        const changeMileage = (e) => {
            this.setState({currentMileage: Number(e.target.value)})
        }

//USUNĄĆ NADMIAROWA METODA!!! (to remove)
        const sendNewData = () => {
            this.props.confirm(this.state.currentMileage)
        }

            return (
                <div className={classes.background}>
                  <div className={classes.mileageEditclass}>
                        <h3>Edycja - przebieg pojazdu</h3>
                        
                        <label>Wprowadź aktualny przebieg pojazdu</label>
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

export default MileageEdit;