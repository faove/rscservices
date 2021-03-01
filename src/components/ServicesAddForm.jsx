import React,{useState,Fragment,useEffect} from 'react';
import DatePicker from "react-datepicker";
import { useDispatch, useSelector} from 'react-redux';
import { getClient,getNextClient } from '../redux/clientDuck';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TextField } from "@material-ui/core";
import { useForm, Controller } from 'react-hook-form';


const ServicesAddForm = (props) => {

    // ClientRef = React.createRef();
    const dispatch = useDispatch()
    // const [refreshKey,setRefreshKey] = useState(0);
    const [cliente, setCliente] = useState([]);
    const client = useSelector(store => store.client.array)
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [startDate, setStartDate] = useState(new Date());

    const { register, setValue, handleSubmit, errors, control } = useForm();
    // const baseURL = process.env.APP_LOCALHOST_URL
    // console.log('getClientData:')
    // console.log(props)
    // console.log(this.props.getClientData)


    const handleChange = event => {
        console.log('handleChange:')
        console.log(event.target.value)
        setSearchTerm(event.target.value);
        // setRefreshKey(oldKey => oldKey + 1)
    };

    useEffect(() => {
    
        console.log(' useeEffect')
        dispatch(getClient());
        console.log(client)
        const results = client.filter(searchclient =>
            // person.toLowerCase().includes(searchTerm)
            // searchclient.name.match(searchTerm)
            searchclient.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          console.log(results)
        

        setSearchResults(results);

    },[searchTerm]);

    const onSubmit = (data, e) => {
        // limpiar campos
        e.target.reset();
    }

    return (
        <Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                <input type="text" 
                name="search" id="search" htmlFor="search"
                className="form-control" placeholder="Search Client" 
                value={searchTerm} onChange={handleChange}
                />
                </div>
                <div>
                    <ul>
                        {searchResults.map(item => (
                        <li key={item.id}>{item.name}</li>
                        ))}
                    </ul>
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
