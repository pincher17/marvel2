import {
    combineReducers,
    createStore
} from "redux";
import charactersReducer from "./characters-reducer";
import comicsReducer from "./comics-reducer";
import mastHeadReducer from "./mastHead-reducer";



const reducers = combineReducers({
    characters: charactersReducer,
    mastHead: mastHeadReducer,
    comics: comicsReducer,
})

let store = createStore(reducers);

export default store;