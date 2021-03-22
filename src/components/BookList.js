import React, {Component} from 'react';
import Shelf from './Shelf';
import {Link} from 'react-router-dom';
import {PropTypes} from 'prop-types';

class BookList extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired
    };

    render() {
        const books = this.props.books

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Shelf books={books.filter((book) => (book.shelf === "currentlyReading"))} title="Currently Reading" onChangeShelf={this.props.onChange}/>

                        <Shelf books={books.filter((book) => (book.shelf === "wantToRead"))} title="Want to Read" onChangeShelf={this.props.onChange}/>
                        <Shelf books={books.filter((book) => (book.shelf === "read"))} title="Read" onChangeShelf={this.props.onChange}/>
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>
                        <button>Add a book</button>
                    </Link>
                </div>
            </div>
        );
    }
};

export default BookList;