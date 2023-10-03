import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allProductsListData } from './AdminSlice';
import { Link } from 'react-router-dom';
import AddProductModal from './AddProductModal';
import AllProductsModal from './AllProductsModal';

export default function AllProducts() {
  const allProductList = useSelector((state) => state.admin.allProducts);
  const dispatch = useDispatch();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpenAddProduct, setIsPopupOpenAddProduct] = useState(false);
  const [selectedChipId, setSelectedChipId] = useState(null);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const openPopup2 = () => {
    setIsPopupOpenAddProduct(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedChipId(null);
  };

  const closePopup2 = () => {
    setIsPopupOpenAddProduct(false);
  };

  const popUpHandler = (chipId) => {
    setSelectedChipId(chipId);
    openPopup();
  };

  useEffect(() => {
    dispatch(allProductsListData());
  }, []);

  useEffect(() => {}, [allProductList]);

  return (
    <section className="profileContainer3">
      <button
        className="admin-AllProductsButtons"
        onClick={() => {
          openPopup2();
        }}>
        Add a Product
      </button>

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
      {isPopupOpenAddProduct === true ? (
        <AddProductModal isOpen={openPopup2} onClose={closePopup2} key="add" />
      ) : null}
      {isPopupOpen === true ? (
        <AllProductsModal
          isOpen={openPopup}
          onClose={closePopup}
          chipId={selectedChipId}
          key="edit"
        />
      ) : null}
    </section>
  );
}
