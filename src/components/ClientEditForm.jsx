import React, {Fragment} from 'react'
import { useForm } from 'react-hook-form'

const ClientEditForm = (props) => {
    
    

    console.log('currentCliente.name:')
    console.log(props.currentCliente.name)
    console.log('currentCliente.last_name:')
    console.log(props.currentCliente.last_name)
    console.log('Client:')
    console.log(props.client)

    const {register, errors, handleSubmit, setValue} = useForm({
        defaultValues: props.currentCliente
    });

    //Detecta los cambios del input
    setValue('name', props.currentCliente.name);
    setValue('last_name', props.currentCliente.last_name);




    const onSubmit = (data, e) => {
        // console.log('data')
        // console.log(data)
        // console.log('props')
        // console.log(props)
        props.addClient(props.currentCliente.id, data)
        //props.addClient(props.cliente.id, data)
        // data.id = props.currentClient.id
        // props.updateClient(props.currentClient.id, data)
        
        // limpiar campos
        e.target.reset();
    }

    return (
        <Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group">
                    <span className="input-group-text">First and last name</span>
                    <input type="text"  name="name"
                    className="form-control" placeholder="Add name client" 
                    ref={register({
                        required: {
                            value: true, 
                            message: 'Name es requerido'
                            }
                    })}
                    />
                    <input type="text"  name="last_name"
                    className="form-control" placeholder="Add last name client"
                    ref={register({
                        required: {
                            value: true, 
                            message: 'Last name es requerido'
                            }
                    })}
                    />
                </div>
                <div>
                    <span className="text-danger text-small d-block mb-2">
                        {errors?.name?.message}
                    </span>
                </div>
                <div>
                    <span className="text-danger text-small d-block mb-2">
                        {errors?.last_name?.message}
                    </span>
                </div>
                <div className="mb-3">
                    <label htmlFor="InputEmail" className="form-label">Email address</label>
                    <input type="email" className="form-control" 
                    id="InputEmail"  name="email"
                    ref={register({
                        required: "Required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "invalid email address"
                        }
                      })}
                    />
                    <span className="text-danger text-small d-block mb-2">
                        {errors.email && errors.email.message}
                    </span>
                    
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <button type="submit">Edit client</button>
            </form>
        </Fragment>
    );
}
export default ClientEditForm;