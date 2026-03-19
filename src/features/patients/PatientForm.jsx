// src/features/patients/PatientForm.jsx
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addPatient} from './patientSlice';

const PatientForm = () => {
    const dispatch = useDispatch();
    // Get wards from the store so we can assign the patient to one
    const wards = useSelector((state) => state.wards.entries);


    // Local state for the form [cite: 7]
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: 'Male',
        medicalHistory: '',
        contact: '',
        wardId: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create a unique ID (in a real app, the DB does this)
        const newPatient = {
            ...formData,
            id: Date.now(),
            wardId: parseInt(formData.wardId, 10)
        };

        // DISPATCH: Sending the data to the Redux store
        dispatch(addPatient(newPatient));

        // Clear form
        setFormData({
            name: '',
            age: '',
            gender: 'Male',
            medicalHistory: '',
            contact: '',
            wardId: ''
        });
    };

    return (
        <form onSubmit={handleSubmit}
            className="p-6 bg-white shadow-md rounded-lg space-y-4">
            <h2 className="text-xl font-bold">Add New Patient</h2>

            <input type="text" placeholder="Patient Name" className="w-full p-2 border rounded"
                value={
                    formData.name
                }
                onChange={
                    (e) => setFormData({
                        ...formData,
                        name: e.target.value
                    })
                }
                required/>

            <div className="flex gap-4">
                <input type="number" placeholder="Age" className="w-1/2 p-2 border rounded"
                    value={
                        formData.age
                    }
                    onChange={
                        (e) => setFormData({
                            ...formData,
                            age: e.target.value
                        })
                    }/>
                <select className="w-1/2 p-2 border rounded"
                    value={
                        formData.gender
                    }
                    onChange={
                        (e) => setFormData({
                            ...formData,
                            gender: e.target.value
                        })
                }>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <textarea placeholder="Medical History" className="w-full p-2 border rounded"
                value={
                    formData.medicalHistory
                }
                onChange={
                    (e) => setFormData({
                        ...formData,
                        medicalHistory: e.target.value
                    })
                }/> {/* Requirement: Select an assigned ward [cite: 8] */}
            <select className="w-full p-2 border rounded"
                value={
                    formData.wardId
                }
                onChange={
                    (e) => setFormData({
                        ...formData,
                        wardId: e.target.value
                    })
                }
                required>
                <option value="">Select Ward</option>
                {
                wards.map(ward => (
                    <option key={
                            ward.id
                        }
                        value={
                            ward.id
                    }>
                        Ward {
                        ward.wardNumber
                    }
                        - {
                        ward.specialization
                    } </option>
                ))
            } </select>

            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                Register Patient
            </button>
        </form>
    );
};

export default PatientForm;
