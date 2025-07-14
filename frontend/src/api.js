// API configuration for BHABIT CB4
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// API endpoints matching your backend
export const API_ENDPOINTS = {
  topBanner: `${API_BASE_URL}/api/component/top-banner-scroll`,
  bottomBanner: `${API_BASE_URL}/api/component/bottom-banner-scroll`,
  gainersTable: `${API_BASE_URL}/api/component/gainers-table`,
  gainersTable1Min: `${API_BASE_URL}/api/component/gainers-table-1min`,
  losersTable: `${API_BASE_URL}/api/component/losers-table`,
  topMoversBar: `${API_BASE_URL}/api/component/top-movers-bar`,
  crypto: `${API_BASE_URL}/api/crypto`,
  health: `${API_BASE_URL}/api/health`,
  marketOverview: `${API_BASE_URL}/api/market-overview`
};

// Fetch data from API
export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
};
