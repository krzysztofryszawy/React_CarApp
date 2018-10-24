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
import Settings from '../../components/Settings/Settings'



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
            showSettings: false,
            showMileageComponent: true,
            showInspectionComponent: true,
            showOilComponent: true,
            showTimingbeltComponent: true,
            showInsuranceComponent: true,
            showAirconditionComponent: true,
            showTiresComponent: true,
    }




// click on component makes it active and general flag as active - for backdrop launch
    switchActiveMileageHandler = () => this.setState({isActive:!this.state.isActive, isMileageActive:!this.state.isMileageActive})



    switchActiveInspectionHandler = () => this.setState({isActive:!this.state.isActive, isInspectionActive:!this.state.isInspectionActive})



    switchActiveOilHandler = () => this.setState({isActive:!this.state.isActive, isOilActive:!this.state.isOilActive})








//jsonName passed by callback from SelectCar component
    setCarHandler = (jsonName) => {
        if (this.state.databaseCarName!==jsonName) {
            this.setState({databaseCarName: jsonName}, this.loadCarHandler)
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

    
    
    
//metod switching between choose car mode, or maintenance
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
                showMileageComponent: this.state.showMileageComponent,
                showInspectionComponent: this.state.showInspectionComponent,
                showOilComponent: this.state.showOilComponent,
                showTimingbeltComponent: this.state.showTimingbeltComponent,
                showInsuranceComponent: this.state.showInsuranceComponent,
                showAirconditionComponent: this.state.showAirconditionComponent,
                showTiresComponent: this.state.showTiresComponent,
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
        
    

    
    
// setting new milleage and running callback, which patch state to Firebase
    setNewMileage = (newMileage) => {
        this.setState({mileage: newMileage,  editing:false}, this.updateCarHandler)
    }

// setting new insp.date + milleage and running callback, which patch state to Firebase
    setNewInspection = (newInspectionDate, newMileage) => {
        this.setState({lastInspectionDate: newInspectionDate, mileage: newMileage,   editing:false}, this.updateCarHandler)
    }
    
//if oilchange mileage > current mileage then saving as actual and running callback, which patch state to Firebase
    setNewOil = (newOilDate, newMileage, newOilType) => {
        this.setState({lastOilChangeDate: newOilDate, lastOilChangeMileage: newMileage, oilType: newOilType, editing:false}, this.updateCarHandler)
        if (newMileage > this.state.mileage) {this.setState({mileage: newMileage}, this.updateCarHandler)}
    }
    

    
    
    
    
    
//method is passing what will be displayed inside editor - component name
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
    
    
    
    
//method is passing what will be displayed inside editor - component name
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


    
    
//method is passing what will be displayed inside editor - component name
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
    
   
        
// dark background above inactive components
    let backdrop = <Backdrop show={this.state.isActive} clicked={() => 
                this.setState({isActive:false, isInspectionActive:false, isMileageActive:false, isOilActive: false})}/>
    
// props passed to component. checking if user set in settings that component should be visible (showMileageComponent?)
    let mileage = this.state.showMileageComponent ?  <Mileage 
                        click={this.switchActiveMileageHandler}
                        active={this.state.isMileageActive} 
                        changeMileageHandler={this.changeMileageHandler}
                        currentMileage={this.state.mileage}
                        /> : null

    
    let inspection = this.state.showInspectionComponent ? <Inspection
                        click={this.switchActiveInspectionHandler}
                        active={this.state.isInspectionActive} 
                        changeInspectionDateHandler={this.changeInspectionDateHandler}
                        currentMileage={this.state.mileage}
                        lastInspectionDate={this.state.lastInspectionDate}/> : null
        
    let oil = this.state.showOilComponent ? <Oil
                        click={this.switchActiveOilHandler}
                        active={this.state.isOilActive}
                        changeOilDateHandler={this.changeOilDateHandler}
                        currentMileage={this.state.mileage}
                        lastOilChangeDate={this.state.lastOilChangeDate}
                        lastOilChangeMileage={this.state.lastOilChangeMileage}/> : null

//button switching between choose car mode, or maintenance
    let switchAppButton = (
                    <div className={classes.confirmation} style={{height: '4em'}}>
                        <Button btnType='Proceed' clicked={this.switchMaintenanceCarHandler}> ⬅ WRÓĆ</Button>
                    </div>
                    )
    
//definition of component which (if set to active) takes content to edition 
    let editor = <Editor/>
        if (this.state.editing) {
            editor = (
                    <Editor show={this.state.editing}>
                        {this.state.editorContent}
                    </Editor>
                )
        }
        
// content for settings, passed to component Settings as props.children
    let settingsContent = (
        <Settings >
            <Button btnType={this.state.showMileageComponent ? 'Proceed' : 'Disabled'} 
            clicked={() => this.setState({showMileageComponent: !this.state.showMileageComponent},this.updateCarHandler)}> ↩ MILEAGE </Button>
            
            <Button btnType={this.state.showInspectionComponent ? 'Proceed' : 'Disabled'}  
            clicked={() => this.setState({showInspectionComponent: !this.state.showInspectionComponent},this.updateCarHandler)}> ↩ INSPECTION </Button>
            
            <Button btnType={this.state.showOilComponent ? 'Proceed' : 'Disabled'}  
            clicked={() => this.setState({showOilComponent: !this.state.showOilComponent},this.updateCarHandler)}> ↩ OIL </Button>
            
            <Button btnType={this.state.showTimingbeltComponent ? 'Proceed' : 'Disabled'}  
            clicked={() => this.setState({showTimingbeltComponent: !this.state.showTimingbeltComponent},this.updateCarHandler)}> ↩ TIMING BELT </Button>
            
            <Button btnType={this.state.showInsuranceComponent ? 'Proceed' : 'Disabled'}  
            clicked={() => this.setState({showInsuranceComponent: !this.state.showInsuranceComponent},this.updateCarHandler)}> ↩ INSURANCE </Button>
            
            <Button btnType={this.state.showAirconditionComponent ? 'Proceed' : 'Disabled'}  
            clicked={() => this.setState({showAirconditionComponent: !this.state.showAirconditionComponent},this.updateCarHandler)}> ↩ AIRCONDITION</Button>
            
            <Button btnType={this.state.showTiresComponent ? 'Proceed' : 'Disabled'}  
            clicked={() => this.setState({showTiresComponent: !this.state.showTiresComponent},this.updateCarHandler)}> ↩ TIRES </Button>
            
            
       </Settings>
    )
    
        
    let appContent = (
                    <div>

                        <header>
                                <nav>
                                    <ul>
                                        <li >
                                            <Button btnType='Proceed' clicked={() => this.setState({showSettings: !this.state.showSettings})}>USTAWIENIA</Button>
                                        </li>
                                        <li>Option 2</li>                                        
                                    </ul>
                                      
                                   {this.state.showSettings ? settingsContent : null}
                                   
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
                            {switchAppButton}

                    </div>
    )
    
// contitional rendering depends on switch, displaying maintenance or car add
    if (this.state.carSelecting) {
        appContent = <SelectCar
                        setCarHandler={this.setCarHandler}/>
    }
    
//error handler when geting data to state by loadCarHandler
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