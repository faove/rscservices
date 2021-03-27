import React,{useState, Fragment, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { getAssociate, addAssociate, deleteAssociate, updateAssociate } from '../redux/associateDuck';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Swal from 'sweetalert2';

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

const Associate = () => {
    const classes = useStyles();
    //-------------------------------------------
    const [asociados, setAsociados] = useState([])
    const [modoEdicion, setModoEdicion] = useState(false)
    const [refreshKey, setRefreshKey] = useState(0)
    const [gender, setGender] = useState(0)
    const asociado = useSelector(store => store.associate.array)
    const {setValue, register, reset, errors, handleSubmit} = useForm({defaultValues: asociado});
    const dispatch = useDispatch()
    
    const genero = [{id: 1, name:'Masculino'},{id: 2, name:'Femenino'}];
    
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
                dispatch(deleteAssociate(id,name,lastname));
              swalWithBootstrapButtons.fire(
                'Deleted!',
                `Your Associate ${name} ${lastname} has been deleted.`,
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
    
    const handleChangeGender = (event) => {
        console.log('handleChangeGender')
        console.log(event.target.value)
        console.log('Gender');
        console.log(gender);
        setGender(event.target.value)
    }

    const eliminarAsociado = (id,name,last_name) => {
        HandleButtonDelete(id,name,last_name)
    }

    const editar = items => {
        console.log('----editar---')
        console.log(gender)
        setGender(items.gender)
        reset(items)
        setModoEdicion(true)
    }

    useEffect(() => {
        console.log('-------useEffect llama a getAss');
        dispatch(getAssociate());
        
        console.log(genero)
    },[refreshKey])

    const onSubmit = (data, e) => {

        if(!data.name.trim()){
            console.log('Campo vacio')
            return
        }
        setAsociados([
            ...asociados,
            {name: data.name,
            last_name: data.last_name,
            dni: data.dni,
            address: data.address,
            gender: gender,
            email: data.email}
        ])

        setValue('name', data.name);
        setValue('last_name', data.last_name);
        setValue('dni', data.dni);
        setValue('address', data.address);
        setValue('email', data.email);
        setValue('gender', gender);
        setRefreshKey(oldKey => oldKey +1)
        
        if (modoEdicion){
            dispatch(updateAssociate(data.id,data.name,data.last_name,data.dni,data.address,data.email,gender));
            setModoEdicion(false)

        }else{
            dispatch(addAssociate(data.name,data.last_name,data.dni,data.address,data.email,gender));
        }
        dispatch(getAssociate());
        setGender(-1)
        
        // limpiar campos
        e.target.reset();
    }
    return (
        <Fragment>
            <div className="container mt-5">
            <h1 className="text-center">Associates</h1>
            <hr/>
            <div className="row">
                <div className="col-7">
                <h4 className="text-center">Lista de Asociados</h4>
                <ul className="list-group">
                    {
                        asociado.length === 0 ? (
                            <li className="list-group-item">Sin Asociados</li>
                        ) : (
                            asociado.map(items => (
                                <li className="list-group-item" key={items.id}>
                                <span className="lead">{items.name} {items.last_name} {items.email}</span>
                                <Button variant="contained" color="secondary"
                                className="btn btn-sm btn-danger float-right mx-2"
                                onClick={() => eliminarAsociado(items.id,items.name,items.last_name)
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
                        modoEdicion ? 'Editar Asociado' : 'Agregar Asociado'
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
                                <input 
                                    type="text" 
                                    className="form-control mb-2"
                                    placeholder="Name Associate"
                                    name="name" id="name"
                                    ref={register({
                                        required: {
                                            value: true, 
                                            message: 'Name es requerido'
                                            }
                                    })}
                                    // onChange={e => setAsociado(e.target.value)}
                                    // value={asociado.name}
                                />
                                <div>
                                <span className="text-danger text-small d-block mb-2">
                                    {errors?.name?.message}
                                </span>
                                </div>
                            </div>
                            <div className="col-6">
                                <input 
                                    type="text" 
                                    className="form-control mb-2"
                                    placeholder="Last Name Associate"
                                    name="last_name" id="last_name"
                                    ref={register({
                                        required: {
                                            value: true, 
                                            message: 'Last name es requerido'
                                            }
                                    })}
                                    // onChange={e => setAsociado(e.target.value)}
                                    // value={asociado.last_name}
                                />
                                <span className="text-danger text-small d-block mb-2">
                                    {errors?.last_name?.message}
                                </span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <input 
                                    type="text" 
                                    className="form-control mb-2"
                                    placeholder="Address"
                                    name="address" id="address"
                                    ref={register({
                                        required: {
                                            value: true, 
                                            message: 'Address es requerido'
                                            }
                                    })}
                                />
                                <div>
                                    <span className="text-danger text-small d-block mb-2">
                                        {errors?.address?.message}
                                    </span>
                                </div>
                                
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <FormControl className={classes.formControl}>
                                  <InputLabel id="select-label-category">Gender</InputLabel>
                                    <Select
                                      labelId="select_gender_label"
                                      id="select_gender"
                                    //   value={category}    
                                      value={gender === -1 ? '' : gender}
                                      onChange={handleChangeGender}
                                    >
                                    {
                                      genero.map((g, index) => (
                                        <MenuItem  key={index} value={g.id}>
                                          {g.name}
                                        </MenuItem>
                                      ))
                                    }
                                    </Select>
                                </FormControl>
                                {/* <select className="form-select form-select-sm" 
                                aria-label=".form-select-sm example"
                                ref={register}
                                name="gender" id="gender"
                                >
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option>
                                </select> */}
                                <span className="text-danger text-small d-block mb-2">
                                    {errors?.gender?.message}
                                </span>
                            </div>
                            <div className="col-12">
                                <input 
                                    type="text" 
                                    className="form-control mb-2"
                                    placeholder="Email"
                                    name="email" id="email"
                                    ref={register({
                                        required: "Required",
                                        pattern: {
                                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                          message: "Invalid email address"
                                        }
                                    })}
                                />
                                <div>
                                    <span className="text-danger text-small d-block mb-2">
                                        {errors?.email?.message}
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

export default Associate
