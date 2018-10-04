import React from 'react';
import { Link } from 'react-router-dom';

const suggestionList = ({books, onSelectBook }) => {

    return (
        <div className='suggestion-list-container' >
        {
            books.slice(0, 5).map((book) =>
            <Link to='/bookdetail' key={book.id[0]._}>
                <li className='suggestion-list'
                    onClick={() => onSelectBook(book)}
                     >

                    <img src={book.best_book[0].small_image_url}
                        width='40px' height='50px' />
                        
                    Title : {book.best_book[0].title}  by  {book.best_book[0].author[0].name}
                </li>
            </Link>
            )
        }
            
        </div>
    );
};

export default suggestionList;