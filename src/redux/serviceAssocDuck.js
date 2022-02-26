import axios from 'axios';

const dataInicial =  {
    array : []
}

const GET_SERVICE_ASSOC = 'GET_SERVICE_ASSOC'

export default function serviceAssocReducer(state = dataInicial, action){
    switch(action.type){
        case GET_SERVICE_ASSOC:
            console.log('GET_SERVICE_ASSOC')
            console.log(action.payload.array)
            return {
                ...state,
                array: action.payload.array
            }
        default:
            return state


    }


}

//Consulta a los servicios que tiene asignado elasociado
export const getServiceAssoc = (id) => async (dispatch)  => {
    try{
        const response = await axios.get(`${process.env.REACT_APP_APP_LOCALHOST_URL}services/associate/${id}`)
            dispatch({
                type: GET_SERVICE_ASSOC,
                payload: {
                    array: response.data
                }
            })
    }catch(error){
        console.log(error)

    }
}
//Consulta todos los servicios de todos asociados
export const getServiceAssocAll = (id) => async (dispatch)  => {
    try{
        const response = await axios.get(`${process.env.REACT_APP_APP_LOCALHOST_URL}services/associateall`)
            dispatch({
                type: GET_SERVICE_ASSOC,
                payload: {
                    array: response.data
                }
            })
    }catch(error){
        console.log(error)

    }
}