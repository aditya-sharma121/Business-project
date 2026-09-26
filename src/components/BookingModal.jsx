import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const serviceOptions = [
  "Performance Marketing (Ads)",
  "SEO & Organic Growth",
  "High-Converting Website",
  "Brand Identity & Creative",
  "CRO & Funnel Optimization",
  "Full Growth Partnership",
];

const budgetOptions = [
  "< ₹1.5L / $2k/mo",
  "₹1.5L - ₹4L / $2k-$5k/mo",
  "₹4L - ₹8L / $5k-$10k/mo",
  "₹8L+ / $10k+/mo",
];

const timelineOptions = [
  "Immediately (Next 1-2 weeks)",
  "Within 1 month",
  "Next quarter",
  "Exploring options",
];

function BookingModalDialog({ onClose, initialNote = "" }) {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    notes: initialNote,
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const toggleService = (srv) => {
    setSelectedServices((prev) =>
      prev.includes(srv) ? prev.filter((s) => s !== srv) : [...prev, srv]
    );
  };

  const handleNext = () => {
    setError("");
    if (step === 1 && selectedServices.length === 0) {
      setError("Please select at least one area of focus.");
      return;
    }
    if (step === 2 && (!budget || !timeline)) {
      setError("Please select your estimated budget and timeline.");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setError("");
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Please provide your name and email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please provide a valid email address.");
      return;
    }

    setSubmitted(true);
    setError("");
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <motion.div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <span className="modal-badge">
              {submitted ? "CONFIRMATION" : `STEP ${step} OF 3`}
            </span>
            <h2>{submitted ? "Strategy Call Requested" : "Book a Strategy Call"}</h2>
          </div>
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {error && <div className="modal-error-banner">{error}</div>}

          {submitted ? (
            <div className="modal-success-state">
              <div className="success-icon">✓</div>
              <h3>We received your details, {formData.name}!</h3>
              <p>
                One of our growth directors is reviewing your profile and will
                reach out to <strong>{formData.email}</strong> within 24 hours
                with a custom strategy audit and scheduling link.
              </p>
              <div className="success-summary">
                <div>
                  <span>Focus Areas:</span>
                  <b>{selectedServices.join(", ")}</b>
                </div>
                <div>
                  <span>Estimated Budget:</span>
                  <b>{budget}</b>
                </div>
                <div>
                  <span>Timeline:</span>
                  <b>{timeline}</b>
                </div>
              </div>
              <button className="primary-btn" onClick={onClose}>
                Done & Return to Site
              </button>
            </div>
          ) : (
            <>
              {/* Step 1: Services */}
              {step === 1 && (
                <div className="step-content">
                  <p className="step-desc">
                    What growth channels or solutions are you looking to scale?
                  </p>
                  <div className="pill-grid">
                    {serviceOptions.map((srv) => {
                      const active = selectedServices.includes(srv);
                      return (
                        <button
                          type="button"
                          key={srv}
                          className={`pill-btn ${active ? "active" : ""}`}
                          onClick={() => toggleService(srv)}
                        >
                          <span className="pill-check">{active ? "✓" : "+"}</span>
                          {srv}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 2: Budget & Timeline */}
              {step === 2 && (
                <div className="step-content">
                  <p className="step-desc">
                    Select your monthly investment range and target launch:
                  </p>

                  <div className="input-group">
                    <label className="group-label">Estimated Monthly Growth Budget</label>
                    <div className="option-list">
                      {budgetOptions.map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          className={`choice-card ${budget === opt ? "selected" : ""}`}
                          onClick={() => setBudget(opt)}
                        >
                          <span className="choice-dot" />
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="input-group" style={{ marginTop: "24px" }}>
                    <label className="group-label">Target Implementation Timeline</label>
                    <div className="option-list">
                      {timelineOptions.map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          className={`choice-card ${timeline === opt ? "selected" : ""}`}
                          onClick={() => setTimeline(opt)}
                        >
                          <span className="choice-dot" />
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Contact Info */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="step-content">
                  <p className="step-desc">
                    Where should we send your preliminary growth audit?
                  </p>

                  <div className="form-grid">
                    <div className="form-field">
                      <label htmlFor="name">Your Name *</label>
                      <input
                        id="name"
                        type="text"
                        required
                        placeholder="Aditya Sharma"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="email">Work Email *</label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="aditya@brand.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="company">Company / Brand Name</label>
                      <input
                        id="company"
                        type="text"
                        placeholder="Nexora Direct"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="website">Website or Store URL</label>
                      <input
                        id="website"
                        type="url"
                        placeholder="https://nexora.com"
                        value={formData.website}
                        onChange={(e) =>
                          setFormData({ ...formData, website: e.target.value })
                        }
                      />
                    </div>

                    <div className="form-field full-width">
                      <label htmlFor="notes">Primary Growth Goal / Challenge</label>
                      <textarea
                        id="notes"
                        rows={3}
                        placeholder="Tell us what you're trying to scale or where the bottlenecks are..."
                        value={formData.notes}
                        onChange={(e) =>
                          setFormData({ ...formData, notes: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </form>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        {!submitted && (
          <div className="modal-footer">
            {step > 1 ? (
              <button type="button" className="text-btn" onClick={handleBack}>
                ← Back
              </button>
            ) : (
              <span className="privacy-note">🔒 100% confidential. No spam.</span>
            )}

            {step < 3 ? (
              <button type="button" className="primary-btn" onClick={handleNext}>
                Continue <span>→</span>
              </button>
            ) : (
              <button
                type="button"
                className="primary-btn"
                onClick={handleSubmit}
              >
                Submit Strategy Request <span>↗</span>
              </button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function BookingModal({ isOpen, onClose, initialData = null }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <BookingModalDialog
          key="booking-dialog"
          onClose={onClose}
          initialNote={initialData?.note || ""}
        />
      )}
    </AnimatePresence>
  );
}
