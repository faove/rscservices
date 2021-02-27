import React,{useState, Fragment} from 'react'
import shortid from 'shortid';

const Setting = () => {


    const [asociado, setAsociado] = useState('')
    const [asociados, setAsociados] = useState([])
    //EditarAsociado
    const [modoEdicion, setModoEdicion] = useState(false)
    const [id, setId] = useState('')

    const [error, setError] = useState(null)

    const agregarAsociado = e => {

        e.preventDefault()
        if(!asociado.trim()){
            console.log('Campo vacio')
            setError('El campo no puede estar Vacío')
            return
        }
        setAsociados([
            ...asociados,
            {asociado,id: shortid.generate()}
        ])

        
        setAsociado('')
        setError(null)
    }

    const eliminarAsociado = (id) => {
        const arrayFiltrado =  asociados.filter(items => items.id !== id)
        setAsociados(arrayFiltrado)

    }
    

    const editar = items => {
        setModoEdicion(true)
        setAsociado(items.asociado)
        setId(items.id)
    }

    const  editarAsociado = e => {
        console.log('editarAsociado')
        console.log(asociados)
        console.log(e)
        e.preventDefault()

        if (!asociado.trim()){
            console.log('Campo vacio')
            setError('El campo no puede estar vacío')
            return
        }

        const arrayEdit = asociados.map(items => items.id === id ? {id,asociado} : items)

        setAsociados(arrayEdit)
        setModoEdicion(false)
        setAsociado('')
        setId('')
        setError(null)
    }

    return (
        <Fragment>
            <div className="container mt-5">
            <h1 className="text-center">Setting</h1>
            <hr/>
            <div className="row">
                <div className="col-8">
                <h4 className="text-center">Lista de Asociados</h4>
                <ul className="list-group">
                    {
                        asociados.length === 0 ? (
                            <li className="list-group-item">Sin Tareas</li>
                        ) : (
                            asociados.map(items => (
                                <li className="list-group-item" key={items.id}>
                                <span className="lead">{items.id} - {items.asociado}</span>
                                <button 
                                    className="btn btn-sm btn-danger float-right mx-2"
                                    onClick={() => eliminarAsociado(items.id)}
                                >Eliminar</button>
                                <button 
                                    className="btn btn-sm btn-warning float-right"
                                    onClick={() => editarAsociado(items)}
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
                    <form onSubmit={modoEdicion ? editarAsociado : agregarAsociado}>
                        {
                        error ? <span className="text-danger">{error}</span> : null
                        }
                        <input 
                            type="text" 
                            className="form-control mb-2"
                            placeholder="Ingrese Asociado"
                            onChange={e => setAsociado(e.target.value)}
                            value={asociado}
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
