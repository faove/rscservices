import React, {Fragment,useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector} from 'react-redux';
import { updateClient } from '../redux/clientDuck';
import TextField from "@material-ui/core/TextField";

const ClientEditForm = (props) => {

    
    // console.log('currentCliente.name:')
    // console.log(props.currentCliente.name)
    // console.log('currentCliente.last_name:')
    // console.log(props.currentCliente.last_name)
    // console.log('Client:')
    // console.log(props.client)

    const dispatch = useDispatch()
    // const clientcurrent = useSelector(store => store.client.array)

    const {control, register, errors, handleSubmit, setValue} = useForm({
        defaultValues: props.currentCliente
        // defaultValues: useMemo(() => {
        //     return props.currentCliente;
        //   }, [props])
    });

    // console.log(clientcurrent)
    const [actualclient, setActualClient] = useState([]);

    // const handleChange = e => {
    //     const {name, value} = e.target;
    //     setUser({...user, [name]: value});
    // }
    // handleChange(event) {
    //     this.setState({
    //       text: event.target.value
    //     });
    //   };
    // const handleChange = e => {
    //     console.log('handleChange')
    //     console.log(props)
        // setValue('name', e.target.value);
        // console.log(e.target)
        // this.setState({
        //     name: e.target.value
        //   });
        // setValue('name', props.currentCliente.name);
        // setValue('last_name', props.currentCliente.last_name);
        // setValue('dni', props.currentCliente.dni);
        // setValue('address', props.currentCliente.address);
        // setValue('email', props.currentCliente.email);
    // }
    // const handleChangeClick = e => {
        // console.log('data')
        // console.log(data)
        //Detecta los cambios del input
        // setValue('name', props.currentCliente.name);
        // setValue('last_name', props.currentCliente.last_name);
        // setValue('dni', props.currentCliente.dni);
        // setValue('address', props.currentCliente.address);
        // setValue('email', props.currentCliente.email);
    // }

    

    


    const onSubmit = (data, e) => {
      
        // props.addClient(props.currentCliente.id, data)
        //props.addClient(props.cliente.id, data)
        // data.id = props.currentClient.id
        // props.updateClient(props.currentClient.id, data)
            
    
            // data.id = props.currentCliente.id

            console.log('Edit submit Client')
            // console.log(props.currentCliente.id)
            // console.log(this.state)

            console.log(props.currentCliente.id)
            console.log(data.name)
            setActualClient(data)
            console.log(actualclient)
            // props.updateClient(props.currentCliente.id, data)

            dispatch(updateClient(props.currentCliente.id,data))

            // setValue('name',data.name)
            // props.setCurrentCliente(data)
            //setValue('name', data.name);
            // this.props.getClientId(props.currentCliente.id);
            // limpiar campos
            // e.target.reset();
        //}
        // limpiar campos
        e.target.reset();
    }
    React.useEffect(() => {

        setTimeout(() => 
            // setValue('name', actualclient.name),
            setValue('name', props.currentCliente.name),
            setValue('last_name', props.currentCliente.last_name),
            setValue('dni', props.currentCliente.dni),
            setValue('address', props.currentCliente.address),
            setValue('email', props.currentCliente.email)
            //  setValue('name',123),
            // setValue('last_name'),
            // setValue('dni'),
            // setValue('address'),
            // setValue('email')
        );

      }, [setValue]);
    

    //   React.useEffect(() => {
    //     if (props.currentCliente) {
    //         console.log('Edit')
    //         console.log(props.currentCliente)
    //     //   setValue([{ name: props.currentCliente.name }, 
    //     //     { last_name: props.currentCliente.last_name },
    //     //     { last_name: props.currentCliente.last_name },
    //     //     ]);
    //         setValue('name', props.currentCliente.name);
    //         setValue('last_name', props.currentCliente.last_name);
    //         setValue('dni', props.currentCliente.dni);
    //         setValue('address', props.currentCliente.address);
    //         setValue('email', props.currentCliente.email);
    //     }
    //   }, [props.currentCliente]);  onChange={this.clientcurrent}
    //     defaultValue={props.currentCliente ? props.currentCliente.name : ''}
    //{this.handleChangeFirstName.bind(this)}
                            // onChange={handleChange()}
    // onChange={(event) => this.handleChange(event)}

    return (
        <Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Controller
                        as={
                            <TextField
                            label="Name"
                            variant='outlined'
                            error={!!errors.name}
                            helperText={errors.name && errors.name.message}
                            />
                        }
                        control={control}
                        name="name"
                        rule={{ required: "Name is required" }}
                    />
                    <Controller
                        as={
                            <TextField
                            label="Last Name"
                            variant='outlined'
                            error={!!errors.last_name}
                            helperText={errors.last_name && errors.last_name.message}
                            />
                        }
                        control={control}
                        name="last_name"
                        rule={{ required: "Last name is required" }}
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
                    <Controller
                        as={
                            <TextField
                            label="Ingrese DNI"
                            variant='outlined'
                            error={!!errors.dni}
                            helperText={errors.dni && errors.dni.message}
                            />
                        }
                        control={control}
                        name="dni"
                        rule={{ required: "DNI es requerido, debe ser numerico" }}
                    />
                {/* <input 
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
                    /> */}
                
                    <Controller
                        as={
                            <TextField
                            label="Provider Address"
                            variant='outlined'
                            error={!!errors.address}
                            helperText={errors.address && errors.address.message}
                            />
                        }
                        control={control}
                        name="address"
                        rule={{ required: "Es requerido" }}
                    />
                {/* <input 
                    placeholder="Provider Address"
                    type="text" 
                    name="address"
                    ref={register({
                        required: "Required"
                    })}
                    />*/}
                </div> 
                <div>
                    <span className="text-danger text-small d-block mb-2">
                        {errors.dni && errors.dni.message}
                    </span>
                </div>
                <div className="mb-3">
                    <Controller
                        as={
                            <TextField
                            label="Email address"
                            variant='outlined'
                            error={!!errors.email}
                            helperText={errors.email && errors.email.message}
                            />
                        }
                        control={control}
                        name="email"
                        rule={{ required: "Es requerido" }}
                    />
                    {/* <input placeholder="Email address" type="email" className="form-control" 
                    id="InputEmail"  name="email" 
                    ref={register({
                        required: "Required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "invalid email address"
                        }
                      })}
                    /> */}
                    <span className="text-danger text-small d-block mb-2">
                        {errors.email && errors.email.message}
                    </span>
                </div>
                <button type="submit">Edit client</button>
                {/* onClick={props.currentCliente.id} */}
            </form>
        </Fragment>
    );
}
export default ClientEditForm;