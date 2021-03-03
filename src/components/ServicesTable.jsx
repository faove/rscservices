import React, {useState,Fragment} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import { DataGrid } from '@material-ui/data-grid';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 400,
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
  },
}));

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'First name', width: 130 },
    { field: 'last_name', headerName: 'Last name', width: 130 },
    {
      field: 'dni',
      headerName: 'DNI',
      type: 'number',
      width: 90,
    },
    {
      field: 'name',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.getValue('name') || ''} ${params.getValue('last_name') || ''}`,
    },
  ];

  const rows = [
    { id: 1, last_name: 'Snow', name: 'Jon', age: 35 },
    { id: 2, last_name: 'Lannister', name: 'Cersei', age: 42 },
    { id: 3, last_name: 'Lannister', name: 'Jaime', age: 45 },
    { id: 4, last_name: 'Stark', name: 'Arya', age: 16 },
    { id: 5, last_name: 'Targaryen', name: 'Daenerys', age: null },
    { id: 6, last_name: 'Melisandre', name: null, age: 150 },
    { id: 7, last_name: 'Clifford', name: 'Ferrara', age: 44 },
    { id: 8, last_name: 'Frances', name: 'Rossini', age: 36 },
    { id: 9, last_name: 'Roxie', name: 'Harvey', age: 65 },
  ];

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
    console.log('props')
    console.log(props.svalue > 0 ? Array.from(props.svalue.svalue): props);

    const valores = props.svalue > 0 ? Array.from(props.svalue.svalue): props;

    // Array.from(props.svalue).forEach(child => {
    //   console.log(child)
    // });
    // console.log(props.svalue)
    // console.log(JSON.parse(props.client))
    return (
        <Fragment>
          <div style={{ height: 400, width: '100%' }}>

                {

                  // props.client.forEach(function(element){
                  //   console.log(element);

                    
                  // })
                  // <DataGrid  rows={element} columns={columns} pageSize={5} checkboxSelection />

                  valores > 0 ?
                      <DataGrid  rows={valores} columns={columns} pageSize={5} checkboxSelection />
                       : (
                      <div colSpan={3}>No service asociado</div>
                  )

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
                } 
          </div>
        </Fragment>
    )
}
export default ServicesTable;
