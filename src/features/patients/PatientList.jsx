import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePatient } from "./patientSlice";

const PatientList = () => {
  const dispatch = useDispatch();

  // Get data from Redux store [cite: 3, 11]
  const patients = useSelector((state) => state.patients.entries);
  const wards = useSelector((state) => state.wards.entries);

  // Local state for UI-only filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWard, setSelectedWard] = useState("All");

  // DERIVED STATE: Filtered list based on search and ward selection
  const filteredPatients = patients.filter((patient) => {
    const matchesName = patient.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesWard =
      selectedWard === "All" || patient.wardId === Number(selectedWard);
    return matchesName && matchesWard;
  });

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name..."
          className="p-2 border rounded w-full md:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />{" "}
        {/* Ward Filter */}
        <select
          className="p-2 border rounded w-full md:w-1/4"
          value={selectedWard}
          onChange={(e) => setSelectedWard(e.target.value)}
        >
          <option value="All">All Wards</option>
          {wards.map((ward) => (
            <option key={ward.id} value={ward.id}>
              Ward {ward.wardNumber}
            </option>
          ))}{" "}
        </select>
      </div>

      <div className="grid gap-4">
        {filteredPatients.map((patient) => {
          const wardInfo = wards.find((w) => w.id === patient.wardId);

          return (
            <div
              key={patient.id}
              className="p-4 bg-white border rounded shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold">
                    {patient.name}({patient.age})
                  </h3>
                  <p className="text-sm text-blue-600 font-medium">
                    {wardInfo
                      ? `Ward: ${wardInfo.wardNumber} - ${wardInfo.specialization}`
                      : "No Ward Assigned"}{" "}
                  </p>
                </div>
                <button
                  onClick={() => onEdit(patient)}
                  className="text-yellow-500 hover:text-yellow-700 font-bold"
                >
                  Edit
                </button>
                <button
                  onClick={() => dispatch(deletePatient(patient.id))}
                  // Requirement: Delete record
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  Delete
                </button>
              </div>

              {/* Requirement: View individual details  */}
              <div className="mt-3 text-sm text-gray-700">
                <p>
                  <strong>Medical History:</strong>
                  {patient.medicalHistory || "N/A"}
                </p>
                <p>
                  <strong>Contact:</strong>
                  {patient.contact || "N/A"}
                </p>
              </div>
            </div>
          );
        })}
        {filteredPatients.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            No patients found matching your criteria.
          </p>
        )}{" "}
      </div>
    </div>
  );
};

export default PatientList;
