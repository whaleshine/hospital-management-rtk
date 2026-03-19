// src/features/wards/wardSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entries: [], // Stores ward objects [cite: 16]
};

const wardSlice = createSlice({
  name: 'wards',
  initialState,
  reducers: {
    // Add a new ward record [cite: 13]
    addWard: (state, action) => {
      state.entries.push(action.payload);
    },
    // Edit existing ward details like capacity or specialization [cite: 14]
    updateWard: (state, action) => {
      const index = state.entries.findIndex(w => w.id === action.payload.id);
      if (index !== -1) {
        state.entries[index] = action.payload;
      }
    },
    // Delete a ward record [cite: 15]
    deleteWard: (state, action) => {
      state.entries = state.entries.filter(w => w.id !== action.payload);
    },
  },
});

export const { addWard, updateWard, deleteWard } = wardSlice.actions;
export default wardSlice.reducer;