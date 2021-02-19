import React, {useState} from 'react';

const ClientTable = (props) => {

    //const [listClient, setListClient] = useState([]);

    console.log('props de ClientTable:')
    console.log(props)

    return (
        <table>
            <thead>
            <tr>
                <th>#</th>
                <th>Client name</th>
                <th>Lastname</th>
                <th>Email</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {
                props.cliente.length > 0 ?
                props.cliente.map(cliente  => (
                        <tr key={cliente.id}>
                        <td>{cliente.id}</td>
                        <td>{cliente.name}</td>
                        <td>{cliente.last_name}</td>
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
                        onClick={() => {props.deleteClient(cliente.id)}}
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
