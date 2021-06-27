import axios from 'axios';
//constante
const dataInicial =  {
    array : []
}

const GET_TYPEPRODUCTS = 'GET_TYPEPRODUCTS'

//reducer
export default function typeproductReducer(state = dataInicial, action){
    switch(action.type){
        case GET_TYPEPRODUCTS:  
            // console.log('GET_TYPEPRODUCTS+++++++++++++++++++++++++++')
            // console.log(action.payload.array)
            return {
                ...state, 
                array: action.payload.array
            }
        default:
            return state
    }
}

//actions
export const getTypeProducts = (areasid) => async (dispatch)  => {
    try{
        
        const response = await axios.get(`http://localhost:8000/api/typeproducts/areas/${areasid}`)
        dispatch({
            type: GET_TYPEPRODUCTS,
            payload: {
                array: response.data
            }
        })  

    }catch(error){
        console.log(error)
    }
}
