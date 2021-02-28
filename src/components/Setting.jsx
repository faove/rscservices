import React,{useState, Fragment, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { getAssociate, addAssociate, deleteAssociate } from '../redux/associateDuck';
import { useForm } from 'react-hook-form';


const Setting = () => {


    const [associado, setAsociado] = useState('')
    const [asociados, setAsociados] = useState([])
    const [modoEdicion, setModoEdicion] = useState(false)
    const [id, setId] = useState('')
    const [refreshKey, setRefreshKey] = useState(0);
    const [error, setError] = useState(null)
    const asociado = useSelector(store => store.associate.array)
    const {setValue, register, errors, handleSubmit} = useForm({defaultValues: asociado});
    
    const dispatch = useDispatch()

    
    const obtenerAsociados = () => {
        dispatch(getAssociate());
    }

    


    const eliminarAsociado = (id) => {
        // const arrayFiltrado =  asociados.filter(items => items.id !== id)
        // setAsociados(arrayFiltrado)
        // console.log('delete')
        // console.log(id)
        dispatch(deleteAssociate(id));

    }
    

    const editar = items => {
        setModoEdicion(true)
        setAsociado(items.asociado)
        setId(items.id)
    }

    const  editarAsociado = e => {
        
        e.preventDefault()

        if (!asociado.trim()){
            console.log('Campo vacio')
            setError('El campo no puede estar vacío')
            return
        }

        const arrayEdit = asociados.map(items => items.id === id ? {id,asociado} : items)
        console.log('arrayEdit')
        console.log(arrayEdit)
        setAsociados(arrayEdit)
        setModoEdicion(false)
        setAsociado('')
        setId('')
        setError(null)
    }

    useEffect(() => {
        console.log('useEffect')
        console.log(asociado)
        dispatch(getAssociate());
        // setTimeout(() =>
        //     dispatch(getAssociate())
        
        // );
        // setAsociados(...asociados,asociado)
    },[refreshKey])

    const onSubmit = (data, e) => {
        // console.log('agregarAsociado')
        // // console.log(e)
        // console.log(data)
        
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
        setRefreshKey(oldKey => oldKey +1)
        // console.log('values')
        // console.log(asociado)

        
        // dispatch(addAssociate(data.name,data.last_name));
        dispatch(addAssociate(data.name,data.last_name,data.dni,data.address,data.email));
        // console.log(associatestore)
        
        // setAsociado('')
        // setError(null)
        // limpiar campos
        // e.target.reset();
    }

    
    return (
        <Fragment>
            <div className="container mt-5">
            <h1 className="text-center">Settings</h1>
            <hr/>
            <div className="row">
                <div className="col-8">
                <h4 className="text-center">Lista de Asociados</h4>
                <ul className="list-group">
                    {
                        asociado.length === 0 ? (
                            <li className="list-group-item">Sin Tareas</li>
                        ) : (
                            asociado.map(items => (
                                <li className="list-group-item" key={items.id}>
                                <span className="lead">{items.id} - {items.name} {items.last_name}</span>
                                <button 
                                    className="btn btn-sm btn-danger float-right mx-2"
                                    onClick={() => eliminarAsociado(items.id)}
                                >Eliminar</button>
                                <button 
                                    className="btn btn-sm btn-warning float-right"
                                    onClick={() => editar(items)}
                                >Editar</button>
                                </li>
                            ))
                        )
                    }
                </ul>
            </div>
            <div className="col-4">
                    <h4 className="text-center">
                        {
                        modoEdicion ? 'Editar Asociado' : 'Agregar Asociado'
                        }
                    </h4>
                    <form onSubmit={modoEdicion ? editarAsociado : handleSubmit(onSubmit)}>
                        <span className="text-danger text-small d-block mb-2">
                            {errors?.name?.message}
                        </span>
                        <input 
                            type="text" 
                            className="form-control mb-2"
                            placeholder="Name Associate"
                            name="name"
                            ref={register({
                                required: {
                                    value: true, 
                                    message: 'Name es requerido'
                                    }
                            })}
                            // onChange={e => setAsociado(e.target.value)}
                            // value={asociado}
                        />
                        <input 
                            type="text" 
                            className="form-control mb-2"
                            placeholder="Last Name Associate"
                            name="last_name"
                            ref={register({
                                required: {
                                    value: true, 
                                    message: 'Name es requerido'
                                    }
                            })}
                            // onChange={e => setAsociado(e.target.value)}
                            // value={asociado}
                        />
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
