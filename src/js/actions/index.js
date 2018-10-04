import { parseString as parseXML } from 'xml2js';
import getOr from 'lodash/fp/getOr';

export const SEARCH_BOOK_LOADING = 'SEARCH_BOOK_LOADING';
export const SEARCH_BOOK_SUCCESS = 'SEARCH_BOOK_SUCCESS';
export const SEARCH_BOOK_FAILURE = 'SEARCH_BOOK_FAILURE';
export const SELECT_BOOK = 'SELECT_BOOK';

const API_KEY = 'OYYnRUXWMguKzz6mgTYBfA';
const ROOT_URL = `https://www.goodreads.com/search.xml?key=${API_KEY}`;


export function searchBooks (term) {
    
    const url = `${ROOT_URL}&q=${term}`;
    
    return dispatch => {
        const url = `${ROOT_URL}&q=${term}`;
        dispatch({
            type: SEARCH_BOOK_LOADING
        })

        fetch(url)
            .then(response => {
                return response.text()
            })
            .then(xml => {
                parseXML(xml, (error, result) => {
                    console.log(result.GoodreadsResponse.search[0].results[0].work);
                    console.log(result.GoodreadsResponse.search[0]['total-results']);
                    return dispatch({
                        type: SEARCH_BOOK_SUCCESS,
                        payload:{
                            input: term,
                            totalResults: result.GoodreadsResponse.search[0]['total-results'],
                            books:getOr([], 'GoodreadsResponse.search[0].results[0].work')(result)
                        } 
                    })
                });
            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: SEARCH_BOOK_FAILURE,
                    payload: error
                })
            })
    }
};

export function selectBook(book){
    return {
        type: SELECT_BOOK,
        payload: book
    }
} 