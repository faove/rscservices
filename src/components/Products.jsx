import React, { useState, useEffect, forwardRef } from 'react';
import { format, toDate, formatDistance, formatRelative, subDays } from 'date-fns'
import Modal from '@material-ui/core/Modal';
import { updateProduct, addProduct } from '../redux/productDuck';
import { getTypeProducts } from '../redux/typeproductDuck';
import { useDispatch, useSelector} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { unstable_createMuiStrictModeTheme as createMuiTheme, TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker,} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import { Container,Row,Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
//import { DataGrid, getThemePaletteMode } from '@material-ui/data-grid';
import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';


const defaultTheme = createMuiTheme();

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 1600,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(16, 32, 24),
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 500,
  },
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  papergrid: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));

const Products = (props) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const {  handleSubmit } = useForm({});
    const [editRowsModel, setEditRowsModel] = useState({});
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    //Duck Constants
    const addproduct = useSelector(store => store.product.array);
    const typeproduct = useSelector(store => store.typeproduct.array)
   
    const [tipoproduct, setTipoProduct] = useState('');
    const [selectedDateStart,setSelectedDateStart] = useState(new Date());
    const [selectedDateEnd,setSelectedDateEnd] = useState(new Date());
    
    const [descripProduct, setDescripProduct] = useState('');
    const [nameProduct, setNameProduct] = useState([]);
    const [dataProduct, setDataProduct] = useState([]);
    const [typeProduct, setTypeProduct] = useState([]);
    
    //Constantes de Errores
    const [errorDescripProduct, setErrorDescripProduct] = useState(false)
    const [errorTypeProduct,setErrorTypeProduct] = useState(false);
    const [errorTipoProduct, setErrorTipoProduct] = useState(false);
    const [errorDateStart, setErrorDateStart] = useState(false);
    const [errorDateEnd, setErrorDateEnd] = useState(false);

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
      };

    const columns = [
        { 
            title: 'ID',
            field: 'id', 
            width: 5 
        },
        { 
            title: 'services_id',
            field: 'services_id', 
            width: 5 
        },
        { 
            title: 'type_product_id',
            field: 'type_product_id', 
            width: 5 
        },
        { 
            title: 'Description',
            field: 'description_products', 
            width: 150,
            editable: true,
        },
        { 
            title: 'Date Start', 
            field: 'date_start', 
            type: 'date',
            width: 150,
            editable: true,
        },
        {
          title: 'Date End',
          field: 'date_end ',
          type: 'date',
          width: 110,
          editable: true,
        },
        { 
            title: 'updated_at',
            field: 'updated_at', 
            width: 5 
        },
        { 
            title: 'created_at',
            field: 'created_at', 
            width: 5 
        }
      ];

    const handleOpen = () => {
        console.log('---------------Button Product----------');
        console.log('category_id',props.category_id);
        console.log('areas_id',props.areas_id);
        console.log('name_areas',props.areas_name)
        console.log('name_categoria',props.categoria_name)
        console.log('associate_name',props.associate_name)
        
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
    };
     
    //Function add product
    const onSubmit = (data, e) => {

        console.log('---------------handleAddProduct----------');
        console.log('mounted getTypeProducts')
        console.log(props.areas_id);
        if (!selectedDateStart || selectedDateStart.length === 0){
          setErrorDateStart(true)
          return
        }
        let lexico = "" + props.category_id + "-" + props.areas_id + "-" + tipoproduct + "";
        let status = true;
        let description_product = '';
        //Llamada a añadir todos los products 
        dispatch(addProduct(props.servi_id, props.areas_id, props.category_id, selectedDateStart, tipoproduct, lexico, description_product, format(toDate(selectedDateStart), 'yyyy/MM/dd'), status));  
    
        //Dependiendo del area, trae todos tipos de productos
        // dispatch(getTypeProducts(props.areas_id));
        //console.log(typeproduct);
        // if (!tipoproduct || tipoproduct.length === 0){
        //     setErrorTipoProduct(true)
        //     return
        // }
        
        // if (!selectedDateEnd || selectedDateEnd.length === 0){
        //     setErrorDateEnd(true)
        //     return
        // }

        //setDataProduct dispatch
        //service_id
       

        
        // services_id, product_id, lexido, name_products,date_start,date_end
        // services_id, product_id, lexido, name_products,
        setDescripProduct(-1)
    };

    const handleChangeDescriproduct = event => {
        console.log('----handleChangeDescriproduct----');
        setErrorDescripProduct(false)
        setDescripProduct(event.target.value)
    };

    const HandleChangeTypeProduct = (event) => {
        setErrorTypeProduct(true)
        setTipoProduct(event.target.value)
    }

    //Se Añadio typeProduct, para pasar el array de typeProduct a addProduct
  //   useEffect(()=> {

  //     if (!selectedDateStart || selectedDateStart.length === 0){
  //       setErrorDateStart(true)
  //       return
  //     }

  //     console.log('------useEffect typeproduct----------------')
  //     //Guardo en DataProduct el dispatch del boton submit
  //     //para añadir los productos
  //     setTypeProduct(typeproduct)
  //     console.log(typeProduct)
      
  // },[typeproduct])

    // Asignamos los valores que trae el dispatch addProduct 
    useEffect(()=> {

        if (!selectedDateStart || selectedDateStart.length === 0){
          setErrorDateStart(true)
          return
        }
        console.log('------useEffect addproduct----------------')
        //Guardo en DataProduct el dispatch del boton submit
        //para añadir los productos
        setDataProduct(addproduct)
        console.log(dataProduct)
            
    },[addproduct])

    useEffect(() => {

        console.log('useEffect in Product')
        if  (props.props_var.typeproduct !== 'undefined' && props.props_var.typeproduct != null){
            
            console.log(props.props_var.typeproduct)
            setNameProduct(props.props_var.typeproduct)
        }
        console.log('-----nameProduct')
        console.log(nameProduct)
        // setSearchTypeProduct(typeproduct)
        // console.log('product type 1 useEffect');
        // console.log(searchTypeProduct);
        //setSearchTypeProduct(...typeproduct)
      }, [])

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* <Row>
                    <Col xs={24} md={16}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="select-label-type-products">Responsible type products</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={tipoproduct}
                        onChange={HandleChangeTypeProduct}
                        >
                        {
                            nameProduct.length > 0 ?
                            nameProduct.map((tprod, index) => (
                            <MenuItem key={index} value={tprod.id}>
                                {tprod.name}
                            </MenuItem>
                            )): (

                            <MenuItem value={-1}>No product</MenuItem>
                            
                            )
                        }
                        </Select>
                    </FormControl>
                    </Col>
                </Row> */}
                <Row>
                    <Col xs={12} md={8}>
                    <TextField
                    disabled
                    id="outlined-disabled"
                    label="Associate"
                    defaultValue={props.associate_name}
                    variant="outlined"
                    />
                    <TextField
                    disabled
                    id="outlined-disabled"
                    label="Category"
                    defaultValue={props.categoria_name}
                    variant="outlined"
                    />
                    <TextField
                    disabled
                    id="outlined-disabled"
                    label="Area"
                    defaultValue={props.areas_name}
                    variant="outlined"
                    />
                    </Col>
                    <Col xs={12} md={8}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date_start"
                            label="Date Start"
                            value={selectedDateStart}
                            // onChange={handleDateChange}
                            // error={selectedDate === '' ??  false}
                            KeyboardButtonProps={{
                            'aria-label': 'change date',
                            }}
                        />
                        </MuiPickersUtilsProvider>
                    {/* </Col>
                    <Col xs={12} md={8}> */}
                        {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date_end"
                            label="Date End"
                            value={selectedDateEnd}
                            // onChange={handleDateChange}
                            // error={selectedDate === '' ??  false}
                            KeyboardButtonProps={{
                            'aria-label': 'change date',
                            }}
                        />
                        </MuiPickersUtilsProvider> */}
                    </Col>
                </Row>
                <Row>
                    <Col xs={18} md={12}>
                        <Paper className={classes.papergrid}>
                            <Grid container wrap="nowrap" spacing={2}>
                            <Grid item xs zeroMinWidth>
                                <Typography noWrap>{tipoproduct}</Typography>
                            </Grid>
                            </Grid>
                        </Paper>
                        <button className="btn btn-warning btn-block" type="submit">Add Products</button>
                        {/* <Button onClick={handle}>Add</Button> */}
                        <Button onClick={props.props_var.onHide}>Close</Button>
                    </Col>
                </Row>
                <div style={{ height: 400, width: '100%' }}>                
                <MaterialTable 
                    icons={tableIcons}
                    columns={columns} 
                    data={dataProduct}                     
                    title="Products"
                    // actions={[
                    //     {
                    //         icon: tableIcons.Edit,
                    //         tooltip: 'Editar Product',
                    //         onClick:  (event,rowData)=>alert('presiono',+rowData.id)
                    //     },
                    //     {
                    //         icon: tableIcons.Delete,
                    //         tooltip: 'Delete Product',
                    //         onClick:  (event,rowData)=>alert('presiono elminar',+rowData.id)
                    //     }

                    // ]}
                    editable={{
                        onRowAdd: newData =>
                          new Promise((resolve, reject) => {
                            setTimeout(() => {
                              setDataProduct([...dataProduct, newData]);
                              
                              resolve();
                            }, 1000)
                          }),
                        onRowUpdate: (newData, oldData) =>
                          new Promise((resolve, reject) => {
                            setTimeout(() => {
                              const dataUpdate = [...dataProduct];
                              const index = oldData.tableData.id;
                              dataUpdate[index] = newData;
                              setDataProduct([...dataUpdate]);
                
                              resolve();
                            }, 1000)
                          }),
                        onRowDelete: oldData =>
                          new Promise((resolve, reject) => {
                            setTimeout(() => {
                              const dataDelete = [...dataProduct];
                              const index = oldData.tableData.id;
                              dataDelete.splice(index, 1);
                              setDataProduct([...dataDelete]);
                              
                              resolve()
                            }, 1000)
                          }),
                    }}
                    options={{
                        actionsColumnIndex: -1
                    }}
                />
                </div>
                </form>        
    </div>
    );

    return (
    <div>
        <button type="button" onClick={handleOpen}>
            Product
        </button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
        {body}
        </Modal>
    </div>
    );
}

export default Products
