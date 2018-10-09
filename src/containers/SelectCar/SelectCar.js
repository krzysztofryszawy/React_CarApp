import axios from '../../axios-instance';
import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button'
import SingleCar from './SingleCar/SingleCar'
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './SelectCar.css'
import CreateCar from './CreateCar/CreateCar'

//let allCars = [
//    {id: 'KR241RC', name: '/KR241RC.json'},
//    {id: 'KR242RC', name: '/KR242RC.json'},
//    {id: 'KR243RC', name: '/KR243RC.json'},
//    {id: 'KR244RC', name: '/KR244RC.json'},
//]



class selectCar extends Component {

     state = {
        allCars: [],
        loading: false,
        error: false,
        carCreating: false,
    }
    

    componentDidMount () {
        this.setState({loading:true})
        axios.get('allCars.json')
            .then(response => {
                this.setState({allCars: response.data, loading:false})
            })
            .catch(error => {
                    this.setState({loading:false})

        })
    }



    render () {
    let createCar
    let button
    
    //USUNĄĆ TĘ METODĘ POŚREDNIĄ jest nadmiarowa!!!!
    const callSetCar = (carName) => {
        this.props.setCarHandler(carName)
    }
    

    const createCarSwitcher = () => {
        this.setState({carCreating: !this.state.carCreating})
    }
    
    let cars = <Spinner/>
        
    if (!this.state.loading) {
        cars = this.state.allCars.map(car => {
            return (
                    <SingleCar 
                        key={car.id}
                        id={car.id}
                        name={car.name}
                        brand={car.brand}
                        vin={car.vin}
                        clicked={() => callSetCar(car.name)}/>           
        )
    })
    
        button = (
                    <div className={classes.confirmation} style={{height: '4em'}}>
                        <Button btnType='Proceed' clicked={createCarSwitcher}>DODAJ NOWY POJAZD</Button>
                    </div>
        )
    
    }
     
    if (this.state.carCreating) {
        cars = null
        button = null
        createCar = (<div>
                        <CreateCar createCarSwitcher={createCarSwitcher}/>

                    </div>
        )
    }
    
        
        
        
    return (
        <div>
           {cars}
           {createCar}
           {button}
        </div>

    )
    }
};

export default selectCar;




    