import React from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { deleteClient,getClient } from '../redux/clientDuck';
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete';
import Swal from 'sweetalert2';

const ClientTable = (props) => {

    //const [listClient, setListClient] = useState([]);

    // console.log('props de ClientTable:')
    // console.log(props)
    const dispatch = useDispatch()

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

    const HandleButtonDelete = (id,name,lastname) =>{
        // Swal.fire('Any fool can use a computer')
        // dispatch(deleteClient(cliente.id))
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteClient(id))
              swalWithBootstrapButtons.fire(
                'Deleted!',
                `Your client ${name} ${lastname} has been deleted.`,
                'success'
              )
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled'
              )
            }
          })

    }

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
                                onClick={() => HandleButtonDelete(cliente.id,cliente.name,cliente.last_name)}
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
