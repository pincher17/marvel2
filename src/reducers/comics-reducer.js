const SET_COMICS = "SET_COMICS";
const SET_PAGE = "SET_PAGE";
const SET_SORT = "SET_SORT";
const SET_SEARCH = "SET_SEARCH";
const SET_ADD_FAVORITES = "SET_ADD_FAVORITES";
const DELETE_FAVORITES = "DELETE_FAVORITES";

const defaultState = {
    items: [],
    offset: 0,
    page: 1,
    sort: "title",
    search: "",
    favorites: [],
};

function comicsReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_COMICS:
            return {
                ...state,
                items: [...action.comics],
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
        case SET_ADD_FAVORITES:
            return {
                ...state,
                favorites: [
                    ...state.favorites,
                    state.items.find((item) => item.id == action.favoriteId),
                ],
            };
        case DELETE_FAVORITES:
            //let deleteFavorite = state.favorites.indexOf(state.items.find(item => item.id == action.favoriteId))
            return {
                ...state,
                favorites: state.favorites.filter((i) => i.id !== action.favoriteId),
            };
        default:
            return state;
    }
}

export let setComicsActionCreator = (comics) => ({
    type: SET_COMICS,
    comics: comics,
});
export let setPageActionCreator = (page) => ({
    type: SET_PAGE,
    page: page
});
export let setSortActionCreator = (sort) => ({
    type: SET_SORT,
    sort: sort
});
export let setSearchActionCreator = (search) => ({
    type: SET_SEARCH,
    search: search,
});
export let setAddFavoriteActionCreator = (favoriteId) => ({
    type: SET_ADD_FAVORITES,
    favoriteId: favoriteId,
});
export let deleteFavoriteActionCreator = (favoriteId) => ({
    type: DELETE_FAVORITES,
    favoriteId: favoriteId,
});

export default comicsReducer;