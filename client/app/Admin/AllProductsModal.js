import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  getAdminSingleProductData,
  saveAdminSingleProductData,
  deleteAdminSingleProductData,
} from './AdminSlice';
const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
    maxWidth: '500px',
    backgroundColor: 'transparent',
    border: 'none',
  },
};

export default function AllProductsModal({ isOpen, onClose, chipId }) {
  const dispatch = useDispatch();
  const singleProductData = useSelector((state) => state.admin.singleProducts);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  const [formData, setFormData] = useState({
    id: chipId,
    title: null,
    description: null,
    brand: null,
    size: null,
    baked: null,
    ingredients: null,
    nutritional: null,
    imageUrl: null,
    price: null,
  });

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const exitHandler = (event) => {
    event.preventDefault();
    onClose();
  };

  const saveHandler = (event) => {
    event.preventDefault();
    toast.success('Saved!');
    dispatch(saveAdminSingleProductData(formData));
  };

  const openDeleteConfirmationModal = (event) => {
    event.preventDefault();
    setIsDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmationModal = () => {
    setIsDeleteConfirmationOpen(false);
  };

  const confirmDelete = () => {
    dispatch(deleteAdminSingleProductData(chipId));
    closeDeleteConfirmationModal();
    onClose();
    toast.success('Product Deleted!');
  };

  useEffect(() => {
    // Only dispatch the request when chipId changes
    if (chipId) {
      dispatch(getAdminSingleProductData(chipId));
    }
  }, [chipId]);

  useEffect(() => {
    // Update form data when singleProductData changes
    if (singleProductData) {
      const product = singleProductData[0] || {};
      setFormData({
        id: product.id | '',
        title: product.title || '',
        description: product.description || '',
        brand: product.brand || '',
        size: product.size || '',
        baked: product.baked === false ? false : true,
        ingredients: product.ingredients || '',
        nutritional: product.nutritional || '',
        imageUrl: product.imageUrl || '',
        price: product.price || '',
      });
    }
  }, [singleProductData]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      ariaHideApp={false}>
      <div className="popupAdmin">
        <h1 className="popup-title-admin"> Edit Product </h1>
        <button className="exit-button" onClick={exitHandler}>
          {' '}
          X{' '}
        </button>
        <div>
          <form className="admin-form">
            {Object.keys(formData).map((fieldName) => (
              <>
                <div className="group" key={fieldName}>
                  <input
                    name={fieldName}
                    type="text"
                    value={formData[fieldName]}
                    onChange={handleInputChange}
                  />
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <label>
                    {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                  </label>
                </div>
              </>
            ))}
            <button
              className="submit-button"
              onClick={openDeleteConfirmationModal}>
              {' '}
              Delete Product{' '}
            </button>
            <Modal
              isOpen={isDeleteConfirmationOpen}
              onRequestClose={closeDeleteConfirmationModal}
              style={customStyles}>
              <div className="popup">
                <h1 className="popup-title"> Confirmation </h1>
                <p>Are you sure you want to delete this product?</p>
                <button
                  className="submit-button"
                  onClick={() => {
                    confirmDelete();
                  }}>
                  Confirm
                </button>
                <button
                  className="submit-button"
                  onClick={() => {
                    closeDeleteConfirmationModal();
                  }}>
                  Cancel
                </button>
              </div>
            </Modal>
            <button
              id="productContainerssss"
              type="submit"
              className="submit-button"
              onClick={saveHandler}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
}
