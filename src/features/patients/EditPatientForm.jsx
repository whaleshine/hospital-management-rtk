// src/features/patients/EditPatientForm.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePatient } from './patientSlice';

const EditPatientForm = ({ patientId, onCancel }) => {
  const dispatch = useDispatch();
  
  // 1. Find the specific patient in the Redux store
  const patientToEdit = useSelector((state) => 
    state.patients.entries.find((p) => p.id === patientId)
  );
  const wards = useSelector((state) => state.wards.entries);

  // 2. Initialize local form state
  const [formData, setFormData] = useState({
    name: '', age: '', gender: '', medicalHistory: '', contact: '', wardId: ''
  });

  // 3. Sync Redux data to local state when the component mounts
  useEffect(() => {
    if (patientToEdit) {
      setFormData(patientToEdit);
    }
  }, [patientToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 4. Dispatch the updated data back to Redux
    dispatch(updatePatient(formData)); 
    onCancel(); // Close the edit mode
  };

  if (!patientToEdit) return <p>Patient not found.</p>;

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-blue-50 border-2 border-blue-200 rounded-lg space-y-4">
      <h2 className="text-xl font-bold text-blue-800">Edit Patient Record</h2>
      
      {/* Name, Age, and Gender Fields  */}
      <input 
        type="text" 
        className="w-full p-2 border rounded"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        placeholder="Name"
      />

      <div className="flex gap-4">
        <input 
          type="number" 
          className="w-1/2 p-2 border rounded"
          value={formData.age}
          onChange={(e) => setFormData({...formData, age: e.target.value})}
          placeholder="Age"
        />
        <select 
          className="w-1/2 p-2 border rounded"
          value={formData.gender}
          onChange={(e) => setFormData({...formData, gender: e.target.value})}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Medical History and Contact Info  */}
      <textarea 
        className="w-full p-2 border rounded"
        value={formData.medicalHistory}
        onChange={(e) => setFormData({...formData, medicalHistory: e.target.value})}
        placeholder="Medical History"
      />

      <input 
        type="text" 
        className="w-full p-2 border rounded"
        value={formData.contact}
        onChange={(e) => setFormData({...formData, contact: e.target.value})}
        placeholder="Contact Information"
      />

      {/* Assigned Ward  */}
      <select 
        className="w-full p-2 border rounded"
        value={formData.wardId}
        onChange={(e) => setFormData({...formData, wardId: e.target.value})}
      >
        {wards.map(ward => (
          <option key={ward.id} value={ward.id}>Ward {ward.wardNumber}</option>
        ))}
      </select>

      <div className="flex gap-2">
        <button type="submit" className="flex-1 bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Save Changes
        </button>
        <button type="button" onClick={onCancel} className="flex-1 bg-gray-400 text-white p-2 rounded hover:bg-gray-500">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditPatientForm;