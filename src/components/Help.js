import React, { useState } from 'react';
import './styles/Help.css';

const Help = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="help-container">
      <h2>Help Center</h2>


      <div className="help-section">
        <h3 onClick={() => toggleSection('contact')}>📞 Contact Support</h3>
        {openSection === 'contact' && (
          <ul>
            <li>Email: support@bitego.com</li>
            <li>Phone: 0788888888</li>
          </ul>
        )}
      </div>

      <div className="help-section">
        <h3 onClick={() => toggleSection('delivery')}>🚚 Order & Delivery Help</h3>
        {openSection === 'delivery' && (
          <ul>
            <li>call:0722222222</li>
          </ul>
        )}
      </div>

      <div className="help-section">
        <h3 onClick={() => toggleSection('payment')}>💳 Payment Help</h3>
        {openSection === 'payment' && (
          <ul>
            <li>go to chekout</li>
          </ul>
        )}
      </div>

      <div className="help-section">
        <h3 onClick={() => toggleSection('cancel')}>🛑 Cancel & Refunds</h3>
        {openSection === 'cancel' && (
          <ul>
               <li>Refund policy: Unfortunately, we do not take refunds.</li>
               <li>Request a refund (Not applicable)</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Help;
