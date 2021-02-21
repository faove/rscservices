import React,{useState, Fragment} from 'react';
import axios from 'axios';
import ClientEditForm from './ClientEditForm'; 
import ClientAddForm from './ClientAddForm'; 
import ClientTable from './ClientTable'; 
// import {useParams} from 'react-router-dom';
//import { useForm } from "react-hook-form";

const Client = () => {

    //const {id} = useParams()

    //Edit client
    const [editing, setEditing] = useState(false); 
    // React.useEffect.getClient()
    const [cliente, setCliente] = useState([]);
    
    const [currentCliente, setCurrentCliente] = useState([]); 
    

    React.useEffect( () => {
        getClient();
        //addClient();
    }, [setCliente]);
  // },[id])

    //------------------------------
    // Obtener Datos de los Clientes
    //------------------------------
    const getClient = async () => {
      try {
        const response = await axios({
          method: "get",
          url: "http://localhost:8000/api/clients"
        });
        const data = await response;
        
        setCliente(data.data)
  
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
    const addClient = async (name,last_name,dni,address,email) => {
      try {
        
        const response = await axios.post(
          "http://localhost:8000/api/clients",
          {
              name,last_name,dni,address,email
          }
        );
        const data = await response;
        
        setCliente([
          ...cliente, 
          data.data
        ])

      }catch (error){
        console.log(error)
      }


    }

    const editRow = (client) => {

      setEditing(true);
  
      setCurrentCliente(
        { 
          id: client.id, name: client.name, last_name: client.last_name,dni: client.dni,address: client.address, email: client.email
        }
      )
    }

    

    const updateClient = async (id, updatedClient) => {
      try {
        

        setEditing(false);
        const response = await axios.put(
          `http://localhost:8000/api/clients/${id}`, updatedClient        
        );
        const data = await response;

        setCliente(
          cliente.map(
          client => (client.id === id ? updatedClient : client)
            ))

        console.log('update Client')
        console.log(id)
        console.log(updatedClient)

      }catch (error){
        console.log(error)
      }
    
    } 

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
