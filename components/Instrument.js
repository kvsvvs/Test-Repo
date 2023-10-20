// InstrumentInWatchlist.js
import { useState } from "react";

function InstrumentInWatchlist({ data }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="instrument-in-watchlist"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="symbol">{data.symbol}</span>

      {isHovered ? (
        <div className="hovered-options">
          <button>Buy</button>
          <button>Sell</button>
          <button>Market Depth</button>
          <button>Chart</button>
          <button>Delete</button>
          <button>More</button>
        </div>
      ) : (
        <div className="price-details">
          <span>Price Change: {/* insert actual value here */}</span>
          <span>Percentage Change: {/* insert actual value here */}</span>
          <span>Live Trading Price: {/* insert actual value here */}</span>
        </div>
      )}
    </div>
  );
}

export default InstrumentInWatchlist;
