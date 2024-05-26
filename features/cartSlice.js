import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    books: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addBook: (state, action) => {
            const bookExists = state.books.filter(book => book.id == action.payload.id)
            if(bookExists.length == 0){
                state.books.push(action.payload)
            }
        },
		removeBook: (state, action) => {
			const bookExists = state.books.filter(book => book.id == action.payload)
			if(bookExists.length !== 0) {
				state.books = state.books.filter(book => book.id !== action.payload)
			}
		},
		incrementQnt: (state, action) => {
			const bookExists = state.books.find(book => book.id == action.payload)
			if(bookExists && bookExists.qnt < bookExists.availableCopies){
				bookExists.qnt++
			}
		},

		decrementQnt: (state, action) => {
			const bookExists = state.books.find(book => book.id == action.payload)
			if(bookExists && bookExists.qnt > 1){
				bookExists.qnt--
			}
		},
    }
})

export const { addBook, removeBook, incrementQnt, decrementQnt } = cartSlice.actions

export default cartSlice.reducer
