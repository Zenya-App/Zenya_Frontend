import React, { useState } from 'react';

const FinanceAdBanner = () => {
  const [isDismissed, setIsDismissed] = useState(false);
  
  if (isDismissed) {
    return null;
  }
  
  return (
    <div className="relative bg-gradient-to-r from-slate-700 to-blue-900 text-white py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-800">
                <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a3.833 3.833 0 001.72-.756c.712-.566 1.112-1.35 1.112-2.178 0-.829-.4-1.612-1.113-2.178a3.833 3.833 0 00-1.719-.756V8.334c.376.083.733.25.921.421l.879.66a.75.75 0 00.9-1.2l-.879-.66A2.536 2.536 0 0012.75 7V6z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-sm font-bold">InvestPro Financial</p>
              <p className="text-xs text-slate-300">Sponsored</p>
            </div>
          </div>
          
          <div className="flex-1 text-center px-4 py-1 sm:py-0">
            <p className="text-sm sm:text-base">
              <span className="bg-slate-200 text-blue-800 px-2 py-0.5 rounded-full text-xs font-bold mr-2">LIMITED OFFER</span>
              Open an account today and get 0% commission on all trades for 3 months!
            </p>
          </div>
          
          <div className="flex items-center gap-3 mt-2 sm:mt-0">
            <a 
              href="https://example.com/investpro"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-100 text-blue-800 hover:bg-slate-200 px-4 py-1 rounded-full text-sm font-medium shadow-sm transition-colors"
            >
              Claim Offer
            </a>
            <button 
              onClick={() => setIsDismissed(true)}
              className="text-slate-300 hover:text-white transition-colors"
              aria-label="Dismiss ad"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceAdBanner;
