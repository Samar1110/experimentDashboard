// components/ExperimentDetail.js
import { useState } from 'react';
import { ArrowLeft, Download, Flag, Share2, CheckCircle, AlertCircle, TrendingUp, CalendarDays } from 'lucide-react';
import { LineChart, BarChart, XAxis, YAxis, Tooltip, Legend, Line, Bar, CartesianGrid, ResponsiveContainer } from 'recharts';

const ExperimentDetail = ({ experiment, onBack, darkMode }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Format date strings for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Calculate conversion rates for variants
  const getConversionRate = (variant) => {
    return ((variant.conversions / variant.users) * 100).toFixed(2);
  };

  // Function to determine confidence indicator
  const getConfidenceIndicator = () => {
    if (experiment.confidence >= 95) {
      return {
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
        text: 'High Confidence',
        color: darkMode ? 'text-green-400' : 'text-green-600',
        description: 'Results are statistically significant at 95% confidence level.'
      };
    } else if (experiment.confidence >= 80) {
      return {
        icon: <TrendingUp className="w-5 h-5 text-blue-500" />,
        text: 'Growing Confidence',
        color: darkMode ? 'text-blue-400' : 'text-blue-600',
        description: 'Results are trending toward significance. Consider continuing the experiment.'
      };
    } else {
      return {
        icon: <AlertCircle className="w-5 h-5 text-yellow-500" />,
        text: 'Low Confidence',
        color: darkMode ? 'text-yellow-400' : 'text-yellow-600',
        description: 'Results are not yet statistically significant. More data is needed.'
      };
    }
  };

  // Function to determine steady state indicator
  const getSteadyStateIndicator = () => {
    if (experiment.steady) {
      return {
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
        text: 'Steady State Reached',
        color: darkMode ? 'text-green-400' : 'text-green-600',
        description: 'The experiment has reached a stable state. Results are reliable.'
      };
    } else {
      return {
        icon: <TrendingUp className="w-5 h-5 text-yellow-500" />,
        text: 'Not Yet Steady',
        color: darkMode ? 'text-yellow-400' : 'text-yellow-600',
        description: 'The experiment has not yet reached a steady state. Continue monitoring.'
      };
    }
  };

  // Function to get tab classes
  const getTabClasses = (tabName) => {
    const baseClasses = "px-4 py-2 font-medium rounded-md";
    if (activeTab === tabName) {
      return `${baseClasses} ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`;
    }
    return `${baseClasses} ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-700 hover:text-gray-900'}`;
  };

  // Function to get color palette for charts based on dark mode
  const getChartColors = () => {
    return darkMode 
      ? {
          control: '#60a5fa', // blue-400
          variant: '#f97316', // orange-500
          grid: '#374151', // gray-700
          text: '#d1d5db', // gray-300
        }
      : {
          control: '#2563eb', // blue-600
          variant: '#ea580c', // orange-600
          grid: '#e5e7eb', // gray-200
          text: '#4b5563', // gray-600
        };
  };

  const chartColors = getChartColors();
  const confidenceIndicator = getConfidenceIndicator();
  const steadyStateIndicator = getSteadyStateIndicator();

  return (
    <div className="space-y-6">
      {/* Header with back button and actions */}
      <div className="flex justify-between items-start">
        <div>
          <button 
            onClick={onBack}
            className={`flex items-center text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to all experiments
          </button>
          <h1 className="text-2xl font-bold">{experiment.name}</h1>
          <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{experiment.description}</p>
        </div>

        <div className="flex space-x-3">
          <button className={`p-2 rounded-md ${
            darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
          }`}>
            <Share2 className="w-5 h-5" />
          </button>
          <button className={`p-2 rounded-md ${
            darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
          }`}>
            <Download className="w-5 h-5" />
          </button>
          <button className={`flex items-center px-3 py-2 rounded-md ${
            darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}>
            <Flag className="w-4 h-4 mr-2" />
            {experiment.status === 'completed' ? 'Rerun' : experiment.status === 'active' ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>

      {/* Experiment metadata */}
      <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-lg ${
        darkMode ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        <div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status</p>
          <p className="text-lg font-medium capitalize">{experiment.status}</p>
        </div>
        <div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Date Range</p>
          <p className="text-lg font-medium">
            {formatDate(experiment.startDate)} - {formatDate(experiment.endDate)}
          </p>
        </div>
        <div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Primary Metric</p>
          <p className="text-lg font-medium capitalize">{experiment.primaryMetric}</p>
        </div>
        <div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Users</p>
          <p className="text-lg font-medium">
            {experiment.variants.reduce((sum, variant) => sum + variant.users, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex space-x-2 border-b pb-2 mb-6 overflow-x-auto">
        <button 
          className={getTabClasses('overview')}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={getTabClasses('metrics')}
          onClick={() => setActiveTab('metrics')}
        >
          Detailed Metrics
        </button>
        <button 
          className={getTabClasses('segments')}
          onClick={() => setActiveTab('segments')}
        >
          Segment Analysis
        </button>
        <button 
          className={getTabClasses('settings')}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      {/* Tab content */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Key findings cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Confidence card */}
            <div className={`p-6 rounded-lg shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center space-x-2">
                {confidenceIndicator.icon}
                <h3 className={`font-medium ${confidenceIndicator.color}`}>{confidenceIndicator.text}</h3>
              </div>
              <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {confidenceIndicator.description}
              </p>
              <div className="mt-4">
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Confidence Level</span>
                  <span className="font-medium">{experiment.confidence}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${experiment.confidence}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Steady state card */}
            <div className={`p-6 rounded-lg shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center space-x-2">
                {steadyStateIndicator.icon}
                <h3 className={`font-medium ${steadyStateIndicator.color}`}>{steadyStateIndicator.text}</h3>
              </div>
              <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {steadyStateIndicator.description}
              </p>
              <div className="mt-4 flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <CalendarDays className="w-5 h-5 text-gray-400" />
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {experiment.status !== 'completed' ? 
                      `Running for ${Math.floor((new Date() - new Date(experiment.startDate)) / (1000 * 60 * 60 * 24))} days` : 
                      `Ran for ${Math.floor((new Date(experiment.endDate) - new Date(experiment.startDate)) / (1000 * 60 * 60 * 24))} days`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className={`p-6 rounded-lg shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-lg font-medium mb-4">Results Summary</h3>
            
            {/* Variants comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {experiment.variants.map((variant, index) => (
                <div 
                  key={variant.name}
                  className={`p-4 rounded-lg border ${
                    darkMode 
                      ? index === 0 ? 'border-blue-600 bg-blue-900/20' : 'border-orange-600 bg-orange-900/20'
                      : index === 0 ? 'border-blue-500 bg-blue-50' : 'border-orange-500 bg-orange-50'
                  }`}
                >
                  <h4 className={`font-medium ${
                    darkMode
                      ? index === 0 ? 'text-blue-400' : 'text-orange-400'
                      : index === 0 ? 'text-blue-700' : 'text-orange-700'
                  }`}>{variant.name}</h4>
                  
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Users</p>
                      <p className="text-lg font-medium">{variant.users.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Conversions</p>
                      <p className="text-lg font-medium">{variant.conversions.toLocaleString()}</p>
                    </div>
                    <div className="col-span-2">
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Conversion Rate</p>
                      <p className="text-lg font-medium">{getConversionRate(variant)}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Lift indicator */}
            <div className={`p-4 rounded-lg ${
              darkMode 
                ? experiment.lift > 0 ? 'bg-green-900/20' : 'bg-red-900/20'
                : experiment.lift > 0 ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Lift over Control</p>
                  <p className={`text-2xl font-bold ${
                    experiment.lift > 0 
                      ? darkMode ? 'text-green-400' : 'text-green-600'
                      : darkMode ? 'text-red-400' : 'text-red-600'
                  }`}>
                    {experiment.lift > 0 ? '+' : ''}{experiment.lift}%
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Recommendation
                  </p>
                  <p className="text-lg font-medium">
                    {experiment.lift > 10 && experiment.confidence >= 95 
                      ? 'Implement Variant' 
                      : experiment.lift > 0 && experiment.confidence >= 90 
                        ? 'Consider Implementation' 
                        : 'Gather More Data'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Trend Chart */}
          <div className={`p-6 rounded-lg shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-lg font-medium mb-4">Performance Trend</h3>
            <div className="h-64 md:h-80">
              {experiment.metrics.daily.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={experiment.metrics.daily}>
                    <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fill: chartColors.text }}
                      tickFormatter={(date) => {
                        const d = new Date(date);
                        return `${d.getMonth() + 1}/${d.getDate()}`;
                      }}
                    />
                    <YAxis tick={{ fill: chartColors.text }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                        borderColor: darkMode ? '#374151' : '#e5e7eb',
                        color: darkMode ? '#ffffff' : '#000000'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="control" 
                      name="Control" 
                      stroke={chartColors.control} 
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="variant" 
                      name="Variant" 
                      stroke={chartColors.variant} 
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    No daily metrics available for this experiment yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'metrics' && (
        <div className="space-y-8">
          {/* Detailed metrics tab content */}
          <div className={`p-6 rounded-lg shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-lg font-medium mb-4">Conversion Funnel</h3>
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={experiment.metrics.funnel || []}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                  <XAxis dataKey="stage" tick={{ fill: chartColors.text }} />
                  <YAxis tick={{ fill: chartColors.text }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                      borderColor: darkMode ? '#374151' : '#e5e7eb',
                      color: darkMode ? '#ffffff' : '#000000'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="control" name="Control" fill={chartColors.control} />
                  <Bar dataKey="variant" name="Variant" fill={chartColors.variant} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Secondary metrics */}
          <div className={`p-6 rounded-lg shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-lg font-medium mb-4">Secondary Metrics</h3>
            <div className="overflow-x-auto">
              <table className={`min-w-full divide-y divide-gray-200 ${darkMode ? 'divide-gray-700' : ''}`}>
                <thead>
                  <tr>
                    <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'}`}>
                      Metric
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'}`}>
                      Control
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'}`}>
                      Variant
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'}`}>
                      Difference
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y divide-gray-200 ${darkMode ? 'divide-gray-700' : ''}`}>
                  {(experiment.metrics.secondary || []).map((metric, index) => (
                    <tr key={index} className={index % 2 === 0 ? (darkMode ? 'bg-gray-800' : 'bg-white') : (darkMode ? 'bg-gray-900' : 'bg-gray-50')}>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                        {metric.name}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        {metric.control}{metric.unit}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        {metric.variant}{metric.unit}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                        metric.difference > 0 
                          ? darkMode ? 'text-green-400' : 'text-green-600'
                          : metric.difference < 0 
                            ? darkMode ? 'text-red-400' : 'text-red-600'
                            : darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {metric.difference > 0 ? '+' : ''}{metric.difference}{metric.unit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'segments' && (
        <div className="space-y-8">
          {/* Segment analysis tab content */}
          <div className={`p-6 rounded-lg shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-lg font-medium mb-4">Segment Performance</h3>
            <div className="overflow-x-auto">
              <table className={`min-w-full divide-y divide-gray-200 ${darkMode ? 'divide-gray-700' : ''}`}>
                <thead>
                  <tr>
                    <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'}`}>
                      Segment
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'}`}>
                      Control Rate
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'}`}>
                      Variant Rate
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'}`}>
                      Lift
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'}`}>
                      Confidence
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y divide-gray-200 ${darkMode ? 'divide-gray-700' : ''}`}>
                  {(experiment.segments || []).map((segment, index) => (
                    <tr key={index} className={index % 2 === 0 ? (darkMode ? 'bg-gray-800' : 'bg-white') : (darkMode ? 'bg-gray-900' : 'bg-gray-50')}>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                        {segment.name}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        {segment.controlRate}%
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        {segment.variantRate}%
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                        segment.lift > 0 
                          ? darkMode ? 'text-green-400' : 'text-green-600'
                          : segment.lift < 0 
                            ? darkMode ? 'text-red-400' : 'text-red-600'
                            : darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {segment.lift > 0 ? '+' : ''}{segment.lift}%
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        {segment.confidence}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Device breakdown chart */}
          <div className={`p-6 rounded-lg shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-lg font-medium mb-4">Device Breakdown</h3>
            <div className="h-64 md:h-80">
              {experiment.metrics.devices ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={experiment.metrics.devices}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                    <XAxis dataKey="name" tick={{ fill: chartColors.text }} />
                    <YAxis tick={{ fill: chartColors.text }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                        borderColor: darkMode ? '#374151' : '#e5e7eb',
                        color: darkMode ? '#ffffff' : '#000000'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="control" name="Control" fill={chartColors.control} />
                    <Bar dataKey="variant" name="Variant" fill={chartColors.variant} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    No device metrics available for this experiment.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-8">
          {/* Settings tab content */}
          <div className={`p-6 rounded-lg shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-lg font-medium mb-4">Experiment Configuration</h3>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-lg ${
              darkMode ? 'bg-gray-700/50' : 'bg-gray-100'
            }`}>
              <div>
                <h4 className="font-medium mb-2">Traffic Allocation</h4>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Percentage of users</span>
                    <span className="font-medium">{experiment.trafficAllocation || 100}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${experiment.trafficAllocation || 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              // Continuing from where the code was cut off
<div>
                <h4 className="font-medium mb-2">Variant Distribution</h4>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Allocation</span>
                  </div>
                  <div className="w-full flex h-8 rounded-md overflow-hidden">
                    {experiment.variants.map((variant, index) => (
                      <div 
                        key={variant.name}
                        className={`flex items-center justify-center ${
                          index === 0 
                            ? darkMode ? 'bg-blue-700' : 'bg-blue-500' 
                            : darkMode ? 'bg-orange-700' : 'bg-orange-500'
                        }`}
                        style={{ width: `${100 / experiment.variants.length}%` }}
                      >
                        <span className="text-xs text-white font-medium">{variant.name}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-1">
                    {experiment.variants.map((variant) => (
                      <span key={variant.name} className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {Math.round(100 / experiment.variants.length)}%
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <h4 className="font-medium mb-2">Target Audience</h4>
                <ul className={`list-disc pl-5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {experiment.audience ? (
                    experiment.audience.map((criterion, index) => (
                      <li key={index} className="mb-1">{criterion}</li>
                    ))
                  ) : (
                    <li>All users</li>
                  )}
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Goals</h4>
                <ul className={`list-disc pl-5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {experiment.goals ? (
                    experiment.goals.map((goal, index) => (
                      <li key={index} className="mb-1">{goal}</li>
                    ))
                  ) : (
                    <li>Improve primary metric: {experiment.primaryMetric}</li>
                  )}
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Variants</h4>
                {experiment.variants.map((variant, index) => (
                  <div 
                    key={variant.name} 
                    className={`p-4 mb-4 rounded-lg ${
                      darkMode 
                        ? index === 0 ? 'bg-blue-900/20' : 'bg-orange-900/20'
                        : index === 0 ? 'bg-blue-50' : 'bg-orange-50'
                    }`}
                  >
                    <h5 className={`font-medium ${
                      darkMode
                        ? index === 0 ? 'text-blue-400' : 'text-orange-400'
                        : index === 0 ? 'text-blue-700' : 'text-orange-700'
                    }`}>
                      {variant.name}
                    </h5>
                    <p className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {variant.description || 'No description provided'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Advanced settings */}
          <div className={`p-6 rounded-lg shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-lg font-medium mb-4">Advanced Settings</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Statistical Method</h4>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {experiment.statisticalMethod || 'Bayesian Statistics'} 
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Minimum Detectable Effect</h4>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {experiment.mde || '5'}% 
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Stop Criteria</h4>
                <ul className={`list-disc pl-5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {experiment.stopCriteria ? (
                    experiment.stopCriteria.map((criterion, index) => (
                      <li key={index} className="mb-1">{criterion}</li>
                    ))
                  ) : (
                    <>
                      <li>95% confidence level reached</li>
                      <li>Maximum run time: 30 days</li>
                      <li>Minimum sample size: 1,000 users per variant</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperimentDetail;