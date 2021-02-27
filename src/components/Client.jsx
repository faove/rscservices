import React,{useState, Fragment} from 'react';
import ClientEditForm from './ClientEditForm'; 
import ClientAddForm from './ClientAddForm'; 
import ClientTable from './ClientTable'; 
// import { useForm } from "react-hook-form";
import { useDispatch, useSelector} from 'react-redux';
import { getClient, getNextClient} from '../redux/clientDuck';
import Button from '@material-ui/core/Button'

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








    const editRow = (client) => {
      console.log('editRow')
      console.log(client)
      setEditing(true);
  
      setCurrentCliente(
        { 
          id: client.id, name: client.name, last_name: client.last_name,
          dni: client.dni, email: client.email,address: client.address
        }
      )
      // console.log(currentCliente)

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
                  
                    <ClientTable 
                    cliente={client} 
                    currentCliente={currentCliente}
                    // deleteClient={deleteClient} 
                    editRow={editRow}
                    />
                  {/* <ServiceHttpClient getCliente={getCliente}/> */}
                  {/* <Client 
                    getClient={getClient}
                    cliente={cliente} /> */}
                </div>
                <div>
                  <Button variant="text" color="default" size="small" onClick={() => dispatch(getNextClient(20))}>
                    After
                  </Button>
                  <Button variant="text" color="default" size="small" onClick={() => dispatch(getNextClient(20))}>
                    Next
                  </Button>
                </div>
              </div>
            </div>
        </div>  
        
      </Fragment>
    )
}

export default Client;
