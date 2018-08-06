import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'
class ListBooks extends Component {

    state = {
        currentlyReading: [],
        wantToRead: [],
        read: []
    }

    componentDidMount() {
        this.filterBookList();
    }

    componentDidUpdate(prevProps) {
        //if the books from prevProps differ from the ones in current props, filter the book list and update the state
        if (JSON.stringify(prevProps.books) !== JSON.stringify(this.props.books)) {
            this.filterBookList();
        }
    }

    filterBookList() {
        //filter the books by the corresponding shelves
        const currentlyReading = this.props.books.filter(book => book.shelf === 'currentlyReading');
        const wantToRead = this.props.books.filter(book => book.shelf === 'wantToRead');
        const read = this.props.books.filter(book => book.shelf === 'read');
        this.setState({ currentlyReading, wantToRead, read });
    }

    render() {
        const { onChangeBookState, listTitle } = this.props;

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>{listTitle}</h1>
                </div>
                <div className="list-books-content">
                    <Bookshelf books={this.state.currentlyReading} title='Currently Reading' onChangeBookState={onChangeBookState} />
                    <Bookshelf books={this.state.wantToRead} title='Want to Read' onChangeBookState={onChangeBookState} />
                    <Bookshelf books={this.state.read} title='Read' onChangeBookState={onChangeBookState} />
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>
        )
    }
}

export default ListBooks


