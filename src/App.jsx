import { useState } from "react";
import { motion } from "motion/react";
import "./App.css";
import {
  services,
  projects,
  testimonials,
  faqs,
  liveFeedTabs,
} from "./data/agencyData";
import BookingModal from "./components/BookingModal";
import CaseStudyModal from "./components/CaseStudyModal";
import GrowthCalculator from "./components/GrowthCalculator";
import LuxuryMarquee from "./components/LuxuryMarquee";
import GrowthPillars from "./components/GrowthPillars";
import AgencyComparison from "./components/AgencyComparison";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [expandedService, setExpandedService] = useState(null);
  const [activeFeedTab, setActiveFeedTab] = useState(liveFeedTabs[0].id);

  const closeMenu = () => setMenuOpen(false);

  const handleOpenBooking = (initialData = null) => {
    setBookingData(initialData);
    setBookingOpen(true);
    closeMenu();
  };

  const handleOpenCaseStudy = (project) => {
    setSelectedCaseStudy(project);
  };

  const toggleServiceExpand = (idx) => {
    setExpandedService(expandedService === idx ? null : idx);
  };

  const currentFeed =
    liveFeedTabs.find((t) => t.id === activeFeedTab) || liveFeedTabs[0];

  return (
    <div className="site">
      <div className="noise" />

      {/* TOP ANNOUNCEMENT BAR */}
      <div className="top-banner">
        <div className="top-banner-inner">
          <span className="banner-pulse" />
          <span>
            <b>PRIVATE CLIENT NOTICE:</b> Accepting only 2 qualifying partner brands for Q2.
          </span>
          <button
            type="button"
            className="banner-link"
            onClick={() =>
              handleOpenBooking({ note: "Inquiry from Top Announcement Bar" })
            }
          >
            Check Availability ↗
          </button>
        </div>
      </div>

      {/* NAVBAR */}
      <header className="navbar">
        <a href="#home" className="logo" onClick={closeMenu}>
          GROW<span className="luxury-gold">LAB</span>
          <span className="logo-badge">PARTNERS</span>
        </a>

        <nav
          id="mobile-nav"
          className={menuOpen ? "nav-links active" : "nav-links"}
        >
          <a href="#services" onClick={closeMenu}>Capabilities</a>
          <a href="#methodology" onClick={closeMenu}>Engine</a>
          <a href="#work" onClick={closeMenu}>Portfolio</a>
          <a href="#calculator" onClick={closeMenu}>ROI Simulator</a>
          <a href="#comparison" onClick={closeMenu}>The Standard</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#faq" onClick={closeMenu}>FAQ</a>
        </nav>

        <button
          type="button"
          className="nav-cta"
          onClick={() =>
            handleOpenBooking({ note: "Inquiry from Header Consultation CTA" })
          }
        >
          Schedule Executive Briefing <span>↗</span>
        </button>

        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Navigation Menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
        >
          <span />
          <span />
        </button>
      </header>

      {/* HERO SECTION */}
      <main id="home">
        <section className="hero">
          <div className="hero-glow glow-one" />
          <div className="hero-glow glow-two" />
          <div className="hero-glow glow-center" />

          <div className="hero-content">
            <motion.div
              className="eyebrow luxury-eyebrow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="status-dot-gold" />
              ELITE GROWTH PARTNERSHIP FOR 8-FIGURE BRANDS
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              We engineer brands
              <br />
              <em className="luxury-gradient-text">market leaders envy.</em>
            </motion.h1>

            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We orchestrate hyper-targeted paid acquisition, first-party attribution modeling, and conversion-engineered digital experiences that systematically turn category contenders into dominant market monopolies.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <button
                type="button"
                className="primary-btn luxury-btn"
                onClick={() =>
                  handleOpenBooking({ note: "Hero CTA: Book Executive Briefing" })
                }
              >
                Schedule Executive Briefing <span>↗</span>
              </button>
              <a href="#work" className="text-btn">
                Inspect Selected Case Studies <span>↓</span>
              </a>
            </motion.div>

            <motion.div
              className="hero-trust"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <span className="trust-pill">Private Roster</span>
              <div className="trust-line" />
              <strong>₹120Cr+</strong>
              <span>Verified Revenue Scaled</span>
              <div className="trust-dot-sep">•</div>
              <strong>99.2%</strong>
              <span>Partner Retention Rate</span>
            </motion.div>

            <motion.div
              className="hero-metrics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <div className="metric-box">
                <strong>3.2X</strong>
                <span>Average Blended ROAS</span>
              </div>
              <div className="metric-box">
                <strong>-41%</strong>
                <span>Blended CAC Reduction</span>
              </div>
              <div className="metric-box">
                <strong>&lt; 6 Brands</strong>
                <span>Strict Active Roster Cap</span>
              </div>
            </motion.div>
          </div>

          {/* Interactive Live Performance Terminal */}
          <motion.div
            className="hero-card luxury-terminal"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="card-top">
              <div className="terminal-title">
                <span className="terminal-dot" />
                PORTFOLIO BI TERMINAL
              </div>
              <span className="live">● LIVE BI FEED</span>
            </div>

            {/* Terminal Channel Tabs */}
            <div className="terminal-tabs">
              {liveFeedTabs.map((tab) => (
                <button
                  type="button"
                  key={tab.id}
                  className={`terminal-tab ${activeFeedTab === tab.id ? "active" : ""}`}
                  onClick={() => setActiveFeedTab(tab.id)}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            <div className="chart">
              <div className="chart-grid grid-1" />
              <div className="chart-grid grid-2" />
              <div className="chart-grid grid-3" />

              <svg viewBox="0 0 500 190" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradientLuxury" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#d9b77a" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#c8ff2e" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                <path
                  className="area"
                  fill="url(#chartGradientLuxury)"
                  d={`${currentFeed.path} L500 190 L0 190 Z`}
                />

                <path className="line" d={currentFeed.path} />
              </svg>
            </div>

            <div className="chart-bottom">
              <div>
                <small>{currentFeed.subtext}</small>
                <strong>{currentFeed.amount}</strong>
              </div>
              <div className="growth">{currentFeed.growth}</div>
            </div>

            <div className="terminal-submetrics">
              <div className="submetric-item">
                <span>{currentFeed.stat1Label}</span>
                <b>{currentFeed.stat1}</b>
              </div>
              <div className="submetric-item">
                <span>{currentFeed.stat2Label}</span>
                <b>{currentFeed.stat2}</b>
              </div>
            </div>
          </motion.div>
        </section>

        {/* INFINITE RUNNING LUXURY MARQUEE */}
        <LuxuryMarquee />

        {/* LOGO STRIP */}
        <section className="logo-strip">
          <span>PORTFOLIO PARTNERS & SELECT VENTURES</span>
          <div>
            <b>NEXORA D2C</b>
            <b>ASTER CAPITAL</b>
            <b>VERTEX HEALTH</b>
            <b>MONO ATELIER</b>
            <b>ELEVATE B2B</b>
          </div>
        </section>

        {/* PROPRIETARY 4-PILLAR GROWTH ENGINE */}
        <GrowthPillars onOpenBooking={handleOpenBooking} />

        {/* SERVICES / CAPABILITIES SECTION */}
        <section className="section services-section" id="services">
          <div className="section-heading">
            <div>
              <span className="section-label">02 — SPECIALIZED DISCIPLINES</span>
              <h2>Bespoke execution. <em>Compounding outcomes.</em></h2>
            </div>
            <p>
              We don't offer generic, cookie-cutter packages. Every growth system is custom-configured around your unique contribution margin, churn curves, and ad unit economics.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => {
              const isExpanded = expandedService === index;
              return (
                <motion.article
                  className={`service-card ${isExpanded ? "expanded" : ""}`}
                  key={service.number}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="service-header-row">
                    <div className="service-number">{service.number}</div>
                    <button
                      type="button"
                      className="service-arrow"
                      onClick={() => toggleServiceExpand(index)}
                      aria-label={`Toggle deliverables for ${service.title}`}
                    >
                      {isExpanded ? "−" : "↗"}
                    </button>
                  </div>

                  <h3>{service.title}</h3>
                  <p>{service.text}</p>

                  <div className="tags">
                    {service.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  {/* Expandable Deliverables Drawer */}
                  <div className={`service-deliverables-panel ${isExpanded ? "open" : ""}`}>
                    <h4>CORE ARCHITECTURAL DELIVERABLES:</h4>
                    <ul>
                      {service.deliverables.map((item) => (
                        <li key={item}>
                          <span className="dot">●</span> {item}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      className="text-btn service-book-btn"
                      onClick={() =>
                        handleOpenBooking({
                          note: `Inquiry specifically about ${service.title}`,
                        })
                      }
                    >
                      Brief Team On This Discipline <span>→</span>
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        {/* SELECTED WORK SECTION */}
        <section className="section work-section" id="work">
          <div className="section-heading">
            <div>
              <span className="section-label">03 — VERIFIED CASE STUDIES</span>
              <h2>Data speaks. <em>Scale follows.</em></h2>
            </div>
            <p>
              Explore our deep-dive architectural blueprints, acquisition funnels, and verified revenue outcomes across high-growth verticals.
            </p>
          </div>

          <div className="projects">
            {projects.map((project, index) => (
              <motion.article
                className="project"
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.12 }}
                onClick={() => handleOpenCaseStudy(project)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleOpenCaseStudy(project)}
              >
                <div className={`project-image project-${index + 1}`}>
                  <div className="project-badge">{project.period}</div>
                  <div className="project-overlay">
                    <span>{project.category}</span>
                    <strong>{project.metric}</strong>
                    <small>{project.label}</small>
                  </div>
                </div>

                <div className="project-info">
                  <div>
                    <span className="client-tag">{project.client}</span>
                    <h3>{project.title}</h3>
                  </div>
                  <span className="view-case-link">
                    Inspect Blueprint ↗
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* INTERACTIVE GROWTH & REVENUE CALCULATOR */}
        <GrowthCalculator onOpenBooking={handleOpenBooking} />

        {/* AGENCY VS PARTNERSHIP COMPARISON MATRIX */}
        <AgencyComparison onOpenBooking={handleOpenBooking} />

        {/* ABOUT SECTION */}
        <section className="about-section" id="about">
          <div className="about-number">05</div>

          <div className="about-content">
            <span className="section-label">THE PRIVATE OFFICE ETHOS</span>

            <h2>
              Not a vendor.
              <br />
              <em className="luxury-gradient-text">Your revenue leadership.</em>
            </h2>

            <p>
              Traditional agencies celebrate billable hours and vanity click-throughs. We operate like equity partners obsessed with net profit, customer cohort payback, and enterprise enterprise valuation.
            </p>

            <div className="about-stats">
              <div>
                <strong>₹120Cr+</strong>
                <span>GMV Scaled</span>
              </div>
              <div>
                <strong>99.2%</strong>
                <span>Client Retention</span>
              </div>
              <div>
                <strong>7+ Years</strong>
                <span>Track Record</span>
              </div>
              <div>
                <strong>3.2X</strong>
                <span>Average ROI</span>
              </div>
            </div>
          </div>

          <div className="about-visual">
            <div className="orbit orbit-1" />
            <div className="orbit orbit-2" />
            <div className="orbit orbit-3" />
            <div className="visual-core">
              <span>G</span>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className="testimonial-section">
          <div className="testimonial-heading">
            <span className="section-label">06 — FOUNDER TESTIMONIALS</span>
            <h2>What enterprise leaders <em>say about us.</em></h2>
          </div>

          <div className="testimonial-grid">
            {testimonials.map((item, index) => (
              <motion.div
                className="testimonial luxury-testimonial"
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div>
                  <div className="testimonial-top">
                    <div className="stars">★★★★★</div>
                    {item.companyBadge && (
                      <span className="company-badge">{item.companyBadge}</span>
                    )}
                  </div>
                  <blockquote>“{item.quote}”</blockquote>
                </div>
                <div className="person">
                  <div className="avatar">{item.name.charAt(0)}</div>
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="section faq-section" id="faq">
          <div className="faq-left">
            <span className="section-label">07 — TRANSPARENCY & TERMS</span>
            <h2>
              Frequently answered
              <br />
              <em className="luxury-gradient-text">executive questions.</em>
            </h2>
            <p style={{ marginTop: "16px", color: "var(--muted)" }}>
              Need tailored terms or NDA prior to initial discovery? Request an executive brief directly.
            </p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div
                className={`faq ${openFaq === index ? "open" : ""}`}
                key={faq.q}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  aria-expanded={openFaq === index}
                >
                  <span>{faq.q}</span>
                  <b>{openFaq === index ? "−" : "+"}</b>
                </button>

                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="cta-section luxury-cta" id="contact">
          <div className="cta-glow" />

          <span className="section-label">EXECUTIVE APPLICATION</span>

          <h2>
            Initiate your brand's
            <br />
            <em className="luxury-gradient-text">next exponential trajectory.</em>
          </h2>

          <p>
            Schedule a 45-minute confidential growth diagnostic with our Principal Partners. We examine your unit economics, acquisition funnels, and pinpoint exact scaling bottlenecks.
          </p>

          <div className="cta-button-group">
            <button
              type="button"
              className="primary-btn large luxury-btn"
              onClick={() =>
                handleOpenBooking({ note: "Inquiry from Bottom Executive CTA" })
              }
            >
              Schedule Executive Briefing <span>↗</span>
            </button>

            <a
              href="mailto:partners@growlab.com?subject=Confidential%20Growth%20Diagnostic"
              className="secondary-btn"
            >
              Executive Email Channel <span>✉</span>
            </a>
          </div>

          <div className="cta-meta">
            <span>📍 Private Offices: Mumbai • Bangalore • Dubai</span>
            <span>🔒 Strict Mutual Non-Disclosure Protection</span>
            <span>⚡ Q2 Partner Availability: 2 Openings Remaining</span>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div>
          <a href="#home" className="logo">
            GROW<span className="luxury-gold">LAB</span>
            <span className="logo-badge">PARTNERS</span>
          </a>
          <p>High-conviction digital growth for category-defining market leaders.</p>
        </div>

        <div className="footer-links">
          <a href="#services">Capabilities</a>
          <a href="#methodology">Proprietary Engine</a>
          <a href="#work">Case Studies</a>
          <a href="#calculator">ROI Simulator</a>
          <a href="#comparison">The Standard</a>
          <a href="#contact" onClick={() => handleOpenBooking()}>Partner Portal</a>
        </div>

        <div className="footer-bottom">
          <span>© 2026 GrowLab Performance Partners LLP. All rights reserved.</span>
          <span>Strict Confidentiality Guaranteed.</span>
        </div>
      </footer>

      {/* WHATSAPP FLOAT BUTTON */}
      <a
        className="whatsapp luxury-whatsapp"
        href="https://wa.me/919999999999?text=Hi%20GrowLab%20Principals,%20I'd%20like%20to%20discuss%20a%20private%20growth%20partnership."
        target="_blank"
        rel="noreferrer"
        aria-label="Direct WhatsApp line with GrowLab Growth Director"
      >
        <span title="Direct Executive Line">💬</span>
      </a>

      {/* MODALS */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialData={bookingData}
      />

      <CaseStudyModal
        isOpen={!!selectedCaseStudy}
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onOpenBooking={(data) => handleOpenBooking(data)}
      />
    </div>
  );
}

export default App;