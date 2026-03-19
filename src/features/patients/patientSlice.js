// src/features/patients/patientSlice.js
import { createSlice } from '@reduxjs/toolkit';

const patientSlice = createSlice({
  name: 'patients',
  initialState: {
    entries: [], // List of all patients [cite: 11]
    status: 'idle', 
  },
  reducers: {
    addPatient: (state, action) => {
      // action.payload contains: name, age, gender, medical history, contact, ward [cite: 7]
      state.entries.push(action.payload);
    },
    updatePatient: (state, action) => {
      const index = state.entries.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.entries[index] = action.payload; // [cite: 9, 10]
      }
    },
    deletePatient: (state, action) => {
      state.entries = state.entries.filter(p => p.id !== action.payload); // [cite: 11]
    },
  },
});

export const { addPatient, updatePatient, deletePatient } = patientSlice.actions;
export default patientSlice.reducer;