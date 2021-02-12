import React,{useState, Fragment} from 'react'
import ClientEditForm from './ClientEditForm';
import {useParams} from 'react-router-dom';
// import { useForm } from "react-hook-form";

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
        <Fragment>
            <table class="table table-striped">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Client</th>
                <th scope="col"></th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">1</th>
                <td><ClientEditForm /></td>
                <td>{cliente.email}</td>
                <td></td>
                </tr>
                <tr>
                <th scope="row">2</th>
                <td>{cliente.name}</td>
                <td>{cliente.email}</td>
                <td></td>
                </tr>
            </tbody>
            </table>
        </Fragment>
    )
}

export default ClientTable;
