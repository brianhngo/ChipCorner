import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUpdateProfileData,
  getOrderHistoryProfile,
  getOrderHistoryChipInfo,
} from './ProfileSlice.js';

export default function ProfilePastOrders() {
  const userProfileData = useSelector(
    (state) => state.profile.storage.information
  );

  const orderHistoryData = useSelector(
    (state) => state.profile.storage.orderHistory
  );

  const orderHistoryChipData = useSelector(
    (state) => state.profile.storage.orderHistoryChip
  );

  const dispatch = useDispatch();
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem('token') || '';
    const getProfileData = async (token) => {
      dispatch(
        getUpdateProfileData({
          token: token,
        })
      );
    };
    getProfileData(token);
    dispatch(
      getOrderHistoryProfile({
        userId: userProfileData.id,
      })
    );

    dispatch(getOrderHistoryChipInfo());
  }, []);

  const toggleOrder = (orderId) => {
    if (selectedOrder === orderId) {
      setSelectedOrder(null);
    } else {
      setSelectedOrder(orderId);
      dispatch(
        getOrderHistoryChipInfo({
          chipData: Object.keys(
            orderHistoryData.find((element) => element.id === orderId).orderInfo
          ),
        })
      );
    }
  };

  return (
    <section className="profileContainer2">
      <div className="order-history">
        <div className="order-list">
          <h2 className="orderHistoryTitle">Order History</h2>
          <ul className="orderHistoryOrder">
            {orderHistoryData.map((order) => (
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
                    {orderHistoryChipData?.map((chip, id) => {
                      return (
                        <div className="product" key={chip.id}>
                          <div className="product-column">
                            <img
                              className="cart-product-image"
                              src={chip.imageUrl}
                              alt={chip.name}
                            />
                          </div>
                          <div className="product-column">
                            <p className="totalPriceProductss"> Product </p>
                            <div className="flex top">
                              <h5>{chip.title} </h5>
                            </div>
                          </div>
                          <div className="product-column">
                            <p className="totalPriceProductss"> Quantity </p>
                            <p className="quantity-desc">
                              {
                                orderHistoryData.find(
                                  (element) => element.id === order.id
                                ).orderInfo[chip.id]
                              }
                            </p>
                          </div>
                          <div className="product-column">
                            <p className="totalPriceProductss"> Price per</p>
                            <h4 className="totalPriceProduct">
                              ${chip.price}{' '}
                            </h4>
                          </div>
                          <div className="product-column">
                            <p className="totalPriceProductss">
                              {' '}
                              Product Price Total{' '}
                            </p>
                            <h4 className="totalPriceProducts">
                              $
                              {(
                                chip.price *
                                orderHistoryData.find(
                                  (element) => element.id === order.id
                                ).orderInfo[chip.id]
                              ).toFixed(2)}{' '}
                            </h4>
                          </div>
                        </div>
                      );
                    })}
                    <h2 className="orderHistoryPaymentTotal">
                      Total - ${' '}
                      {
                        orderHistoryData.find(
                          (element) => element.id === order.id
                        ).totalAmount
                      }
                    </h2>
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
