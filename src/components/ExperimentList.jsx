import { useState } from 'react';
import { Archive, AlertTriangle, CheckCircle, PauseCircle, Clock, TrendingUp, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

const ExperimentList = ({ mockExperiments, onExperimentSelect, darkMode }) => {
  // State to track which items are expanded in mobile view
  const [expandedItems, setExpandedItems] = useState({});

  // Toggle expanded state for mobile view
  const toggleExpand = (id, e) => {
    e.stopPropagation(); // Prevent triggering the parent onClick
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Function to get status icon based on experiment status
  const getStatusIcon = (status) => {
    switch(status.toLowerCase()) {
      case 'active':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'paused':
      case 'pending':
        return <PauseCircle className="w-5 h-5 text-yellow-500" />;
      case 'draft':
        return <Clock className="w-5 h-5 text-gray-500" />;
      case 'failed':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-500" />;
    }
  };

  // Function to get status badge styling
  const getStatusBadgeClass = (status) => {
    const baseClasses = "px-3 py-1 text-xs font-medium rounded-full";
    
    switch(status.toLowerCase()) {
      case 'active':
        return `${baseClasses} ${darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'}`;
      case 'completed':
        return `${baseClasses} ${darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'}`;
      case 'paused':
      case 'pending':
        return `${baseClasses} ${darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'}`;
      case 'draft':
        return `${baseClasses} ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'}`;
      case 'failed':
        return `${baseClasses} ${darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800'}`;
      default:
        return `${baseClasses} ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'}`;
    }
  };

  // Function to format dates
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Function to determine confidence color
  const getConfidenceColor = (confidence) => {
    if (confidence >= 95) return darkMode ? 'text-green-400' : 'text-green-600';
    if (confidence >= 90) return darkMode ? 'text-blue-400' : 'text-blue-600';
    if (confidence >= 80) return darkMode ? 'text-yellow-400' : 'text-yellow-600';
    return darkMode ? 'text-red-400' : 'text-red-600';
  };

  // Function to determine lift color
  const getLiftColor = (lift) => {
    if (lift > 0) return darkMode ? 'text-green-400' : 'text-green-600';
    if (lift < 0) return darkMode ? 'text-red-400' : 'text-red-600';
    return darkMode ? 'text-gray-400' : 'text-gray-600';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl ml-4 md:text-2xl font-bold">All Experiments</h2>
        <div className={`px-3 py-1 md:px-4 md:py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <span className="text-sm md:text-base font-medium">{mockExperiments.length} Experiments</span>
        </div>
      </div>

      {mockExperiments.length === 0 ? (
        <div className={`rounded-lg p-6 md:p-8 text-center ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <Archive className="mx-auto h-10 w-10 md:h-12 md:w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium">No experiments found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your filters or create a new experiment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:gap-6">
          {mockExperiments.map((experiment) => (
            <div 
              key={experiment.id}
              className={`rounded-lg p-4 md:p-6 shadow-sm transition-all hover:shadow-md ${
                darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
              }`}
            >
              {/* Desktop Layout */}
              <div className="hidden md:flex justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    {getStatusIcon(experiment.status)}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{experiment.name}</h3>
                    <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {experiment.description}
                    </p>
                    <div className="mt-2 flex items-center space-x-4">
                      <span className={getStatusBadgeClass(experiment.status)}>
                        {experiment.status.charAt(0).toUpperCase() + experiment.status.slice(1)}
                      </span>
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {formatDate(experiment.startDate)} - {experiment.endDate ? formatDate(experiment.endDate) : 'Ongoing'}
                      </span>
                    </div>
                  </div>
                </div>
                
                {experiment.status.toLowerCase() !== 'draft' && (
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Confidence</p>
                      <p className={`text-lg font-bold ${getConfidenceColor(experiment.confidence)}`}>
                        {experiment.confidence}%
                      </p>
                    </div>
                    <div className="text-center">
                      <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Lift</p>
                      <p className={`text-lg font-bold ${getLiftColor(experiment.lift)}`}>
                        {experiment.lift > 0 ? '+' : ''}{experiment.lift}%
                      </p>
                    </div>
                    <div className="self-center">
                      <button 
                        onClick={() => onExperimentSelect(experiment.id)}
                        className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                          darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                      >
                        Details
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden">
                <div 
                  className="flex items-center justify-between"
                  onClick={(e) => toggleExpand(experiment.id, e)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      {getStatusIcon(experiment.status)}
                    </div>
                    <div>
                      <h3 className="text-base font-medium">{experiment.name}</h3>
                      <span className={`inline-block mt-1 ${getStatusBadgeClass(experiment.status)}`}>
                        {experiment.status.charAt(0).toUpperCase() + experiment.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <button className={`p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                    {expandedItems[experiment.id] ? 
                      <ChevronUp className="h-5 w-5" /> : 
                      <ChevronDown className="h-5 w-5" />
                    }
                  </button>
                </div>

                {expandedItems[experiment.id] && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {experiment.description}
                    </p>
                    
                    <div className="mt-3">
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {formatDate(experiment.startDate)} - {experiment.endDate ? formatDate(experiment.endDate) : 'Ongoing'}
                      </span>
                    </div>

                    {experiment.status.toLowerCase() !== 'draft' && (
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Confidence</p>
                          <p className={`text-lg font-bold ${getConfidenceColor(experiment.confidence)}`}>
                            {experiment.confidence}%
                          </p>
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Lift</p>
                          <p className={`text-lg font-bold ${getLiftColor(experiment.lift)}`}>
                            {experiment.lift > 0 ? '+' : ''}{experiment.lift}%
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-4">
                      <button 
                        onClick={() => onExperimentSelect(experiment.id)}
                        className={`w-full flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium ${
                          darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                      >
                        View Details
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperimentList;