// mockData.js
export const mockExperiments = [
    {
      id: 1,
      name: "Homepage Redesign A/B Test",
      description: "Testing new homepage layout against current design to improve conversion rate",
      status: "active",
      startDate: "2025-04-01",
      endDate: "2025-05-15",
      primaryMetric: "conversion",
      steady: true,
      confidence: 95,
      lift: 12.5,
      variants: [
        { name: "Control", users: 5000, conversions: 500 },
        { name: "Variant A", users: 5120, conversions: 640 }
      ],
      metrics: {
        daily: [
          { date: "2025-04-01", control: 9.2, variant: 10.1 },
          { date: "2025-04-02", control: 9.5, variant: 10.3 },
          { date: "2025-04-03", control: 9.8, variant: 11.2 },
          { date: "2025-04-04", control: 9.3, variant: 11.0 },
          { date: "2025-04-05", control: 9.7, variant: 11.5 },
          { date: "2025-04-06", control: 10.0, variant: 12.3 },
          { date: "2025-04-07", control: 9.9, variant: 12.5 },
          { date: "2025-04-08", control: 10.1, variant: 12.4 },
          { date: "2025-04-09", control: 10.0, variant: 12.6 },
          { date: "2025-04-10", control: 10.2, variant: 12.5 }
        ],
        segments: [
          { name: "Mobile", control: 8.5, variant: 11.2, lift: 31.8 },
          { name: "Desktop", control: 11.5, variant: 13.1, lift: 13.9 },
          { name: "New Users", control: 7.2, variant: 9.5, lift: 31.9 },
          { name: "Returning Users", control: 12.4, variant: 13.8, lift: 11.3 }
        ]
      }
    },
    {
      id: 2,
      name: "Pricing Page Optimization",
      description: "Testing different pricing structures and displays to maximize subscription signups",
      status: "completed",
      startDate: "2025-03-10",
      endDate: "2025-04-10",
      primaryMetric: "subscription",
      steady: true,
      confidence: 99,
      lift: 8.3,
      variants: [
        { name: "Control", users: 8200, conversions: 492 },
        { name: "Variant A", users: 8150, conversions: 530 }
      ],
      metrics: {
        daily: [
          { date: "2025-03-10", control: 5.8, variant: 6.0 },
          { date: "2025-03-15", control: 6.0, variant: 6.3 },
          { date: "2025-03-20", control: 5.9, variant: 6.5 },
          { date: "2025-03-25", control: 6.1, variant: 6.7 },
          { date: "2025-03-30", control: 6.0, variant: 6.8 },
          { date: "2025-04-05", control: 6.2, variant: 6.7 },
          { date: "2025-04-10", control: 6.0, variant: 6.5 }
        ],
        segments: [
          { name: "Free Trial", control: 4.2, variant: 5.0, lift: 19.0 },
          { name: "Direct Purchase", control: 7.8, variant: 8.0, lift: 2.6 },
          { name: "Small Business", control: 5.5, variant: 6.2, lift: 12.7 },
          { name: "Enterprise", control: 6.5, variant: 6.8, lift: 4.6 }
        ]
      }
    },
    {
      id: 3,
      name: "Email Subject Line Testing",
      description: "Testing different email subject lines to improve open rates",
      status: "active",
      startDate: "2025-04-15",
      endDate: "2025-05-15",
      primaryMetric: "opens",
      steady: false,
      confidence: 80,
      lift: 5.2,
      variants: [
        { name: "Control", users: 25000, conversions: 5750 },
        { name: "Variant A", users: 25000, conversions: 6050 }
      ],
      metrics: {
        daily: [
          { date: "2025-04-15", control: 22.8, variant: 23.0 },
          { date: "2025-04-16", control: 23.0, variant: 23.5 },
          { date: "2025-04-17", control: 22.7, variant: 24.2 },
          { date: "2025-04-18", control: 23.1, variant: 24.5 },
          { date: "2025-04-19", control: 23.0, variant: 24.8 },
          { date: "2025-04-20", control: 23.2, variant: 24.3 }
        ],
        segments: [
          { name: "Active Users", control: 28.5, variant: 30.2, lift: 6.0 },
          { name: "Dormant Users", control: 18.2, variant: 19.5, lift: 7.1 },
          { name: "New Subscribers", control: 26.4, variant: 27.8, lift: 5.3 }
        ]
      }
    },
    {
      id: 4,
      name: "Checkout Flow Optimization",
      description: "Testing simplified checkout process against current multi-step flow",
      status: "active",
      startDate: "2025-04-20",
      endDate: "2025-05-20",
      primaryMetric: "completion",
      steady: true,
      confidence: 92,
      lift: 15.7,
      variants: [
        { name: "Control", users: 3200, conversions: 1984 },
        { name: "Variant A", users: 3180, conversions: 2294 }
      ],
      metrics: {
        daily: [
          { date: "2025-04-20", control: 60.5, variant: 68.2 },
          { date: "2025-04-21", control: 61.2, variant: 70.5 },
          { date: "2025-04-22", control: 62.1, variant: 71.8 },
          { date: "2025-04-23", control: 62.5, variant: 72.3 },
          { date: "2025-04-24", control: 62.8, variant: 72.8 },
          { date: "2025-04-25", control: 63.0, variant: 73.0 }
        ],
        segments: [
          { name: "First-time customers", control: 55.2, variant: 68.4, lift: 23.9 },
          { name: "Returning customers", control: 71.5, variant: 78.2, lift: 9.4 },
          { name: "Mobile", control: 58.2, variant: 70.5, lift: 21.1 },
          { name: "Desktop", control: 66.8, variant: 75.5, lift: 13.0 }
        ]
      }
    },
    {
      id: 5,
      name: "Feature Adoption Campaign",
      description: "Testing different onboarding flows to increase feature adoption",
      status: "completed",
      startDate: "2025-02-15",
      endDate: "2025-03-15",
      primaryMetric: "engagement",
      steady: true,
      confidence: 97,
      lift: 22.3,
      variants: [
        { name: "Control", users: 4500, conversions: 1170 },
        { name: "Variant A", users: 4480, conversions: 1428 }
      ],
      metrics: {
        daily: [
          { date: "2025-02-15", control: 24.8, variant: 28.5 },
          { date: "2025-02-20", control: 25.2, variant: 30.2 },
          { date: "2025-02-25", control: 26.0, variant: 31.8 },
          { date: "2025-03-01", control: 25.8, variant: 31.5 },
          { date: "2025-03-05", control: 26.2, variant: 32.0 },
          { date: "2025-03-10", control: 26.5, variant: 32.3 },
          { date: "2025-03-15", control: 26.0, variant: 31.8 }
        ],
        segments: [
          { name: "New Users", control: 18.5, variant: 25.2, lift: 36.2 },
          { name: "Power Users", control: 35.2, variant: 38.5, lift: 9.4 },
          { name: "Casual Users", control: 22.1, variant: 28.6, lift: 29.4 }
        ]
      }
    },
    {
      id: 6,
      name: "Push Notification Frequency",
      description: "Testing different push notification frequencies to optimize engagement vs annoyance",
      status: "paused",
      startDate: "2025-04-05",
      endDate: "2025-05-05",
      primaryMetric: "retention",
      steady: false,
      confidence: 65,
      lift: -2.1,
      variants: [
        { name: "Control (Weekly)", users: 15000, conversions: 9750 },
        { name: "Variant A (Daily)", users: 15000, conversions: 9450 }
      ],
      metrics: {
        daily: [
          { date: "2025-04-05", control: 65.2, variant: 64.5 },
          { date: "2025-04-10", control: 65.0, variant: 63.8 },
          { date: "2025-04-15", control: 64.8, variant: 63.5 },
          { date: "2025-04-20", control: 65.2, variant: 62.8 }
        ],
        segments: [
          { name: "Engaged Users", control: 82.5, variant: 81.2, lift: -1.6 },
          { name: "Casual Users", control: 58.4, variant: 55.8, lift: -4.5 },
          { name: "New Users", control: 48.5, variant: 48.2, lift: -0.6 }
        ]
      }
    },
    {
      id: 7,
      name: "Search Results Ranking",
      description: "Testing new search algorithm to improve relevance of results",
      status: "active",
      startDate: "2025-04-10",
      endDate: "2025-05-10",
      primaryMetric: "clicks",
      steady: true,
      confidence: 98,
      lift: 18.2,
      variants: [
        { name: "Control", users: 12000, conversions: 3600 },
        { name: "Variant A", users: 12000, conversions: 4250 }
      ],
      metrics: {
        daily: [
          { date: "2025-04-10", control: 29.8, variant: 32.5 },
          { date: "2025-04-11", control: 30.0, variant: 33.2 },
          { date: "2025-04-12", control: 29.5, variant: 34.8 },
          { date: "2025-04-13", control: 30.1, variant: 35.2 },
          { date: "2025-04-14", control: 30.2, variant: 35.5 },
          { date: "2025-04-15", control: 30.0, variant: 35.4 }
        ],
        segments: [
          { name: "Product Searches", control: 32.5, variant: 38.2, lift: 17.5 },
          { name: "Content Searches", control: 25.4, variant: 30.1, lift: 18.5 },
          { name: "Mobile Users", control: 28.6, variant: 33.8, lift: 18.2 },
          { name: "Desktop Users", control: 31.5, variant: 37.2, lift: 18.1 }
        ]
      }
    },
    {
      id: 8,
      name: "User Onboarding Tutorial",
      description: "Testing interactive tutorial against static instructions for new users",
      status: "draft",
      startDate: "2025-05-01",
      endDate: "2025-06-01",
      primaryMetric: "completion",
      steady: false,
      confidence: 0,
      lift: 0,
      variants: [
        { name: "Control", users: 0, conversions: 0 },
        { name: "Variant A", users: 0, conversions: 0 }
      ],
      metrics: {
        daily: [],
        segments: []
      }
    }
  ];
  
  // Status options for filtering
  export const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'paused', label: 'Paused' },
    { value: 'draft', label: 'Draft' }
  ];
  
  // Date range options for filtering
  export const dateOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'last7', label: 'Last 7 Days' },
    { value: 'last30', label: 'Last 30 Days' },
    { value: 'last90', label: 'Last 90 Days' }
  ];
  
  // Metric options for filtering
  export const metricOptions = [
    { value: 'all', label: 'All Metrics' },
    { value: 'conversion', label: 'Conversion Rate' },
    { value: 'engagement', label: 'Engagement' },
    { value: 'retention', label: 'Retention' },
    { value: 'subscription', label: 'Subscription' },
    { value: 'clicks', label: 'Click Rate' },
    { value: 'opens', label: 'Open Rate' },
    { value: 'completion', label: 'Completion Rate' }
  ];