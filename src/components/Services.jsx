import React,{useState,Fragment} from 'react';
import axios from 'axios';
import ServicesTable from './ServicesTable';


const Services = () => {

    const [editing, setEditing] = useState(false);
    const [service, setService] = useState([]);
    const [currentService, setCurrentService] = useState([]);

    React.useEffect( () => {
        getServices();
    },[setService]);

    //Obtener todos los servicios actuales
    const getServices = async() => {
        try{
            const response = await axios.get(
                "http://localhost:8000/api/services"
            );

            const data = await response;

            setService(data.data)

        }catch (error){
            console.log(error)
        }
    }

    return (
        <Fragment>
            <div>
                <ServicesTable />
            </div>
        </Fragment>
    )
}

export default Services
