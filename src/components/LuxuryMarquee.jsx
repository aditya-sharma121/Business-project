import { tickerItems } from "../data/agencyData";

export default function LuxuryMarquee() {
  return (
    <div className="luxury-ticker-wrapper" aria-hidden="true">
      <div className="luxury-ticker-track">
        {[...tickerItems, ...tickerItems].map((item, idx) => (
          <span key={idx} className="luxury-ticker-item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
