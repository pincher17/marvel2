const SET_SELECT_SLIDE_CHARACTERS = 'SET_SELECT_SLIDE_CHARACTERS'
const SET_SELECT_SLIDE_COMICS = 'SET_SELECT_SLIDE_COMICS'

const defaultState = {
    selectSlideCharacters: 0,
    selectSlideComics: 0,
}

function sliderReducer(state = defaultState, action){
   
    switch(action.type){

        case SET_SELECT_SLIDE_COMICS:
            return {
                ...state,
                selectSlideComics: action.slide
            };
        case SET_SELECT_SLIDE_CHARACTERS:
            return {
                ...state,
                selectSlideCharacters: action.slide
                };
        default:
            return state;
    }
}


export let setSelectSlideCharacters = (slide) => ({
    type: SET_SELECT_SLIDE_CHARACTERS,
    slide,
});

export let setSelectSlideComics = (slide) => ({
    type: SET_SELECT_SLIDE_COMICS,
    slide,
});


export default sliderReducer;