import React,{useState, Fragment} from 'react';
import axios from 'axios';
import ClientEditForm from './ClientEditForm'; 
import ClientAddForm from './ClientAddForm'; 
import ClientTable from './ClientTable'; 
import {useParams} from 'react-router-dom';
//import { useForm } from "react-hook-form";

const Client = () => {

    //const {id} = useParams()
    // console.log('valor de id:')
    // console.log(id)

    // {
    //   id: null,
    //   name: '', 
    //   last_name: '', 
    //   email: ''
    //   }

    //Edit client
    const [editing, setEditing] = useState(false); 
    // React.useEffect.getClient()
    const [cliente, setCliente] = useState([]);
    
    const [idclient, setId] = useState([]);

    const [currentCliente, setCurrentCliente] = useState([]); 
    // const [currentCliente, setCurrentCliente] = useState(
    //   {
    //   id: null,
    //   name: '', 
    //   last_name: '', 
    //   email: ''
    //   }
    // ); 

    React.useEffect( () => {
        getClient();
        //addClient();
    }, [setCliente]);
  // },[id])

    // Obtener Datos de los Clientes
    const getClient = async () => {
      try {
        const response = await axios({
          method: "get",
          url: "http://localhost:8000/api/clients"
        });
        const data = await response;
        
        setCliente(data.data)
        // setCliente({
        //   id: data.data.id,
        //   name: data.name, 
        //   last_name: data.last_name, 
        //   email: data.email
        //   });
          // console.log('dentro de getClient')
          // console.log(data.data)

      }catch (error){
        console.log(error)
      }
    }


    //Eliminar client
    const deleteClient = async (id) => {
      try {
        const response = await axios.delete(
          `http://localhost:8000/api/clients/${id}`          
        );
        const data = await response;

        console.log('delete Client')
        console.log(data)
        
        const arrayFilter = cliente.filter(client => client.id !== id);
        setCliente(arrayFilter);

      }catch (error){
        console.log(error)
      
      }
    }



    //addClient 
    const addClient = async (name,last_name,dni,email) => {
      try {
        // console.log('params addClient')
        // console.log(name,last_name,dni,email)
        const response = await axios.post(
          "http://localhost:8000/api/clients",
          {
              name,last_name,dni,email
          }
        );
        const data = await response;
        
        setCliente([
          ...cliente, 
          data.data
        ])
        // console.log('dentro de addClient')
        // console.log(data.data)
        // setCliente({
        //   name: response.name, 
        //   last_name: response.last_name, 
        //   email: response.email
        //   })


      }catch (error){
        console.log(error)
      }


    }
    


    // const getClient = async () => {
    //   const data = await fetch(`http://localhost:8000/api/clients`)
    //   // const data = await fetch(`http://localhost:8000/api/gets/${id}`)
    //   const clients = await data.json()
    //   // console.log('fecth')
    //   // console.log(clients)
    //   //setCliente(clients)
    //   //setCurrentCliente(clients)
    // }

    

    const editRow = (client) => {

      setEditing(true);
  
      setCurrentCliente(
        { 
          id: client.id, name: client.name, last_name: client.last_name,dni: client.dni,email: client.email
        }
      )
    }

    

    const updateClient = (id, updatedClient) => {
      setEditing(false);
      // console.log('update cliente')
      // console.log(cliente)
      setCliente(
        cliente.map(
        client => (client.id === id ? updatedClient : client)
          ))
    
    } 

    //Hook debe estar en ClientAddForm
    // const addClient = (id, addClient) => {
    //     setEditing(false);
    //     console.log('----------------------')
    //     console.log(cliente)
    //     setCliente(
    //         cliente.map(
    //       client => (client.id === id ? addClient : client)
    //         ))
    
    //   }


    return (
        <Fragment>
            <div className="container">
              <div className="flex-row">
                <div className="flex-large">
                  { 
                  editing ? (
                    <div>
                      <h2>Edit Client</h2>
                      <ClientEditForm 
                      currentCliente={currentCliente} 
                      updateClient={updateClient}
                      />
                    </div>
                  ):(
                    <div>
                      <h2>Add Client</h2>
                      <ClientAddForm 
                      addClient={addClient} 
                      />
                    </div>
                  )
                  }
                  <div className="flex-large">
                  <h2>View Client</h2>
                  <ClientTable 
                  cliente={cliente} 
                  deleteClient={deleteClient} 
                  editRow={editRow}
                  />
                </div>
              </div>
            </div>
        </div>  
      </Fragment>
    )
}

export default Client;
