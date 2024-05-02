import React, { useState } from 'react';

function ApiKeyModal({ setApiKey }) {
  const [tempApiKey, setTempApiKey] = useState('');

  const handleInputChange = (e) => setTempApiKey(e.target.value);

  const saveApiKey = () => {
    setApiKey(tempApiKey);
  };

  return (
    <div className="api-key-modal">
      <div className="modal-content">
        <h2>Enter API Key</h2>
        <input type="text" placeholder="API Key" value={tempApiKey} onChange={handleInputChange} />
        <button onClick={saveApiKey}>Save API Key</button>
      </div>
    </div>
  );
}

export default ApiKeyModal;
