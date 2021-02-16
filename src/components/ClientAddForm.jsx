//rafc
import React, {Fragment}  from 'react';
import { useForm } from 'react-hook-form';

const ClientAddForm = (props) => {

    // console.log(props)
    const {register, errors, handleSubmit} = useForm();
    
    const onSubmit = (data, e) => {
        console.log('Add submit data')
        console.log(data)
        props.addClient(data)
        // limpiar campos
        e.target.reset();
    }

    return (
        <Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group">
                    <span className="input-group-text">First and last name</span>
                    <input type="text" aria-label="First name" 
                    name="username" id="username" htmlFor="username"
                    className="form-control" placeholder="Add name client" 
                    ref={register({
                        required: {
                            value: true, 
                            message: 'Name es requerido'
                            }
                    })}
                    />
                    <input type="text" aria-label="Last name" name="last_name" id="last_name"
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
                <div>
                <input 
                    placeholder="Ingrese nombre de usuario"
                    type="text" 
                    name="lastname"
                    ref={register({
                        required: {
                            value: true, 
                            message: 'Nombre es requerido'
                            }
                    })}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputEmail" className="form-label">Email address</label>
                    <input type="email" className="form-control" 
                    id="InputEmail" aria-describedby="emailHelp" name="email"
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
                <button type="submit">Add Client</button>
            </form>
        </Fragment>
    );
}
export default ClientAddForm;
