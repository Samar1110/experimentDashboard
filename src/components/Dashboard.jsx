import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import FilterPanel from '../components/FilterPanel';
import ExperimentList from '../components/ExperimentList';
import ExperimentDetail from '../components/ExperimentDetail';
import { mockExperiments } from '../data/mockData';

const Dashboard = () => {
  // State management
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [allExperiments, setAllExperiments] = useState(mockExperiments); // Added this state
  const [filteredExperiments, setFilteredExperiments] = useState(mockExperiments);
  const [selectedExperiment, setSelectedExperiment] = useState(null);
  const [filterCriteria, setFilterCriteria] = useState({
    status: [],
    dateRange: {
      start: null,
      end: null
    },
    metrics: [],
    search: '',
    team: [],
    tags: []
  });

  // Load mockExperiments on component mount
  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we're using the mock data
    setAllExperiments(mockExperiments);
    setFilteredExperiments(mockExperiments);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Toggle sidebar collapse
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Handle experiment selection
  const handleExperimentSelect = (experimentId) => {
    const selected = allExperiments.find(exp => exp.id === experimentId);
    setSelectedExperiment(selected);
  };

  // Apply filters to mockExperiments
  const applyFilters = (criteria) => {
    setFilterCriteria(criteria);
    
    let filtered = [...allExperiments];
    
    // Apply status filter
    if (criteria.status && criteria.status.length > 0) {
      filtered = filtered.filter(exp => criteria.status.includes(exp.status));
    }
    
    // Apply date range filter
    if (criteria.dateRange.start && criteria.dateRange.end) {
      filtered = filtered.filter(exp => {
        const expDate = new Date(exp.startDate);
        return expDate >= new Date(criteria.dateRange.start) && 
               expDate <= new Date(criteria.dateRange.end);
      });
    }
    
    // Apply metrics filter
    if (criteria.metrics && criteria.metrics.length > 0) {
      filtered = filtered.filter(exp => 
        criteria.metrics.includes(exp.primaryMetric) || 
        exp.secondaryMetrics.some(metric => criteria.metrics.includes(metric))
      );
    }
    
    // Apply team filter
    if (criteria.team && criteria.team.length > 0) {
      filtered = filtered.filter(exp => criteria.team.includes(exp.team));
    }
    
    // Apply tags filter
    if (criteria.tags && criteria.tags.length > 0) {
      filtered = filtered.filter(exp => 
        exp.tags.some(tag => criteria.tags.includes(tag))
      );
    }
    
    // Apply search term
    if (criteria.search) {
      const searchTerm = criteria.search.toLowerCase();
      filtered = filtered.filter(exp => 
        exp.name.toLowerCase().includes(searchTerm) || 
        exp.description.toLowerCase().includes(searchTerm) ||
        exp.owner.toLowerCase().includes(searchTerm)
      );
    }
    
    setFilteredExperiments(filtered);
  };

  // Handle data export (PDF, CSV)
  const exportData = (format) => {
    // Implementation would depend on preferred export library
    console.log(`Exporting data in ${format} format`);
    alert(`Data exported in ${format} format. (This is a mock function)`);
  };

  // Reset all filters
  const resetFilters = () => {
    setFilterCriteria({
      status: [],
      dateRange: {
        start: null,
        end: null
      },
      metrics: [],
      search: '',
      team: [],
      tags: []
    });
    setFilteredExperiments(allExperiments);
  };

  // Refresh data
  const refreshData = () => {
    // In a real application, this would fetch fresh data from an API
    console.log('Refreshing data');
    
    // Simulate an API call
    setTimeout(() => {
      // Here we would typically call setAllExperiments with new data from the API
      // For mock purposes, we're just using the same data
      setAllExperiments([...mockExperiments]);
      setFilteredExperiments([...mockExperiments]);
      alert('Data refreshed successfully');
    }, 1000);
  };

  // Handle closing experiment detail view
  const closeExperimentDetail = () => {
    setSelectedExperiment(null);
  };

  // Calculate dashboard stats
  const dashboardStats = {
    totalExperiments: allExperiments.length,
    activeExperiments: allExperiments.filter(exp => exp.status === 'Active').length,
    completedExperiments: allExperiments.filter(exp => exp.status === 'Completed').length,
    pendingExperiments: allExperiments.filter(exp => exp.status === 'Pending').length,
    avgConfidence: Math.round(allExperiments.reduce((sum, exp) => sum + exp.confidence, 0) / allExperiments.length) || 0,
    avgLift: ((allExperiments.reduce((sum, exp) => sum + exp.lift, 0) / allExperiments.length) || 0).toFixed(1)
  };

  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <Header 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        refreshData={refreshData}
        exportData={exportData}
        user={{ name: 'John Doe', avatar: '/avatar.png' }}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar 
          collapsed={sidebarCollapsed} 
          toggleSidebar={toggleSidebar}
          darkMode={darkMode}
          stats={dashboardStats}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Main content */}
          <div className="flex-1 p-4 overflow-auto">
            {selectedExperiment ? (
              <div className="mb-4">
                <button 
                  onClick={closeExperimentDetail}
                  className={`px-4 py-2 mb-4 rounded ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  Back to Experiments
                </button>
                
                <ExperimentDetail 
                  experiment={selectedExperiment} 
                  darkMode={darkMode}
                  exportData={exportData}
                />
              </div>
            ) : (
              <>
                {/* Filter section */}
                <div className={`mb-6 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white shadow'}`}>
                  <FilterPanel 
                    darkMode={darkMode}
                    filter={filterCriteria}
                    applyFilters={applyFilters}
                    resetFilters={resetFilters}
                    availableMetrics={[...new Set(allExperiments.map(e => e.primaryMetric).concat(
                      allExperiments.flatMap(e => e.secondaryMetrics)
                    ))]}
                    availableTeams={[...new Set(allExperiments.map(e => e.team))]}
                    availableTags={[...new Set(allExperiments.flatMap(e => e.tags))]}
                  />
                </div>
                
                {/* Dashboard summary cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white shadow'}`}>
                    <h3 className="text-lg font-medium mb-2">Total Experiments</h3>
                    <p className="text-3xl font-bold">{dashboardStats.totalExperiments}</p>
                  </div>
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white shadow'}`}>
                    <h3 className="text-lg font-medium mb-2">Active Experiments</h3>
                    <p className="text-3xl font-bold text-green-500">{dashboardStats.activeExperiments}</p>
                  </div>
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white shadow'}`}>
                    <h3 className="text-lg font-medium mb-2">Avg. Confidence</h3>
                    <p className="text-3xl font-bold text-blue-500">{dashboardStats.avgConfidence}%</p>
                  </div>
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white shadow'}`}>
                    <h3 className="text-lg font-medium mb-2">Avg. Lift</h3>
                    <p className="text-3xl font-bold text-purple-500">+{dashboardStats.avgLift}%</p>
                  </div>
                </div>
                
                {/* Experiments list */}
                <div className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white shadow'}`}>
                  <ExperimentList
                    mockExperiments={filteredExperiments}
                    onExperimentSelect={handleExperimentSelect}
                    darkMode={darkMode}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className={`p-4 text-center text-sm ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500 border-t'}`}>
        <p>© 2025 IDInsight. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;