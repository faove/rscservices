import React from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { deleteClient,getClient } from '../redux/clientDuck';

const ClientTable = (props) => {

    //const [listClient, setListClient] = useState([]);

    // console.log('props de ClientTable:')
    // console.log(props)
    const dispatch = useDispatch()
    

    return (
        <table>
            <thead>
            <tr>
                <th># DNI</th>
                <th>Client name</th>
                <th>Lastname</th>
                <th>Address</th>
                <th>Email</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {
                props.cliente.length > 0 ?
                props.cliente.map(cliente  => (
                        <tr key={cliente.id}>
                        <td>{cliente.dni}</td>
                        <td>{cliente.name}</td>
                        <td>{cliente.last_name}</td>
                        <td>{cliente.address}</td>
                        <td>{cliente.email}</td>
                        <td>
                        <button 
                        className="button muted-button"
                        onClick={
                            () => {props.editRow(cliente)}
                        }
                        >
                            Edit
                        </button>
                        <button 
                        className="button muted-button"
                        onClick={() => 
                            dispatch(deleteClient(cliente.id))
                        }
                        >
                            Delete
                        </button>
                        </td>
                    </tr>
                    )) : (
                
                        <tr>
                        <td colSpan={3}>No cliente</td>
                        </tr>
                    )
    
            }
            
            </tbody>
        </table>
     );
    
}

export default ClientTable;
