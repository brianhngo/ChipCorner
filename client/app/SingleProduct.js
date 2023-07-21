import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom'
import { getSingleChipData } from './landingPageSlice';

const SingleProduct = () => {
    const dispatch = useDispatch();
    const singleChip = useSelector((state) => state.landingPage.singleChipInfo);
    const {id} = useParams()
    const { price, title, description, brand, size, baked, ingredients, imageUrl, nutritional }  = singleChip;

  

    useEffect(() => {
        dispatch(getSingleChipData(id))
    }, [])


  return (
    <div>
    <section>
      <div className="chip-img-container">
        <img src={singleChip.imageUrl} alt={singleChip.title} />
      </div>
      <div>
        <h2>{singleChip.title}</h2>
        <p>{singleChip.description}</p>
        <h3>Image of nutrition - change to image</h3>
        <h3>Ingredients: {singleChip.ingredients}</h3>
        <h3>Size: {singleChip.size}</h3>
        <h3>Brand: {singleChip.brand}</h3>
        <h3>{singleChip.baked ? 'Baked' : 'Not Baked'}</h3>
        <h3>Nutrition Facts: {singleChip.nutritional}</h3>
        <h3>Price: {singleChip.price}</h3>
        <button>Buy Now</button>
        <Link to="/products">Back to Products</Link> {/* Link to go back to the products page */}
      </div>
    </section>
    <section>
      <div>Customer Reviews</div>
    </section>
  </div>
  );
};

export default SingleProduct;