/**
 * @typedef {Object} PaymentPlatform
 * @property {string} id - Unique identifier for the platform
 * @property {string} name - Display name of the platform
 * @property {string} logo - Logo identifier or URL
 * @property {string} description - Short description of the platform
 * @property {string} authUrl - OAuth authorization URL
 * @property {string[]} scopes - Required OAuth scopes for this platform
 * @property {Object} apiEndpoints - Key API endpoints for this platform
 */

/**
 * @typedef {Object} PlatformCredentials
 * @property {string} accessToken - OAuth access token
 * @property {string} refreshToken - OAuth refresh token
 * @property {number} expiresAt - Token expiration timestamp
 * @property {string} platformId - ID of the connected platform
 */

/**
 * @typedef {Object} TransactionImportResult
 * @property {number} imported - Number of transactions successfully imported
 * @property {number} duplicates - Number of duplicate transactions found
 * @property {number} errors - Number of transactions that failed to import
 * @property {string[]} errorMessages - Descriptions of any errors encountered
 */

// Production-level payment platform configurations
export const paymentPlatforms = [
  {
    id: 'wewire',
    name: 'WeWire',
    logo: '/assets/platform-logos/wewire.svg',
    description: 'Connect your WeWire business account to automatically import transactions.',
    authUrl: 'https://api.wewire.com/oauth/authorize',
    tokenUrl: 'https://api.wewire.com/oauth/token',
    scopes: ['transactions.read', 'account.info'],
    apiEndpoints: {
      transactions: 'https://api.wewire.com/v2/transactions',
      balance: 'https://api.wewire.com/v2/balance',
      accounts: 'https://api.wewire.com/v2/accounts'
    },
    color: '#3b82f6'
  },
  {
    id: 'paybio',
    name: 'PayBio',
    logo: '/assets/platform-logos/paybio.svg', 
    description: 'Integrate with PayBio for seamless transaction imports and payment tracking.',
    authUrl: 'https://paybio.com/connect/oauth',
    tokenUrl: 'https://api.paybio.com/oauth2/token',
    scopes: ['read_transactions', 'read_balances'],
    apiEndpoints: {
      transactions: 'https://api.paybio.com/v1/transactions',
      balance: 'https://api.paybio.com/v1/balances',
      accounts: 'https://api.paybio.com/v1/accounts'
    },
    color: '#8b5cf6'
  },
  {
    id: 'transwise',
    name: 'TransWise',
    logo: '/assets/platform-logos/transwise.svg',
    description: 'Link your TransWise account to track international payments and fees.',
    authUrl: 'https://transwise.com/oauth/authorize',
    tokenUrl: 'https://api.transwise.com/oauth/token',
    scopes: ['transactions:read', 'balances:read', 'profiles:read'],
    apiEndpoints: {
      transactions: 'https://api.transwise.com/v3/profiles/{profileId}/transactions',
      balance: 'https://api.transwise.com/v3/profiles/{profileId}/balances',
      accounts: 'https://api.transwise.com/v3/profiles/{profileId}/accounts'
    },
    color: '#059669'
  },
  {
    id: 'supapay',
    name: 'SupaPay',
    logo: '/assets/platform-logos/supapay.svg',
    description: 'Connect SupaPay to manage and track credit card payments in foreign currencies.',
    authUrl: 'https://connect.supapay.com/oauth2/authorize',
    tokenUrl: 'https://api.supapay.com/oauth2/token',
    scopes: ['read:transactions', 'read:accounts'],
    apiEndpoints: {
      transactions: 'https://api.supapay.com/v2/transactions',
      balance: 'https://api.supapay.com/v2/balances',
      accounts: 'https://api.supapay.com/v2/accounts'
    },
    color: '#ef4444'
  }
];

/**
 * Initialize OAuth authorization flow for the selected payment platform
 * @param {string} platformId - ID of the platform to connect
 * @param {string} redirectUri - URI to redirect to after authorization
 * @returns {string} Authorization URL to redirect the user to
 */
