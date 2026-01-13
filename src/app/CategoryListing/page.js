// app/page.js
'use client';

import { useState, useEffect, useMemo } from 'react';
import { products } from '../../data/product.js';
import FilterSidebar from '../Component/FilterSidebar.jsx';
import ProductGrid from '../Component/ProductGrid.jsx';
import ActiveFilters from '../Component/ActiveFilters.jsx';
import Pagination from '../Component/Pagination.jsx';

export default function Home() {
  const [filters, setFilters] = useState({
    category: [],
    brands: [],
    features: [],
    priceRange: null,
    conditions: [],
    ratings: [],
    manufacturers: []
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleFilterChange = (filterType, value, checked = null) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      
      switch (filterType) {
        case 'category':
        case 'brands':
        case 'features':
        case 'conditions':
        case 'ratings':
        case 'manufacturers':
          if (checked !== null) {
            if (checked) {
              newFilters[filterType] = [...newFilters[filterType], value];
            } else {
              newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
            }
          }
          break;
        
        case 'priceRange':
          if (value && prev.priceRange?.label === value.label) {
            newFilters.priceRange = null;
          } else {
            newFilters.priceRange = value;
          }
          break;
      }
      
      return newFilters;
    });
    setCurrentPage(1);
  };

  const handleRemoveFilter = (filterType, value) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      
      switch (filterType) {
        case 'category':
        case 'brand':
          newFilters.category = newFilters.category.filter(item => item !== value);
          break;
        case 'brands':
          newFilters.brands = newFilters.brands.filter(item => item !== value);
          break;
        case 'feature':
          newFilters.features = newFilters.features.filter(item => item !== value);
          break;
        case 'price':
          newFilters.priceRange = null;
          break;
        case 'condition':
          newFilters.conditions = newFilters.conditions.filter(item => item !== value);
          break;
        case 'rating':
          newFilters.ratings = newFilters.ratings.filter(item => item !== parseInt(value));
          break;
        case 'manufacturer':
          newFilters.manufacturers = newFilters.manufacturers.filter(item => item !== value);
          break;
      }
      
      return newFilters;
    });
  };

  const handleClearAllFilters = () => {
    setFilters({
      category: [],
      brands: [],
      features: [],
      priceRange: null,
      conditions: [],
      ratings: [],
      manufacturers: []
    });
    setCurrentPage(1);
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (filters.category.length > 0 && !filters.category.includes(product.category)) {
        return false;
      }
      
      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }
      
      // Features filter
      if (filters.features.length > 0) {
        const hasFeature = filters.features.some(feature => 
          product.features.includes(feature)
        );
        if (!hasFeature) return false;
      }
      
      // Price range filter
      if (filters.priceRange) {
        if (product.discountedPrice < filters.priceRange.min || 
            product.discountedPrice > filters.priceRange.max) {
          return false;
        }
      }
      
      // Condition filter
      if (filters.conditions.length > 0 && !filters.conditions.includes(product.condition)) {
        return false;
      }
      
      // Ratings filter
      if (filters.ratings.length > 0) {
        const meetsRating = filters.ratings.some(rating => product.rating >= rating);
        if (!meetsRating) return false;
      }
      
      // Manufacturer filter
      if (filters.manufacturers.length > 0 && !filters.manufacturers.includes(product.manufacturer)) {
        return false;
      }
      
      return true;
    });
  }, [filters]);

  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, itemsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  return (
    <div>
      {/* Header with total items */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Mobile Accessories
        </h1>
        <p className="text-gray-600">
          {totalItems.toLocaleString()} items found in Mobile accessory
        </p>
      </div>

      <ActiveFilters 
        filters={filters}
        onRemoveFilter={handleRemoveFilter}
        onClearAll={handleClearAllFilters}
      />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters */}
        <div className="lg:w-1/4">
          <FilterSidebar 
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAllFilters}
          />
        </div>
        
        {/* Main Content */}
        <div className="lg:w-3/4">
          <ProductGrid products={currentProducts} />
          
          {/* Pagination */}
          {totalPages > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={(value) => {
                setItemsPerPage(value);
                setCurrentPage(1);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}