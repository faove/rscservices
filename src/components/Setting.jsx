import React,{useState, Fragment, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { getAssociate, addAssociate, deleteAssociate, updateAssociate } from '../redux/associateDuck';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Swal from 'sweetalert2';

const Setting = () => {


    const [associado, setAsociado] = useState('')
    const [asociados, setAsociados] = useState([])
    const [modoEdicion, setModoEdicion] = useState(false)
    const [id, setId] = useState('')
    const [refreshKey, setRefreshKey] = useState(0);
    const [error, setError] = useState(null)
    const asociado = useSelector(store => store.associate.array)
    const {setValue, register, reset, errors, handleSubmit} = useForm({defaultValues: asociado});
    const dispatch = useDispatch()




    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

    const HandleButtonDelete = (id,name,lastname) =>{
        Swal.fire('Any fool can use a computer')
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
                dispatch(deleteAssociate(id,name,lastname));
              swalWithBootstrapButtons.fire(
                'Deleted!',
                `Your Associate ${name} ${lastname} has been deleted.`,
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
    

    const eliminarAsociado = (id,name,last_name) => {
        // const arrayFiltrado =  asociados.filter(items => items.id !== id)
        // setAsociados(arrayFiltrado)
        // console.log('delete')
        // console.log(id)
        
        HandleButtonDelete(id,name,last_name)

    }
    

    const editar = items => {

        reset(items)
        setModoEdicion(true)
    }

    

    useEffect(() => {
        
        dispatch(getAssociate());
        
    },[refreshKey])

    const onSubmit = (data, e) => {
        console.log('agregarAsociado')
        // console.log(e)
        console.log(data)
        
        //e.preventDefault()
        if(!data.name.trim()){
            console.log('Campo vacio')
            // setError('El campo no puede estar Vacío')
            return
        }
        setAsociados([
            ...asociados,
            {name: data.name,
            last_name: data.last_name,
            dni: data.dni,
            address: data.address,
            email: data.email}
        ])
        setValue('name', data.name);
        setValue('last_name', data.last_name);
        setValue('dni', data.dni);
        setValue('address', data.address);
        setValue('email', data.email);
        // setRefreshKey(oldKey => oldKey +1)
        // console.log('values')
        // console.log(asociado)

        
        // dispatch(addAssociate(data.name,data.last_name));
        if (modoEdicion){
            dispatch(updateAssociate(data.id,data.name,data.last_name,data.dni,data.address,data.email));
            setModoEdicion(false)

            //setAsociado('')
        }else{
            dispatch(addAssociate(data.name,data.last_name,data.dni,data.address,data.email));
        }
        
        
        setAsociado('')
        // limpiar campos
        e.target.reset();
    }

    
    return (
        <Fragment>
            <div className="container mt-5">
            <h1 className="text-center">Settings</h1>
            <hr/>
            <div className="row">
                <div className="col-7">
                <h4 className="text-center">Lista de Asociados</h4>
                <ul className="list-group">
                    {
                        asociado.length === 0 ? (
                            <li className="list-group-item">Sin Tareas</li>
                        ) : (
                            asociado.map(items => (
                                <li className="list-group-item" key={items.id}>
                                <span className="lead">{items.id} - {items.name} {items.last_name}</span>
                                <Button variant="contained" color="secondary"
                                className="btn btn-sm btn-danger float-right mx-2"
                                onClick={() => eliminarAsociado(items.id,items.name,items.last_name)
                                }
                                startIcon={<DeleteIcon/>}
                                >
                                Delete
                                </Button>
                                <Button variant="outlined" color="primary"
                                className="btn btn-sm btn-danger float-right mx-2"
                                onClick={
                                    () => editar(items) 
                                }
                                >Edit
                                </Button>
                                </li>
                            ))
                        )
                    }
                </ul>
            </div>
            <div className="col-5">
                    <h4 className="text-center">
                        {
                        modoEdicion ? 'Editar Asociado' : 'Agregar Asociado'
                        }
                    </h4>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                        <span className="text-danger text-small d-block mb-2">
                            {errors?.name?.message}
                        </span>
                        <span className="text-danger text-small d-block mb-2">
                            {errors?.last_name?.message}
                        </span>
                        <input 
                            type="hidden" 
                            className="form-control mb-2"
                            name="id" id="id"
                            ref={register()}
                        />
                        <input 
                            type="text" 
                            className="form-control mb-2"
                            placeholder="Name Associate"
                            name="name" id="name"
                            ref={register({
                                required: {
                                    value: true, 
                                    message: 'Name es requerido'
                                    }
                            })}
                            // onChange={e => setAsociado(e.target.value)}
                            // value={asociado.name}
                        />
                        <input 
                            type="text" 
                            className="form-control mb-2"
                            placeholder="Last Name Associate"
                            name="last_name" id="last_name"
                            ref={register({
                                required: {
                                    value: true, 
                                    message: 'Last name es requerido'
                                    }
                            })}
                            // onChange={e => setAsociado(e.target.value)}
                            // value={asociado.last_name}
                        />
                        </div>  
                        {
                        modoEdicion ? (
                            <button className="btn btn-warning btn-block" type="submit">Editar</button>
                        ) : (
                            <button className="btn btn-dark btn-block" type="submit">Agregar</button>
                        )
                        }
                    </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Setting
