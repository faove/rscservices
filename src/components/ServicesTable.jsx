import React, {useState, useEffect } from 'react';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete';
import Swal from 'sweetalert2';
import { deleteService } from '../redux/serviceDuck';
// import { getServiceAssoc } from '../redux/serviceAssocDuck';
import { useDispatch, useSelector} from 'react-redux';
import { Modal,Container,Row,Col } from 'react-bootstrap';
import { MuiPickersUtilsProvider, KeyboardDatePicker,} from '@material-ui/pickers';
import { unstable_createMuiStrictModeTheme as createMuiTheme, TextField } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { useForm } from 'react-hook-form';



const ServicesTable = (props) => {

  const dispatch = useDispatch()

  const [modalShow, setModalShow] = useState(false);
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

  const AddModalProduct = (props) => {

    setValue('service_id',props.service_id)

    return (

      <Modal {...props} aria-labelledby="contained-modal-title-vcenter" size="lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Product
           { 
           
           console.log(props.service_id)
           }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <Row>
              <Col xs={18} md={12}>
              <TextField
                id="name_products"
                label="Description Product"
                multiline
                fullWidth
                rows={3}
                defaultValue="Default Value"
                variant="outlined"
              />
              </Col>

            </Row>
  
            <Row>
              <Col xs={6} md={4}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date_start"
                  label="Date Start"
                  // value={selectedDate}
                  // onChange={handleDateChange}
                  // error={selectedDate === '' ??  false}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
              </Col>
              <Col xs={6} md={4}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date_end"
                  label="Date End"
                  // value={selectedDate}
                  // onChange={handleDateChange}
                  // error={selectedDate === '' ??  false}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
              </Col>
              <Col xs={6} md={4}>
              <input type="text" 
                name="services_id" id="services_id" htmlFor="services_id"
                className="form-control" ref ={register} 
              />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
    
    return (
      <table>
          <thead>
          <tr>
              <th>Associate</th>
              <th>Category</th>
              <th>Area</th>
              <th>Date service</th>
              <th>Rate</th>
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
                      <td>{servi.rate_fixed}</td>
                      <td>
                      
                          <>
                            <Button variant="primary" onClick={() => setModalShow(true)}>
                              Products
                            </Button>

                            <AddModalProduct show={modalShow} 
                              id={servi.id} 
                              areas_id={servi.areas_id} 
                              associate_id={servi.associate_id} 
                              category_id={servi.category_id} 
                              client_id={servi.client_id} 
                              date_service={servi.date_service} 
                              onHide={() => setModalShow(false)} 
                            
                            />
                          </>
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
