import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { growthPillars } from "../data/agencyData";

export default function GrowthPillars({ onOpenBooking }) {
  const [activePillarId, setActivePillarId] = useState("acquisition");

  const currentPillar =
    growthPillars.find((p) => p.id === activePillarId) || growthPillars[0];

  return (
    <section className="section pillars-section" id="methodology">
      <div className="section-heading">
        <div>
          <span className="section-label">PROPRIETARY GROWTH ENGINE</span>
          <h2>The Four-Pillar <em>Revenue Matrix.</em></h2>
        </div>
        <p>
          We architect growth as a closed-loop system where paid acquisition, site conversion, retention loops, and contribution margins compound together.
        </p>
      </div>

      <div className="pillars-container">
        {/* Pillar Navigation Tabs */}
        <div className="pillar-tabs">
          {growthPillars.map((pillar) => {
            const isActive = pillar.id === activePillarId;
            return (
              <button
                type="button"
                key={pillar.id}
                className={`pillar-tab-btn ${isActive ? "active" : ""}`}
                onClick={() => setActivePillarId(pillar.id)}
              >
                <div className="pillar-tab-top">
                  <span className="p-num">{pillar.num}</span>
                  <span className="p-metric">{pillar.metric}</span>
                </div>
                <div className="p-title">{pillar.name}</div>
                <div className="p-tagline">{pillar.tagline}</div>
                {isActive && (
                  <motion.div
                    layoutId="activePillarIndicator"
                    className="pillar-active-bar"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Pillar Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPillar.id}
            className="pillar-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <div className="pillar-card-left">
              <div className="pillar-card-badge">
                <span>PILLAR {currentPillar.num}</span>
                <span className="pillar-dot">●</span>
                <span>{currentPillar.tagline}</span>
              </div>

              <h3>{currentPillar.name}</h3>
              <p className="pillar-desc">{currentPillar.description}</p>

              <div className="pillar-features-grid">
                {currentPillar.features.map((feat) => (
                  <div key={feat} className="pillar-feature-item">
                    <span className="p-check">✓</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="primary-btn"
                style={{ marginTop: "28px" }}
                onClick={() =>
                  onOpenBooking({
                    note: `Inquiry on Pillar ${currentPillar.num}: ${currentPillar.name}`,
                  })
                }
              >
                Implement This Pillar <span>↗</span>
              </button>
            </div>

            <div className="pillar-card-right">
              <div className="pillar-stat-box">
                <span className="stat-label">{currentPillar.metricLabel}</span>
                <strong className="stat-value">{currentPillar.metric}</strong>
                <div className="stat-verified">
                  <span>✦ Verified Across Portfolio Clients</span>
                </div>
              </div>

              <div className="pillar-flow-diagram">
                <div className="flow-step">
                  <span className="f-num">01</span>
                  <span>Data Capture</span>
                </div>
                <div className="flow-arrow">→</div>
                <div className="flow-step">
                  <span className="f-num">02</span>
                  <span>Algorithmic Optimization</span>
                </div>
                <div className="flow-arrow">→</div>
                <div className="flow-step highlight">
                  <span className="f-num">03</span>
                  <span>EBITDA Scale</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
