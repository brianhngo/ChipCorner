import React, { useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { updateChips } from './chipsSlice';

const AdminEditChips = ( chips ) => {
  const dispatch = useDispatch()
  const [updatedChip, setUpdatedChip] = useState({title: "miss vickies"})

  const handleSubmit = (event) => {
    dispatch(updateChips(updatedChip))
    event.preventDefault()
  }
  useEffect(() => {
    if (chips) {
      setUpdatedChip(chips.chips)
    }
  }, [chips])
  return (
    <div>
      <h2>Edit Chips</h2>
      <form onSubmit={handleSubmit}>
      <div className='chip-input'>
          <label htmlFor="title">Name of Chips:</label>
          <input className='input-box'
            type="text"
            id="title"
            value={updatedChip.title}
            onChange={(e) => setUpdatedChip({
              ...updatedChip, title: e.target.value
            })}
          />
        </div>
        {/* <div className='chip-input'>
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
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>
        <div className='chip-input'>
          <label htmlFor="nurtritional">Nutritional:</label>
          <input className='input-box'
            type="text"
            id="nutritional"
            value={nutritional}
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
        <button className='add-btn'>Edit</button> */}
        </form>
    </div>
  )
}

export default AdminEditChips;
