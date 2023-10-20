// InstrumentSearchResult.js
function InstrumentSearchResult({ data, onAddToWatchlist }) {
    return (
      <div className="instrument-search-result">
        <span className="symbol">{data.symbol}</span>
        <button onClick={() => onAddToWatchlist(data)}>+</button>
      </div>
    );
  }
  
  export default InstrumentSearchResult;
  