export const initiateOAuth = (platformId, redirectUri) => {
  const platform = paymentPlatforms.find(p => p.id === platformId);
  if (!platform) throw new Error(`Platform ${platformId} not found`);
  
  // Generate and store a state parameter to prevent CSRF attacks
  const state = generateRandomString(24);
  sessionStorage.setItem('oauth_state', state);
  
  // In production, you'd store this in more persistent storage
  sessionStorage.setItem('oauth_platform', platformId);
  
  // Build the authorization URL with required parameters
  const authUrl = new URL(platform.authUrl);
  authUrl.searchParams.append('client_id', process.env.REACT_APP_OAUTH_CLIENT_ID);
  authUrl.searchParams.append('redirect_uri', redirectUri);
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('scope', platform.scopes.join(' '));
  authUrl.searchParams.append('state', state);
  
  return authUrl.toString();
};

/**
 * Exchange authorization code for access token
 * @param {string} code - Authorization code from OAuth redirect
 * @param {string} state - State parameter from OAuth redirect
 * @param {string} redirectUri - The same redirect URI used in the authorization request
 * @returns {Promise<PlatformCredentials>} Platform credentials
 */
export const exchangeCodeForToken = async (code, state, redirectUri) => {
  // Verify state parameter matches stored state
  const storedState = sessionStorage.getItem('oauth_state');
  if (state !== storedState) {
    throw new Error('Invalid state parameter');
  }
  
  const platformId = sessionStorage.getItem('oauth_platform');
  const platform = paymentPlatforms.find(p => p.id === platformId);
  
  // In production, this would be a server-side call to protect client secret
  // For demo purposes, we're simulating the response
  
  // This would be the actual API call:
  /*
  const response = await fetch(platform.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
      client_secret: process.env.REACT_APP_OAUTH_CLIENT_SECRET,
    }),
  });
  
  if (!response.ok) {
    throw new Error(`OAuth token exchange failed: ${response.statusText}`);
  }
  
  const data = await response.json();
  */
  
  // Simulate a successful response
  return {
    accessToken: `mock_access_token_${platformId}_${Date.now()}`,
    refreshToken: `mock_refresh_token_${platformId}_${Date.now()}`,
    expiresAt: Date.now() + 3600000, // 1 hour from now
    platformId
  };
};

/**
 * Import transactions from connected platform
 * @param {PlatformCredentials} credentials - Platform credentials
 * @param {Object} options - Import options like date range
 * @returns {Promise<TransactionImportResult>} Import results
 */
export const importTransactions = async (credentials, options = {}) => {
  const platform = paymentPlatforms.find(p => p.id === credentials.platformId);
  if (!platform) throw new Error(`Platform ${credentials.platformId} not found`);
  
  // In production, this would make an actual API call
  // For demo purposes, we'll simulate the process
  
  // Show how we'd typically structure the API call:
  /*
  const startDate = options.startDate || new Date(Date.now() - 30*24*60*60*1000); // Default to last 30 days
  const endDate = options.endDate || new Date();
  
  const response = await fetch(`${platform.apiEndpoints.transactions}?start=${startDate.toISOString()}&end=${endDate.toISOString()}`, {
    headers: {
      'Authorization': `Bearer ${credentials.accessToken}`,
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    if (response.status === 401) {
      // Handle token expiration - refresh token and retry
      const newCredentials = await refreshAccessToken(credentials);
      return importTransactions(newCredentials, options);
    }
    throw new Error(`Failed to fetch transactions: ${response.statusText}`);
  }
  
  const transactions = await response.json();
  */
  
  // Simulate processing and saving transactions
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
  
  return {
    imported: Math.floor(Math.random() * 20) + 10,
    duplicates: Math.floor(Math.random() * 5),
    errors: Math.floor(Math.random() * 2),
    errorMessages: []
  };
};

// Helper function to generate random string for state parameter
function generateRandomString(length) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}
