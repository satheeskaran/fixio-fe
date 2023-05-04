import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  reports: []
}

export const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    addReport: (state, action) => {
      const report = [...state.reports, {...action.payload, id: state.reports.length == 0 ? 1 
        : state.reports[state.reports.length - 1].id + 1}];

      //sort by id
      const sortedReports = report.sort((a, b) => new Date(b.id) - new Date(a.id));
      state.reports = sortedReports
    },
  },
})

export const { addReport } = reportsSlice.actions;

export default reportsSlice.reducer;