import InstrumentInWatchlist from "./Instrument";

function Watchlist({ listNumber, instruments }) {
  return (
    <div>
      {instruments && instruments.length > 0 ? (
        instruments.map((instrument) => (
          <InstrumentInWatchlist key={instrument.id} data={instrument} />
        ))
      ) : (
        <div>
          <p>Nothing here. Click to add instruments.</p>
          <button>Add Instrument</button>
        </div>
      )}
    </div>
  );
}

export default Watchlist;
