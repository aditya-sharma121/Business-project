import { useState, useMemo } from "react";

export default function GrowthCalculator({ onOpenBooking }) {
  const [currency, setCurrency] = useState("INR");
  const [visitors, setVisitors] = useState(25000);
  const [conversionRate, setConversionRate] = useState(1.6);
  const [aov, setAov] = useState(currency === "INR" ? 3500 : 75);

  // Switch AOV defaults on currency change
  const handleCurrencyChange = (newCurr) => {
    if (newCurr === currency) return;
    setCurrency(newCurr);
    if (newCurr === "INR") {
      setAov(Math.round(aov * 75));
    } else {
      setAov(Math.max(25, Math.round(aov / 75)));
    }
  };

  const symbol = currency === "INR" ? "₹" : "$";

  const {
    currentMonthly,
    projectedMonthly,
    monthlyGain,
    annualGain,
    percentageGain,
  } = useMemo(() => {
    const orders = visitors * (conversionRate / 100);
    const curr = orders * aov;

    // Projected: +45% conversion uplift and +20% higher average order value via optimized funnels
    const optimizedCR = conversionRate * 1.45;
    const optimizedAov = aov * 1.20;
    const proj = visitors * (optimizedCR / 100) * optimizedAov;

    const diff = proj - curr;
    const annual = diff * 12;
    const pct = curr > 0 ? Math.round(((proj - curr) / curr) * 100) : 0;

    return {
      currentMonthly: Math.round(curr),
      projectedMonthly: Math.round(proj),
      monthlyGain: Math.round(diff),
      annualGain: Math.round(annual),
      percentageGain: pct,
    };
  }, [visitors, conversionRate, aov]);

  const formatNumber = (val) => {
    if (currency === "INR") {
      if (val >= 10000000) return `${(val / 10000000).toFixed(2)} Cr`;
      if (val >= 100000) return `${(val / 100000).toFixed(2)} L`;
      return val.toLocaleString("en-IN");
    } else {
      if (val >= 1000000) return `${(val / 1000000).toFixed(2)}M`;
      if (val >= 1000) return `${(val / 1000).toFixed(1)}k`;
      return val.toLocaleString("en-US");
    }
  };

  const handleClaim = () => {
    const note = `Growth Calculator Target: ${visitors.toLocaleString()} visitors/mo @ ${conversionRate}% CR, target ${symbol}${formatNumber(annualGain)} annual uplift.`;
    onOpenBooking({ note });
  };

  return (
    <section className="section calc-section" id="calculator">
      <div className="calc-card">
        <div className="calc-header">
          <div>
            <span className="section-label">INTERACTIVE REVENUE SIMULATOR</span>
            <h2>Estimate your <em>growth potential.</em></h2>
            <p>
              See how our conversion optimization, paid acquisition funnels, and retention systems translate directly into incremental bottom-line revenue.
            </p>
          </div>

          <div className="currency-selector">
            <span className="currency-label">Currency:</span>
            <div className="currency-toggle">
              <button
                type="button"
                className={currency === "INR" ? "active" : ""}
                onClick={() => handleCurrencyChange("INR")}
              >
                ₹ INR
              </button>
              <button
                type="button"
                className={currency === "USD" ? "active" : ""}
                onClick={() => handleCurrencyChange("USD")}
              >
                $ USD
              </button>
            </div>
          </div>
        </div>

        <div className="calc-body">
          {/* Controls Column */}
          <div className="calc-controls">
            {/* Slider 1: Monthly Traffic */}
            <div className="calc-control-group">
              <div className="calc-label-row">
                <label htmlFor="visitors-range">Monthly Website Visitors</label>
                <span className="calc-val-badge">
                  {visitors.toLocaleString()} / mo
                </span>
              </div>
              <input
                id="visitors-range"
                type="range"
                min="2000"
                max="250000"
                step="1000"
                value={visitors}
                onChange={(e) => setVisitors(Number(e.target.value))}
                className="calc-range"
              />
              <div className="range-bounds">
                <span>2,000</span>
                <span>125,000</span>
                <span>250,000+</span>
              </div>
            </div>

            {/* Slider 2: Conversion Rate */}
            <div className="calc-control-group">
              <div className="calc-label-row">
                <label htmlFor="cr-range">Current Conversion Rate</label>
                <span className="calc-val-badge">{conversionRate.toFixed(1)}%</span>
              </div>
              <input
                id="cr-range"
                type="range"
                min="0.5"
                max="5.0"
                step="0.1"
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="calc-range"
              />
              <div className="range-bounds">
                <span>0.5% (Low)</span>
                <span>2.0% (Average)</span>
                <span>5.0% (Top Tier)</span>
              </div>
            </div>

            {/* Slider 3: Average Order / Contract Value */}
            <div className="calc-control-group">
              <div className="calc-label-row">
                <label htmlFor="aov-range">
                  {currency === "INR" ? "Avg. Order Value (AOV)" : "Avg. Deal / Order Value"}
                </label>
                <span className="calc-val-badge">
                  {symbol}
                  {aov.toLocaleString()}
                </span>
              </div>
              <input
                id="aov-range"
                type="range"
                min={currency === "INR" ? "500" : "20"}
                max={currency === "INR" ? "50000" : "1500"}
                step={currency === "INR" ? "250" : "10"}
                value={aov}
                onChange={(e) => setAov(Number(e.target.value))}
                className="calc-range"
              />
              <div className="range-bounds">
                <span>{symbol}{currency === "INR" ? "500" : "20"}</span>
                <span>{symbol}{currency === "INR" ? "25,000" : "750"}</span>
                <span>{symbol}{currency === "INR" ? "50,000+" : "1,500+"}</span>
              </div>
            </div>

            <div className="calc-footnote">
              *Projections based on historical client averages (+45% conversion uplift and +20% retention / basket size optimization).
            </div>
          </div>

          {/* Results Column */}
          <div className="calc-results-panel">
            <div className="results-glow" />

            <div className="results-badge">
              <span>PROJECTED ANNUAL GROWTH</span>
              <span className="growth-tag">+{percentageGain}% Lift</span>
            </div>

            <div className="huge-gain">
              <strong>
                {symbol}
                {formatNumber(annualGain)}
              </strong>
              <small>Estimated Additional Annual Revenue</small>
            </div>

            {/* Visual comparison bars */}
            <div className="comparison-bars">
              <div className="bar-group">
                <div className="bar-meta">
                  <span>Current Monthly Revenue</span>
                  <b>{symbol}{formatNumber(currentMonthly)}</b>
                </div>
                <div className="bar-track">
                  <div
                    className="bar-fill current"
                    style={{
                      width: `${Math.max(15, Math.min(100, (currentMonthly / projectedMonthly) * 100))}%`,
                    }}
                  />
                </div>
              </div>

              <div className="bar-group">
                <div className="bar-meta highlight">
                  <span>Projected Monthly Revenue</span>
                  <b>{symbol}{formatNumber(projectedMonthly)}</b>
                </div>
                <div className="bar-track">
                  <div className="bar-fill projected" style={{ width: "100%" }} />
                </div>
              </div>
            </div>

            <div className="monthly-gain-pill">
              <span>+ {symbol}{formatNumber(monthlyGain)} / month in unlocked revenue</span>
            </div>

            <button
              type="button"
              className="primary-btn full-width"
              onClick={handleClaim}
            >
              Unlock This Growth Blueprint <span>↗</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
