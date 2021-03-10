import React, {useState,Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 400,
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
  },
}));


const ServicesTable = (props) => {
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
    const valores = [];
    
    // console.log(valores.length > 0)
    // console.log(props.inputValue)
    // console.log('props.services')
    // console.log(props.services)

    for (let i = 0; i < props.services.length; i++) {
      var name_service = props.services[i].name_service;
      var id = props.services[i].id;
      var phone_service = props.services[i].phone_service;
      // console.log(name_service);
      valores.push({id: id, name_service:name_service, phone_service:phone_service});
    }
    console.log('props')
    console.log(valores)
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
              <th># Id</th>
              <th>Service name</th>
              <th>Phone</th>
              <th>Date service</th>
              <th>Date aplication</th>
              <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {
               valores.length > 0 ?
                valores.map(servi  => (
                      <tr key={servi.id}>
                      <td>{servi.id}</td>
                      <td>{servi.name_service}</td>
                      <td>{servi.phone_service}</td>
                      <td>{servi.date_service}</td>
                      <td>{servi.date_aplication}</td>
                      <td>
                          <Button variant="outlined" color="primary"
                              onClick={
                                  () => {props.editRow(servi)}
                              }
                          >
                            Edit
                          </Button>
                          <Button variant="contained" color="secondary"
                              // onClick={() => 
                              //   // HandleButtonDelete(servi.id,servi.name,servi.last_name)
                              // }
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
