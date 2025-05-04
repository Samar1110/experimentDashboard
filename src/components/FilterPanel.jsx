import { useState } from 'react';
import { X, Search, Calendar, Tag, Users } from 'lucide-react';

const FilterPanel = ({ 
  darkMode, 
  filter, 
  applyFilters,
  resetFilters,
  availableMetrics,
  availableTeams,
  availableTags
}) => {
  // Local state to track changes before applying
  const [localFilter, setLocalFilter] = useState(filter);

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setLocalFilter(prev => {
      if (key === 'status' || key === 'metrics' || key === 'team' || key === 'tags') {
        // Toggle item in array
        const newArray = prev[key].includes(value)
          ? prev[key].filter(item => item !== value)
          : [...prev[key], value];
        return { ...prev, [key]: newArray };
      } else if (key.startsWith('dateRange.')) {
        // Handle date range
        const dateKey = key.split('.')[1]; // either 'start' or 'end'
        return { 
          ...prev, 
          dateRange: { 
            ...prev.dateRange, 
            [dateKey]: value 
          } 
        };
      } else {
        // Handle simple values (like search)
        return { ...prev, [key]: value };
      }
    });
  };

  // Apply current filters
  const handleApplyFilters = () => {
    applyFilters(localFilter);
  };

  // Reset filters
  const handleResetFilters = () => {
    resetFilters();
    setLocalFilter(filter); // Reset local state to match parent state
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Filter Experiments</h3>
        <button 
          onClick={handleResetFilters}
          className={`text-sm flex items-center ${
            darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <X className="h-4 w-4 mr-1" />
          Clear Filters
        </button>
      </div>

      {/* Search box */}
      <div className="mb-4 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search experiments by name, description or owner"
          value={localFilter.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className={`w-full pl-10 pr-4 py-2 rounded-md border ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Status Filter */}
        <div>
          <h4 className={`mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Status
          </h4>
          <div className="flex flex-wrap gap-2">
            {['Active', 'Completed', 'Pending', 'Failed'].map(status => (
              <button
                key={status}
                onClick={() => handleFilterChange('status', status)}
                className={`px-3 py-1 text-sm rounded-full ${
                  localFilter.status.includes(status)
                    ? darkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'
                    : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Metrics Filter */}
        <div>
          <h4 className={`mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <span className="flex items-center">
              <Tag className="h-4 w-4 mr-1" />
              Metrics
            </span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {availableMetrics.map(metric => (
              <button
                key={metric}
                onClick={() => handleFilterChange('metrics', metric)}
                className={`px-3 py-1 text-sm rounded-full ${
                  localFilter.metrics.includes(metric)
                    ? darkMode ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-800'
                    : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {metric}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Date Range Filter */}
        <div>
          <h4 className={`mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Date Range
            </span>
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              value={localFilter.dateRange.start || ''}
              onChange={(e) => handleFilterChange('dateRange.start', e.target.value)}
              className={`p-2 rounded-md border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
            <input
              type="date"
              value={localFilter.dateRange.end || ''}
              onChange={(e) => handleFilterChange('dateRange.end', e.target.value)}
              className={`p-2 rounded-md border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
          </div>
        </div>

        {/* Team Filter */}
        <div>
          <h4 className={`mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <span className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              Team
            </span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {availableTeams.map(team => (
              <button
                key={team}
                onClick={() => handleFilterChange('team', team)}
                className={`px-3 py-1 text-sm rounded-full ${
                  localFilter.team.includes(team)
                    ? darkMode ? 'bg-green-600 text-white' : 'bg-green-100 text-green-800'
                    : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {team}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tags Filter */}
      <div className="mb-4">
        <h4 className={`mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <span className="flex items-center">
            <Tag className="h-4 w-4 mr-1" />
            Tags
          </span>
        </h4>
        <div className="flex flex-wrap gap-2">
          {availableTags.map(tag => (
            <button
              key={tag}
              onClick={() => handleFilterChange('tags', tag)}
              className={`px-3 py-1 text-sm rounded-full ${
                localFilter.tags.includes(tag)
                  ? darkMode ? 'bg-yellow-600 text-white' : 'bg-yellow-100 text-yellow-800'
                  : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Apply Filters Button */}
      <div className="flex justify-end">
        <button
          onClick={handleApplyFilters}
          className={`px-4 py-2 rounded-md ${
            darkMode
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;