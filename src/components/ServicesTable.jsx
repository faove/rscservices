import Swal from 'sweetalert2';
import Products from './Products';
import {Link} from "react-router-dom";
import { useForm } from 'react-hook-form';
import Edit from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete';
import { Container,Row,Col } from 'react-bootstrap';
import { deleteService } from '../redux/serviceDuck';
import { useDispatch, useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
// import { makeStyles } from '@material-ui/core/styles';
import React, {useState, useEffect, Fragment } from 'react';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
const useStyles = makeStyles((theme) => ({
  // paper: {
  //   position: 'absolute',
  //   width: 400,
  //   backgroundColor: theme.palette.background.paper,
  //   border: '2px solid #000',
  //   boxShadow: theme.shadows[5],
  //   // padding: theme.spacing(2,4,3),
  //   padding: "16px 32px 24px",
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%,-50%)',
  // },
  // textfield:{
  //   width: '100%'
  // },
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



const ServicesTable = (props) => {
  // const classes = useStyles();
  const dispatch = useDispatch()

  // const typeproduct = useSelector(store => store.area.array)

  const [showProduct, setShowProduct] = useState(false);
  
  const [errorDescripProduct, setErrorDescripProduct] = useState(false)

  const [currentProduct, setCurrentProduct] = useState({});
  // {servi_id: '', name_associates: ''}
  const { register, setValue, reset, handleSubmit, errors, control } = useForm();
  

  // const service = useSelector(store => store.service.array)
  // const [idServiceAssocDel, setIdServiceAssocDel] = useState([])
  

  // useEffect(() => {

  //   console.log('setIdServiceAssocDel.......................')
  //   console.log(idServiceAssocDel)
  //   console.log(idServiceAssocDel.id)
  //   console.log(idServiceAssocDel.key)
  //   dispatch(getServiceAssoc(idServiceAssocDel.id))
  // },[idServiceAssocDel.key])

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  const HandleButtonDelete = (id,name,client_id) => {

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
            dispatch(deleteService(id))
            dispatch(props.getServiceAssoc(client_id))
            props.setIdServiceAssoc({id:client_id,key:Math.random()})
            
            // setIdServiceAssocDel(client_id)
            // setIdServiceAssocDel({id: client_id, key: Math.random()})

          swalWithBootstrapButtons.fire(
            'Deleted!',
            `Your Service ${name} has been deleted.`,
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

  const eliminarService = (id,name,client_id) => {
    console.log('delete+++')
    console.log(client_id)
    console.log(name)
    console.log(id)
    HandleButtonDelete(id,name,client_id)
  }

  const productService = (id, name_assoc, category_id, areas_id, name_categories, name_areas, client_id) => {
    console.log('productService')
    console.log(id)
    console.log(name_assoc)

    const actualProduct = [{
      servi_id: id, 
      name_associates: name_assoc,
      category_id: category_id,
      areas_id: areas_id,
      name_categories: name_categories,
      name_areas:name_areas
    }];

    console.log(actualProduct);
    // setCurrentProduct(
    //   { 
    //     'servi_id': servi_id, name_associates: name_associates, category_id: category_id,
    //     areas_id: areas_id, name_categories: name_categories,name_areas: name_areas,
    //     client_id: client_id, name_categories: name_categories,name_areas: name_areas,
    //   }
    // )
    setCurrentProduct(actualProduct);
    setShowProduct(true);
    // console.log(showProduct)
    // console.log('currentProduct')
    // console.log(currentProduct)
    // return false;
    
  }
  useEffect(()=>{

    console.log(' useEffect currentProduct')
    console.log(currentProduct)

  },[setCurrentProduct]);
  // useEffect(() =>{
  //   dispatch(getTypeProducts());

  //   console.log('---AddModalProducts useeffect ---')
  //   console.log(typeproduct)
  //   // console.log(props)
  // },[]);
  const onSubmit = (data, e) => {
    e.preventDefault()
    console.log('----data')
    
    //setValue('name_associates', data.name_associates);

    console.log(data)
    console.log('e')
    console.log(e)

    const actualProduct = [{
      servi_id: data.id, 
      name_associates: data.name_associates,
      category_id: data.category_id,
      areas_id: data.areas_id,
      name_categories: data.name_categories,
      name_areas: data.name_areas
    }];

    console.log(actualProduct);

    setCurrentProduct(actualProduct);
    setShowProduct(true);
    // setValue('last_name', data.last_name);
    // limpiar campos
  //   e.target.reset();
  }
    
    return (
      <div  className="flex-large">  
        <h4 className="text-center">
        {
          showProduct ? 'Product' : 'Service'
        }
        </h4>
        {
          showProduct ? (
            <Fragment>
              <Products
                currentProduct={currentProduct}
                props={props}
              />
            </Fragment>
          ) : (
            <table>
              <thead>
              <tr>
                  <th>Associate</th>
                  <th>Category</th>
                  <th>Area</th>
                  <th>Date service</th>
                  <th>Gross Amount</th>
                  <th>Add Product</th>
                  <th>Actions</th>
                  <th></th>
              </tr>
              </thead>
              <tbody>
              {
                  
                  props.serviceassoc.length > 0 ?
                  props.serviceassoc.map( (servi, idx)  => (
                      <tr key={idx}>
                      <td>{servi.name_associates}</td>
                      <td>{servi.name_categories}</td>
                      <td>{servi.name_areas}</td>
                      <td>{servi.date_service}</td>
                      <td>{servi.gross_amount}</td>
                      <td>
                      {/* <form onSubmit={handleSubmit(onSubmit)}>
                        <input type='hidden' className="form-control" ref ={register} name='id' value={servi.id}></input>
                        <input type='hidden' className="form-control" ref ={register} name='name_associates' value={servi.name_associates}></input>
                        <input type='hidden' className="form-control" ref ={register} name='name_categories' value={servi.name_categories}></input>
                        <input type='hidden' className="form-control" ref ={register} name='category_id' value={servi.category_id}></input>
                        <input type='hidden' className="form-control" ref ={register} name='date_service' value={servi.date_service}></input>
                        <input type='hidden' className="form-control" ref ={register} name='areas_id' value={servi.areas_id}></input>
                        <input type='hidden' className="form-control" ref ={register} name='name_areas' value={servi.name_areas}></input>
                        <input type='hidden' className="form-control" ref ={register} name='client_id' value={servi.client_id}></input>
                        <input type='hidden' className="form-control" ref ={register} name='gross_amount' value={servi.gross_amount}></input> */}
                        <Link to={`/products/${servi.id}/${servi.category_id}/${servi.areas_id}/${servi.client_id}/${props}`}>
                          <Button  variant="contained" color="primary"
                          // onClick={() => 
                          //     productService(servi.id, servi.name_associates, servi.category_id, servi.areas_id, servi.name_categories, servi.name_areas, servi.client_id)
                          // }
                              startIcon={<ConstructionOutlinedIcon/>}
                        >
                        Tareas
                        </Button></Link>
                      {/* </form> */}
                          {/* <Products 
                            servi_id={servi.id}
                            associate_name={servi.name_associates}
                            category_id={servi.category_id}
                            categoria_name={servi.name_categories}
                            areas_id={servi.areas_id}
                            areas_name={servi.name_areas}
                            client_id={servi.client_id}
                            props_var = {props}
                          /> */}
                      </td>
                      <td >
                        <Button variant="contained"  
                            onClick={
                                () => {props.editRow(servi)}
                            }
                            startIcon={<Edit/>}
                        >
                        Editar
                        </Button>
                      </td>
                      <td>
                        <Button variant="contained" color="secondary"
                            onClick={() => 
                              eliminarService(servi.id,servi.name_areas,servi.client_id)
                              // HandleButtonDelete(servi.id,servi.name,servi.last_name)
                            }
                            startIcon={<DeleteIcon/>}
                        >
                        Borrar
                        </Button>
                      </td>
                    </tr>
                    )) : (
                
                        <tr>
                        <td colSpan={3}>No ha asignado ningun servicio</td>
                        </tr>
                    )
              }
              </tbody>
          </table>
          )
      }
      </div>
   );
}
export default ServicesTable;
