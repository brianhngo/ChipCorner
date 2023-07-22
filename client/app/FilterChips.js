import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AllChips from './AllChips'

const FilterChips = () => {
    const [chips, setChips] = useState([])
    const [filter, setFilter] = useState({
      price: 'All',
      size: 'All',
      baked: 'All'
    })

    useEffect(() => {
        axios.get('/api/chips')
      .then(response => setChips(response.data))
      .catch(error => console.error('Error: cannot fetch chips:', error))
  }, [])

  const handleFilterChange = event => {
    let filterName = event.target.name
    let filterValue = event.target.value
    let newFilter = {...filter}
    newFilter[filterName] = filterValue
    setFilter(newFilter)
    }

    const filteredChips = []
    for (let i = 0; i < chips.length; i++) {
      const chip = chips[i]

      let priceMatches = false
      if (filter.price === 'All' || chip.price <= filter.price) {
        priceMatches = true
      }

      let sizeMatches = false;
    if (filter.size === 'All' || chip.size <= filter.size) {
      sizeMatches = true
    }

    let bakedMatches = false;
    if (filter.baked === 'All' || chip.baked === (filter.baked === 'Baked')) {
      bakedMatches = true
    }

    if (priceMatches && sizeMatches && bakedMatches) {
      filteredChips.push(chip)
    }
  }

  return <
  AllChips chips={filteredChips} 
  filters={filter} 
  handleFilterChange={handleFilterChange} 
  />
}

export default FilterChips