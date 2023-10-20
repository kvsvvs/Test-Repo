import { useState, useEffect } from "react";
import axios from "axios";
import Watchlist from "./SingleWatchlist";
import InstrumentSearchResult from "./InstrumentSearchResult";
import InstrumentInWatchlist from "./Instrument";
import { notification } from "antd";

function WatchlistContainer() {
  const [activeWatchlist, setActiveWatchlist] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [watchlistInstruments, setWatchlistInstruments] = useState([]);
  const fetchWatchlistInstruments = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/watchlist/${activeWatchlist}`
      );
      setWatchlistInstruments(response.data);
    } catch (error) {
      console.error("Error fetching instruments for watchlist:", error);
      notification.error({
        message: "Error",
        description: "Failed to fetch instruments for the selected watchlist.",
      });
    }
  };
  useEffect(() => {
    fetchWatchlistInstruments();
  }, [activeWatchlist]);

  const handleAddToWatchlist = async (instrument) => {
    // Check if the instrument is already in the watchlist
    const isInWatchlist = watchlistInstruments.some(
      (i) => i.assetid === instrument.assetid
    );

    if (isInWatchlist) {
      notification.error({
        message: "Error",
        description: "Instrument is already in the watchlist!",
      });
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/addToWatchlist`,
        {
          watchlistId: activeWatchlist,
          instrumentId: instrument.assetid,
        }
      );

      const addedInstrument = response.data;

      setWatchlistInstruments((prevInstruments) => [
        ...prevInstruments,
        addedInstrument,
      ]);

      notification.success({
        message: "Success",
        description: "Instrument added to the watchlist successfully!",
      });
    } catch (error) {
      console.error("Error adding instrument to watchlist:", error);

      notification.error({
        message: "Error",
        description: "Failed to add instrument to watchlist. Please try again.",
      });
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/search`,
        { params: { query: searchQuery } }
      );

      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name or symbol..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Display search results if available, else display the watchlist */}
      {searchResults.length > 0 ? (
        searchResults.map((asset) => (
          <InstrumentSearchResult
            key={asset.assetid}
            data={asset}
            onAddToWatchlist={handleAddToWatchlist}
          />
        ))
      ) : (
        <Watchlist
          listNumber={activeWatchlist}
          instruments={watchlistInstruments}
        />
      )}

      <div className="pagination">
        {[1, 2, 3, 4, 5].map((number) => (
          <button
            key={number}
            className={activeWatchlist === number ? "active" : ""}
            onClick={() => setActiveWatchlist(number)}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}

export default WatchlistContainer;
