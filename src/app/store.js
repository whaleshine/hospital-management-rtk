// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import patientReducer from '../features/patients/patientSlice';
import wardReducer from '../features/wards/wardSlice';

export const store = configureStore({
  reducer: {
    patients: patientReducer,
    wards: wardReducer,
  },
});