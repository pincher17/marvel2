import { comicsApi } from "../api/api";
import { setFetching } from "./spinner-reducer";

const SET_COMIC_INFO = 'SET_COMIC_INFO';

const defaultState = {
    comic: [],
}

function ComicInfoReducer(state = defaultState, action){
   
    switch(action.type){
        case SET_COMIC_INFO:
        return{
            ...state,
            comic: action.data
        }

        default:
            return state;
    }
}

export let setComicInfo = (data) => ({type: SET_COMIC_INFO, data})

export const getComicInfoThunk = (id) =>{
    return (dispatch) => {
        dispatch(setFetching(true))
        comicsApi.getComicInfo(id).then(response =>{
            dispatch(setComicInfo(response.data.results))
            dispatch(setFetching(false))
    })
    }
}


export default ComicInfoReducer;