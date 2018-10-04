import React, { Component } from 'react';
import BookListItem from './BookListItem';
import { selectBook } from '../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";


class BookList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalPages: this.props.books.length / 5,
      activePage: 1,
      books: (props.books.length < 5) ? 
      props.books.slice(0, props.books.length) : props.books.slice(0, 5)
    };

    this.handlePageChange.bind(this);
  }

  handlePageChange = (pageNumber) => {
    const totalBooks = this.props.books.length;
    const end = 5 * pageNumber;
    const limit = end > totalBooks ? totalBooks : end;
    const start = (limit) - 5;
    this.setState({ activePage: pageNumber,
      books: this.props.books.slice(start, limit)
     });
   
  }

  render() {
    const { books, input, totalResults } = this.props

    return (
      <div className='book-list'>
        <h2 className='white centered'> Search Results for '{ input }'</h2>
        {
          this.props.books.length === 0 ?
            <h3 className='no-result-error'>No results found</h3> :
            <h5 className='white centered'> { totalResults } results</h5>
        }
        <ul className="col-md-12">
          {
            this.state.books.map((book) => {
              return (
                <BookListItem book={book}
                  onSelectBook={ this.props.selectBook }
                  key={book.id[0]._}
                />
              );
            })
          }
        </ul>
        {
          this.props.books === [] || this.props.books === undefined || this.props.books.length === 0 ? 
          null :
          <div className="col-md-12">
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={5}
              totalItemsCount={books.length}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
            />
            </div>
        }
          <h5 className = 'centered white'>
            Page {this.state.activePage} of {this.state.totalPages} 
          </h5>
        <div className = 'col-md-12'>
          <Link to="/" >
              <button className="btn btn-primary item-centered">
                  Back to Home
              </button>
          </Link>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
      books: state.books,
      input: state.input,
      totalResults: state.totalResults
  }
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      selectBook
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);