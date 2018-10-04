import * as ActionType from '../actions/index';
export default function bookReducer(state = [], action) {

    const initialState = {
        input: '',
        books: [],
        selectedBook: {},
        searching: false,
        error: null
    };
 
    switch (action.type) {
        
        case ActionType.SEARCH_BOOK_LOADING: {
            return { ...state, searching: true };
        }

        case ActionType.SEARCH_BOOK_FAILURE: {
            return {
                ...state,
                searching: false,
                error: action.error
            };
        }

        case ActionType.SEARCH_BOOK_SUCCESS: {
            return {
                ...state,
                totalResults: action.payload.totalResults,
                books: action.payload.books,
                input: action.payload.input,
                searching: false
            };
        }

        case ActionType.SELECT_BOOK: {
            return {
                ...state,
                selectedBook: action.payload,
                books: []
            };
        }
        default: {
            return state;
        }
    }
}