const SET_COMICS = "SET_COMICS";
const SET_PAGE_COMICS = "SET_PAGE_COMICS";
const SET_SORT_COMICS = "SET_SORT_COMICS";
const SET_SEARCH_COMICS = "SET_SEARCH_COMICS";
const SET_ADD_FAVORITES_COMICS = "SET_ADD_FAVORITES_COMICS";
const DELETE_FAVORITES_COMICS = "DELETE_FAVORITES_COMICS";

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
        case SET_ADD_FAVORITES_COMICS:
            return {
                ...state,
                favorites: [
                    ...state.favorites,
                    state.items.find((item) => item.id == action.favoriteId),
                ],
            };
        case DELETE_FAVORITES_COMICS:
            //let deleteFavorite = state.favorites.indexOf(state.items.find(item => item.id == action.favoriteId))
            return {
                ...state,
                favorites: state.favorites.filter((i) => i.id !== action.favoriteId),
            };
        default:
            return state;
    }
}

export let setComics = (comics) => ({
    type: SET_COMICS,
    comics: comics,
});
export let setPage = (page) => ({
    type: SET_PAGE_COMICS,
    page: page
});
export let setSort = (sort) => ({
    type: SET_SORT_COMICS,
    sort: sort
});
export let setSearch = (search) => ({
    type: SET_SEARCH_COMICS,
    search: search,
});
export let setAddFavorite = (favoriteId) => ({
    type: SET_ADD_FAVORITES_COMICS,
    favoriteId: favoriteId,
});
export let deleteFavorite = (favoriteId) => ({
    type: DELETE_FAVORITES_COMICS,
    favoriteId: favoriteId,
});

export default comicsReducer;