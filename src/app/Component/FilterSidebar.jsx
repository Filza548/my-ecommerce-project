// components/FilterSidebar.js
'use client';

import { useState } from 'react';

export default function FilterSidebar({ 
  filters, 
  onFilterChange, 
  onClearAll 
}) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    brands: true,
    features: true,
    price: true,
    condition: true,
    ratings: true,
    manufacturer: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const categories = ['Mobile accessory', 'Electronics', 'Smartphones', 'Modern tech'];
  const brands = ['Samsung', 'Apple', 'Huawei', 'Pocco', 'Lenovo'];
  const features = ['Metallic', 'Plastic cover', '8GB Ram', 'Super power', 'Large Memory'];
  const priceRanges = [
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: '$200+', min: 200, max: 10000 }
  ];
  const conditions = ['New', 'Refurbished', 'Used'];
  const ratings = [5, 4, 3, 2, 1];
  const manufacturers = ['Apple Inc.', 'Samsung Electronics', 'Huawei', 'Xiaomi', 'GoPro Inc.', 'Lenovo'];

  return (
    <div className="w-64 bg-white rounded-lg shadow-sm p-6 h-fit">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
        <button 
          onClick={onClearAll}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Clear all
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-6 pb-6 border-b">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-700">Category</h3>
          <button 
            onClick={() => toggleSection('category')}
            className="text-gray-500 hover:text-gray-700"
          >
            {expandedSections.category ? '−' : '+'}
          </button>
        </div>
        {expandedSections.category && (
          <div className="space-y-2">
            {categories.map(category => (
              <div key={category} className="flex items-center">
                <input
                  type="checkbox"
                  id={`cat-${category}`}
                  checked={filters.category.includes(category)}
                  onChange={(e) => onFilterChange('category', category, e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor={`cat-${category}`} className="ml-2 text-gray-600">
                  {category}
                </label>
              </div>
            ))}
            <button className="text-sm text-blue-600 hover:text-blue-800 mt-2">
              See all
            </button>
          </div>
        )}
      </div>

      {/* Brands Filter */}
      <div className="mb-6 pb-6 border-b">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-700">Brands</h3>
          <button 
            onClick={() => toggleSection('brands')}
            className="text-gray-500 hover:text-gray-700"
          >
            {expandedSections.brands ? '−' : '+'}
          </button>
        </div>
        {expandedSections.brands && (
          <div className="space-y-2">
            {brands.map(brand => (
              <div key={brand} className="flex items-center">
                <input
                  type="checkbox"
                  id={`brand-${brand}`}
                  checked={filters.brands.includes(brand)}
                  onChange={(e) => onFilterChange('brands', brand, e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor={`brand-${brand}`} className="ml-2 text-gray-600">
                  {brand}
                </label>
              </div>
            ))}
            <button className="text-sm text-blue-600 hover:text-blue-800 mt-2">
              See all
            </button>
          </div>
        )}
      </div>

      {/* Features Filter */}
      <div className="mb-6 pb-6 border-b">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-700">Features</h3>
          <button 
            onClick={() => toggleSection('features')}
            className="text-gray-500 hover:text-gray-700"
          >
            {expandedSections.features ? '−' : '+'}
          </button>
        </div>
        {expandedSections.features && (
          <div className="space-y-2">
            {features.map(feature => (
              <div key={feature} className="flex items-center">
                <input
                  type="checkbox"
                  id={`feature-${feature}`}
                  checked={filters.features.includes(feature)}
                  onChange={(e) => onFilterChange('features', feature, e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor={`feature-${feature}`} className="ml-2 text-gray-600">
                  {feature}
                </label>
              </div>
            ))}
            <button className="text-sm text-blue-600 hover:text-blue-800 mt-2">
              See all
            </button>
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="mb-6 pb-6 border-b">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-700">Price range</h3>
          <button 
            onClick={() => toggleSection('price')}
            className="text-gray-500 hover:text-gray-700"
          >
            {expandedSections.price ? '−' : '+'}
          </button>
        </div>
        {expandedSections.price && (
          <div className="space-y-2">
            {priceRanges.map(range => (
              <div key={range.label} className="flex items-center">
                <input
                  type="radio"
                  id={`price-${range.label}`}
                  name="priceRange"
                  checked={filters.priceRange?.label === range.label}
                  onChange={() => onFilterChange('priceRange', range)}
                  className="h-4 w-4 text-blue-600"
                />
                <label htmlFor={`price-${range.label}`} className="ml-2 text-gray-600">
                  {range.label}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Condition Filter */}
      <div className="mb-6 pb-6 border-b">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-700">Condition</h3>
          <button 
            onClick={() => toggleSection('condition')}
            className="text-gray-500 hover:text-gray-700"
          >
            {expandedSections.condition ? '−' : '+'}
          </button>
        </div>
        {expandedSections.condition && (
          <div className="space-y-2">
            {conditions.map(condition => (
              <div key={condition} className="flex items-center">
                <input
                  type="checkbox"
                  id={`condition-${condition}`}
                  checked={filters.conditions.includes(condition)}
                  onChange={(e) => onFilterChange('conditions', condition, e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor={`condition-${condition}`} className="ml-2 text-gray-600">
                  {condition}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ratings Filter */}
      <div className="mb-6 pb-6 border-b">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-700">Ratings</h3>
          <button 
            onClick={() => toggleSection('ratings')}
            className="text-gray-500 hover:text-gray-700"
          >
            {expandedSections.ratings ? '−' : '+'}
          </button>
        </div>
        {expandedSections.ratings && (
          <div className="space-y-2">
            {ratings.map(rating => (
              <div key={rating} className="flex items-center">
                <input
                  type="checkbox"
                  id={`rating-${rating}`}
                  checked={filters.ratings.includes(rating)}
                  onChange={(e) => onFilterChange('ratings', rating, e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor={`rating-${rating}`} className="ml-2 text-gray-600 flex items-center">
                  {'★'.repeat(rating)}{'☆'.repeat(5-rating)} & above
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Manufacturer Filter */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-700">Manufacturer</h3>
          <button 
            onClick={() => toggleSection('manufacturer')}
            className="text-gray-500 hover:text-gray-700"
          >
            {expandedSections.manufacturer ? '−' : '+'}
          </button>
        </div>
        {expandedSections.manufacturer && (
          <div className="space-y-2">
            {manufacturers.map(manufacturer => (
              <div key={manufacturer} className="flex items-center">
                <input
                  type="checkbox"
                  id={`manufacturer-${manufacturer}`}
                  checked={filters.manufacturers.includes(manufacturer)}
                  onChange={(e) => onFilterChange('manufacturers', manufacturer, e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor={`manufacturer-${manufacturer}`} className="ml-2 text-gray-600">
                  {manufacturer}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}