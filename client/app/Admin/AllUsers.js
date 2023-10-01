import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminUserList, getAdminSingleUserList } from './AdminSlice';
export default function AllUsers() {
  const allUsersList = useSelector((state) => state.admin.allUsers);
  const singleUserInfo = useSelector((state) => state.admin.singleUser);
  const [selectedOrder, setSelectedOrder] = useState(null);

  console.log(singleUserInfo.admin);
  const dispatch = useDispatch();

  const toggleOrder = (userId) => {
    if (selectedOrder === userId) {
      setSelectedOrder(null);
    } else {
      setSelectedOrder(userId);
      dispatch(getAdminSingleUserList(userId));
    }
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
                      <div className="product" key={user.id}>
                        <div>
                          <h2> User Info</h2>
                          <div className="product-column">
                            <h4> User Id </h4>
                            {user.id}
                          </div>
                          <div className="product-column">
                            <h4> Username </h4>
                            {user.username}
                          </div>
                          <div className="product-column">
                            <h4> Email </h4>${user.email}
                          </div>
                          <div className="product-column">
                            <h4> Created On </h4>
                            {user.createdAt}
                          </div>
                          <div className="product-column">
                            <h4> Admin </h4>
                            {user.admin === false ? (
                              <>Not Admin </>
                            ) : (
                              <>Is Admin </>
                            )}
                          </div>
                        </div>
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
