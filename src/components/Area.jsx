import React,{useState, Fragment, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { addArea, deleteArea, updateArea, getCategArea } from '../redux/areaDuck';
import { getCategory } from '../redux/categoryDuck';
import { getStatus } from '../redux/typestatusDuck'
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Swal from 'sweetalert2';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(2),
      minWidth: 220,
    },
    selectEmpty: {
      marginTop: theme.spacing(3),
    },
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

  

const Area = () => {

    const classes = useStyles();

    //-------------------------------------------
    const [modoEdicion, setModoEdicion] = useState(false)
    const [refreshKey, setRefreshKey] = useState(0);
    const area = useSelector(store => store.area.array)
    const showstatus = useSelector(store => store.showstatus.array)
    const category = useSelector(store => store.category.array)
    const {setValue, register, reset, errors, handleSubmit} = useForm({defaultValues: area});
    const dispatch = useDispatch()
    const [categorias, setCategorias] = useState('');
    const [name, setName] = useState('');
    const [status, setStatus] = useState(0);
    const [error, setError] = useState(false)
    const [errorStatus, setErrorStatus] = useState(false)
    const [errorCategory, setErrorCategory] = useState(false)

    
    //Controla la seleccionde la Category
    const handleChangeCategory = (event) => {
        setErrorCategory(false)
        setCategorias(Number(event.target.value))
    };

    const handleChangeName = (event) => {
        setError(false)
        setName(event.target.value.toLocaleUpperCase())
    }

    const handleChangeStatus = (event) => {
        setErrorStatus(false)
        setStatus(event.target.value)
    };

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    const HandleButtonDelete = (id,name,lastname) =>{

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteArea(id,name));
              swalWithBootstrapButtons.fire(
                'Deleted!',
                `Your Area ${name} has been deleted.`,
                'success'
              )
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled'
              )
            }
          })
    }
    

    const eliminarArea = (id,name,last_name) => {
        HandleButtonDelete(id,name,last_name)
    }

    const editar = items => {
        setCategorias(items.category_id)
        setStatus(items.status)
        setName(items.name)
        reset(items)
        setModoEdicion(true)
    }


    useEffect(() => {
      // console.log('llamado a getCategArea')
      // console.log(areas)
      dispatch(getCategArea());
    },[refreshKey])

    useEffect(() => {
        dispatch(getCategory());
        dispatch(getStatus());
      }, []);

    const onSubmit = (data, e) => {
      

        if (!categorias || categorias.length === 0){
            setErrorCategory(true)
            return
        }
        if(!name.length){
            setError(true)
            return
        }
        if(!status || status.length === 0){
          setErrorStatus(true)
          return
        }

        // console.log('onSubmit') !name.trim()
        
        // console.log(data.id,name,categorias,status)

        // let aareas = areas.map( a => {
        //   if (a.id === data.id){
        //       let v = {id:data.id,category_id: categorias,name: name,status:status}
        //       return {...a, v};
        //     } else {
        //       return a;
        //     }
        // });

        // console.log(aareas)
        // setAreas(aareas)
        // setAreas([
        //     ...areas,
        //     {id: data.id,
        //     name: name,
        //     category_id: categorias,
        //     status: status}
        // ])
        setValue('id', data.id);
        setValue('name', name);
        setValue('category_id', categorias);
        setValue('status', status);
        
        
        if (modoEdicion){
            dispatch(updateArea(data.id,categorias,name,status));
            setModoEdicion(false)
            
        }else{
            dispatch(addArea(categorias,name,status));
        }
        dispatch(getCategArea());
        setCategorias(-1)
        setName(-1)
        setStatus(-1)
        setRefreshKey(oldKey => oldKey + 1)
        setError(false)
        setErrorStatus(false)

        // limpiar campos
        e.target.reset();
    }
    return (
        <Fragment>
            <div className="container mt-5">
            <h1 className="text-center">Areas</h1>
            <hr/>
            <div className="row">
                <div className="col-7">
                <h4 className="text-center">Lista de Areas</h4>
                <ul className="list-group">
                  <li className="lead left-0">Category - Area</li>
                    {
                      area.length === 0 ? (
                          <li className="list-group-item">Sin Areas</li>
                      ) : (
                        area.map(items => items.status === 1 ? 
                              (<li className="list-group-item" key={items.id}>
                                <span className="lead" >{items.name_categories} - {items.name}</span>
                                  
                              <Button variant="contained" color="secondary"
                              className="btn btn-sm btn-danger float-right mx-2"
                              onClick={() => eliminarArea(items.id,items.name,items.category_id)
                              }
                              startIcon={<DeleteIcon/>}
                              >
                              Delete
                              </Button>
                              <Button variant="outlined" color="primary"
                              className="btn btn-sm btn-danger float-right mx-2"
                              onClick={
                                  () => editar(items) 
                              }
                              >Edit
                              </Button>
                              </li>
                              ):(
                              <li className="list-group-item" style={{backgroundColor:'#EEE8AA'}} key={items.id}>
                              <span className="lead" >{items.name_categories} - {items.name}</span>
                                
                              <Button variant="contained" color="secondary"
                              className="btn btn-sm btn-danger float-right mx-2"
                              onClick={() => eliminarArea(items.id,items.name,items.category_id)
                              }
                              startIcon={<DeleteIcon/>}
                              >
                              Delete
                              </Button>
                              <Button variant="outlined" color="primary"
                              className="btn btn-sm btn-danger float-right mx-2"
                              onClick={
                                  () => editar(items) 
                              }
                              >Edit
                              </Button>
                              </li>)    
                        ))
                    }
                </ul>
            </div>
            <div className="col-5">
                    <h4 className="text-center">
                        {
                        modoEdicion ? 'Editar Area' : 'Agregar Area'
                        }
                    </h4>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                        <input 
                            type="hidden" 
                            className="form-control mb-2"
                            name="id" id="id"
                            ref={register()}
                        />
                        <div className="row">
                            <div className="col-6">
                                <FormControl className={classes.formControl}>
                                  <InputLabel id="select-label-category">Category</InputLabel>
                                    <Select
                                      labelId="select_category_label"
                                      id="select_category"
                                      value={categorias === -1 ? '' : categorias}
                                      onChange={handleChangeCategory}
                                      error={categorias === '' && errorCategory ===true}
                                      // helperText={categorias === 0 ? 'Empty field!' : ' '}
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
                                <TextField 
                                  id="name"  
                                  name="name" multiline={true}
                                  rows={2}
                                  fullWidth={true}
                                  style = {{width: 300}}
                                  label="Area Name" 
                                  variant="outlined" 
                                  value={name === -1 ? '' :name}
                                  onChange={handleChangeName}
                                  error={name === "" && error ===true}
                                  helperText={name === "" ? 'Empty field!' : ' '}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <FormControl className={classes.formControl}>
                                  <InputLabel id="select-label-status">Status</InputLabel>
                                    <Select
                                      labelId="select_status_label"
                                      id="select_status"   
                                      value={status === -1 ? '' : status}
                                      onChange={handleChangeStatus}
                                      error={status === 0 && errorStatus ===true}
                                      // helperText={status === 0 ? 'Empty field!' : ' '}
                                    >
                                    {
                                      showstatus.map((st, index) => (
                                        <MenuItem  key={index} value={st.id}>
                                          {st.name}
                                        </MenuItem>
                                      ))
                                    }
                                    </Select>
                                </FormControl>
                                <div>
                                  <span className="text-danger text-small d-block mb-2">
                                      {errors?.select_status?.message}
                                  </span>
                                </div>
                                
                            </div>
                        </div>
                        
                        </div>  
                        {
                        modoEdicion ? (
                            <button className="btn btn-warning btn-block" type="submit">Editar</button>
                        ) : (
                            <button className="btn btn-dark btn-block" type="submit">Agregar</button>
                        )
                        }
                    </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Area
