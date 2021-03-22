import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Book from './Book';
import {PropTypes} from 'prop-types';
import * as BooksAPI from '../BooksAPI'

class Search extends Component {
    state = {
        Books: [],
        query: '',
        searchErr: false,
    };

    static propTypes = {
        onChange: PropTypes.func.isRequired,
        myBooks: PropTypes.array.isRequired
    };

    handleChange = (event) => {
        var value = event.target.value
        this.setState(() => {
            return {query: value}
        })
        this.search_books(value)
    };

    changeBookShelf = (books) => {
        let all_Books = this.props.myBooks
        for (let book of books) {
            book.shelf = "none"
        };

        for (let book of books) {
            for (let b of all_Books) {
                if (b.id === book.id) {
                    book.shelf = b.shelf
                }
            }
        }
        return books
    };

    search_books = (val) => {
        if (val.length !== 0) {
            BooksAPI.search(val, 10).then((books) => {
                if (books.length > 0) {
                    books = books.filter((book) => (book.imageLinks))
                    books = this.changeBookShelf(books)
                    this.setState(() => {
                        return {Books: books}
                    })
                }
            })
        } else {
            this.setState({Books: [], query: '', searchErr: false})

        }
    };
    add_book = (book, shelf) => {
        this.props.onChange(book, shelf)
    };

    render() {
        const {Books, searchErr} = this.state;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="search-books-results">
                    {Books.length > 0 && (
                        <div>
                        <h3>Your search returned {Books.length} books </h3>
                    <ol className="books-grid">
                        {Books.map(book =>
                            (<Book book={book} key={book.id}  onUpdate={(shelf) => {
                                this.add_book(book, shelf)}}/>
                                ))}
                    </ol>
                        </div>
                    )}
                    {searchErr && (
                        <h3>No books found. Please try again.</h3>
                    )}
                    </div>
            </div>
        );
    }
};

export default Search;