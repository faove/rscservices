import axios from 'axios';
//constante

const dataInicial =  {
    array : [],
    offset: 0
}

const GET_CATEGORY = 'GET_CATEGORY'
const GET_CATEGORY_ID = 'GET_CATEGORY_ID'
const GET_CATEGORY_NEXT = 'GET_CATEGORY_NEXT'
const POST_CATEGORY_ADD = 'POST_CATEGORY_ADD'
const DELETE_CATEGORY = 'DELETE_CATEGORY'
const UPDATE_CATEGORY = 'UPDATE_CATEGORY'

//reducer
export default function categoryReducer(state = dataInicial, action){
    switch(action.type){
        case GET_CATEGORY:    
            return {
                ...state, 
                array: action.payload.array
            }
        case GET_CATEGORY_NEXT:    
            return {
                ...state, 
                array: action.payload.array, offset: action.payload.offset
            }
        case POST_CATEGORY_ADD:    
            return {
                ...state, 
                array: [...state.array, action.payload.array]
            }
        case UPDATE_CATEGORY:   
            const varr = state.array.map(array => array.id === action.payload.array.id ? action.payload.array : array)
            return {
                ...state, 
                array: varr
                // array: state.array.map(array => array.id === action.payload.array.id ? action.payload.array : array)
            }
        case DELETE_CATEGORY:    
            return {
                ...state, 
                array: state.array.filter(array => array.id !== action.payload.array)
                }
        default:
            return state
    }
}

//actions
export const getCategory = () => async (dispatch, getState)  => {
    try{
        const {offset} = getState().category
        const response = await axios.get(`http://localhost:8000/api/category?offset=${offset}&limit=20`)
        dispatch({
            type: GET_CATEGORY,
            payload: {
                array: response.data,
                offset: offset
            }
        })  

    }catch(error){
        console.log(error)
    }
}
//Next 20 Category
export const getNextCategory = (numero) => async (dispatch, getState)  => {
    try{
        const {offset} = getState().category
        const siguiente = offset + numero
        
        console.log('siguiente: ', siguiente)

        const response = await axios.get(`http://localhost:8000/api/category?offset=${siguiente}&limit=20`)
        dispatch({
            type: GET_CATEGORY_NEXT,
            payload: {
                array: response.data,
                offset: siguiente
            }
            
        })  

        //   const data = await response;
          
        //   setCliente(data.data)
    }catch(error){
        console.log(error)
    }
}



//Get Category Id current
export const getCategoryId = (id) => async (dispatch)  => {
    try{
        // const {offset} = getState().category
        const response = await axios.get(`http://localhost:8000/api/category/${id}`)
        dispatch({
            type: GET_CATEGORY_ID,
            payload: {
                array: response.data
            }
        })  

    }catch(error){
        console.log(error)
    }
}
//Behind 20 Category

//addCategory 
export const addCategory = (name,last_name,dni,address,email) => async (dispatch, getState)  => {
  try {
    // console.log('categoryDuck addCategory')
    // console.log(email)
    const response = await axios.post(
      "http://localhost:8000/api/category",
      {
          name,last_name,dni,address,email
      }
    )
    dispatch({
        type: POST_CATEGORY_ADD,
        payload: {
            array: response.data
        }
        
    }) 

  }catch (error){
    console.log(error)
  }


}

//deleteClient
export const  deleteClient = (id) => async (dispatch, getState) => {
    try {
        // console.log('clienteDuck deleteClient')
        // console.log(id)
        // console.log(getState().client)


        const response = await axios.delete(
            `http://localhost:8000/api/clients/${id}`          
        )
        dispatch({
            type: DELETE_CATEGORY,
            payload: {
                array: id
            }
            
        }) 
        // const data = await response;

        // console.log('delete Client')
        // console.log(data)
        
        //   const arrayFilter = cliente.filter(client => client.id !== id);
        //   setCliente(arrayFilter);

    }catch (error){
      console.log(error)
    }
}

// updateCategory
export const updateCategory = (id,updatedCategory) => async (dispatch, getState) => {

try {
    // console.log('export update Categorye')
    // console.log(id,updatedCategory)
    //setEditing(false);
    const response = await axios.put(
    `http://localhost:8000/api/category/${id}`, updatedCategory)
        dispatch({
        type: UPDATE_CATEGORY,
        payload: {
            array: response.data
        }
    
    }) 

}catch (error){
    console.log(error)
}

}