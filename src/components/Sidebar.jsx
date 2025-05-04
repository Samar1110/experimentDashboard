import { useState } from 'react';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  Home, 
  Settings, 
  HelpCircle, 
  PlusCircle, 
  Users,
  Filter,
  Download,
  Calendar,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ collapsed = false, toggleSidebar, darkMode = false, stats = {} }) => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  // Navigation items aligned with the requirements
  const navItems = [
    { 
      icon: <Home className="w-5 h-5" />, 
      label: "Dashboard", 
      description: "Overview of all experiments"
    },
    { 
      icon: <BarChart3 className="w-5 h-5" />, 
      label: "Experiments", 
      description: "Manage your experiments"
    },
    { 
      icon: <LineChart className="w-5 h-5" />, 
      label: "Metrics", 
      description: "View experiment metrics and performance"
    },
    { 
      icon: <PieChart className="w-5 h-5" />, 
      label: "Reports", 
      description: "Generate and export reports"
    },
    { 
      icon: <Users className="w-5 h-5" />, 
      label: "Users", 
      description: "Manage user access and collaboration"
    },
  ];

  // Filter options in the sidebar
  const filterOptions = [
    { icon: <Filter className="w-4 h-4" />, label: "Status Filter" },
    { icon: <Calendar className="w-4 h-4" />, label: "Date Range" },
  ];

  const bottomNavItems = [
    { icon: <Download className="w-5 h-5" />, label: "Export Data", description: "Export experiments as PDF or CSV" },
    { icon: <Settings className="w-5 h-5" />, label: "Settings", description: "Configure your preferences" },
    { icon: <HelpCircle className="w-5 h-5" />, label: "Help", description: "Get support and documentation" },
  ];

  const handleNavClick = (item) => {
    setActiveItem(item.label);
    // Navigation handling would be implemented at the Dashboard level
  };

  // Function to handle new experiment creation
  const handleNewExperiment = () => {
    alert("Create New Experiment functionality would be implemented here.");
    // This would typically open a modal or navigate to a new experiment form
  };

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-64'} border-r flex-shrink-0 transition-all duration-300 ${
      darkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-200 text-gray-800'
    }`}>
      <div className="h-full flex flex-col justify-between p-4">
        {/* Collapse toggle button */}
        <button 
          onClick={toggleSidebar}
          className={`absolute top-4 right-4 p-1 rounded-full ${
            darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        <div className="space-y-6">
          <div className="space-y-2">
            <button 
              onClick={handleNewExperiment}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium ${
                darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              <PlusCircle className="w-5 h-5" />
              {!collapsed && <span>New Experiment</span>}
            </button>
          </div>
          
          <nav className="space-y-1">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavClick(item)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left ${
                  activeItem === item.label
                    ? darkMode
                      ? 'bg-gray-700 text-blue-400'
                      : 'bg-blue-50 text-blue-600'
                    : darkMode
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                {!collapsed && <span>{item.label}</span>}
              </button>
            ))}
          </nav>

          {/* Only show stats when not collapsed and on Dashboard */}
          {!collapsed && activeItem === 'Dashboard' && (
            <div className={`p-3 rounded-md ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h3 className="text-sm font-semibold mb-2">Summary</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Total Experiments</span>
                  <span className="font-medium">{stats.totalExperiments || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Active</span>
                  <span className="font-medium text-green-500">{stats.activeExperiments || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Completed</span>
                  <span className="font-medium">{stats.completedExperiments || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pending</span>
                  <span className="font-medium">{stats.pendingExperiments || 0}</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-1 mt-auto pt-4">
          {bottomNavItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavClick(item)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left ${
                activeItem === item.label
                  ? darkMode
                    ? 'bg-gray-700 text-blue-400'
                    : 'bg-blue-50 text-blue-600'
                  : darkMode
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;