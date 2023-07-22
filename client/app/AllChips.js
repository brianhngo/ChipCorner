import React from 'react'
import Navbar from '../features/navbar/Navbar';
import AppRoutes from './AppRoutes';
import { Link } from 'react-router-dom';

const AllChips = ({ chips, filters, handleFilterChange }) => (
    <div id="container">
    <section id="headerSection">
      <header id="headerContainer">
        <div id="websiteTitle">
          <h3>All Chips</h3>
          <img
              className="logoImage"
              src="https://media.istockphoto.com/id/164661881/vector/nachos-cartoon.jpg?s=612x612&w=0&k=20&c=AFnAYL79XMt0VQSVHtPRTuJUR1z0Iwig8LCzC3083Ag="
            />
        </div>
        <nav id="navContainer">
        <Navbar />
            <AppRoutes />
            <div className="cart">CART</div>
            </nav>
      </header>
    </section>

    <h2>Filters</h2>
    <div className="filters">
            <select name="price" value={filters.price} onChange={handleFilterChange}>
              <option value="All">All prices</option>
              <option value="3">Less than $3</option>
              <option value="6">Less than $6</option>
            </select>
            <select name="size" value={filters.size} onChange={handleFilterChange}>
              <option value="All">All sizes</option>
              <option value="10">Less than 10</option>
              <option value="20">Less than 20</option>
            </select>
            <select name="baked" value={filters.baked} onChange={handleFilterChange}>
              <option value="All">All baked status</option>
              <option value="Baked">Baked</option>
              <option value="Not Baked">Not baked</option>
            </select>
            <p>Number of Chips: {chips.length}</p>
            <Link to="/" >Back to Home</Link>
          </div>

    <section id="productsSection">
      <h3>Chips</h3>
      <div id="chipContainers">
        {chips.map(chip => (
          <div className="chipContainer" key={chip.id}>
            <div className="chipImage">
              <img className="chipImage2" src={chip.imageUrl} alt={chip.title} />
            </div>
            <div className="chipDetail">
            <h2>{chip.title}</h2>
            </div>
            <div className="chipDetail">
            <p>Description</p>
            <p>{chip.description}</p>
            </div>
            <div className="chipDetail">
            <p>Price</p>
            <p>${chip.price}</p>
            </div>
            <div className="chipDetail">
            <p>Size</p>
            <p>{chip.size}</p>
            </div>
            <div className="chipDetail">
            <p>Bake Status</p>
            <p>{chip.baked ? "Baked" : "Not baked"}</p>
            </div>
            <button /*onClick={() => addToCart(chip)} This is for future use, I only made it as example*/>
                Add to cart</button>
          </div>
        ))}
      </div>
    </section>

    <section id="newsletterSection">
      <form>
        <div id="newsLetterContainer">
          <label>Newsletter : </label>
          <input type="email" placeholder="Enter your email"></input>
          <button>Subscribe</button>
        </div>
      </form>
    </section>

    <section id="footerSection">
      <p> Copyrights © 2023 All Rights Reserved. The Chip Corner </p>
      <p> Beetal Team </p>
    </section>
  </div>
);

export default AllChips