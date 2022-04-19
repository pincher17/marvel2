import { charactersApi } from "../api/api";
import { setFetching } from "./spinner-reducer";

const SET_CHARACTERS = "SET_CHARACTERS";
const SET_PAGE = "SET_PAGE";
const SET_SORT = "SET_SORT";
const SET_SEARCH = "SET_SEARCH";
const SET_ADD_FAVORITES = "SET_ADD_FAVORITES";
const DELETE_FAVORITES = "DELETE_FAVORITES";
const SET_TOTAL_CHARACTERS = 'SET_TOTAL_CHARACTERS'
const SET_TOTAL_PAGES_CHARACTERS= 'SET_TOTAL_PAGES_CHARACTERS'

const defaultState = {
    items: [],
    offset: 0,
    page: 1,
    sort: "name",
    search: "",
    favorites: [],
    totalCharacters: 0,
    pageSize: 8,
    totalPages: 0,
};

function charactersReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_CHARACTERS:
            return {
                ...state,
                items: [...action.characters],
            };
        case SET_PAGE:
            return {
                ...state,
                page: action.page,
            };
        case SET_SORT:
            return {
                ...state,
                sort: action.sort,
            };
        case SET_SEARCH:
            return {
                ...state,
                search: action.search,
            };
        case SET_TOTAL_CHARACTERS:
            return {
                ...state,
                totalCharacters: action.totalCharacters,
                };
        case SET_TOTAL_PAGES_CHARACTERS:
            return {
                ...state,
                totalPages: action.totalPages,
                };
        case SET_ADD_FAVORITES:
            return {
                ...state,
                favorites: [...state.favorites, action.favoriteId]
            };
        case DELETE_FAVORITES:
            return {
                ...state,
                favorites: state.favorites.filter((i) => i.id !== action.favoriteId),
            };
        default:
            return state;
    }
}

export let setCharacters = (characters) => ({
    type: SET_CHARACTERS,
    characters: characters,
});
export let setPage = (page) => ({
    type: SET_PAGE,
    page: page
});
export let setSort = (sort) => ({
    type: SET_SORT,
    sort: sort
});
export let setSearch = (search) => ({
    type: SET_SEARCH,
    search: search,
});
export let setTotalCharacters = (totalCharacters) => ({
    type: SET_TOTAL_CHARACTERS,
    totalCharacters
});
export let setTotalPagesCharacters = (totalPages) => ({
    type: SET_TOTAL_PAGES_CHARACTERS,
    totalPages
});
export let setAddFavorite = (favoriteId) => ({
    type: SET_ADD_FAVORITES,
    favoriteId: favoriteId,
});
export let deleteFavorite = (favoriteId) => ({
    type: DELETE_FAVORITES,
    favoriteId: favoriteId,
});

export const getCharactersThunk = (search, sort, page = 1) =>{
    return (dispatch) => {
        dispatch(setPage(page));
        dispatch(setFetching(true))
        charactersApi.getCharacters(search, sort, page)
        .then(response =>{
            dispatch(setCharacters(response.data.results))
            dispatch(setTotalCharacters(response.data.total))
            dispatch(setFetching(false))
    })
    }
}

export const sortChangeThunk = (search, sort) =>{
    return (dispatch) => {
        dispatch(setPage(1));
        dispatch(setSort(sort));
        dispatch(setFetching(true))
        charactersApi.getCharacters(search, sort).then(response => {
            dispatch(setCharacters(response.data.results))
            dispatch(setTotalCharacters(response.data.total))
            dispatch(setFetching(false))
        })
    }
}

export const searchThunk = (search, sort) =>{
    return (dispatch) => {
        dispatch(setPage(1));
        dispatch(setSearch(search));
        dispatch(setFetching(true))
        charactersApi.getCharacters(search, sort).then(response => {
            dispatch(setCharacters(response.data.results))
            dispatch(setTotalCharacters(response.data.total))
            dispatch(setFetching(false))
        })
    }
}

export default charactersReducer;