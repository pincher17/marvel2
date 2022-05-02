import { comicsApi } from "../api/api";
import { setFetching } from "./spinner-reducer";

const SET_COMICS = "SET_COMICS";
const SET_PAGE_COMICS = "SET_PAGE_COMICS";
const SET_SORT_COMICS = "SET_SORT_COMICS";
const SET_SEARCH_COMICS = "SET_SEARCH_COMICS";
const SET_ADD_FAVORITES_COMICS = "SET_ADD_FAVORITES_COMICS";
const DELETE_FAVORITES_COMICS = "DELETE_FAVORITES_COMICS";
const SET_TOTAL_COMICS = 'SET_TOTAL_COMICS'
const SET_TOTAL_PAGES_COMICS= 'SET_TOTAL_PAGES_COMICS'
const SET_COMICS_HOME_PAGE = 'SET_COMICS_HOME_PAGE'
const SET_AUTO_COMPLETE_COMICS = 'SET_AUTO_COMPLETE_COMICS'


const defaultState = {
    items: [],
    comicsHomePage: [],
    offset: 0,
    page: 1,
    sort: "title",
    search: "",
    autoComplete: [],
    favorites: [],
    totalComics: 0,
    pageSize: 8,
    sliderSize: 9,
    totalPages: 0,
};

function comicsReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_COMICS:
            return {
                ...state,
                items: [...action.comics],
            };
        case SET_COMICS_HOME_PAGE:
            return {
                ...state,
                comicsHomePage: [...action.comics],
            };
        case SET_PAGE_COMICS:
            return {
                ...state,
                page: action.page,
            };
        case SET_SORT_COMICS:
            return {
                ...state,
                sort: action.sort,
            };
        case SET_SEARCH_COMICS:
            return {
                ...state,
                search: action.search,
            };
        case SET_AUTO_COMPLETE_COMICS:
            return {
                ...state,
                autoComplete: action.comics.map(obj=>({...obj, title: obj.title.replace(/\s\(.+/mg, "" )}))
                .filter((item) => {
                    if (action.comics.indexOf(item.title) === -1) {
                        action.comics.push(item.title);
                        return true
                    }
                    return false;
                }),
                };
        case SET_ADD_FAVORITES_COMICS:
            return {
                ...state,
                favorites: [...state.favorites, action.favoriteId]
            };
        case DELETE_FAVORITES_COMICS:
            return {
                ...state,
                favorites: state.favorites.filter((i) => i.id !== action.favoriteId),
                };    
        case SET_TOTAL_COMICS:
            return {
                ...state,
                totalComics: action.totalComics,
                };
        case SET_TOTAL_PAGES_COMICS:
            return {
                ...state,
                totalPages: action.totalPages,
                };
        default:
            return state;
    }
}

export let setComics = (comics) => ({
    type: SET_COMICS,
    comics: comics,
});
export let setComicsHomePage = (comics) => ({
    type: SET_COMICS_HOME_PAGE,
    comics,
});
export let setPage = (page) => ({
    type: SET_PAGE_COMICS,
    page: page
});
export let setSort = (sort) => ({
    type: SET_SORT_COMICS,
    sort: sort
});
export let updateSearch = (search) => ({
    type: SET_SEARCH_COMICS,
    search: search,
});
export let setAutoCompleteComics = (comics) => ({
    type: SET_AUTO_COMPLETE_COMICS,
    comics,
});
export let setTotalComics = (totalComics) => ({
    type: SET_TOTAL_COMICS,
    totalComics
});
export let setTotalPagesComics = (totalPages) => ({
    type: SET_TOTAL_PAGES_COMICS,
    totalPages
});
export let setAddFavorite = (favoriteId) => ({
    type: SET_ADD_FAVORITES_COMICS,
    favoriteId: favoriteId,
});
export let deleteFavorite = (favoriteId) => ({
    type: DELETE_FAVORITES_COMICS,
    favoriteId: favoriteId,
});

export const getComicsThunk = (search, sort, pageSize, page = 1) =>{
    return (dispatch) => {
        dispatch(setPage(page));
        dispatch(setFetching(true))
        comicsApi.getComics(search, sort, pageSize, page).then(response =>{
            dispatch(setComics(response.data.results))
            dispatch(setTotalComics(response.data.total))
            dispatch(setFetching(false))
    })
    }
}

export const getComicsAutoCompleteThunk = (search) =>{
    return (dispatch) => {

        comicsApi.getComicsAutoComplete(search).then(response =>{
            dispatch(setAutoCompleteComics(response.data.results))

    })
    }
}

export const sortChangeComicsThunk = (search, sort) =>{
    return (dispatch) => {
        dispatch(setPage(1));
        dispatch(setSort(sort));
        dispatch(setFetching(true))
        comicsApi.getComics(search, sort).then(response => {
            dispatch(setComics(response.data.results))
            dispatch(setTotalComics(response.data.total))
            dispatch(setFetching(false))
        })
    }
}

export const searchComicsThunk = (search, sort) =>{
    return (dispatch) => {
        dispatch(setPage(1));
        dispatch(updateSearch(search));
        dispatch(setFetching(true))
        comicsApi.getComics(search, sort).then(response => {
            dispatch(setComics(response.data.results))
            dispatch(setTotalComics(response.data.total))
            dispatch(setFetching(false))
        })
    }
}

export const getComicsHomePageThunk = (sliderSize) =>{
    return (dispatch) => {
        comicsApi.getComicsHomePage(sliderSize)
        .then(response =>{
            dispatch(setComicsHomePage(response.data.results))
    })
    }
}

export default comicsReducer;