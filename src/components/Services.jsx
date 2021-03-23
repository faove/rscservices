import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import React,{useState,Fragment,useEffect, createRef} from 'react';
import ServicesTable from './ServicesTable';
import { useDispatch, useSelector} from 'react-redux';
import { getClient } from '../redux/clientDuck';
import { getCategory } from '../redux/categoryDuck';
import { getAssociate } from '../redux/associateDuck';
import { getServiceAssoc, addService, updateService } from '../redux/serviceDuck';
import 'bootstrap/dist/css/bootstrap.min.css';
import { unstable_createMuiStrictModeTheme as createMuiTheme, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker,} from '@material-ui/pickers';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useForm } from 'react-hook-form';




// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     maxWidth: 500,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 220,
  },
  selectEmpty: {
    marginTop: theme.spacing(3),
  },
  // root: {
  //   width: '100%',
  //   maxWidth: 500,
  //   backgroundColor: theme.palette.background.paper,
  // },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Services = () => {
    
    const wrapper = createRef();
    const classes = useStyles();

    const dispatch = useDispatch()

    const [editing, setEditing] = useState(false)
    const [serviceTotal, setServiceTotal] = useState([])
    const [currentService, setCurrentService] = useState([])
    const [currentServiceAssoc, setCurrentServiceAssoc] = useState([])
    const [modoEdicion, setModoEdicion] = useState(false)
    const [serviceChange, setServiceChange] = useState(false)

    const client = useSelector(store => store.client.array)
    const associate = useSelector(store => store.associate.array)
    const service = useSelector(store => store.service.array)
    const category = useSelector(store => store.category.array)
    const area = useSelector(store => store.category.array)
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const { register, setValue, reset, handleSubmit, errors, control } = useForm({defaultValues: searchResults});
    const [svalue, setSValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [categorias, setCategorias] = useState('');
    const [asociados, setAsociados] = useState('');
    const [areas, setAreas] = useState('');



    // const {resp} = service[0].service;



    //Manejo Date
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    //Controla la seleccionde la Category
    const handleChangeCategory = (event) => {

      setCategorias(Number(event.target.value))
      // console.log('handleChangeCategory:')
      // console.log(categorias)
      // console.log(Number(event.target.value))

    };

    //Controla la seleccionde la Category
    const handleChangeAreas = (event) => {

      setAreas(Number(event.target.value))
      console.log('handleChangeAreas:')
      console.log(areas)
      console.log(Number(event.target.value))

    };
    //Controla la seleccion de Associates
    const handleChangeAssociate = (event) => {
      
      setAsociados(Number(event.target.value))
      // console.log('handleChangeAssociate:')
      // console.log(asociados)
      // console.log(Number(event.target.value))
      
    };

    //Este useEffect funciona como DidMount al momento de pintar todos los object
    useEffect(() => {
      // console.log('mounted')
      dispatch(getCategory());
      dispatch(getAssociate());
      // console.log(associate)
    }, []);

    useEffect(() => {
      console.log('cambio service',service);
      // setCurrentService([
      //   ...currentService,
      //       { 
      //       id: service.id, category_id: service.category_id,
      //       associate_id: service.associate_id,
      //       name: service.name,last_name: service.last_name,email: service.email,
      //       client_id: service.client_id, rate_fixed: service.rate_fixed,
      //       date_service: service.date_service
      //     }
      // ])
      // const {resp} = service;
      // setCurrentService(
      //   [...currentService,{service[0].service}]
      // )
      setCurrentServiceAssoc(
        [...service]
      )
      console.log('currentService useEffect',currentServiceAssoc);

    }, [service]);

    //Indica modificacion en los servicios
    const servicesChange = (id) => {
      dispatch(getServiceAssoc(id))
      
      //setCurrentService([])

      // setCurrentService([
        //   ...currentService,
        //   { id: id,	name: name,	last_name:last_name, email: email,
        //     date_service: date_service, rate_fixed: rate_fixed}
        // ])
      console.log('CAll servicesChange -> currentService');
      console.log('servicesChange',id);
      console.log('servicesChange',currentService);
    }

    //Controla el Autocomplete
    const handleChange = event => {
        
        setSearchTerm(event.target.value);
        setSValue(null)

        // console.log(category)
        // setCategorias(category)
        // console.log(categorias)
        // setAsociados(associate)
    };

    const editRow = (service) => {

      setEditing(true);
      setModoEdicion(true);
      // setCurrentService(
      //   { 
      //     id: service.id,	name: service.name,
      //     last_name: service.last_name,	email: service.email,
      //     rate_fixed: service.rate_fixed,
      //     date_service: service.date_service
      //   }
      // )
      console.log('--------------------------editRow---------------------');
      console.log(currentService);
    }

    const handleClient =  e => {
        e.preventDefault();
        console.log('handleClient')

        setSValue(svalue)

        // console.log(svalue)
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

          console.log('Not Undefined and Not Null',svalue.id)

          servicesChange(svalue.id)
          // dispatch(getServiceAssoc(svalue.id))
          // setCurrentService(
          //   [...currentService,
          //   {service}]
          // )
          // setServiceTotal(svalue)
        } else {
          console.log('Undefined or Null')
          // setServiceTotal([])
          //setCurrentService([])
        }
        console.log('handleClient',currentService);
    }


    useEffect(() => {
        console.log('useeEffect select client')
        dispatch(getClient());
        
        const results = client.filter(searchclient =>
            searchclient.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results)

    },[searchTerm]);

    const onSubmit = (data, e) => {

      console.log('data onSubmit')
      console.log(categorias)
      const selectedDateService = format(selectedDate, 'MM/dd/yyyy h:mm:ss')
      // const dateService = format(selectedDateService, 'YYYY/MM/dd')
      console.log(selectedDateService)
      console.log('modoEdicion')
      console.log(modoEdicion)
      console.log('asociados')
      console.log(asociados)

      if(!data.name.trim()){
        console.log('Campo vacio')
        return
      }


      setCurrentServiceAssoc([
        ...currentServiceAssoc,
            { 
            id: parseInt(data.id), category_id: categorias,associate_id: asociados,
            name: data.name,last_name: data.last_name,
            client_id: data.client_id, rate_fixed: data.rate_fixed,
            date_service: selectedDateService
          }
      ])
      // setCurrentService([
      //   ...currentService,
      //   { category_id: categorias,	areas_id: 1,	associate_id: asociados,
      //     client_id: parseInt(data.id), product_id: 1, name_service: data.name_service, rate_variable: data.rate_variable,
      //     rate_fixed: data.rate_fixed,	rate_process: data.rate_process,	phone_service: data.phone_service,
      //     chat_service: data.chat_service,	chat_service_name: data.chat_service_name, fee_service: data.fee_service,
      //     date_service: selectedDateService,	date_aplication: data.date_aplication, date_pay: data.date_pay,
      //     date_performance: data.date_performance}
      // ])
      console.log('currentServiceAssoc')
      console.log(currentServiceAssoc)
      // console.log('data.id')
      // console.log(parseInt(data.id))
      // console.log('data.client_id')
      // console.log(data.client_id)
      // console.log('data.dateService')
      // console.log(data.date_service)
      // console.log('fecha')
      // console.log(selectedDateService)

      // setValue('type_services_id', data.type_services_id);
      // setValue('mode_services_id', data.mode_services_id);
      // setValue('areas_id', data.areas_id);
      // setValue('type_services_id', 1);
      // setValue('mode_services_id', 1);
      setValue('category_id', categorias);
      setValue('areas_id', 1);
      setValue('associate_id', asociados);
      setValue('client_id', parseInt(data.id));
      setValue('product_id', 1);
      setValue('name_service', data.name_service);
      setValue('rate_fixed', data.rate_fixed);
      setValue('gross_amount', data.gross_amount);
      setValue('phone_service', data.phone_service);
      setValue('date_service', selectedDateService);
      data.areas_id =1;
      data.product_id=1;
      // setValue('chat_service', data.chat_service);
      // setValue('chat_service_name', data.chat_service_name);
      // setValue('fee_service', data.fee_service);
      
      // setValue('date_aplication', data.date_aplication);
      // setValue('date_pay', data.date_pay);
      // setValue('date_performance', data.date_performance);

      
      
      if (modoEdicion){

        dispatch(updateService(data.id, categorias, 
           data.areas_id, asociados, parseInt(data.id), data.product_id,
          data.name_service, data.gross_amount, data.rate_fixed, selectedDateService));
        setModoEdicion(false)
      }else{
          dispatch(addService(categorias, 
            data.areas_id, asociados, parseInt(data.id), data.product_id,
            data.name_service, data.gross_amount, data.rate_fixed, selectedDateService));
      }

      //Update or add new service
      servicesChange(data.id)
      // setCurrentService(
      //   [...currentService,
      //   {service}]
      // )

      // limpiar campos  ref={this.wrapper}
      e.target.reset();
    }
    // const wrapper = createRef(null);
    return (
            <div >
              <div  className="flex-row">
                <div  className="flex-large">
                    
                    <h4 className="text-center">
                        {
                        modoEdicion ? 'Edit Service' : 'Add Service'
                        }
                    </h4>
                      <form onSubmit={handleSubmit(onSubmit)}>
                          <Grid container justify="space-around">
                              <Grid item xs={12}>
                                <Paper  className={classes.paper}>
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
                                  <div>
                                  <List component="nav" className={classes.root} aria-label="mailbox folders">
                                      <ListItem button divider>
                                          <ListItemText primary={inputValue} />
                                      </ListItem>
                                  </List>
                                  </div>
                              </Paper>
                            </Grid>
                          </Grid>
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
                          {/* Este Id es del client por la busquedad */}
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
                                      message: 'Name client for service required'
                                  }
                              })}
                              />
                          </div>
                          <div>
                              <span className="text-danger text-small d-block mb-2">
                                  {errors?.name?.message}
                              </span>
                          </div>
                          <div className="row align-items-start">
                          
                          <Grid container justify="space-around">
                              <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                  <FormControl className={classes.formControl}>
                                  <InputLabel id="select-label-associate">Responsible associate</InputLabel>
                                    <Select
                                      labelId="select_associate_label"
                                      id="select_asociate"
                                      value={asociados === -1 ? '' : asociados}
                                      onChange={handleChangeAssociate}
                                    >
                                    {
                                      associate.map((associ, index) => (
                                        <MenuItem key={index} value={associ.id}>
                                          {associ.name}
                                        </MenuItem>
                                      ))
                                    }
                                    </Select>
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                  <InputLabel id="select-label-category">Category</InputLabel>
                                    <Select
                                      labelId="select_category_label"
                                      id="select_category"
                                      value={categorias === -1 ? '' : categorias}
                                      onChange={handleChangeCategory}
                                    >
                                    {
                                      category.map((categ, index) => (
                                        <MenuItem  key={index} value={categ.id}>
                                          {categ.name}
                                        </MenuItem>
                                      ))
                                    }
                                    </Select>
                                  </FormControl>
                                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                      disableToolbar
                                      variant="inline"
                                      format="dd/MM/yyyy"
                                      margin="normal"
                                      id="date_service"
                                      label="Date picker inline"
                                      value={selectedDate}
                                      onChange={handleDateChange}
                                      KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                      }}
                                    />
                                  </MuiPickersUtilsProvider>
                                </Paper>
                              </Grid>
                                <div>
                                    <span className="text-danger text-small d-block mb-2">
                                        {errors?.date_service?.message}
                                    </span>
                                </div>
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
                                <span className="text-danger text-small d-block mb-2">
                                    {errors.rate_fixed && errors.rate_fixed.message}
                                </span>
                            </Grid>
                            
                            
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
                      <div  className="flex-large">
                      <h2>View Service</h2>
                
                      <ServicesTable 
                        // serviceTotal={serviceTotal}
                        // inputValue={inputValue}
                        currentServiceAssoc={currentServiceAssoc}
                        // searchResults={searchResults}
                        // searchTerm={searchTerm}
                        //deleteService={deleteService} 
                        editRow={editRow}
                        />
                    
                </div>
              </div>
            </div>
    )
}

export default Services