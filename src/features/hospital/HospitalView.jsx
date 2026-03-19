// src/features/hospital/HospitalView.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const HospitalView = () => {
  const patients = useSelector((state) => state.patients.entries);
  const wards = useSelector((state) => state.wards.entries);

  const totalPatients = patients.length;
  const totalCapacity = wards.reduce((acc, ward) => acc + Number(ward.capacity), 0);
  const occupancyRate = totalCapacity > 0 ? (totalPatients / totalCapacity) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
      <div className="p-4 bg-white shadow rounded">
        <h3 className="text-gray-500 text-sm font-bold uppercase">Total Patients</h3>
        <p className="text-2xl font-bold">{totalPatients}</p>
      </div>
      <div className="p-4 bg-white shadow rounded">
        <h3 className="text-gray-500 text-sm font-bold uppercase">Occupancy Rate</h3>
        <p className="text-2xl font-bold">{occupancyRate.toFixed(1)}%</p>
      </div>
    </div>
  );
};

export default HospitalView;