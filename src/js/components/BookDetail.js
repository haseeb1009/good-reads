import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const bookDetail = (props) => {
    const selectedBook = props.selectedBook;

    if (selectedBook === null || selectedBook === undefined) {
        return <div className='centered white'> Please Select a book</div>;
    }

    else {
        const bestBook = selectedBook.best_book[0];
        const imgUrl = bestBook.image_url;
        

        return (
            <div>
            <div className='row book-detail' >
                <h1 className = 'book-detail-title'> Book Details </h1>
                <div className="col-sm-2">
                </div>
                <div className='col-sm-4'>
                    <div className='book-detail-image' >
                        <img src={imgUrl}
                            alt='Book Cover'
                            height='250px'
                            width='180px' />
                    </div>
                </div>
                <div className='col-sm-4 bookDtail-text'>
                    <h3 > Book Title : { bestBook.title } </h3>
                    <h3> Author : { bestBook.author[0].name } </h3>
                    <h3> Publication Year : { selectedBook.original_publication_year[0]._ } </h3>
                    <h4> Rating : { selectedBook.ratings_count[0]._ } </h4>
                    <h4> Reviews : { selectedBook.text_reviews_count[0]._ }  </h4>
                </div>
                <div class="col-sm-2">
                </div>
            </div>
            <div class="col-sm-12">
                <Link to="/" >
                    <button className="btn btn-primary item-centered" type="button">
                        Back to Home
                    </button>
                </Link>
                </div>
            </div>
        );
    }

};

function mapStateToProps(state) {
    return {
        selectedBook: state.selectedBook
    }
};

export default connect(mapStateToProps)(bookDetail);