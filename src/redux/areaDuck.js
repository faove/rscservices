import axios from 'axios';
//constante
const dataInicial =  {
    array : [],
    offset: 0
}

const GET_AREA = 'GET_AREA'
const GET_AREA_ID = 'GET_AREA_ID'
const GET_AREA_NEXT = 'GET_AREA_NEXT'
const POST_AREA_ADD = 'POST_AREA_ADD'
const DELETE_AREA = 'DELETE_AREA'
const UPDATE_AREA = 'UPDATE_AREA'

//reducer
export default function areaReducer(state = dataInicial, action){
    switch(action.type){
        case GET_AREA:  
        // console.log('state')
        // console.log(state)
            return {
                ...state, 
                array: action.payload.array
            }
        case GET_AREA_NEXT:    
            return {
                ...state, 
                array: action.payload.array, offset: action.payload.offset
            }
        case POST_AREA_ADD: 
            return {
                ...state, 
                array: [...state.array, action.payload.array]
            }
        case UPDATE_AREA:   
            
            const varr = state.array.map(array => array.id === action.payload.array.id ? action.payload.array : array)

            return {
                ...state, 
                array: varr
            }
        case DELETE_AREA:    
            return {
                ...state, 
                array: state.array.filter(array => array.id !== action.payload.array)
                }
        default:
            return state
    }
}

//actions
export const getAreas = () => async (dispatch, getState)  => {
    try{
        const {offset} = getState().area
        const response = await axios.get(`http://localhost:8000/api/areas?offset=${offset}&limit=20`)
        dispatch({
            type: GET_AREA,
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
export const getNextAreas = (numero) => async (dispatch, getState)  => {
    try{
        const {offset} = getState().Area
        const siguiente = offset + numero
        
        console.log('siguiente: ', siguiente)

        const response = await axios.get(`http://localhost:8000/api/areas?offset=${siguiente}&limit=20`)
        dispatch({
            type: GET_AREA_NEXT,
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
export const getAreasId = (id) => async (dispatch)  => {
    try{
        // const {offset} = getState().Associate
        const response = await axios.get(`http://localhost:8000/api/areas/${id}`)
        dispatch({
            type: GET_AREA_ID,
            payload: {
                array: response.data
            }
        })  

    }catch(error){
        console.log(error)
    }
}

//addArea
export const addArea = (category_id,name,status) => async (dispatch, getState)  => {
  try {
    console.log('AreaDuck addArea')
    console.log(name)
    console.log(category_id)
    console.log(status)
    const response = await axios.post(
      "http://localhost:8000/api/areas",
      {
        category_id,name,status
      }
    )
    dispatch({
        type: POST_AREA_ADD,
        payload: {
            array: response.data
        }
        
    }) 

  }catch (error){
    console.log(error)
  }


}

//deleteArea
export const  deleteArea = (id) => async (dispatch, getState) => {
    try {
        const response = await axios.delete(
            `http://localhost:8000/api/areas/${id}`          
        )
        dispatch({
            type: DELETE_AREA,
            payload: {
                array: id
            }
        }) 
    }catch (error){
      console.log(error)
    }
}

// updatedArea
export const updateArea = (id,updatedArea) => async (dispatch, getState) => {

    try {
        console.log('export update Area')
        console.log(id)
        console.log(updatedArea)
        //setEditing(false);
        const response = await axios.put(
        `http://localhost:8000/api/areas/${id}`, updatedArea)
            dispatch({
            type: UPDATE_AREA,
            payload: {
                array: response.data
            }
        
        }) 

    }catch (error){
        console.log(error)
    }

}