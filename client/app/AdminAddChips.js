import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const AdminAddChips = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [size, setSize] = useState("");
    const [baked, setBaked] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [price, setPrice] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const newProduct = {
            title,
            description,
            brand,
            size,
            baked,
            ingredients,
            nutritional,
            imageUrl,
            price,
        };

        dispatch(addProduct(newProduct));

    // Clear input fields after submitting
    setTitle('');
    setDescription('');
    setBrand('');
    setSize('');
    setBaked('');
    setIngredients('');
    setNutritional('');
    setImageUrl('');
    setPrice('');
  };


  return (
    <div>
      <h2>Add Chips</h2>
      <form onSubmit={handleSubmit}/>
      <div className='chip-input'>
          <label htmlFor="title">Name of Chips:</label>
          <input className='input-box'
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='chip-input'>
          <label htmlFor="description">Description:</label>
          <input className='input-box'
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='chip-input'>
          <label htmlFor="brand">Brand:</label>
          <input className='input-box'
            type="text"
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
        <div className='chip-input'>
          <label htmlFor="size">Size:</label>
          <input className='input-box'
            type="text"
            id="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </div>
        <div className='chip-input'>
          <label htmlFor="baked">Baked:</label>
          <input className='input-box'
            type="text"
            id="baked"
            value={baked}
            onChange={(e) => setBaked(e.target.value)}
          />
        </div>
        <div className='chip-input'>
          <label htmlFor="ingredients">Ingredients:</label>
          <input className='input-box'
            type="text"
            id="ingredients"
            value={baked}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>
        <div className='chip-input'>
          <label htmlFor="nurtritional">Nutritional:</label>
          <input className='input-box'
            type="text"
            id="nutritional"
            value={baked}
            onChange={(e) => setNutritional(e.target.value)}
          />
        </div>
        <div className='chip-input'>
          <label htmlFor="imageUrl">Image:</label>
          <input className='input-box'
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div className='chip-input'>
          <label htmlFor="price">Price:</label>
          <input className='input-box'
            type="text"
            id="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
    </div>
  )
}

export default AdminAddChips;