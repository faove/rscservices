import React, {useState, useEffect } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete';
import Swal from 'sweetalert2';
import { deleteService } from '../redux/serviceDuck';
import { useDispatch, useSelector} from 'react-redux';
import { Container,Row,Col } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import Products from './Products';

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

  const [modalShow, setModalShow] = useState(false);
  
  const [errorDescripProduct, setErrorDescripProduct] = useState(false)

  const [descripProduct, setDescripProduct] = useState('');
  
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

  const HandleButtonDelete = (id,name,client_id) =>{

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

  // useEffect(() =>{
  //   dispatch(getTypeProducts());

  //   console.log('---AddModalProducts useeffect ---')
  //   console.log(typeproduct)
  //   // console.log(props)
  // },[]);

  // const HandleChangeTypeProduct = (event) => {
  //   console.log('HandleChangeTypeProduct:')
  //   console.log(event.target.value)
  //   setErrorTypeProduct(true)
  //   setTipoProduct(Number(event.target.value))

  //   //dispatch(getTypeProducts());

  // }

  

  
  // const AddModalProduct2 = (props) => {
  //   // console.log('----props-typeproduct---');
  //   // console.log(props.typeproduct);
  //   // const typeproduct = props.typeproduct;
  //   setValue('service_id',props.service_id)
    
  //   //Function add product
  //   const handleAddProduct = event => {

  //     console.log('---------------handleAddProduct----------');
  //     //service_id
  //     console.log(props);
  //     let lexico = "" + props.category_id + "-" + props.areas_id + "-" + tipoproduct + "";
  //     //product_id
  //     // console.log(name_products);
  //     console.log(lexico);
  //     // console.log(tipoproduct)
  //     // dispatch(addProduct(props.id, tipoproduct,lexico,name_products ));  
  //     setDescripProduct(-1)
  //   };
  //   const handleChangeDescriproduct = event => {
  //     console.log('----handleChangeDescriproduct----');
  //     setErrorDescripProduct(false)
  //     setDescripProduct(event.target.value)
  //   }

    
  //     return (
      
  //       <Modal {...props} aria-labelledby="contained-modal-title-vcenter" size="lg">
  //         <Modal.Header closeButton>
  //           <Modal.Title id="contained-modal-title-vcenter">
  //             Add Product
  //             {/* {console.log('---AddModalProducts---')}
  //                     {console.log(props)} */}
  //                     {console.log('---AddModalProducts---')}
  //                     {console.log(props)}
  //           </Modal.Title>
  //         </Modal.Header>
  //         <Modal.Body className="show-grid">
  //           <Container>
  //             <Row>
  //               <Col xs={18} md={12}>
                
  //               <FormControl className={classes.formControl}>
  //                 <InputLabel id="select-label-type-products">Responsible type products</InputLabel>
  //                   <Select
  //                     labelId="select_type_products_label"
  //                     id="select_typeproduct"
  //                     value={tipoproduct === -1 ? '' : tipoproduct}
  //                     onChange={HandleChangeTypeProduct}
  //                     error={tipoproduct === '' && errorTypeProduct ===true}
  //                   >
  //                   {
  //                     props.typeproduct.map((tprod, index) => (
  //                       <MenuItem key={index} value={tprod.id}>
  //                         {tprod.name}
  //                       </MenuItem>
  //                     ))
  //                   }
  //                   </Select>
  //               </FormControl>
  //               </Col>
  //             </Row>
  //             <Row>
  //               <Col xs={18} md={12}>
  //               <TextField
  //                 id="name_products"
  //                 label="Description Product"
  //                 value={descripProduct === -1 ? '' : descripProduct}
  //                 onChange={handleChangeDescriproduct}
  //                 multiline
  //                 fullWidth
  //                 rows={3}
  //                 defaultValue="Default Value"
  //                 variant="outlined"
  //               />
  //               </Col>

  //             </Row>
    
  //             <Row>
  //               <Col xs={6} md={4}>
  //               <MuiPickersUtilsProvider utils={DateFnsUtils}>
                //   <KeyboardDatePicker
                //     disableToolbar
                //     variant="inline"
                //     format="dd/MM/yyyy"
                //     margin="normal"
                //     id="date_start"
                //     label="Date Start"
                //     // value={selectedDate}
                //     // onChange={handleDateChange}
                //     // error={selectedDate === '' ??  false}
                //     KeyboardButtonProps={{
                //       'aria-label': 'change date',
                //     }}
                //   />
                // </MuiPickersUtilsProvider>
  //               </Col>
  //               <Col xs={6} md={4}>
  //               <MuiPickersUtilsProvider utils={DateFnsUtils}>
  //                 <KeyboardDatePicker
  //                   disableToolbar
  //                   variant="inline"
  //                   format="dd/MM/yyyy"
  //                   margin="normal"
  //                   id="date_end"
  //                   label="Date End"
  //                   // value={selectedDate}
  //                   // onChange={handleDateChange}
  //                   // error={selectedDate === '' ??  false}
  //                   KeyboardButtonProps={{
  //                     'aria-label': 'change date',
  //                   }}
  //                 />
  //               </MuiPickersUtilsProvider>
  //               </Col>
  //               <Col xs={6} md={4}>
  //               <input type="text" 
  //                 name="services_id" id="services_id" htmlFor="services_id"
  //                 className="form-control" ref ={register} 
  //               />
  //               </Col>
  //             </Row>
  //           </Container>
  //         </Modal.Body>
  //         <Modal.Footer>
  //         <Button onClick={handleAddProduct}>Add</Button>
  //           <Button onClick={props.onHide}>Close</Button>
  //         </Modal.Footer>
  //       </Modal>
      
  //     );
    
  // }
    
    return (
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
          </tr>
          </thead>
          <tbody>
          {
               props.serviceassoc.length > 0 ?
               props.serviceassoc.map( (servi,idx)  => (
                      <tr key={servi.id}>
                      <td>{servi.name_associates}</td>
                      <td>{servi.name_categories}</td>
                      <td>{servi.name_areas}</td>
                      <td>{servi.date_service}</td>
                      <td>{servi.gross_amount}</td>
                      <td>
                          <Products 
                          servi_id={servi.id}
                          associate_name={servi.name_associates}
                          category_id={servi.category_id}
                          categoria_name={servi.name_categories}
                          areas_id={servi.areas_id}
                          areas_name={servi.name_areas}
                          client_id={servi.client_id}
                          props_var = {props}
                          />
                      </td>
                      <td >
                          <Button variant="outlined" color="primary" 
                              onClick={
                                  () => {props.editRow(servi)}
                              }
                          >
                            Edit
                          </Button>
                          <Button variant="contained" color="secondary"
                              onClick={() => 
                                eliminarService(servi.id,servi.name_areas,servi.client_id)
                              //   // HandleButtonDelete(servi.id,servi.name,servi.last_name)
                              }
                              startIcon={<DeleteIcon/>}
                          >
                          Delete
                          </Button>
                        </td>
                      
                  </tr>
                  )) : (
              
                      <tr>
                      <td colSpan={3}>No service</td>
                      </tr>
                  )
          }
          </tbody>
      </table>
   );
}
export default ServicesTable;
