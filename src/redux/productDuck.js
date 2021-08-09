import axios from 'axios';
//constante

const dataInicial =  {
    array : [],
    offset: 0
}

const GET_PRODUCT = 'GET_PRODUCT'
const GET_PRODUCT_ID = 'GET_PRODUCT_ID'
const GET_PRODUCT_NEXT = 'GET_PRODUCT_NEXT'
const POST_PRODUCT_ADD = 'POST_PRODUCT_ADD'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

//reducer
export default function productReducer(state = dataInicial, action){
    switch(action.type){
        case GET_PRODUCT:    
            return {
                ...state, 
                array: action.payload.array
            }
        case GET_PRODUCT_ID:
            console.log('POST_PRODUCT__ID+++++++++++++++++++++++++++')
            console.log(action.payload.array)
            return {
                ...state, 
                array: action.payload.array
            }
        case GET_PRODUCT_NEXT:    
            return {
                ...state, 
                array: action.payload.array, offset: action.payload.offset
            }
        case POST_PRODUCT_ADD:    
            
            return {
                ...state, 
                array: [...state.array, action.payload.array]
            }
        case UPDATE_PRODUCT:   

            const varr = state.array.map(array => array.id === action.payload.array.id ? action.payload.array : array)

            return {
                ...state, 
                array: varr
            }
        case DELETE_PRODUCT:    
            return {
                ...state, 
                array: state.array.filter(array => array.id !== action.payload.array)
                }
        default:
            return state
    }
}

//actions
export const getProduct = () => async (dispatch, getState)  => {
    try{
        const {offset} = getState().product
        const response = await axios.get(`http://localhost:8000/api/products?offset=${offset}&limit=20`)
        dispatch({
            type: GET_PRODUCT,
            payload: {
                array: response.data,
                offset: offset
            }
        })  

    }catch(error){
        console.log(error)
    }
}

//Next 20 product
export const getNextProduct = (numero) => async (dispatch, getState)  => {
    try{
        const {offset} = getState().product
        const siguiente = offset + numero
        
        console.log('siguiente: ', siguiente)

        const response = await axios.get(`http://localhost:8000/api/products?offset=${siguiente}&limit=20`)
        dispatch({
            type: GET_PRODUCT_NEXT,
            payload: {
                array: response.data,
                offset: siguiente
            }
            
        })  

    }catch(error){
        console.log(error)
    }
}

//Get Product Id current
export const getProductId = (id) => async (dispatch)  => {
    try{
        // const {offset} = getState().product
        
        const response = await axios.get(`http://localhost:8000/api/products/${id}`)
        dispatch({
            type: GET_PRODUCT_ID,
            payload: {
                array: response.data
            }
        })  

    }catch(error){
        console.log(error)
    }
}
//addProduct 
export const addProduct = (services_id, areas_id, category_id, selected_date_start, lexido,  status) => async (dispatch, getState)  => {
  try {
    // console.log('ProducteDuck addProduct')
    // console.log(services_id,areas_id, category_id)
    // console.log('ProducteDuck selected_date_start')

    // console.log(selected_date_start, lexido)
    // console.log('ProducteDuck ')
    // console.log(status)
    const response = await axios.post(
        "http://localhost:8000/api/products",
      {
         services_id, areas_id, category_id, selected_date_start, lexido, status
      }
    )
    dispatch({
        type: POST_PRODUCT_ADD,
        payload: {
            array: response.data
        }
        
    }) 

  }catch (error){
    console.log(error)
  }


}

//deleteProduct
export const  deleteProduct = (id) => async (dispatch, getState) => {
    try {

        const response = await axios.delete(
            `http://localhost:8000/api/products/${id}`          
        )
        dispatch({
            type: DELETE_PRODUCT,
            payload: {
                array: id
            }
            
        }) 

    }catch (error){
      console.log(error)
    }
}

// updateProduct
export const updateProduct = (id,updatedProduct) => async (dispatch, getState) => {

    try {
        console.log('ProducteDuck updateProduct')
        console.log(id)
        console.log(updatedProduct)
        
        const response = await axios.put(
        `http://localhost:8000/api/products/${id}`, updatedProduct)
            dispatch({
            type: UPDATE_PRODUCT,
            payload: {
                array: response.data
            }
        
        }) 

    }catch (error){
        console.log(error)
    }

}