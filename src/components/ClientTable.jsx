import React,{useState} from 'react'
import {useParams} from 'react-router-dom'

const ClientTable = () => {

    const {id} = useParams()
    console.log('valor de id:')
    console.log(id)

    const [cliente, setcliente] = useState([]); 

    React.useEffect( () => {
        //console.log('object')
        const obtenerDatos = async () => {
        const data = await fetch(`http://localhost:8000/api/clients`)
        // const data = await fetch(`http://localhost:8000/api/gets/${id}`)
        const clients = await data.json()
        console.log('fecth')
        console.log(clients)
        setcliente(clients)
        }

        obtenerDatos()
    },[id])

    return (
        <div>
            <h1>Client</h1>
            <h3>{cliente.name}</h3>
            <h3>{cliente.email}</h3>
        </div>
    )
}

export default ClientTable;
