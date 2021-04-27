import React,{useState,Fragment,useEffect} from 'react';
import DatePicker from "react-datepicker";
import { useDispatch, useSelector} from 'react-redux';
import { getClient,getNextClient } from '../redux/clientDuck';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TextField } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import { useForm, Controller } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 500,
      backgroundColor: theme.palette.background.paper,
    },
  }));

const ServicesAddForm = (props) => {
    
    const classes = useStyles();

    const dispatch = useDispatch()
    const client = useSelector(store => store.client.array)
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const { register, setValue, reset, handleSubmit, errors, control } = useForm({defaultValues: searchResults});
    const [svalue, setSValue] = useState(null);
    const [inputValue, setInputValue] = useState('');

    const handleChange = event => {
        // console.log('handleChange:')
        // console.log(event.target.value)
        setSearchTerm(event.target.value);
        // console.log(searchTerm)
        // console.log(searchResults)
        // setRefreshKey(oldKey => oldKey + 1)
    };



    const handleClient =  e => {
        e.preventDefault();
        // let regex = /\d*/;
        // let str = e.target.value;
        // let result = regex.test(str);
        // let result = regex.exec(str);
        // str = result[0].trim();
        // console.log(str);
        
        // console.log('handleClient')
        // console.log(inputValue)
        // console.log(svalue)

        setSValue(svalue)
        // const array = searchResults.filter(item => item.dni === parseInt(str))
        // setSearchResults(results)
        // console.log(array.dni)
        // console.log(svalue)
        // console.log(array[0].id,array[0].name, array[0].last_name)
        // setValue('id', svalue.id);
        // setValue('name', svalue.name);
        // setValue('last_name', svalue.last_name);
        reset(svalue)
        // console.log(value.newValue)
        // console.log('results:::::::::::::::::',results)
        // console.log(searchResults[0].name)
        // console.log(searchResults[0].last_name)
    }

    // useEffect(() => {
    //     console.log('array cambiooooooooooooooooooooooo')
    // },[searchResults])

    useEffect(() => {
        console.log(' useeEffect')
        dispatch(getClient());
        // console.log(client)
        const results = client.filter(searchclient =>
            searchclient.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);

    },[searchTerm]);

    const onSubmit = (data, e) => {
      console.log('data')
      console.log(data)
      setValue('name', data.name);
      setValue('last_name', data.last_name);
      // limpiar campos
    //   e.target.reset();
    }

    return (
        <Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ width: 500 }}>



                <Autocomplete
                    id="search"
                    disableClearable
                    options={searchResults}
                    getOptionLabel={(option) => option.name + ' ' + option.last_name}
                    value={svalue}
                    onChange={(event, newValue) => {
                        setSValue(newValue);
                        }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    filterSelectedOptions
                //   options={searchResults.map((option) => option.id + ' ' + option.name + ' ' + option.last_name)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search client"
                      margin="normal"
                      variant="outlined"
                      onChange={handleChange} 
                      // onChange={e => setSearchResults({ value: e.target.value })}
                      // onSelect={handleClient(searchResults.name,"name")}
                      // onSelect={handleChange}
                      onSelect={handleClient}
                    //   InputProps={{ ...params.InputProps, 
                    //     inputRef: params.innerRef,
                    //     type: 'search' }}
                    /> 
                  )}
                />
                </div>
                <div>
                <List component="nav" className={classes.root} aria-label="mailbox folders">
                    <ListItem button divider>
                        <ListItemText primary={inputValue} />
                    </ListItem>
                </List>
                </div>
                <div>
                <input 
                  type="hidden" 
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
                <input type="hidden" 
                  name="id" id="id" htmlFor="id"
                  className="form-control"  
                  ref ={register}
                />
                </div>
                <div>
                    <input type="hidden" aria-label="Client" 
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
                        ref={register}
                        selected={startDate} 
                        onChange={date => setStartDate(date)}
                    />
                    )}
                    defaultValue={register}
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
                    name="gross_amount"
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
                        {errors.gross_amount && errors.gross_amount.message}
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
