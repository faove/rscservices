import React, {Fragment,useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector} from 'react-redux';
import { updateClient } from '../redux/clientDuck';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button'


const ClientEditForm = (props) => {

    
    // console.log('currentCliente.name:')
    // console.log(props.currentCliente.name)
    // console.log('currentCliente.last_name:')
    // console.log(props.currentCliente.last_name)
    // console.log('Client:')
    // console.log(props.client)

    const dispatch = useDispatch()
    // const clientcurrent = useSelector(store => store.client.array)

    

    const {values, setValue, control, register, errors, handleSubmit} = useForm({
        defaultValues: props.currentCliente
        // defaultValues: useMemo(() => {
        //     return props.currentCliente;
        //   }, [props])
    });

    // console.log(clientcurrent)
    const [actualclient, setActualClient] = useState([]);

    console.log('actualclient')
    console.log(actualclient)
    console.log('props')
    console.log(props)
    
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
        // Detecta los cambios del input
    //     console.log('name' in actualclient)
    // if (typeof props.current !== 'undefined' && props.current !== null){
    // if (props.current === true){
    //     console.log('estoy setactualcliente es cero')
    //     setActualClient([])
    // }
    if ('name' in actualclient){
        console.log('dentro del if')
        console.log(props.currentCliente)
        
        setValue('name', actualclient.name);
        setValue('last_name', actualclient.last_name);
        setValue('dni', actualclient.dni);
        setValue('address', actualclient.address);
        setValue('email', actualclient.email);
        //console.log(setValue())
        // setActualClient([])
        
    }else{
        setValue('name', props.currentCliente.name);
        setValue('last_name', props.currentCliente.last_name);
        setValue('dni', props.currentCliente.dni);
        setValue('address', props.currentCliente.address);
        setValue('email', props.currentCliente.email);
    }
    // }

    // const handleInputChange = (e) => {
    //     const target = e.target;
    //     console.log('handleChange')
    //     console.log(target)
    //     // const value = target.type === 'checkbox' ? target.checked : target.value;
    //     // const name = target.name;
    
    //     // this.setState({
    //     //   [name]: value
    //     // });
    //   }

    


    const onSubmit = (data, e) => {
      
        // props.addClient(props.currentCliente.id, data)
        //props.addClient(props.cliente.id, data)
        // data.id = props.currentClient.id
        // props.updateClient(props.currentClient.id, data)
            
    
            // data.id = props.currentCliente.id

            console.log('Edit submit Client')
            // console.log(props.currentCliente.id)
            // console.log(this.state)

            console.log(props)
            console.log(data.name)
            setActualClient(data)
            props.setCurrentCliente(data)
            // console.log(actualclient)
            // props.updateClient(props.currentCliente.id, data)

            // e.preventDefault()

            // if (validate()){
                // employeeService.insertEmployee(values)
                dispatch(updateClient(props.currentCliente.id,data))
                // resetForm()
            // }
            // dispatch(updateClient(props.currentCliente.id,data))
            setActualClient([])
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
    console.log('llama a useEffect')
        // setTimeout(() => 
    //         // setValue('name', actualclient.name),
    //         // setValue('name', actualclient.name),
    //         // setValue('last_name', actualclient.last_name),
    //         // setValue('dni', actualclient.dni),
    //         // setValue('address', actualclient.address),
    //         // setValue('email', actualclient.email)
            // setValue('name', props.currentCliente.name),
            // setValue('last_name', props.currentCliente.last_name),
            // setValue('dni', props.currentCliente.dni),
            // setValue('address', props.currentCliente.address),
            // setValue('email', props.currentCliente.email)
    //         //  setValue('name',123),
    //         // setValue('last_name'),
    //         // setValue('dni'),
    //         // setValue('address'),
    //         // setValue('email')
        // );
        if ('name' in actualclient) {
            setValue('name', actualclient.name);
            setValue('name', actualclient.name);
            setValue('last_name', actualclient.last_name);
            setValue('dni', actualclient.dni);
            setValue('address', actualclient.address);
            setValue('email', actualclient.email);
            // setValue([
            //     { name: actualclient.name }, 
            //     { last_name: actualclient.last_name },
            //     { dni: actualclient.dni }, 
            //     { address: actualclient.address },
            //     { email: actualclient.email },
            // ]);
          }
        //setActualClient([])

      }, [actualclient]);
    

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
                <div className="input-group">
                    <span className="input-group-text">First and last name</span>
                    {/* <Controller
                        as={<input type='text' />}
                        control={control}
                        defaultValue={actualclient ? actualclient.name : ''}
                        name='name'
                    /> */}
                     <input type="text" aria-label="First name" 
                    name="name" id="name" htmlFor="name"
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
                
                <input 
                    placeholder="Provider Address"
                    type="text" 
                    name="address"
                    ref={register({
                        required: "Required"
                    })}
                    />
                </div> 
                <div>
                    <span className="text-danger text-small d-block mb-2">
                        {errors.dni && errors.dni.message}
                    </span>
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
                </div>
                <Button type="submit" variant="outlined" color="primary">
                Edit client
                </Button>
            </form>
        </Fragment>
    );
}
export default ClientEditForm;