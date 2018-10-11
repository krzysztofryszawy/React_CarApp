//import { Route, NavLink, Switch, Redirect } from 'react-router-dom'
import React, { Component } from 'react';
import axios from '../../axios-instance';
import classes from './CarApp.css';
import MainInfo from '../MainInfo/MainInfo';
import Mileage from '../../components/Mileage/Mileage';
import Inspection from '../../components/Inspection/Inspection';
import Oil from '../../components/Oil/Oil';

import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Editor from '../../components/UI/Editor/Editor';
import Spinner from '../../components/UI/Spinner/Spinner';

import InspectionEdit from '../../components/Inspection/InspectionEdit/InspectionEdit';
import MileageEdit from '../../components/Mileage/MileageEdit/MileageEdit';
import OilEdit from '../../components/Oil/OilEdit/OilEdit';

import SelectCar from '../SelectCar/SelectCar';
import Button from '../../components/UI/Button/Button'



class CarApp extends Component {

    
    state = {
            carSelecting: true,
            databaseCarName: null,
            vin: null,
            productionYear: null,
            brand: null,
            regNumber: null,
            timingbeltChangeDate: null,
            mileage: null,
            lastInspectionDate: null,
            lastOilChangeDate: null,
            lastOilChangeMileage: null,
            oilType: null,
            lastInsuranceDate: null,
            lastAirconditionServiceDate: null,
            tires: null,
            isActive: false,
            editing: false,
            editorContent: null,
            isInspectionActive: false,
            isMileageActive: false,
            isOilActive: false,
            networkError: false,
            loading: false,
    }




// klikniecie komponentu aktywuje go
    switchActiveMileageHandler = () => this.setState({isActive:!this.state.isActive, isMileageActive:!this.state.isMileageActive})



    switchActiveInspectionHandler = () => this.setState({isActive:!this.state.isActive, isInspectionActive:!this.state.isInspectionActive})



    switchActiveOilHandler = () => this.setState({isActive:!this.state.isActive, isOilActive:!this.state.isOilActive})








//carName przekazany callbackiem z komponentu SelectCar
    setCarHandler = (carName) => {
        if (this.state.databaseCarName!==carName) {
            this.setState({databaseCarName: carName}, this.loadCarHandler)
        }
        else {
            this.setState({carSelecting: false})
        }
    }
    
    loadCarHandler = () => {
        this.setState({loading:true})
        axios.get(this.state.databaseCarName)
          .then(response => {
                const currentCar = {...response.data, loading: false}
                this.setState(currentCar);
                this.setState({carSelecting: false})
        })
            .catch(error => {
                this.setState({networkError: true, carSelecting: false, loading: false})
        });
    }

    
    
    
    
    switchMaintenanceCarHandler = () => {
        this.setState({carSelecting: !this.state.carSelecting})
    }

    
    
    
    
