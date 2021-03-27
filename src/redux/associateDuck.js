import axios from 'axios';
//constante
const dataInicial =  {
    array : [],
    offset: 0
}

const GET_ASSOCIATE = 'GET_ASSOCIATE'
const GET_ASSOCIATE_ID = 'GET_ASSOCIATE_ID'
const GET_ASSOCIATE_NEXT = 'GET_ASSOCIATE_NEXT'
const POST_ASSOCIATE_ADD = 'POST_ASSOCIATE_ADD'
const DELETE_ASSOCIATE = 'DELETE_ASSOCIATE'
const UPDATE_ASSOCIATE = 'UPDATE_ASSOCIATE'

//reducer
export default function associateReducer(state = dataInicial, action){
    switch(action.type){
        case GET_ASSOCIATE:  
        // console.log('state')
        // console.log(state)
            return {
                ...state, 
                array: action.payload.array
            }
        case GET_ASSOCIATE_NEXT:    
            return {
                ...state, 
                array: action.payload.array, offset: action.payload.offset
            }
        case POST_ASSOCIATE_ADD: 
            return {
                ...state, 
                array: [...state.array, action.payload.array]
            }
        case UPDATE_ASSOCIATE:   
            
            const varr = state.array.map(array => array.id === action.payload.array.id ? action.payload.array : array)

            return {
                ...state, 
                array: varr
            }
        case DELETE_ASSOCIATE:    
            return {
                ...state, 
                array: state.array.filter(array => array.id !== action.payload.array)
                }
        default:
            return state
    }
}

//actions
export const getAssociate = () => async (dispatch, getState)  => {
    try{
        const {offset} = getState().associate
        const response = await axios.get(`http://localhost:8000/api/associates?offset=${offset}&limit=20`)
        dispatch({
            type: GET_ASSOCIATE,
            payload: {
                array: response.data,
                offset: offset
            }
        })  

    }catch(error){
        console.log(error)
    }
}

//Next 20 Associate
export const getNextAssociate = (numero) => async (dispatch, getState)  => {
    try{
        const {offset} = getState().Associate
        const siguiente = offset + numero
        
        console.log('siguiente: ', siguiente)

        const response = await axios.get(`http://localhost:8000/api/associates?offset=${siguiente}&limit=20`)
        dispatch({
            type: GET_ASSOCIATE_NEXT,
            payload: {
                array: response.data,
                offset: siguiente
            }
            
        })  

    }catch(error){
        console.log(error)
    }
}

//Get Associate Id current
export const getAssociateId = (id) => async (dispatch)  => {
    try{
        // const {offset} = getState().Associate
        const response = await axios.get(`http://localhost:8000/api/associates/${id}`)
        dispatch({
            type: GET_ASSOCIATE_ID,
            payload: {
                array: response.data
            }
        })  

    }catch(error){
        console.log(error)
    }
}

//addAssociate 
export const addAssociate = (name,last_name,dni,address,email,gender) => async (dispatch, getState)  => {
  try {
    // console.log('AssociateDuck addAssociate')
    // console.log(name)
    const response = await axios.post(
      "http://localhost:8000/api/associates",
      {
          name,last_name,dni,address,email,gender
      }
    )
    dispatch({
        type: POST_ASSOCIATE_ADD,
        payload: {
            array: response.data
        }
        
    }) 

  }catch (error){
    console.log(error)
  }


}

//deleteAssociate
export const  deleteAssociate = (id) => async (dispatch, getState) => {
    try {
        const response = await axios.delete(
            `http://localhost:8000/api/associates/${id}`          
        )
        dispatch({
            type: DELETE_ASSOCIATE,
            payload: {
                array: id
            }
        }) 
    }catch (error){
      console.log(error)
    }
}

// updateAssociate
export const updateAssociate = (id,name,last_name,dni,address,email,gender) => async (dispatch, getState) => {

    try {
        console.log('updateAssociate 9999')
        console.log(name,last_name)
        console.log(email)
        console.log(gender)
        const response = await axios.put(
        `http://localhost:8000/api/associates/${id}`, {name,last_name,dni,address,email,gender})
            dispatch({
            type: UPDATE_ASSOCIATE,
            payload: {
                array: response.data
            }
        
        }) 

    }catch (error){
        console.log(error)
    }

}