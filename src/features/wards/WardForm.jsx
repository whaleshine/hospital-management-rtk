import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addWard, updateWard } from './wardSlice';

const WardForm = ({ existingWard, clearSelection }) => {
  const dispatch = useDispatch();

  // Initial state for adding a new ward
  const [formData, setFormData] = useState({
    wardNumber: '',
    capacity: '',
    specialization: 'General'
  });

  // If we receive an 'existingWard' prop, we are in "Edit Mode" 
  useEffect(() => {
    if (existingWard) {
      setFormData(existingWard);
    }
  }, [existingWard]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (existingWard) {
      // Logic for editing an existing ward 
      dispatch(updateWard(formData));
      clearSelection(); // Reset the parent's selection state
    } else {
      // Logic for adding a new ward [cite: 13]
      dispatch(addWard({ ...formData, id: Date.now() }));
    }

    // Reset local form state after submission
    setFormData({ wardNumber: '', capacity: '', specialization: 'General' });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg space-y-4">
      <h2 className="text-xl font-bold text-gray-800">
        {existingWard ? 'Edit Ward Details' : 'Register New Ward'}
      </h2>
      
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-600">Ward Number [cite: 13]</label>
        <input 
          type="text" 
          placeholder="e.g., 101" 
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none"
          value={formData.wardNumber}
          onChange={(e) => setFormData({...formData, wardNumber: e.target.value})}
          required 
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-600">Total Capacity [cite: 13]</label>
        <input 
          type="number" 
          placeholder="Number of beds" 
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none"
          value={formData.capacity}
          onChange={(e) => setFormData({...formData, capacity: e.target.value})}
          required 
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-600">Specialization [cite: 13]</label>
        <select 
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none"
          value={formData.specialization}
          onChange={(e) => setFormData({...formData, specialization: e.target.value})}
        >
          <option value="General">General</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Surgery">Surgery</option>
          <option value="ICU">ICU</option>
        </select>
      </div>

      <div className="flex gap-2 pt-2">
        <button 
          type="submit" 
          className="flex-1 bg-green-600 text-white p-2 rounded font-bold hover:bg-green-700 transition"
        >
          {existingWard ? 'Save Changes' : 'Add Ward'}
        </button>
        
        {existingWard && (
          <button 
            type="button" 
            onClick={clearSelection}
            className="flex-1 bg-gray-400 text-white p-2 rounded font-bold hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default WardForm;