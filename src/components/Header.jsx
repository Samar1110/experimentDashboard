// components/Header.js
import { useState } from 'react';
import { Moon, Sun, Filter, Search, BarChart3 } from 'lucide-react';

const Header = ({ darkMode, toggleDarkMode, toggleFilters, handleSearch, searchValue }) => {
  const [searchText, setSearchText] = useState(searchValue);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchText);
  };

  return (
    <header className={`p-4 shadow-md z-10 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BarChart3 className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <span className="text-xl font-bold">IDInsight Experiments</span>
        </div>
        
        <div className="flex items-center space-x-4 flex-1 justify-center max-w-xl">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search experiments..."
              value={searchText}
              onChange={handleSearchChange}
              className={`pl-10 pr-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 ${
                darkMode 
                  ? 'bg-gray-700 text-white focus:ring-blue-500' 
                  : 'bg-gray-100 text-gray-900 focus:ring-blue-400'
              }`}
            />
          </form>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleFilters}
            className={`p-2 rounded-lg ${
              darkMode 
                ? 'hover:bg-gray-700 text-gray-300' 
                : 'hover:bg-gray-100 text-gray-700'
            }`}
            aria-label="Toggle filters"
          >
            <Filter className="h-5 w-5" />
          </button>
          
          <button 
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg ${
              darkMode 
                ? 'hover:bg-gray-700 text-gray-300' 
                : 'hover:bg-gray-100 text-gray-700'
            }`}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;