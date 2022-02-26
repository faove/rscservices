import axios from 'axios';
//constante
const dataInicial =  {
    array : [],
    offset: 0
}

const GET_SERVICE = 'GET_SERVICE'
const GET_SERVICE_ID = 'GET_SERVICE_ID'
const GET_SERVICE_NEXT = 'GET_SERVICE_NEXT'
const POST_SERVICE_ADD = 'POST_SERVICE_ADD'
const DELETE_SERVICE = 'DELETE_SERVICE'
const UPDATE_SERVICE = 'UPDATE_SERVICE'
// const GET_SERVICE_ASSOC = 'GET_SERVICE_ASSOC'

//reducer
export default function serviceReducer(state = dataInicial, action){
    switch(action.type){
        case GET_SERVICE:  
        console.log('state')
        console.log(state)
            return {
                ...state, 
                array: action.payload.array
            }
        case GET_SERVICE_ID:  
            console.log('state')
            console.log(state)
            return {
                ...state, 
                array: action.payload.array
            }
        // case GET_SERVICE_ASSOC:  
        //     console.log('GET_SERVICE_ASSOC')
        //     console.log(action.payload.array)
        //     return {
        //         ...state, 
        //         array: action.payload.array
        //     }
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
        console.log('POST_SERVICE_del')
        console.log(action.payload.array) 
        console.log(state.array.id)
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
        
        const {offset} = getState().service
        const response = await axios.get(`${process.env.REACT_APP_APP_LOCALHOST_URL}services?offset=${offset}&limit=20`)
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

        const response = await axios.get(`${process.env.REACT_APP_APP_LOCALHOST_URL}services?offset=${siguiente}&limit=20`)
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
        const response = await axios.get(`${process.env.REACT_APP_APP_LOCALHOST_URL}services/${id}`)
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

//Get Service con el id del client current
// export const getServiceAssoc = (id) => async (dispatch)  => {
//     try{
//         // const {offset} = getState().Service
//         const response = await axios.get(`http://localhost:8000/services/associate/${id}`)
//         dispatch({
//             type: GET_SERVICE_ASSOC,
//             payload: {
//                 array: response.data
//             }
//         })  

//     }catch(error){
//         console.log(error)
//     }
// }

//addService 
export const addService = (category_id,areas_id,associate_id,
    client_id,name_service,gross_amount,date_service
    ) => async (dispatch, getState)  => {
  try {
    
    // console.log(areas_id)
    // console.log(associate_id)
    // console.log(client_id)


    // console.log(name_service)
    // console.log(gross_amount)

    console.log(date_service)

    const response = await axios.post(`${process.env.REACT_APP_APP_LOCALHOST_URL}services`,
      {
        category_id, areas_id, associate_id, client_id, name_service, gross_amount, date_service
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
export const deleteService = (id) => async (dispatch, getState) => {
    try {
        console.log('deleteService')
        console.log(id)
        const response = await axios.delete(
            `${process.env.REACT_APP_APP_LOCALHOST_URL}services/${id}`          
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
export const updateService = (id,category_id, areas_id, associate_id, client_id, name_service, gross_amount, date_service) => async (dispatch, getState) => {

    try {
        const response = await axios.put(
        `${process.env.REACT_APP_APP_LOCALHOST_URL}services/${id}`, {category_id, areas_id, associate_id, client_id, name_service, gross_amount, date_service})
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