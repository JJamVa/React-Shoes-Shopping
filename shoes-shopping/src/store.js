import { configureStore, createSlice } from '@reduxjs/toolkit'
// redux사용하기 위한 format
import user from './store/userSlice.js'
// 함수를 이름 지정 후, export

let stock = createSlice({
    name : 'stock',
    initialState : [10,11,12]
})

let tableItems = createSlice({
    name : 'tableItems',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
      ],
    reducers:{
        addCount(state, action){
            let num = state.findIndex((e) => e.id === action.payload)
            state[num].count++ 
        },
        addItem(state,action){
            state.push(action.payload)
        }
    }
})

export let {addCount, addItem} = tableItems.actions

export default configureStore({
    reducer: {
        user : user.reducer,
        stock : stock.reducer,
        tableItems : tableItems.reducer
    }
}) 