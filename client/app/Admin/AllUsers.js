import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAdminUserList,
  getAdminSingleUserList,
  saveAdminSingleUserChanges,
  deleteAdminUser,
} from './AdminSlice';
import { toast } from 'react-toastify';
import Modal from 'react-modal';

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

export default function AllUsers() {
  const allUsersList = useSelector((state) => state.admin.allUsers);
  const singleUserInfo = useSelector((state) => state.admin.singleUser);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editedAdminStatus, setEditedAdminStatus] = useState(false);
  const [IsDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const dispatch = useDispatch();

  const toggleOrder = (userId) => {
    if (selectedOrder === userId) {
      setSelectedOrder(null);
    } else {
      setSelectedOrder(userId);
      dispatch(getAdminSingleUserList(userId));
    }
  };

  const toggleEditAdminStatus = (userId) => {
    setEditedAdminStatus({ ...editedAdminStatus, [userId]: true });
  };

  const handleAdminStatusChange = (event, userId) => {
    const { value } = event.target;
    setEditedAdminStatus({ ...editedAdminStatus, [userId]: value });
  };

  const handleSaveClick = (userId) => {
    const newAdminStatus = editedAdminStatus[userId];
    dispatch(
      saveAdminSingleUserChanges({
        id: userId,
        admin: newAdminStatus,
      })
    );
    toast.success('Saved');
    if (newAdminStatus === false) {
      setEditedAdminStatus({ ...editedAdminStatus, [userId]: true });
    } else {
      setEditedAdminStatus({ ...editedAdminStatus, [userId]: false });
    }
  };

  const openDeleteConfirmationModal = () => {
    setIsDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmationModal = () => {
    setIsDeleteConfirmationOpen(false);
  };

  const confirmDelete = (userId) => {
    dispatch(deleteAdminUser(userId));
    toast.success('Deleted');
    closeDeleteConfirmationModal();
    onClose();
  };

  useEffect(() => {
    dispatch(getAdminUserList());
  }, []);

  return (
    <section className="profileContainer2">
      <div className="order-history">
        <div className="order-list">
          <h2 className="orderHistoryTitle">List of All Users</h2>
          <ul className="orderHistoryOrder">
            {allUsersList.map((user) => (
              <li key={user.id} className="order-items-list">
                <button
                  className="order-button"
                  onClick={() => toggleOrder(user.id)}>
                  <span className="order-text">User#{user.id}</span>
                </button>
                {selectedOrder === user.id && (
                  <div className="products-container-recommend2">
                    {singleUserInfo?.map((user, id) => (
                      <div className="productUserAdmin" key={user.id}>
                        <h2> User #{user.id} Info</h2>
                        <div className="productsContainer">
                          <div className="product-column">
                            <h4> User Id </h4>
                            {user.id}
                          </div>
                          <div className="product-column">
                            <h4> Username </h4>
                            {user.username}
                          </div>
                          <div className="product-column">
                            <h4> Email </h4>
                            {user.email}
                          </div>
                          <div className="product-column">
                            <h4> Admin </h4>
                            {editedAdminStatus[user.id] ? (
                              <>
                                <select
                                  value={editedAdminStatus[user.id]}
                                  onChange={(e) =>
                                    handleAdminStatusChange(e, user.id)
                                  }>
                                  <option value={true}>Is Admin</option>
                                  <option value={false}>Not Admin</option>
                                </select>
                                <button
                                  className="orderHistory-button2"
                                  onClick={() => handleSaveClick(user.id)}>
                                  Save
                                </button>
                              </>
                            ) : (
                              <>
                                {user.admin ? 'Is Admin' : 'Not Admin'}
                                <button
                                  className="orderHistory-button2"
                                  onClick={() =>
                                    toggleEditAdminStatus(user.id)
                                  }>
                                  Edit
                                </button>
                              </>
                            )}
                          </div>

                          <Modal
                            isOpen={IsDeleteConfirmationOpen}
                            onRequestClose={closeDeleteConfirmationModal}
                            style={customStyles}>
                            <div className="popup">
                              <h1 className="popup-title"> Confirmation </h1>
                              <p>Are you sure you want to delete this user?</p>
                              <button
                                className="submit-button"
                                onClick={() => {
                                  confirmDelete(user.id);
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
                        </div>

                        <button
                          className="orderHistory-button3"
                          onClick={openDeleteConfirmationModal}>
                          Delete User
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
