import React,{useState,Fragment,useEffect} from 'react';
import DatePicker from "react-datepicker";
import { useDispatch, useSelector} from 'react-redux';
import { getClient,getNextClient } from '../redux/clientDuck';
// import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TextField } from "@material-ui/core";
import { useForm, Controller } from 'react-hook-form';



const ServicesAddForm = (props) => {

    // ClientRef = React.createRef();

    const [cliente, setCliente] = useState([]);

    const [startDate, setStartDate] = useState(new Date());

    const { register, setValue, handleSubmit, errors, control } = useForm();
    // const baseURL = process.env.APP_LOCALHOST_URL
    console.log('getClientData:')
    console.log(props)
    // console.log(this.props.getClientData)

    useEffect(() => {
        
        // if (!isAddMode) {
            // get user and set form fields
            console.log(' efect en addService')

            //console.log(Client.getClient.setCliente)   
            // Client.getClient.then(client => {
                // const fields = ['id','name', 'last_name', 'dni', 'address', 'email'];
                // fields.forEach(field => setValue(field, client[field]));
                // setCliente(client);
            // })
        // }
    });

    

    const onSubmit = (data, e) => {
        // console.log('Add submit data')
        // console.log(data.name,data.last_name,data.dni,data.email)
        //props.addClient(data.name,data.last_name,data.dni,data.email)
        // limpiar campos
        e.target.reset();
    }



    return (
        <Fragment>
            {/* <Client cacheOptions defaultOptions loadOptions={this.loadRepuestos} /> */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                
                <select  name="cliente">
                    <option value="0">0 - 1</option>
                    <option value="1">1 - 100</option>
                </select>
                </div>
                <div>
                    <input type="text" aria-label="Client" 
                    name="name" id="name" htmlFor="name"
                    className="form-control" placeholder="Add name service" 
                    ref={register({
                        required: {
                            value: true, 
                            message: 'Name the service required'
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
                <Controller
                    control={control}
                    name="date_service"
                    render={({ onChange, onBlur, value }) => (
                    <DatePicker
                        onBlur={onBlur}
                        selected={startDate} 
                        onChange={date => setStartDate(date)}
                    />
                    )}
                />
                </div>
                <div>
                    <span className="text-danger text-small d-block mb-2">
                        {errors?.date_service?.message}
                    </span>
                </div>
                <div>
                <input 
                    placeholder="Tarifa"
                    type="text" 
                    name="rate_fixed"
                    ref={register({
                        required: {
                            value: true, 
                            message: 'Tarifa required'
                        }
                    })}
                    />
                </div>
                <div>
                    <span className="text-danger text-small d-block mb-2">
                        {errors.rate_fixed && errors.rate_fixed.message}
                    </span>
                </div>
                <div>
                    {/* <Controller as={TextField} name="TextField" control={control} defaultValue="" /> */}
                </div>
                <button type="submit">Add Service</button>
            </form>
            {/* <Client ref={this.ClientRef}/> */}
        </Fragment>
    );
}

export default ServicesAddForm
