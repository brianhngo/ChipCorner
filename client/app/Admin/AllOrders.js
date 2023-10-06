import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allOrders, singleOrder } from './AdminSlice';
import Modal from 'react-modal';
import { deleteAdminOrder } from './AdminSlice';
import { toast } from 'react-toastify';

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
export default function AllOrders() {
  const dispatch = useDispatch();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const allOrdersData = useSelector((state) => state.admin.allOrders);
  const singleOrderData = useSelector((state) => state.admin.singleOrder);
  const [IsDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  const toggleOrder = (orderId) => {
    if (selectedOrder === orderId) {
      setSelectedOrder(null);
    } else {
      setSelectedOrder(orderId);
      dispatch(singleOrder(orderId));
    }
  };

  useEffect(() => {
    dispatch(allOrders());
  }, []);

  const openDeleteConfirmationModal = () => {
    setIsDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmationModal = () => {
    setIsDeleteConfirmationOpen(false);
  };

  const confirmDelete = (userId) => {
    dispatch(deleteAdminOrder(userId));
    toast.success('Deleted');
    closeDeleteConfirmationModal();
  };

  return (
    <section className="profileContainer2">
      <div className="order-history">
        <div className="order-list">
          <h2 className="orderHistoryTitle">Order History</h2>
          <ul className="orderHistoryOrder">
            {allOrdersData &&
              allOrdersData.map((order) => (
                <li key={order.id} className="order-items-list">
                  <button
                    className="order-button"
                    onClick={() => toggleOrder(order.id)}>
                    <span className="order-text">Order#{order.id}</span>
                    <span className="order-text">
                      {order.createdAt.slice(0, 10)}{' '}
                      {order.createdAt.slice(11, 19)}
                    </span>
                  </button>
                  {selectedOrder === order.id && (
                    <div className="products-container-recommend2">
                      {singleOrderData?.map((order, id) => (
                        <div className="product" key={order.id}>
                          <div>
                            <h2> Order Info</h2>
                            <div className="product-column">
                              <h4> Order# </h4>
                              {order.id}
                            </div>
                            <div className="product-column"></div>
                            <div className="product-column">
                              <h4> Total Amount </h4>${order.totalAmount}
                            </div>
                            <div className="product-column">
                              <h4> User ID </h4>
                              {order.userId}
                            </div>
                          </div>
                          <div>
                            <h2> Order </h2>
                            {Object.entries(order.orderInfo).map(
                              ([key, value]) => {
                                return (
                                  <div className="product-column" key={key}>
                                    <h4> Chip ID {key} </h4>
                                    {value}
                                  </div>
                                );
                              }
                            )}
                          </div>
                          <div>
                            <h2> Buyer Info</h2>
                            {Object.entries(order.userInfo).map(
                              ([key, value]) => {
                                if (
                                  key === 'useProfileInfo' ||
                                  key === 'sameAddress'
                                ) {
                                  return null;
                                }
                                return (
                                  <div className="product-column" key={key}>
                                    <h4>{key}: </h4>
                                    {value}
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                      ))}
                      <button
                        className="orderHistory-button"
                        onClick={openDeleteConfirmationModal}>
                        Delete Order
                      </button>
                      <Modal
                        isOpen={IsDeleteConfirmationOpen}
                        onRequestClose={closeDeleteConfirmationModal}
                        style={customStyles}>
                        <div className="popup">
                          <h1 className="popup-title"> Confirmation </h1>
                          <p>Are you sure you want to delete this order?</p>
                          <button
                            className="submit-button"
                            onClick={() => {
                              confirmDelete(order.id);
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
                  )}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
