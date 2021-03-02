import React,{useState,Fragment,useEffect} from 'react';
import DatePicker from "react-datepicker";
import { useDispatch, useSelector} from 'react-redux';
import { getClient,getNextClient } from '../redux/clientDuck';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TextField } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
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

    const { register, setValue, reset, handleSubmit, errors, control } = useForm({defaultValues: searchResults});
    // const baseURL = process.env.APP_LOCALHOST_URL
    // console.log('getClientData:')
    // console.log(props)
    // console.log(this.props.getClientData)
    // setValue('name', searchResults.name);
    // setValue('last_name', searchResults.last_name);

    const handleChange = event => {
        console.log('handleChange:')
        console.log(event.target.value)
        
        setSearchTerm(event.target.value);
        console.log(searchTerm)
        console.log(searchResults)
        
        // setRefreshKey(oldKey => oldKey + 1)
    };

    const inputComponent = ({ inputRef, ...props }) => (
        <div ref={inputRef} {...props} />
      );

    const handleBlur = (index, fieldType) => e => {
    //   console.log(e.target.value)
      console.log('handleBlur')
      
      console.log("value", e.target.value);
      console.log("name", e.target.name);
    //   console.log("index", index[0]);
      console.log("fieldType", fieldType);

    //   console.log(searchResults)
      console.log(searchResults[0].name)
      console.log(searchResults[0].last_name)
      setValue('name', searchResults[0].name);
      setValue('last_name', searchResults[0].last_name);
      reset(searchResults)
    }

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
      console.log('data')
      console.log(data)
      setValue('name', data.name);
      setValue('last_name', data.last_name);
      // setValue('dni', data.dni);
      // setValue('address', data.address);
      // setValue('email', data.email);
        // limpiar campos
        e.target.reset();
    }

    return (
        <Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ width: 500 }}>
                <Autocomplete
                  id="search"
                  disableClearable
                  options={searchResults.map((option) => option.name + ' ' + option.last_name)}
                  filterSelectedOptions
                //   options={searchResults.map((option) => option.id + ' ' + option.name + ' ' + option.last_name)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search client"
                      margin="normal"
                      variant="outlined"
                      onChange={handleChange} 
                      onBlur={handleBlur(searchResults.id,"name")}
                      // onClick={handleClick}
                      inputComponent
                      InputProps={{ ...params.InputProps, 
                        inputRef: params.innerRef,
                        children: props.children,
                        type: 'search' }}
                    />
                  )}
                  
                />
                </div>
                <div>
                <input 
                  type="text" 
                  className="form-control mb-2"
                  placeholder="Name Associate"
                  name="last_name" id="last_name"
                  ref={register({
                      required: {
                          value: true, 
                          message: 'Name es requerido'
                          }
                  })}
                />
                <input type="text" 
                  name="id" id="id" htmlFor="id"
                  className="form-control"  
                  ref ={register}
                />
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
