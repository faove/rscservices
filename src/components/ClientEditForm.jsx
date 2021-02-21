import React, {Fragment} from 'react';
import { useForm } from 'react-hook-form';

const ClientEditForm = (props) => {
    console.log('ClientEdit:')
    console.log(props)
    

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
    setValue('dni', props.currentCliente.dni);
    setValue('address', props.currentCliente.address);
    setValue('email', props.currentCliente.email);


    const onSubmit = (data, e) => {
        // console.log('data')
        // console.log(data)
        // console.log('props')
        // console.log(props)
        // props.addClient(props.currentCliente.id, data)
        //props.addClient(props.cliente.id, data)
        // data.id = props.currentClient.id
        // props.updateClient(props.currentClient.id, data)
            
    
            data.id = props.currentCliente.id

            console.log('submit Client')
            console.log(data.id)
            console.log(data)
            props.updateClient(props.currentCliente.id, data)
            
            // limpiar campos
            e.target.reset();
        //}
        // limpiar campos
        e.target.reset();
    }

    return (
        <Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group">
                    <span className="input-group-text">First and last name</span>
                    <input type="text"  name="name"
                    className="form-control" placeholder="Edit name client" 
                    ref={register({
                        required: {
                            value: true, 
                            message: 'Name es requerido'
                            }
                    })}
                    />
                    <input type="text"  name="last_name"
                    className="form-control" placeholder="Edit last name client"
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
                <div>
                <input 
                    placeholder="Ingrese DNI"
                    type="text" 
                    name="dni"
                    ref={register({
                        required: "Required",
                        pattern: {
                          value: /^[0-9]+$/, 
                            message: 'DNI es requerido, debe ser numerico'
                            }
                    })}
                    />
                </div>
                <div>
                    <span className="text-danger text-small d-block mb-2">
                        {errors.dni && errors.dni.message}
                    </span>
                </div>
                <div>
                <input 
                    placeholder="Provider Address"
                    type="text" 
                    name="address"
                    />
                </div>
                <div className="mb-3">
                    <input placeholder="Email address" type="email" className="form-control" 
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
                <button type="submit"onClick={props.updateClient.id} >Edit client</button>
            </form>
        </Fragment>
    );
}
export default ClientEditForm;