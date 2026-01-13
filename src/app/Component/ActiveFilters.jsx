// components/ActiveFilters.js
'use client';

export default function ActiveFilters({ filters, onRemoveFilter, onClearAll }) {
  const activeFilters = [];
  
  // Add category filters
  filters.category.forEach(cat => {
    activeFilters.push({ type: 'category', value: cat, label: cat });
  });
  
  // Add brand filters
  filters.brands.forEach(brand => {
    activeFilters.push({ type: 'brand', value: brand, label: brand });
  });
  
  // Add feature filters
  filters.features.forEach(feature => {
    activeFilters.push({ type: 'feature', value: feature, label: feature });
  });
  
  // Add price range filter
  if (filters.priceRange) {
    activeFilters.push({ 
      type: 'price', 
      value: filters.priceRange.label, 
      label: `Price: ${filters.priceRange.label}` 
    });
  }
  
  // Add condition filters
  filters.conditions.forEach(condition => {
    activeFilters.push({ type: 'condition', value: condition, label: condition });
  });
  
  // Add rating filters
  filters.ratings.forEach(rating => {
    activeFilters.push({ 
      type: 'rating', 
      value: rating.toString(), 
      label: `${rating} star & above` 
    });
  });
  
  // Add manufacturer filters
  filters.manufacturers.forEach(manufacturer => {
    activeFilters.push({ type: 'manufacturer', value: manufacturer, label: manufacturer });
  });

  if (activeFilters.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-gray-700 font-medium mr-2">Active filters:</span>
        {activeFilters.map((filter, index) => (
          <div 
            key={`${filter.type}-${filter.value}-${index}`}
            className="flex items-center bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-sm"
          >
            <span>{filter.label}</span>
            <button
              onClick={() => onRemoveFilter(filter.type, filter.value)}
              className="ml-2 text-blue-700 hover:text-blue-900 font-bold"
            >
              ×
            </button>
          </div>
        ))}
        <button
          onClick={onClearAll}
          className="ml-auto text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Clear all filters
        </button>
      </div>
    </div>
  );
}
