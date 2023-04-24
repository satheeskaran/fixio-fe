import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  reports: []
}

export const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    addReport: (state, action) => {
      state.reports = [...state.reports, {...action.payload, id: state.reports.length == 0 ? 1 
        : state.reports[state.reports.length - 1].id + 1}]
    },
  },
})

export const { addReport } = reportsSlice.actions

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state) => state.counter.value

export default reportsSlice.reducer