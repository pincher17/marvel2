const SET_HEAD= 'SET_HEAD';

const defaultState = {
    head: 'f',
}

function mastHeadReducer(state = defaultState, action){
   
    switch(action.type){
        case SET_HEAD:
        return{
            ...state,
            head: action.head
        }

        default:
            return state;
    }
}

export let setHeadAC = (head) => ({type: SET_HEAD, head: head})


export default mastHeadReducer;