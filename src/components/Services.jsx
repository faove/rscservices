import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import React,{useState,Fragment,useEffect, createRef} from 'react';
import ServicesTable from './ServicesTable';
import { useDispatch, useSelector} from 'react-redux';
import { getClient } from '../redux/clientDuck';
import { getCategory } from '../redux/categoryDuck';
import { getAssociate } from '../redux/associateDuck';
import { getCategArea } from '../redux/areaDuck';
import { addService, updateService } from '../redux/serviceDuck';
import { getServiceAssoc } from '../redux/serviceAssocDuck';
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
    
    // const wrapper = createRef(); 
    const classes = useStyles();
    const dispatch = useDispatch()
    
    const client = useSelector(store => store.client.array)
    const associate = useSelector(store => store.associate.array)
    const serviceassoc = useSelector(store => store.serviceassoc.array)
    const category = useSelector(store => store.category.array)
    const area = useSelector(store => store.area.array)
    //

    const [editing, setEditing] = useState(false)
    // const [serviceTotal, setServiceTotal] = useState([])
    const [idServiceAssoc, setIdServiceAssoc] = useState([])
    //Boolean que indica si add un product
    const [editingProduct, setEditingProduct] = useState(false)
    // const [currentServiceAssoc, setCurrentServiceAssoc] = useState([])
    const [modoEdicion, setModoEdicion] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchTypeProduct, setSearchTypeProduct] = useState([]);
    // const [startDate, setStartDate] = useState(new Date());
    const { register, setValue, reset, handleSubmit, errors } = useForm({defaultValues: searchResults});
    const [svalue, setSValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [categorias, setCategorias] = useState('');
    const [asociados, setAsociados] = useState('');
    const [areas, setAreas] = useState('');
    // const [areaCateg, setAreaCateg] = useState([]);
    //Manejo Date
    const [selectedDate, setSelectedDate] = useState(new Date());
    //Manejo de Error
    const [errorArea, setErrorArea] = useState(false)
    const [errorCategory, setErrorCategory] = useState(false) 
    const [errorAssociate, setErrorAssociate] = useState(false)
    const [errorDate, setErrorDate] = useState(false)

    const handleDateChange = (date) => {
      setErrorDate(false)
      setSelectedDate(date);
    };

    //Controla la seleccionde la Category
    const handleChangeCategory = (event) => {

      console.log('handleErrorCategory:')
      console.log(event.target.value)

      setErrorCategory(false)
      setCategorias(Number(event.target.value))
      //Call function getCategArea
      dispatch(getCategArea(event.target.value));
      
    };

    //Controla la seleccionde la Category
    // const handleChangeArea = (event) => {
    //   setErrorArea(false)
    //   setAreas(Number(event.target.value))
    // };

    //Controla la seleccionde la Category
    const handleChangeAreas = (event) => {
      setErrorArea(false)
      setAreas(Number(event.target.value))
      console.log('handleChangeAreas:')
      console.log(areas)
      console.log(Number(event.target.value))

    };
    //Controla la seleccion de Associates
    const handleChangeAssociate = (event) => {
      setErrorAssociate(false)
      setAsociados(Number(event.target.value))
      console.log('handleChangeAssociate:')
      console.log(asociados)
      console.log(Number(event.target.value))
    };

    //Este useEffect funciona como DidMount al momento de pintar todos los object
    useEffect(() => {

      if (!categorias){
        console.log('mounted getCategory');
        dispatch(getCategory());
      }
      if (!asociados){
        console.log('mounted getasociados');
        dispatch(getAssociate());
      }
      // console.log('mounted getTypeProducts')
      // dispatch(getTypeProducts());
     
      // setSearchTypeProduct(typeproduct)
      // console.log('product type 1 useEffect');
      // console.log(searchTypeProduct);
      //setSearchTypeProduct(...typeproduct)
    }, []);

    
    //Controla el Autocomplete
    const handleChange = event => {

      // console.log('handleChange getTypeProducts')
      // dispatch(getTypeProducts());  
      setSearchTerm(event.target.value);
      // dispatch(getTypeProducts());
      // setSearchTypeProduct(...typeproduct)
      // console.log('product type 2 handleChange');
      // console.log(searchTypeProduct);
      console.log('product type 3');
      //console.log(typeproduct);
      setSValue(null)
    };

    const editRow = (service) => {


      // console.log('--------------------------editRow---------------------');
      // console.log(service);
      setEditing(true);
      setModoEdicion(true);
      setAsociados(service.associate_id)
      setCategorias(service.category_id)
      setAreas(service.areas_id)
      reset(service)
    }

    const handleClient =  e => {
        e.preventDefault();
        // console.log('handleClient')

        setSValue(svalue)

        reset(svalue)

        if (typeof(svalue) !== 'undefined' && svalue != null) {

          // console.log('Not Undefined and Not Null',svalue.id)
          setIdServiceAssoc({id:svalue.id,key:Math.random()})
          // servicesChange(svalue.id)
          // setCurrentService(
          //   [...currentService,
          //   {service}]
          // )
          // setServiceTotal(svalue)
        // } else {
        //   console.log('Undefined or Null')
          // setServiceTotal([])
          //setCurrentService([])
        }
        // console.log('handleClient',currentService);
    }


    useEffect(() => {
        dispatch(getClient());
        const results = client.filter(searchclient =>
            searchclient.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results)
    },[searchTerm]);



    useEffect(() => {
      if (typeof(idServiceAssoc.id) !== 'object' && idServiceAssoc.id != null) {
        // console.log('CAll')
        dispatch(getServiceAssoc(idServiceAssoc.id))
      }
    },[idServiceAssoc.key])

    const onSubmit = (data, e) => {


      if (!asociados || asociados.length === 0){
        setErrorAssociate(true)
        return
      }
      
      if (!categorias || categorias.length === 0){
        setErrorCategory(true)
        return
      }

      if (!areas || areas.length === 0){
        setErrorArea(true)
        return
      }

      if(!data.name.trim()){
        return
      }

      if (!selectedDate || selectedDate.length === 0){
        setErrorDate(true)
        return
      }
      const selectedDateService = format(selectedDate, 'MM/dd/yyyy HH:MM:ss')
   

      // setValue('type_services_id', data.type_services_id);
      // setValue('mode_services_id', data.mode_services_id);
      // setValue('areas_id', data.areas_id);
      // setValue('type_services_id', 1);
      // setValue('mode_services_id', 1);
      setValue('category_id', categorias);
      setValue('areas_id', areas);           //ojo add areas
      setValue('associate_id', asociados);
      setValue('client_id', parseInt(data.id));
      // setValue('product_id', 1);
      setValue('name_service', data.name_service);
      setValue('gross_amount', data.gross_amount);
      setValue('gross_amount', data.gross_amount);
      setValue('phone_service', data.phone_service);
      setValue('date_service', selectedDateService);
      
      
      if (modoEdicion){

        dispatch(updateService(data.id, categorias, 
          areas, asociados, parseInt(data.id),
          data.name_service, data.gross_amount, data.gross_amount, selectedDateService));
        setModoEdicion(false)

      }else{
        
          dispatch(addService(categorias, 
            areas, asociados, parseInt(data.id),
            data.name_service, data.gross_amount, data.gross_amount, selectedDateService));
      }
      setErrorArea(false)
      setErrorCategory(false)
      setErrorAssociate(false)
      setErrorDate(false)

      //Update or add new service
      dispatch(getServiceAssoc(parseInt(data.id)))
      setIdServiceAssoc({id: parseInt(data.id), key: Math.random(data.id)})
      setAsociados(-1)
      setCategorias(-1)
      setAreas(-1)

      // limpiar campos  ref={this.wrapper}
      e.target.reset();
    }
    return (
            <div >
              <div  className="flex-row">
                <div  className="flex-large">
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
                                      error={asociados === '' && errorAssociate ===true}
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
                                      error={categorias === '' && errorCategory ===true}
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
                                  <FormControl className={classes.formControl}>
                                    <InputLabel id="select-label-area">Area</InputLabel>
                                      <Select
                                        labelId="select_area_label"
                                        id="select_area"
                                        value={areas === -1 ? '' : areas}
                                        onChange={handleChangeAreas}
                                        error={areas === '' && errorArea ===true}
                                      >
                                      {
                                        area.map((ar, index) => (
                                          <MenuItem  key={index} value={ar.id}>
                                            {ar.name}
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
                                      error={selectedDate === '' ??  false}
                                      KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                      }}
                                    />
                                  </MuiPickersUtilsProvider>
                                </Paper>
                              </Grid>
                                <input 
                                  placeholder="Gross Amount"
                                  type="text" 
                                  name="gross_amount"
                                  ref={register({
                                      required: {
                                          value: true, 
                                          message: 'Gross Amount required'
                                      },
                                      pattern: {
                                        value: /^[0-9\.]+$/, 
                                          message: 'Gross Amount is required, debe ser numerico'
                                      }
                                  })}
                                  />
                                <span className="text-danger text-small d-block mb-2">
                                    {errors.gross_amount && errors.gross_amount.message}
                                </span>
                            </Grid>
                          </div>
                          {
                          modoEdicion ? (
                              <button className="btn btn-warning btn-block" type="submit">Edit Service</button>
                          ) : (
                              <button className="btn btn-dark btn-block" type="submit">Add Service</button>
                          )
                          }
                      </form>
                      </div>    
                      <div  className="flex-large">
                      <h2>View Service</h2>
                
                      <ServicesTable 
                        // typeproduct={typeproduct}
                        // inputValue={inputValue} searchTypeProduct}
                        serviceassoc={serviceassoc} 
                        // currentServiceAssoc={currentServiceAssoc}
                        // searchResults={searchResults}
                        getServiceAssoc={getServiceAssoc}
                        setIdServiceAssoc={setIdServiceAssoc} 
                        editRow={editRow}
                        />
                    
                    </div>
                  </div>
              </div>
            </div>
    )
}

export default Services