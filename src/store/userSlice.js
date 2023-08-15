import {createSlice} from '@reduxjs/toolkit'
// redux사용하기 위한 format

let user = createSlice({
    // key,value
    name : 'user',
    initialState : {name : 'park', age : 20},
    reducers : {
        // 값을 변경할 함수
        changeName(state){
            state.name = 'JJam';
        },
        changeAge(state, action){
            state.age += action.payload;
            // payload로 파라미터값이 입력되면 이용하여 변화주면된다.
        }
    }
})

export let {changeName, changeAge} = user.actions

export default user