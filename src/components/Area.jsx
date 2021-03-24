import React,{useState, Fragment, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { getAreas, addArea, deleteArea, updateArea } from '../redux/areaDuck';
import { getCategory } from '../redux/categoryDuck';
import { getStatus } from '../redux/typestatusDuck'
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Swal from 'sweetalert2';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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
    const [areas, setAreas] = useState([])
    const [modoEdicion, setModoEdicion] = useState(false)
    const [refreshKey, setRefreshKey] = useState(0);
    const area = useSelector(store => store.area.array)
    const showstatus = useSelector(store => store.showstatus.array)
    const category = useSelector(store => store.category.array)
    const {setValue, register, reset, errors, handleSubmit} = useForm({defaultValues: area});
    const dispatch = useDispatch()
    const [categorias, setCategorias] = useState('');
    const [status, setStatus] = useState(0);

    
    //Controla la seleccionde la Category
    const handleChangeCategory = (event) => {

        setCategorias(Number(event.target.value))
        console.log('handleChangeCategory:')
        console.log(categorias)
        console.log(Number(event.target.value))
  
    };

    const handleChangeStatus = (event) => {
        console.log('Status');
        console.log(status);
        setStatus(event.target.value)
        console.log('handleChangeStatus');
        console.log(status);
        console.log(event.target.value);
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
        console.log('Items----')
        console.log(items)
        setCategorias(items.category_id)
        
        setStatus(items.status)
        console.log(items.status)
        reset(items)
        setModoEdicion(true)
    }

    // useEffect(() => {
    //   setStatus(status)
    //   console.log('-------status----')
    //   console.log(status)
    // },[status])

    useEffect(() => {
      dispatch(getAreas());
    },[refreshKey])

    useEffect(() => {
        dispatch(getCategory());
        dispatch(getStatus());
      }, []);

    const onSubmit = (data, e) => {

        if(!data.name.trim()){
            console.log('Campo vacio')
            return
        }
        setAreas([
            ...areas,
            {name: data.name,
            category_id: categorias,
            status: status}
        ])
        
        setValue('name', data.name);
        setValue('category_id', categorias);
        setValue('status', status);
        setRefreshKey(oldKey => oldKey +1)
        
        if (modoEdicion){
            dispatch(updateArea(data.id,categorias,data.name,status));
            setModoEdicion(false)
            
        }else{
            dispatch(addArea(categorias,data.name,status));
        }
        
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
                    {
                        area.length === 0 ? (
                            <li className="list-group-item">Sin Areas</li>
                        ) : (
                            area.map(items => (  
                                <li className="list-group-item" key={items.id}>
                                <span className="lead">{items.id} {items.name} {items.category_id} {items.status}</span>
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
                            ))
                        )
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
                                    //   value={category}    
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
                                <input 
                                    type="text" 
                                    className="form-control mb-2"
                                    placeholder="Name Area"
                                    name="name" id="name"
                                    ref={register({
                                        required: {
                                            value: true, 
                                            message: 'Name es requerido'
                                            }
                                    })}
                                    // onChange={e => setArea(e.target.value)}
                                    // value={area.name}
                                />
                                <div>
                                <span className="text-danger text-small d-block mb-2">
                                    {errors?.name?.message}
                                </span>
                                </div>
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
