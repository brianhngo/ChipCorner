import React, {useState, useEffect}  from 'react';


import { Link } from 'react-router-dom';
import './AllChips.css'

const AllChips = ( ({ chips, filters, handleFilterChange }) => {
  const [sortSetting, setSortSetting] = useState('None')
  const copy = chips.slice();

  // handles Sorting Filter for user.
   const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    setSortSetting(selectedSort);

    // less to Highest
    if (selectedSort === 'LessHighest') {
     
      chips.sort((a, b) => a.price - b.price);
      // Highest to Lowest
    } else if (selectedSort === 'HighestLess') {
      
      chips.sort((a, b) => b.price - a.price);
    } else {
      chips.sort((a,b) => a.id - b.id)
    }
  };
return (
  <div id='container'>


   <div className='sidebar'>
      <h2 className = 'products-heading'>Filters</h2>
      <div className='filters'>
        <select name='price' value={filters.price} onChange={handleFilterChange}>
          <option value='All'>All prices</option>
          <option value='3'>Less than $3</option>
          <option value='6'>Less than $6</option>
        </select>
        <select name='size' value={filters.size} onChange={handleFilterChange}>
          <option value='All'>All sizes</option>
          <option value='10'>Less than 10</option>
          <option value='20'>Less than 20</option>
        </select>
        <select name='baked' value={filters.baked} onChange={handleFilterChange}>
          <option value='All'>All baked status</option>
          <option value='Baked'>Baked</option>
          <option value='Not Baked'>Not baked</option>
        </select>
        <p>Number of Chips: {chips.length}</p>
      </div>

       <h2 className = 'products-heading'> Sort By</h2>
       <div className='filters'>
        <select name='price' value={sortSetting} onChange={handleSortChange}>
          <option value='None'>None</option>
          <option value='LessHighest'>$ Lowest to Highest</option>
          <option value='HighestLess'>$ Highest to Lowest</option>
        </select>
      </div>
    </div>

    <section id='productsSection'>
      <h2 className = "products-heading">All Products</h2>
      
      <div className = 'products-AllChips-container'>
      {chips.map((chip) => {
        return (
          <div key={chip.id}> 
            <Link to = {`/chips/${chip.id}`}> 
              <div className='product-AllChips-card'>
                <img
                  src={chip.imageUrl}
                  width={400}
                  height={400}
                  className='product-AllChips-image'
                  alt={chip.title} 
                />
                <p className='product-AllChips-name'> {chip.title} </p>
                <p className='product-AllChips-price'> ${chip.price} </p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
    </section>
  </div>
)
})

export default AllChips;
