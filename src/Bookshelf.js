import React, { Component } from 'react'
import Book from './Book'

class Bookshelf extends Component {

    render() {
        //set title and books
        const { books, title, onChangeBookState } = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className='books-grid'>
                        {books.map((book) =>
                            <li key={book.id}>
                                <Book url={book.imageLinks && book.imageLinks.thumbnail} title={book.title} authors={book.authors} id={book.id} shelf={book.shelf} onChangeBookState={onChangeBookState} />
                            </li>
                        )}
                    </ol>

                </div>
            </div>
        )
    }
}

export default Bookshelf


