import axios from 'axios';
//constante
const dataInicial =  {
    array : [],
    offset: 0
}

const GET_SERVICE = 'GET_SERVICE'
const GET_SERVICE_DNI = 'GET_SERVICE_DNI'
const GET_SERVICE_ID = 'GET_SERVICE_ID'
const GET_SERVICE_NEXT = 'GET_SERVICE_NEXT'
const POST_SERVICE_ADD = 'POST_SERVICE_ADD'
const DELETE_SERVICE = 'DELETE_SERVICE'
const UPDATE_SERVICE = 'UPDATE_SERVICE'

//reducer
export default function serviceReducer(state = dataInicial, action){
    switch(action.type){
        case GET_SERVICE:  
        // console.log('state')
        // console.log(state)
            return {
                ...state, 
                array: action.payload.array
            }
        case GET_SERVICE_ID:  
            // console.log('state')
            // console.log(state)
            return {
                ...state, 
                array: action.payload.array
            }
        case GET_SERVICE_NEXT:    
            return {
                ...state, 
                array: action.payload.array, offset: action.payload.offset
            }
        case POST_SERVICE_ADD: 
            return {
                ...state, 
                array: [...state.array, action.payload.array]
            }
        case UPDATE_SERVICE:   
            
            const varr = state.array.map(array => array.id === action.payload.array.id ? action.payload.array : array)

            return {
                ...state, 
                array: varr
            }
        case DELETE_SERVICE:    
            return {
                ...state, 
                array: state.array.filter(array => array.id !== action.payload.array)
                }
        default:
            return state
    }
}

//actions
export const getService = () => async (dispatch, getState)  => {
    try{
        console.log('getService')
        const {offset} = getState().service
        const response = await axios.get(`http://localhost:8000/services?offset=${offset}&limit=20`)
        dispatch({
            type: GET_SERVICE,
            payload: {
                array: response.data,
                offset: offset
            }
        })  

    }catch(error){
        console.log(error)
    }
}

//Next 20 service
export const getNextService = (numero) => async (dispatch, getState)  => {
    try{
        const {offset} = getState().Service
        const siguiente = offset + numero
        
        console.log('siguiente: ', siguiente)

        const response = await axios.get(`http://localhost:8000/services?offset=${siguiente}&limit=20`)
        dispatch({
            type: GET_SERVICE_NEXT,
            payload: {
                array: response.data,
                offset: siguiente
            }
            
        })  

    }catch(error){
        console.log(error)
    }
}

//Get Service id current
export const getServiceId = (id) => async (dispatch)  => {
    try{
        // const {offset} = getState().Service
        const response = await axios.get(`http://localhost:8000/services/${id}`)
        dispatch({
            type: GET_SERVICE_ID,
            payload: {
                array: response.data
            }
        })  

    }catch(error){
        console.log(error)
    }
}

//Get Service dni current
export const getServiceDNI = (dni) => async (dispatch)  => {
    try{
        // const {offset} = getState().Service
        const response = await axios.get(`http://localhost:8000/services/${dni}`)
        dispatch({
            type: GET_SERVICE_DNI,
            payload: {
                array: response.data
            }
        })  

    }catch(error){
        console.log(error)
    }
}

//addService 
export const addService = (name,last_name,dni,address,email) => async (dispatch, getState)  => {
  try {
    // console.log('addServiceDuck addService')
    // console.log(name)
    const response = await axios.post(
      "http://localhost:8000/services",
      {
          name,last_name,dni,address,email
      }
    )
    dispatch({
        type: POST_SERVICE_ADD,
        payload: {
            array: response.data
        }
        
    }) 

  }catch (error){
    console.log(error)
  }


}

//deleteService
export const  deleteService = (id) => async (dispatch, getState) => {
    try {
        const response = await axios.delete(
            `http://localhost:8000/services/${id}`          
        )
        dispatch({
            type: DELETE_SERVICE,
            payload: {
                array: id
            }
        }) 
    }catch (error){
      console.log(error)
    }
}

// updateService
export const updateService = (id,name,last_name,dni,address,email) => async (dispatch, getState) => {

    try {
        const response = await axios.put(
        `http://localhost:8000/services/${id}`, {name,last_name,dni,address,email})
            dispatch({
            type: UPDATE_SERVICE,
            payload: {
                array: response.data
            }
        
        }) 

    }catch (error){
        console.log(error)
    }

}