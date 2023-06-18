import React, { useState } from 'react';
import './AddUserForm.css';

interface AddUserFormProps {
  onClose: () => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>(['']);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleAddPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, '']);
  };

  const handlePhoneNumberInputChange = (index: number, value: string) => {
    const updatedPhoneNumbers = [...phoneNumbers];
    updatedPhoneNumbers[index] = value;
    setPhoneNumbers(updatedPhoneNumbers);
  };

  const handleRemovePhoneNumber = (index: number) => {
    const updatedPhoneNumbers = phoneNumbers.filter((_, i) => i !== index);
    setPhoneNumbers(updatedPhoneNumbers);
  };

  const handleAddCandidate = () => {
    if (name && gender && city && country && email && phoneNumbers.every(number => number.trim() !== '')) {
      alert("ser addedd Successfully");
      onClose();
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <div className="popup-header">
          <h2>Add User</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        {showWarning && <p className="warning-message">Please fill all the input fields.</p>}
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={handleNameChange} required />
          </div>
          <div className="form-field">
            <label htmlFor="gender">Gender:</label>
            <select id="gender" value={gender} onChange={handleGenderChange} required>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="city">City:</label>
            <input type="text" id="city" value={city} onChange={handleCityChange} required />
          </div>
          <div className="form-field">
            <label htmlFor="country">Country:</label>
            <input type="text" id="country" value={country} onChange={handleCountryChange} required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={handleEmailChange} required />
          </div>
          <div className="form-field">
            <label htmlFor="phoneNumber">Phone Numbers:</label>
            {phoneNumbers.map((number, index) => (
              <input
                key={index}
                type="tel"
                value={number}
                onChange={(e) => handlePhoneNumberInputChange(index, e.target.value)}
                required
              />
            ))}
            <button className="add-phone-number" onClick={handleAddPhoneNumber}>
              + Add another Phone Number
            </button>
          </div>
        </div>
        <div className="form-actions">
          <button className="add-candidate-button" onClick={handleAddCandidate}>
            Add Candidate
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserForm;
