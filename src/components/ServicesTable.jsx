import React, {useState, useEffect} from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete';
import Swal from 'sweetalert2';
import { deleteService } from '../redux/serviceDuck';
import { getServiceAssoc } from '../redux/serviceAssocDuck';
import { useDispatch, useSelector} from 'react-redux';


// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     height: 400,
//     maxWidth: 300,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));


const ServicesTable = (props) => {

  const dispatch = useDispatch()
  // const service = useSelector(store => store.service.array)
  const [idServiceAssocDel, setIdServiceAssocDel] = useState([])
  

  useEffect(() => {

    console.log('setIdServiceAssocDel.......................')
    console.log(idServiceAssocDel)
    console.log(idServiceAssocDel.id)
    console.log(idServiceAssocDel.key)
    dispatch(getServiceAssoc(idServiceAssocDel.id))
  },[idServiceAssocDel.key])

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
            
            dispatch(getServiceAssoc(client_id))
            
            // setIdServiceAssocDel(client_id)
            setIdServiceAssocDel({id: client_id, key: Math.random()})

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
    //const { index, style } = props;
    // <div className="container">
            //     <div className="row">
            //         <div className="col-9">.col-9</div>
            //         <div className="col-4">.col-4<br>Since 9 + 4 = 13 &gt; 12, this 4-column-wide div gets wrapped onto a new line as one contiguous unit.</div>
            //         <div className="col-6">.col-6<br>Subsequent columns continue along the new line.</div>
            //     </div>
            // </div>
            // <ListItem button style={style} key={index}>
            //         <ListItemText primary={`Item ${index + 1}`} />
            //     </ListItem>
    
    // console.log(props.serviceTotal > 0 ? Array.from(props.serviceTotal.serviceTotal): props);
    // console.log(props.services.length)
    // const valores = props.serviceTotal.length > 0 ? (props.serviceTotal):(props);
    // const valores = [];
    
    // console.log(valores.length > 0)
    // console.log(props.inputValue)
    // console.log('props.services')
    console.log('props.serviceassoc',props.serviceassoc)

    // props.services.map((service,index) => (
    //   // console.log(service.id)
    //   valores=service
    //   // valores.push({id: service.id, name_service:service.name_service, date_service:service.date_service});
    // ))

    // for (let i = 0; i < props.services.length; i++) {
    //     var name_service = props.services[i].name_service;
    //     var id = props.services[i].id;
    //     var date_service = props.services[i].date_service;
    //     // console.log(name_service);
    //     valores.push({id: id, name_service:name_service, date_service:date_service});
    // }
    // console.log('props')
    // props.services.map( (servi,idx)  => (
    //   <div key = {idx}>{servi}</div>
    // ))
    
    // Array.from(props.svalue).forEach(child => {
    //   console.log(child)
    // });
    // console.log(props.svalue)
    // console.log(JSON.parse(props.client))
    // props.client.forEach(function(element){
                  //   console.log(element);

                    
                  // })
                  
                  // rows > 0 ? (
                  //     <div style={{ height: 400, width: '100%' }}>
                  //       <DataGrid  rows={rows} columns={columns} pageSize={5} checkboxSelection />
                  //     </div>
                  //     ) : (
                  //     <div colSpan={3}>No service asociado</div>
                  //     ) 

                  // props.svalue > 0 ?
                  //     props.svalue.map(search  => (
                          
                  //       <div key={search.svalue.id}>{search.svalue.name}</div>
                          
                  //     )) : (
                  //     <div colSpan={3}>No service asociado</div>
                  // )
              
                
                 
                    // if(typeof(props.client)) === "string"){data = JSON.parse(props.client))}

                    // props.svalue.length > 0 ?
                    //     props.svalue.map(search  => (
                            
                    //         <DataGrid key={search.id} rows={search} columns={columns} pageSize={5} checkboxSelection />
                    //         // Array.from(parent.children).forEach(child => {
                    //         //     console.log(child)
                    //         // });
                    // )) : (
                    //     <div colSpan={3}>No service asociado</div>
                    // )
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
