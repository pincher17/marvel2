import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import CharacterInfoReducer from "./characterInfo-reducer";
import charactersReducer from "./characters-reducer";
import ComicInfoReducer from "./comicInfo-reducer";
import comicsReducer from "./comics-reducer";
import mastHeadReducer from "./mastHead-reducer";
import spinnerReducer from "./spinner-reducer";



const reducers = combineReducers({
    characters: charactersReducer,
    mastHead: mastHeadReducer,
    comics: comicsReducer,
    fetching: spinnerReducer,
    characterInfo: CharacterInfoReducer,
    comicInfo: ComicInfoReducer,
})

let store = createStore(reducers, applyMiddleware(thunk));

export default store;