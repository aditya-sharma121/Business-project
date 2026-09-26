import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function CaseStudyModal({ project, isOpen, onClose, onOpenBooking }) {
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
          <motion.div
            className="modal-container case-study-modal"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 25 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            {/* Modal Header */}
            <div className="modal-header">
              <div className="cs-meta">
                <span className="modal-badge">{project.category}</span>
                <span className="cs-client">Client: {project.client}</span>
                <span className="cs-timeline">• {project.period}</span>
              </div>
              <button
                className="modal-close-btn"
                onClick={onClose}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="modal-body cs-body">
              <h2 className="cs-title">{project.title}</h2>
              <p className="cs-summary">{project.summary}</p>

              {/* Highlight Metrics Grid */}
              <div className="cs-metrics-grid">
                {project.metrics?.map((m) => (
                  <div key={m.label} className="cs-metric-card">
                    <strong>{m.value}</strong>
                    <span>{m.label}</span>
                  </div>
                ))}
              </div>

              {/* Challenge & Solution */}
              <div className="cs-breakdown">
                <div className="cs-block">
                  <div className="cs-block-tag challenge">THE CHALLENGE</div>
                  <p>{project.challenge}</p>
                </div>
                <div className="cs-block">
                  <div className="cs-block-tag solution">THE GROWLAB SOLUTION</div>
                  <p>{project.solution}</p>
                </div>
              </div>

              {/* Deliverables Checklist */}
              {project.deliverables && (
                <div className="cs-deliverables">
                  <h4>KEY DELIVERABLES & ARCHITECTURE</h4>
                  <ul>
                    {project.deliverables.map((item) => (
                      <li key={item}>
                        <span className="cs-check">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Client Quote */}
              {project.quote && (
                <div className="cs-quote-box">
                  <blockquote>“{project.quote}”</blockquote>
                  <div className="cs-quote-author">
                    — Leadership, {project.client}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Action Footer */}
            <div className="modal-footer cs-footer">
              <button type="button" className="text-btn" onClick={onClose}>
                Close Case Study
              </button>
              <button
                type="button"
                className="primary-btn"
                onClick={() => {
                  onClose();
                  onOpenBooking({ note: `Interested in results similar to: ${project.title}` });
                }}
              >
                Achieve Similar Results <span>↗</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
