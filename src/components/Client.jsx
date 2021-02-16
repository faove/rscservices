import React,{useState, Fragment} from 'react'
import ClientEditForm from './ClientEditForm'; 
import ClientAddForm from './ClientAddForm'; 
import ClientTable from './ClientTable'; 
import {useParams} from 'react-router-dom';
//import { useForm } from "react-hook-form";

const Client = () => {

    const {id} = useParams()
    // console.log('valor de id:')
    // console.log(id)
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
        // console.log('object')
        // console.log(cliente)
        getClient();
        //addClient();
    },[id])
  // },[id])

    // Obtener Datos de los Clientes
    const getClient = async () => {
      const data = await fetch(`http://localhost:8000/api/clients`)
      // const data = await fetch(`http://localhost:8000/api/gets/${id}`)
      const clients = await data.json()
      // console.log('fecth')
      // console.log(clients)
      setCliente(clients)
      setCurrentCliente(clients)
    }

    //Agregar Client
    const addClient = async (dataClient) => {
      //const data = await
       fetch(`http://localhost:8000/api/clients`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            // body: JSON.stringify(cliente) // body data type must match "Content-Type" header
            body: JSON.stringify(dataClient) // body data type must match "Content-Type" header
          })
          .then(response => response.json())
          .then(data => 
            {
              setCliente(data)
              setId(data.id)
            })
      }
    //   const agreclient = await data.json()
      
      
    //   setCliente([
    //     ...cliente,
    //     agreclient
    //   ])
    // }

    const editRow = (client) => {

      setEditing(true);
  
      setCliente(
        { 
          name: client.name, last_name: client.name, email: client.email
        }
      )
    }

    const updateClient = (id, updatedClient) => {
      setEditing(false);
      // console.log('update cliente')
      // console.log(cliente)
      setCurrentCliente(
        
        cliente.map(
        client => (client.id === idclient ? updatedClient : client)
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
                      getClient={getClient}
                      />
                    </div>
                  ):(
                    <div>
                      <h2>Add Client</h2>
                      <ClientAddForm 
                      addClient={addClient} 
                      getClient={getClient}
                      />
                    </div>
                  )
                  }
                  <div className="flex-large">
                  <h2>View Client</h2>
                  <ClientTable 
                  cliente={cliente} 
                  //deleteClient={deleteClient} 
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
