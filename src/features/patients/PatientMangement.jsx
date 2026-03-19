// src/features/patients/PatientManagement.jsx
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addPatient, deletePatient} from './patientSlice';

const PatientManagement = () => {
    const dispatch = useDispatch();
    const patients = useSelector((state) => state.patients.entries);
    const wards = useSelector((state) => state.wards.entries);
    const [name, setName] = useState('');
    const [selectedWard, setSelectedWard] = useState('');

    const handleAdd = (e) => {
        e.preventDefault();
        if (!selectedWard) 
            return alert("Ward assignment is required.");
        
        dispatch(addPatient({id: Date.now(), name, wardId: selectedWard}));
        setName('');
    };

    return (
        <div className="space-y-6">
            <form onSubmit={handleAdd}
                className="p-4 bg-white shadow rounded space-y-3">
                <h2 className="font-bold">Add Patient</h2>
                <input value={name}
                    onChange={
                        (e) => setName(e.target.value)
                    }
                    placeholder="Patient Name"
                    className="w-full border p-2"
                    required/>
                <select value={selectedWard}
                    onChange={
                        (e) => setSelectedWard(e.target.value)
                    }
                    className="w-full border p-2"
                    required>
                    <option value="">Select Ward</option>
                    {
                    wards.map(w => <option key={
                            w.id
                        }
                        value={
                            w.id
                    }>Ward {
                        w.wardNumber
                    }</option>)
                } </select>
                <button className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
            </form>

            {/* <div className="space-y-2">
                {
                patients.map(p => (
                    <div key={
                            p.id
                        }
                        className="p-3 bg-white border flex justify-between items-center">
                        <span>{
                            p.name
                        }
                            (Ward: {
                            wards.find(w => w.id == p.wardId) ?. wardNumber
                        })</span>
                        <button onClick={
                                () => dispatch(deletePatient(p.id))
                            }
                            className="text-red-500">Delete</button>
                    </div>
                ))
            } </div> */}
        </div>
    );
};

export default PatientManagement;
