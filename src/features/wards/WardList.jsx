import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteWard } from './wardSlice';

const WardList = ({ onEdit }) => {
  const dispatch = useDispatch();
  
  // Accessing both wards and patients to calculate individual ward occupancy
  const wards = useSelector((state) => state.wards.entries);
  const patients = useSelector((state) => state.patients.entries);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Hospital Wards</h2>
      <div className="grid gap-4">
        {wards.map((ward) => {
          // Calculate occupancy for this specific ward 
          const occupiedBeds = patients.filter(p => p.wardId === ward.id).length;
          const occupancyPercentage = (occupiedBeds / ward.capacity) * 100;

          return (
            <div key={ward.id} className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">Ward {ward.wardNumber} </h3>
                <p className="text-gray-600">Specialization: {ward.specialization} </p>
                <p className="text-sm">
                  Occupancy: **{occupiedBeds} / {ward.capacity}** ({occupancyPercentage.toFixed(1)}%) 
                </p>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => onEdit(ward)}
                  className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                {/* Delete functionality  */}
                <button 
                  onClick={() => dispatch(deleteWard(ward.id))}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
        {wards.length === 0 && <p className="text-gray-500">No wards registered yet.</p>}
      </div>
    </div>
  );
};

export default WardList;