import React from 'react';
import { Link } from 'react-router-dom';

const bookListItem = ({ book, onSelectBook }) => {

    const smallImgURL = book.best_book[0].image_url;

    return (
        <li className="list-group-item col-md-12">

            <div className="media">
                <div className="media-left">
                    <img
                        className="media-object"
                        src={smallImgURL}
                        alt='Book Cover'
                    />
                </div>

                <div className="media-body">
                    <Link to='/bookdetail' >
                        <div className="media-heading" onClick = {() => onSelectBook(book)} >
                            <strong>Title : </strong> {book.best_book[0].title}
                        </div>
                    </Link>

                    <div>
                        <strong>Author : </strong> {book.best_book[0].author[0].name}
                    </div>

                    <div>
                        <strong>Rating : </strong> {book.ratings_count[0]._}
                    </div>

                    <div>
                        <strong>Publication Year : </strong> {book.original_publication_year[0]._}
                    </div>
                </div>
            </div>
        </li>
    );
};
export default bookListItem;