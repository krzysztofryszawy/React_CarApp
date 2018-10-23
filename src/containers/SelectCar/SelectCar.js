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

    componentIsMounted = false;

    state = {
        allCars: [],
        loading: false,
        error: false,
        carCreating: false,
        shouldReload:false,
    }
    

    componentDidMount () {
        this.componentIsMounted = true;
        this.setState({loading:true})
        axios.get('allCars.json')
            .then(response => {
                if (this.componentIsMounted) {
                        this.setState({allCars: response.data, loading:false})
                }
            })
            .catch(error => {
                this.setState({loading:false})
        })
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }


// jeśli reloadTrigger ustawił shouldReload:true to wczytujemy nową bazę
    componentDidUpdate () {
        if (this.state.shouldReload) {
                this.componentIsMounted = true;
                this.setState({shouldReload:false})
                this.setState({loading:true})
                axios.get('allCars.json')
                    .then(response => {
                        if (this.componentIsMounted) {
                                this.setState({allCars: response.data, loading:false})
                        }
                    })
                    .catch(error => {
                        this.setState({loading:false})
                })
        }
    }


    render () {
    let createCar
    let button
    
// wczytujemy nową bazę tylko jeśli dodano nowy obiekt do bazy - callback w CreateCar
    let reloadTrigger = (decision) => {
        if (decision) {
            this.setState({shouldReload:true})
        }
    }
    

    const createCarSwitcher = () => {
        this.setState({carCreating: !this.state.carCreating})
    }
    
    let cars = <Spinner/>
        
    if (!this.state.loading) {

        cars = this.state.allCars.map(car => {
            return (
                    <SingleCar 
                        key={car.regNumber}
                        regNumber={car.regNumber}
                        jsonName={car.jsonName}
                        brand={car.brand}
                        vin={car.vin}
                        clicked={() => this.props.setCarHandler(car.jsonName)}/>           
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
                        <CreateCar reloadTrigger={reloadTrigger} createCarSwitcher={createCarSwitcher}/>
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




    