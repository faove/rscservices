import React,{useState,Fragment,useEffect} from 'react';
import ServicesTable from './ServicesTable';

// import ServicesAddForm from './ServicesAddForm';
import ServicesEditForm from './ServicesEditForm';

import DatePicker from "react-datepicker";
import { useDispatch, useSelector} from 'react-redux';
import { getClient } from '../redux/clientDuck';
import { getServiceId, addService, updateService } from '../redux/serviceDuck';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TextField } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { useForm, Controller } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Services = () => {

    const classes = useStyles();

    const dispatch = useDispatch()

    const [editing, setEditing] = useState(false);
    const [serviceTotal, setServiceTotal] = useState([]);
    const [currentService, setCurrentService] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(false)

    // const [cliente, setCliente] = useState([]);

    const client = useSelector(store => store.client.array)
    const services = useSelector(store => store.service.array)
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
        setSValue(null)
        // console.log(searchTerm)
        // console.log(searchResults)
        // setRefreshKey(oldKey => oldKey + 1)
    };

    const editRow = (service) => {

      setEditing(true);
      setModoEdicion(true);
      setCurrentService(
        { 
          id: service.id,	type_services_id: service.type_services_id,
          mode_services_id: service.mode_services_id,	areas_id: service.areas_id,	associate_id: service.associate_id,
          client_id: service.client_id, name_service: service.name_service, rate_variable: service.rate_variable,
          rate_fixed: service.rate_fixed,	rate_process: service.rate_process,	phone_service: service.phone_service,
          chat_service: service.chat_service,	chat_service_name: service.chat_service_name, fee_service: service.fee_service,
          date_service: service.date_service,	date_aplication: service.date_aplication, date_pay: service.date_pay,
          date_performance: service.date_performance

        }
      )
    }

    const handleClient =  e => {
        e.preventDefault();
        // let regex = /\d*/;
        // let str = e.target.value;
        // let result = regex.test(str);
        // let result = regex.exec(str);
        // str = result[0].trim();
        // console.log(str);
        
        console.log('handleClient')
        
        

        setSValue(svalue)

        console.log(svalue)
        // const array = searchResults.filter(item => item.dni === parseInt(str))
        // setSearchResults(results)
        // console.log(array.dni)
        // console.log(svalue)
        // console.log(array[0].id,array[0].name, array[0].last_name)
        // setValue('id', svalue.id);
        // setValue('name', svalue.name);
        // setValue('last_name', svalue.last_name);
        reset(svalue)

        if (typeof(svalue) !== 'undefined' && svalue != null) {
          console.log('Not Undefined and Not Null')
          dispatch(getServiceId(svalue.id))
          setServiceTotal(svalue)
        } else {
          console.log('Undefined or Null')
          setServiceTotal([])
        }
        // console.log(typeof(svalue.dni)=== "string")
        // console.log(typeof(svalue.id))

        // if (typeof(svalue.id) === "number"){

        //   dispatch(getServiceDNI(svalue.id))
        //   setServiceTotal(services)

        // }else{

        //   setServiceTotal([])  

        // }
        

        console.log(services)
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

      setCurrentService([
        ...currentService,
        { type_services_id: 1,
          mode_services_id: 1,	areas_id: 1,	associate_id: 1,
          client_id: data.id, name_service: data.name_service, rate_variable: data.rate_variable,
          rate_fixed: data.rate_fixed,	rate_process: data.rate_process,	phone_service: data.phone_service,
          chat_service: data.chat_service,	chat_service_name: data.chat_service_name, fee_service: data.fee_service,
          date_service: data.date_service,	date_aplication: data.date_aplication, date_pay: data.date_pay,
          date_performance: data.date_performance}
      ])

      // setValue('type_services_id', data.type_services_id);
      // setValue('mode_services_id', data.mode_services_id);
      // setValue('areas_id', data.areas_id);
      setValue('type_services_id', 1);
      setValue('mode_services_id', 1);
      setValue('areas_id', 1);
      setValue('associate_id', 1);
      setValue('client_id', data.id);
      setValue('name_service', data.name_service);
      setValue('rate_variable', data.rate_variable);
      setValue('phone_service', data.phone_service);
      setValue('chat_service', data.chat_service);
      setValue('chat_service_name', data.chat_service_name);
      setValue('fee_service', data.fee_service);
      setValue('date_service', data.date_service);
      setValue('date_aplication', data.date_aplication);
      setValue('date_pay', data.date_pay);
      setValue('date_performance', data.date_performance);

      if (modoEdicion){
        dispatch(updateService(data.id,data.name,data.last_name,data.dni,data.address,data.email));
        setModoEdicion(false)

      }else{
          dispatch(addService(data.name,data.last_name,data.dni,data.address,data.email));
      }

      // limpiar campos
    //   e.target.reset();
    }

    return (
      <Fragment>
            <div className="container">
              <div className="flex-row">
                <div className="flex-large">
                    <div className="col-md-auto">
                        {/* <Client 
                        // getClient={getClient}
                        /> */}
                    </div>
                    <h4 className="text-center">
                        {
                        modoEdicion ? 'Edit Service' : 'Add Service'
                        }
                    </h4>
                  
                      <form onSubmit={handleSubmit(onSubmit)}>
                          <div style={{ width: 500 }}>

                          <Autocomplete
                              id="search"
                              disableClearable
                              options={searchResults}
                              getOptionLabel={(option) => option.name + ' ' + option.last_name}
                              // value={svalue}
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
                          {
                          modoEdicion ? (
                              <button className="btn btn-warning btn-block" type="submit">Edit Service</button>
                          ) : (
                              <button className="btn btn-dark btn-block" type="submit">Add Service</button>
                          )
                          }
                      </form>
                      {/* <Client ref={this.ClientRef}/> */}

            
                    </div>
                  
                  
                  <div className="flex-large">
                  <h2>View Service</h2>
            
                  <ServicesTable 
                    serviceTotal={serviceTotal}
                    inputValue={inputValue}
                    services={services}
                    // searchResults={searchResults}
                    // searchTerm={searchTerm}
                    //deleteService={deleteService} 
                     editRow={editRow}
                    />
                </div>
              </div>
            </div>
      </Fragment>
       
    );
}

export default Services