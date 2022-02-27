import { combineReducers, createStore } from "redux";
import charactersReducer from "./characters-reducer";
import mastHeadReducer from "./mastHead-reducer";



const reducers = combineReducers({
    characters: charactersReducer,
    mastHead: mastHeadReducer
})

let store = createStore(reducers);

export default store;