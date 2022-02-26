import axios from 'axios';
//constante
const dataInicial =  {
    array : [],
    offset: 0
}

const GET_STATUS = 'GET_STATUS'

//reducer
export default function typestatusReducer(state = dataInicial, action){
    switch(action.type){
        case GET_STATUS:  
        console.log('action.payload.array')
        console.log(action.payload.array)
            return {
                ...state, 
                array: action.payload.array
            }
        default:
            return state
    }
}

//actions
export const getStatus = () => async (dispatch, getState)  => {
    try{
        const {offset} = getState().showstatus
        const response = await axios.get(`${process.env.REACT_APP_APP_LOCALHOST_URL}typestatus`)
        dispatch({
            type: GET_STATUS,
            payload: {
                array: response.data,
                offset: offset
            }
        })  

    }catch(error){
        console.log(error)
    }
}