     updateCarHandler = () => {
            const updatedData = {
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
            
            this.setState({loading:true})
            
            axios.patch(this.state.databaseCarName, updatedData)
                       .then(response => {
                            this.setState({loading: false});
                        })
                        .catch(error => {
                            this.setState({loading: false});
                        });
        }
        
    

    
    
// ustawia nowy przebieg i wywoluje callback zapisujacy state do Firebase
    setNewMileage = (newMileage) => {
        this.setState({mileage: newMileage,  editing:false}, this.updateCarHandler)
    }

    
// ustawia nową datę + nowy przebieg i wywoluje callback zapisujacy state do Firebase
    setNewInspection = (newInspectionDate, newMileage) => {
        this.setState({lastInspectionDate: newInspectionDate, mileage: newMileage,   editing:false}, this.updateCarHandler)
    }
    
    
//jeśli wprowadzony podczas wymiany oleju przebieg > aktualny to zapisujemy go jako aktualny i wywoluje callback zapisujacy state do Firebase
    setNewOil = (newOilDate, newMileage, newOilType) => {
        this.setState({lastOilChangeDate: newOilDate, lastOilChangeMileage: newMileage, oilType: newOilType, editing:false}, this.updateCarHandler)
        if (newMileage > this.state.mileage) {this.setState({mileage: newMileage}, this.updateCarHandler)}
    }
    

    
    
    
    
    
//metoda przekazuje jaka będzie treść w Editor - nazwę komponentu
    changeMileageHandler = () => {
        this.setState(
                {editing:!this.state.editing,
                editorContent: <MileageEdit 
                                cancel={() => this.setState({editing:false})}
                                confirm={this.setNewMileage}
                                currentMileage={this.state.mileage}/>,
                isMileageActive:false,
                isActive:false}
        )
    }     
    
    
    
    
//metoda przekazuje jaka będzie treść w Editor - nazwę komponentu
    changeInspectionDateHandler = () => {
        this.setState(
                {editing:!this.state.editing,
                editorContent: <InspectionEdit 
                                cancel={this.changeInspectionDateHandler}
                                confirm={this.setNewInspection}
                                currentMileage={this.state.mileage}
                                lastInspectionDate={this.state.lastInspectionDate}
                                newInspectionDate = {new Date().toISOString().substr(0, 10)}/>,
                isInspectionActive:false,
                isActive:false}
        )
    } 


    
    
// metoda przekazuje jaka będzie treść w Editor - nazwę komponentu
    changeOilDateHandler = () => {
        this.setState(
                {editing:!this.state.editing,
                editorContent: <OilEdit 
                                cancel={this.changeOilDateHandler}
                                confirm={this.setNewOil}
                                lastOil={this.state.lastOilChangeDate}
                                oilType={this.state.oilType}
                                currentMileage={this.state.mileage}/>,
                isOilActive:false,
                isActive:false}
        )
    } 
    
    
 

    render () {
    
   
        
// ciemne tło nieaktywnych komponentów
    let backdrop = <Backdrop show={this.state.isActive} clicked={() => 
                this.setState({isActive:false, isInspectionActive:false, isMileageActive:false, isOilActive: false})}/>
    
    let mileage = <Mileage 
                        click={this.switchActiveMileageHandler}
                        active={this.state.isMileageActive} 
                        changeMileageHandler={this.changeMileageHandler}
                        currentMileage={this.state.mileage}/>

    
    let inspection = <Inspection
                        click={this.switchActiveInspectionHandler}
                        active={this.state.isInspectionActive} 
                        changeInspectionDateHandler={this.changeInspectionDateHandler}
                        currentMileage={this.state.mileage}
                        lastInspectionDate={this.state.lastInspectionDate}/>
        
    let oil = <Oil
                        click={this.switchActiveOilHandler}
                        active={this.state.isOilActive}
                        changeOilDateHandler={this.changeOilDateHandler}
                        currentMileage={this.state.mileage}
                        lastOilChangeDate={this.state.lastOilChangeDate}
                        lastOilChangeMileage={this.state.lastOilChangeMileage}/>

    
    
    
    //definicja okna dialogowego do edycji aktywnego komponentu
    let editor = <Editor/>
    if (this.state.editing) {
        editor = (
                <Editor show={this.state.editing}>
                    {this.state.editorContent}
                </Editor>
            )
    }
        

    let appContent = (
                    <div>

                        <header>
                                <nav>
                                    <ul>
                                        <li>Option 1</li>
                                        <li>Option 2</li>
                                    </ul>
                                </nav>
                            </header>
                            <MainInfo 
                                clicked={this.clickHandler} 
                                vin={this.state.vin} 
                                regNumber={this.state.regNumber} 
                                brand={this.state.brand} 
                                productionYear={this.state.productionYear}/>

                            {mileage}
                            {inspection}
                            {oil}
                            {backdrop}
                            {editor}
                            
                            <Button btnType='Proceed' clicked={this.switchMaintenanceCarHandler}> ⬅ WRÓĆ</Button>
                    </div>
    )
    
//przełączanie miedzy dodawaniem samochodu a obsługą
    if (this.state.carSelecting) {
        appContent = <SelectCar
                        setCarHandler={this.setCarHandler}/>
    }
    
//obsługa błędu przy pobieraniu state przez loadCarHandler
    if (this.state.networkError) {
        appContent = <div style={{marginTop: '9vh', fontWeight: 'bold', cursor: 'pointer', height:'10vh', color:'red', textAlign: "center"}} onClick={() => this.setState({networkError: false, carSelecting: true})}>Network Error. Click to try again</div>
    }
        
//spinner
    if (this.state.loading) {
        appContent = <Spinner/>
    }
        
        return (
            <div className={classes.CarApp}>
                {appContent}
            </div>
        );
    }
}

export default CarApp;