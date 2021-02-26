import React,{useState, Fragment} from 'react';
import axios from 'axios';
import ClientEditForm from './ClientEditForm'; 
import ClientAddForm from './ClientAddForm'; 
import ClientTable from './ClientTable'; 
// import { useForm } from "react-hook-form";
import { useDispatch, useSelector} from 'react-redux';
import { getClient, getNextClient} from '../redux/clientDuck';

const Client = (props) => {

    //const {id} = useParams()
    // const {register, errors,setValue, handleSubmit} = useForm();
    //Edit client
    const [editing, setEditing] = useState(false); 
    // React.useEffect.getClient()
    const [cliente, setCliente] = useState([]);
    
    const [currentCliente, setCurrentCliente] = useState([]); 


    const dispatch = useDispatch()



    // crearmos el state utilizando nuestra tienda
    // store.client lo sacamos de la tienda
    
    // const clientData = useSelector(store => store.client.add)
    // const clientDel = useSelector(store => store.client.del)
    const client = useSelector(store => store.client.array)
    //setCliente(client)
    

    // console.log('Cliente estoy getState-----------------------------')

    // console.log(props.store.getState().client)
    // console.log(client)
    


  
    // const getCliente = () => {
    //   console.log('getClient')
    //   console.log(props)
    //   // props.ServiceHttpClient.getClient().then(x => setCliente(x));
    //   // this.props.getClienteValue(e);
    // }
    React.useEffect( () => {
      dispatch(getClient());
      // setCurrentCliente(client)
      // setCliente(dispatch(getClient()));
      // console.log()
      //dispatch.getClient();
        //dispatch(getClient());
        // getClient();
      //  getCliente();
      //  ServiceHttpClient.getClient().then(x => setCliente(x));
        //addClient();
    }, [setCliente]);
  // },[id])



  // }
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
        
    //     setCliente(data.data)
  
    //   }catch (error){
    //     console.log(error)
    //   }
    // }


    //Eliminar client
    // const deleteClient = async (id) => {
    //   try {
    //     const response = await axios.delete(
    //       `http://localhost:8000/api/clients/${id}`          
    //     );
    //     const data = await response;

    //     console.log('delete Client')
    //     console.log(data)
        
    //     const arrayFilter = cliente.filter(client => client.id !== id);
    //     setCliente(arrayFilter);

    //   }catch (error){
    //     console.log(error)
      
    //   }
    // }



    //addClient 
    // const addClient = async (name,last_name,dni,email,address) => {
    //   try {
        
    //     const response = await axios.post(
    //       "http://localhost:8000/api/clients",
    //       {
    //           name,last_name,dni,email,address
    //       }
    //     );
    //     const data = await response;
        
    //     setCliente([
    //       ...cliente, 
    //       data.data
    //     ])

    //   }catch (error){
    //     console.log(error)
    //   }


    // }

    const editRow = (client) => {

      setEditing(true);
  
      setCurrentCliente(
        { 
          id: client.id, name: client.name, last_name: client.last_name,
          dni: client.dni, email: client.email,address: client.address
        }
      )
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
                      cliente={client}                 
                      currentCliente={currentCliente} 
                      setCurrentCliente={setCurrentCliente}
                      />
                    </div>
                  ):(
                    <div>
                      <h2>Add Client</h2>
                      <ClientAddForm 
                      // addClient={addClient} 
                      // addClient={dispatch(addClient())} crea un ciclo
                      />
                    </div>
                  )
                  }
                  
                  <div className="flex-large">
                  <h2>View Client</h2>
                  <button onClick={() => dispatch(getClient())}>Obtener</button>
                  <button onClick={() => dispatch(getNextClient(20))}>Siguiente</button>
                    <ClientTable 
                    cliente={client} 
                    // setCliente={setCliente}
                    // deleteClient={deleteClient} 
                    editRow={editRow}
                    />
                  {/* <ServiceHttpClient getCliente={getCliente}/> */}
                  {/* <Client 
                    getClient={getClient}
                    cliente={cliente} /> */}
                </div>
              </div>
            </div>
        </div>  
        
      </Fragment>
    )
}

export default Client;
