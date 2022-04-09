const SET_FETCHING= 'SET_FETCHING';

const defaultState = {
    isFetching: true,
}

function spinnerReducer(state = defaultState, action){
   
    switch(action.type){
        case SET_FETCHING:
        return{
            ...state,
            isFetching: action.fetching
        }

        default:
            return state;
    }
}

export let setFetching = (fetching) => ({type: SET_FETCHING, fetching: fetching})


export default spinnerReducer;