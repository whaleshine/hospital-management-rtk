import React, { useState } from 'react';
import HospitalView from './features/hospital/HospitalView';
import PatientList from './features/patients/PatientList';
import PatientForm from './features/patients/PatientForm';
import WardManagement from './features/wards/WardManagement';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <nav className="w-full md:w-64 bg-slate-900 text-white p-6 space-y-4">
        <h1 className="text-xl font-bold border-b border-slate-700 pb-4 mb-6">
          CareStream HMS [cite: 1]
        </h1>
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`w-full text-left p-2 rounded transition ${activeTab === 'dashboard' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}
        >
          Hospital Dashboard 
        </button>
        <button 
          onClick={() => setActiveTab('patients')}
          className={`w-full text-left p-2 rounded transition ${activeTab === 'patients' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}
        >
          Patient Management [cite: 3]
        </button>
        <button 
          onClick={() => setActiveTab('wards')}
          className={`w-full text-left p-2 rounded transition ${activeTab === 'wards' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}
        >
          Ward Management 
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Hospital Overview </h2>
            <HospitalView />
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-blue-800">Quick Actions</h3>
              <p className="text-sm text-gray-500 mb-4">Register new admissions or configure facility capacity.</p>
              <div className="flex gap-4">
                <button onClick={() => setActiveTab('patients')} className="bg-blue-100 text-blue-700 px-4 py-2 rounded font-medium">Add Patient</button>
                <button onClick={() => setActiveTab('wards')} className="bg-green-100 text-green-700 px-4 py-2 rounded font-medium">Add Ward</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'patients' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <PatientForm />
            </div>
            <div className="lg:col-span-2">
              <PatientList />
            </div>
          </div>
        )}

        {activeTab === 'wards' && (
          <WardManagement />
        )}
      </main>
    </div>
  );
};

export default App;
