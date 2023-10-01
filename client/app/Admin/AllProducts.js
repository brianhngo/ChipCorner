import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allProductsListData } from './AdminSlice';
import { Link } from 'react-router-dom';
import AllProductsModal from './AllProductsModal';

export default function AllProducts() {
  const allProductList = useSelector((state) => state.admin.allProducts);
  const dispatch = useDispatch();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedChipId, setSelectedChipId] = useState(null);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedChipId(null);
  };

  const popUpHandler = (chipId) => {
    setSelectedChipId(chipId);
    openPopup();
  };

  useEffect(() => {
    dispatch(allProductsListData());
  }, []);

  return (
    <section className="profileContainer3">
      <div className="admin-AllProducts">
        {allProductList.map((chip) => {
          return (
            <div key={chip.id}>
              <Link
                onClick={() => {
                  popUpHandler(chip.id);
                }}>
                <div className="product-AllChips-card">
                  <img
                    src={chip.imageUrl}
                    width={400}
                    height={400}
                    className="product-AllChips-image"
                    alt={chip.title}
                  />
                  <p className="product-AllChips-name"> {chip.title} </p>
                  <p className="product-AllChips-price"> ${chip.price} </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      {isPopupOpen === true ? (
        <AllProductsModal
          isOpen={openPopup}
          onClose={closePopup}
          chipId={selectedChipId}
        />
      ) : null}
    </section>
  );
}
