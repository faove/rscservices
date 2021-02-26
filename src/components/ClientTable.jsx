import React from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { deleteClient,getClient } from '../redux/clientDuck';
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete';

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
                            <Button variant="outlined" color="primary"
                                onClick={
                                    () => {props.editRow(cliente)}
                                }
                            >
                              Edit
                            </Button>
                            <Button variant="contained" color="secondary"
                                onClick={() => 
                                    dispatch(deleteClient(cliente.id))
                                }
                                startIcon={<DeleteIcon/>}
                            >
                            Delete
                            </Button>
                            
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