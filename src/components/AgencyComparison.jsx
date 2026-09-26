import { motion } from "motion/react";
import { comparisonPoints } from "../data/agencyData";

export default function AgencyComparison({ onOpenBooking }) {
  return (
    <section className="section comparison-section" id="comparison">
      <div className="section-heading centered">
        <span className="section-label">THE HIGH-TICKET STANDARD</span>
        <h2>
          Why market leaders choose a <em>Partner</em> over an agency.
        </h2>
        <p>
          Traditional agency models are broken. They bill for billable hours, shuffle your account to interns, and celebrate vanity metrics. We operate as your dedicated revenue office.
        </p>
      </div>

      <div className="comparison-table-wrapper">
        <div className="comparison-table">
          {/* Header Row */}
          <div className="comparison-row header-row">
            <div className="comp-col label-col">STRATEGIC CRITERIA</div>
            <div className="comp-col traditional-col">
              <span className="col-badge bad">TRADITIONAL AGENCIES</span>
              <h3>The Factory Retainer</h3>
            </div>
            <div className="comp-col growlab-col">
              <span className="col-badge premium">GROWLAB PARTNERSHIP</span>
              <h3>The Embedded Growth Engine</h3>
            </div>
          </div>

          {/* Data Rows */}
          {comparisonPoints.map((item, index) => (
            <motion.div
              className="comparison-row data-row"
              key={item.category}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <div className="comp-col label-col">
                <strong>{item.category}</strong>
              </div>

              <div className="comp-col traditional-col">
                <div className="bullet-row">
                  <span className="icon cross">✕</span>
                  <p>{item.traditional}</p>
                </div>
              </div>

              <div className="comp-col growlab-col">
                <div className="bullet-row">
                  <span className="icon check">✓</span>
                  <p>{item.growlab}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Exclusivity Callout Footer */}
        <div className="exclusivity-callout">
          <div className="exclusivity-content">
            <div className="exclusivity-badge">
              <span className="pulse-glow" />
              SELECTIVE ENGAGEMENT MODEL
            </div>
            <h4>Strict Roster Cap: Maximum 6 Active Brands</h4>
            <p>
              To maintain our 99.2% partner retention rate and deliver direct principal-level attention, we never scale past our capacity threshold.
            </p>
          </div>
          <button
            type="button"
            className="primary-btn"
            onClick={() =>
              onOpenBooking({ note: "Inquiry from Exclusive Comparison Matrix" })
            }
          >
            Apply For Roster Spot <span>↗</span>
          </button>
        </div>
      </div>
    </section>
  );
}
