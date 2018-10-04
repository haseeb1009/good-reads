import React, { Component } from 'react';
import SuggestionList from './SuggestionList'
import { connect } from 'react-redux';
import { searchBooks, selectBook } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import debounce from 'lodash/debounce';

export class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: '',
            selectedBook: {},
            error: ''
        };

        this.onInputChange.bind(this);
        this.searchBook.bind(this);
        this.onClickSearchAll.bind(this);

    };

    onInputChange = (event) => {
        const input = event.target.value.replace(/[\s`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').trim();
        this.setState({ input, error: '' });
        this.searchBook(input);
    };

    searchBook = debounce((input) => {
        this.props.searchBooks(input);
    }, 300);

    onClickSearchAll = (e) => {
        this.setState({ error: 'Enter book or auhor name...' });
    };

    render() {
        const { books = [] } = this.props;
        const { input, error } = this.state;

        return (
            <div className = "row">
                <div className = "col-sm-2">
                </div>
                <div className = "col-sm-8 search-bar">
                    <h1 className = 'centered'> Good Reads </h1>
                    <div className = "input-group">
                        <input type = "text" name="searchInput"
                            className = "form-control"
                            placeholder = "Search for book..."
                            onChange = { this.onInputChange } />

                        <span className = "input-group-btn">
                            {
                                input === '' || input === undefined ?
                                    <button className = "btn btn-primary"
                                        onClick = { this.onClickSearchAll }
                                    >
                                        See all <i className = "fa fa-search"></i>
                                    </button> :
                                    <Link to="/allbooks">
                                        <button className = "btn btn-primary">
                                            See all <i className = "fa fa-search"></i>
                                        </button>
                                    </Link>
                            }
                        </span>
                    </div>
                    <div className='searchError white'>
                        <h6> { error }</h6>
                    </div>

                    {
                        books === undefined || books === null || books === [] || input === '' ?
                            null :
                            (
                                <SuggestionList
                                    books={books}
                                    onSelectBook={this.props.selectBook}
                                />
                            )
                    }


                </div>
            </div>
        );
    }
};
function mapStateToProps(state, ownProps) {
    return {
        books: state.books
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        searchBooks,
        selectBook
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);