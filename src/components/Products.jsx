import React, { useState, useEffect } from 'react';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import Modal from '@material-ui/core/Modal';
import { updateProduct, addProduct } from '../redux/productDuck';
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
    width: 800,
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
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const product = useSelector(store => store.product.array);
    const [errorTypeProduct,setErrorTypeProduct] = useState(false);
    const [tipoproduct, setTipoProduct] = useState('');
    const [nombreproduct, setNombreProduct] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [errorDescripProduct, setErrorDescripProduct] = useState(false)
    const [descripProduct, setDescripProduct] = useState('');
    const [nameProduct, setNameProduct] = useState([]);


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //Function add product
    const handleAddProduct = event => {

        console.log('---------------handleAddProduct----------');
        //service_id
        console.log(props);
        // console.log(props_var);
        let lexico = "" + props.props_var.category_id + "-" + props.props_var.areas_id + "-" + tipoproduct + "";
        //product_id
        // console.log(name_products);
        console.log(lexico);
        let name_products = "Prueba";
        let date_start = '12-01-2021';
        let date_end = '12-04-2021';
        console.log(tipoproduct);
        console.log(name_products);
        console.log(date_start);
        console.log(date_end);

        dispatch(addProduct(props.id, tipoproduct, lexico, name_products, date_start, date_end));  

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
        console.log('HandleChangeTypeProduct:')
        console.log(event.target)
        setErrorTypeProduct(true)
        setTipoProduct(event.target.value)
    
        //dispatch(getTypeProducts());  props.typeproduct
    
    }

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
                <Row>
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
                </Row>
                <Row>
                    <Col xs={12} md={8}>
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
                    <Col xs={12} md={8}>
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
                        <Button onClick={handleAddProduct}>Add</Button>
                        <Button onClick={props.props_var.onHide}>Close</Button>
                    </Col>
                </Row>
                        
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
