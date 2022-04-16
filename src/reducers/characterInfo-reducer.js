import { charactersApi } from "../api/api";
import { setFetching } from "./spinner-reducer";

const SET_CHARACTER_INFO = 'SET_CHARACTER_INFO';
const SET_CHARACTER_INFO_COMICS = 'SET_CHARACTER_INFO_COMICS';
const defaultState = {
    character: [],
    characterComics: [],
}

function CharacterInfoReducer(state = defaultState, action){
   
    switch(action.type){
        case SET_CHARACTER_INFO:
        return{
            ...state,
            character: action.data
        }
        case SET_CHARACTER_INFO_COMICS:
            return{
                ...state,
                characterComics: action.data
            }

        default:
            return state;
    }
}

export let setCharacterInfo = (data) => ({type: SET_CHARACTER_INFO, data})
export let setCharacterInfoComics = (data) => ({type: SET_CHARACTER_INFO_COMICS, data})

export const getCharacterInfoThunk = (id) =>{
    return (dispatch) => {

        dispatch(setFetching(true))
        charactersApi.getCharacterInfo(id).then(response =>{
            dispatch(setCharacterInfo(response.data.results))
            dispatch(setFetching(false))
    })
    }
}

export const getCharacterInfoComicsThunk = (id) =>{
    return (dispatch) => {

        dispatch(setFetching(true))
        charactersApi.getCharacterInfoComics(id).then(response =>{
            dispatch(setCharacterInfoComics(response.data.results))
            dispatch(setFetching(false))
    })
    }
}

export default CharacterInfoReducer;