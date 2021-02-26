import axios from 'axios';
//constante

const dataInicial =  {
    array : [],
    offset: 0
}

const GET_CLIENT = 'GET_CLIENT'
const GET_CLIENT_ID = 'GET_CLIENT_ID'
const GET_CLIENT_NEXT = 'GET_CLIENT_NEXT'
const POST_CLIENT_ADD = 'POST_CLIENT_ADD'
const DELETE_CLIENT = 'DELETE_CLIENT'
const UPDATE_CLIENT = 'UPDATE_CLIENT'

//reducer
export default function clientReducer(state = dataInicial, action){
    switch(action.type){
        case GET_CLIENT:    
            return {
                ...state, 
                array: action.payload.array
            }
        case GET_CLIENT_NEXT:    
            return {
                ...state, 
                array: action.payload.array, offset: action.payload.offset
            }
        case POST_CLIENT_ADD:    
            return {
                ...state, 
                array: [...state.array, action.payload.array]
            }
        case UPDATE_CLIENT:   
            // console.log('update cliente++++++++')
            // console.log(state.array)
            // const re = state.array.map(array => array.id === action.payload.id ? (array = action.payload.array) : array
            // const re =state.array.map(
            //         client => (client.id === action.payload.id ? action.payload.array : client)
            //           )
            
            // console.log(re)
            // console.log('action.payload.array')
            // console.log(action.payload.array,action.payload.array.id )
            const varr = state.array.map(array => array.id === action.payload.array.id ? action.payload.array : array)
            // console.log('varr>>>>>>>')
            // console.log(varr)
            // console.log('state.arra>>>>>>>')
            // console.log(state.array)

            return {
                ...state, 
                array: varr
                // array: state.array.map(array => array.id === action.payload.array.id ? action.payload.array : array)
            }
        case DELETE_CLIENT:    
            return {
                ...state, 
                array: state.array.filter(array => array.id !== action.payload.array)
                }
        default:
            return state
    }
}

//actions
export const getClient = () => async (dispatch, getState)  => {
    try{
        const {offset} = getState().client
        const response = await axios.get(`http://localhost:8000/api/clients?offset=${offset}&limit=20`)
        dispatch({
            type: GET_CLIENT,
            payload: {
                array: response.data,
                offset: offset
            }
        })  

    }catch(error){
        console.log(error)
    }
}
//Next 20 Client
export const getNextClient = (numero) => async (dispatch, getState)  => {
    try{
        const {offset} = getState().client
        const siguiente = offset + numero
        
        console.log('siguiente: ', siguiente)

        const response = await axios.get(`http://localhost:8000/api/clients?offset=${siguiente}&limit=20`)
        dispatch({
            type: GET_CLIENT_NEXT,
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



//Get Client Id current
export const getClientId = (id) => async (dispatch)  => {
    try{
        // const {offset} = getState().client
        const response = await axios.get(`http://localhost:8000/api/clients/${id}`)
        dispatch({
            type: GET_CLIENT_ID,
            payload: {
                array: response.data
            }
        })  

    }catch(error){
        console.log(error)
    }
}
//Behind 20 Client

//addClient 
export const addClient = (name,last_name,dni,address,email) => async (dispatch, getState)  => {
  try {
    // console.log('clienteDuck addClient')
    // console.log(email)
    const response = await axios.post(
      "http://localhost:8000/api/clients",
      {
          name,last_name,dni,address,email
      }
    )
    dispatch({
        type: POST_CLIENT_ADD,
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
            type: DELETE_CLIENT,
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

// updateClient
export const updateClient = (id,updatedClient) => async (dispatch, getState) => {

try {
    // console.log('export update Cliente')
    // console.log(id,updatedClient)
    //setEditing(false);
    const response = await axios.put(
    `http://localhost:8000/api/clients/${id}`, updatedClient)
        dispatch({
        type: UPDATE_CLIENT,
        payload: {
            array: response.data
        }
    
    }) 

//   setCliente(
//     cliente.map(
//     client => (client.id === id ? updatedClient : client)
//       ))

//   console.log('update Client')
//   console.log(id)
//   console.log(updatedClient)

}catch (error){
    console.log(error)
}

}