import React, { useState } from 'react';
import WardForm from './WardForm';
import WardList from './WardList';

const WardManagement = () => {
  const [selectedWardForEdit, setSelectedWardForEdit] = useState(null);

  const handleClearSelection = () => {
    setSelectedWardForEdit(null);
  };

  const startEdit = (ward) => {
    setSelectedWardForEdit(ward);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div>
      <WardForm existingWard={selectedWardForEdit} clearSelection={handleClearSelection} />
      <WardList onEdit={startEdit} />
      </div>
    </div>
  );
};

export default WardManagement;
