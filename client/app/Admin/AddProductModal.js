import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addAdminSingleProductData } from './AdminSlice';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '500px',
    backgroundColor: 'transparent',
    border: 'none',
    height: '75%',
  },
};

export default function AddProductModal({ isOpen, onClose }) {
  const dispatch = useDispatch();

  // Use a single state object to manage form data
  const [formData, setFormData] = useState({
    title: undefined,
    description: undefined,
    brand: undefined,
    size: undefined,
    baked: undefined,
    ingredients: undefined,
    nutritional: undefined,
    imageUrl: undefined,
    price: undefined,
  });

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    // Use the type to determine the correct value to set
    const inputValue = type === 'checkbox' ? checked : value;

    setFormData({ ...formData, [name]: inputValue });
  };

  const exitHandler = (event) => {
    event.preventDefault();
    onClose();
  };

  const addHandler = (event) => {
    event.preventDefault();
    const errorMessages = [];

    // Check if any property is blank (empty string)
    for (const fieldName in formData) {
      if (fieldName === 'baked') {
        // Skip validation for 'baked' field
        continue;
      }
      if (!formData[fieldName]) {
        errorMessages.push(
          `${
            fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
          } cannot be blank`
        );
      }
    }

    if (errorMessages.length > 0) {
      // Display all error messages
      toast.error(`Errors: ${errorMessages.join(', ')}`);
    } else {
      toast.success('Added');
      dispatch(addAdminSingleProductData(formData));
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      ariaHideApp={false}>
      <div className="popupAdmin">
        <h1 className="popup-title-admin"> Add a New Product </h1>
        <button className="exit-button" onClick={exitHandler}></button>
        <div>
          <form className="admin-form">
            {Object.keys(formData).map((fieldName) => (
              <div className="group" key={fieldName}>
                {fieldName === 'baked' ? (
                  <input
                    name={fieldName}
                    type="checkbox"
                    checked={formData[fieldName]}
                    onChange={handleInputChange}
                  />
                ) : (
                  <>
                    <input
                      name={fieldName}
                      type="text"
                      value={formData[fieldName]}
                      onChange={handleInputChange}
                      placeholder={
                        fieldName === 'size'
                          ? 'Enter an integer size'
                          : fieldName === 'price'
                          ? 'Enter an integer price'
                          : ''
                      }
                    />
                  </>
                )}
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>
                  {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                </label>
              </div>
            ))}
            <button
              id="productContainerssss"
              type="submit"
              className="submit-button"
              onClick={addHandler}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
}
