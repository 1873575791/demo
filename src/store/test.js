import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getData = createAsyncThunk(
    'test/getData',
    async () => {
        try {
            await fetch('https://jsonplaceholder.typicode.com/todos/1');
            return 1
        } catch (error) {
            console.log(error);
            return 0
        }
    }
  )

export const testSlice = createSlice({
    name: 'test',
    initialState: {
      value: 0
    },
    reducers: {
      increment: (state, action) => {
        const { payload } = action
        state.value += payload
      },
      decrement: state => {
        state.value -= 1
      },
      incrementByAmount: (state, action) => {
        state.value += action.payload
      }
    },
    extraReducers: (builder) => {
        builder
          .addCase(getData.fulfilled, (state, action) => {
            state.value += action.payload
          })
    },
  })
  // 每个 case reducer 函数会生成对应的 Action creators
  export const { increment, decrement, incrementByAmount } = testSlice.actions
  
  export default testSlice.reducer