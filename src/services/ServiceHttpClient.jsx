import React, {useState} from 'react'
import axios from 'axios';
import Client from '../components/Client';

const ServiceHttpClient = () => {
    
    // const [cliente, setCliente] = useState([]);

    //------------------------------
    // Obtener Datos de los Clientes
    //------------------------------
    // const getClient = async () => {
    //   try {
    //     const response = await axios({
    //       method: "get",
    //       url: "http://localhost:8000/api/clients"
    //     });
    //     const data = await response;
    //     console.log('servicehttp get')
    //     setCliente(data.data)
  
    //   }catch (error){
    //     console.log(error)
    //   }
    // }

    return (
        <div>
            {/* <Client 
            getClient={getClient}
            cliente={cliente} /> */}
        </div>
    )
}

export default ServiceHttpClient;
