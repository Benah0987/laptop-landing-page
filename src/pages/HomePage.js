import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Laptop, Wrench, ShoppingBag, CheckCircle, Phone, Mail, MapPin, Clock, Star, Menu, X } from 'lucide-react';
import heroImg from '../images/hero.jpg';
import aboutImg from '../images/about.jpg';
import teamImg from '../images/team.jpg';

function HomePage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      icon: <ShoppingBag className="svc-icon-svg" />,
      title: "Laptop Sales",
      description: "Premium selection of new and certified refurbished laptops. All devices undergo rigorous quality testing.",
      features: ["Latest models", "Warranty included", "Expert guidance"]
    },
    {
      icon: <Wrench className="svc-icon-svg" />,
      title: "Professional Repairs",
      description: "Fast, reliable repairs for all laptop brands. From screen replacements to motherboard repairs.",
      features: ["Same-day service", "Quality parts", "90-day guarantee"]
    },
    {
      icon: <Laptop className="svc-icon-svg" />,
      title: "Upgrades & Maintenance",
      description: "Extend your laptop's life with RAM upgrades, SSD installations, and preventive maintenance.",
      features: ["Performance boost", "Data preservation", "Expert consultation"]
    }
  ];

  const repairs = [
    "Screen replacement", "Battery replacement",
    "Keyboard repair", "Charging port fix",
    "Software troubleshooting", "Data recovery",
    "Virus removal", "Hardware diagnostics"
  ];

  return (
    <div className="app">

      {/* ── Navigation ── */}
      <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-content">
            <div className="logo" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
              <div className="logo-icon"><Laptop className="icon" /></div>
              <span className="logo-text">BeIT Solutions</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="nav-links">
              <a href="#services">Services</a>
              <a href="#repairs">Repairs</a>
              <a href="#about">About</a>
              <button className="btn-nav" onClick={() => navigate('/laptops')}>Shop</button>
              <a href="#contact">Contact</a>
            </div>

            {/* Mobile Menu Button */}
            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="icon" /> : <Menu className="icon" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="mobile-nav">
              <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
              <a href="#repairs" onClick={() => setMobileMenuOpen(false)}>Repairs</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
              <button className="btn-nav-mobile" onClick={() => { navigate('/laptops'); setMobileMenuOpen(false); }}>
                Shop
              </button>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            </div>
          )}
        </div>
      </nav>

      {/* ── Hero — IMAGE 1 ── */}
      <section className="hero">
        <div className="container">
          <div className="hero-inner">

            <div className="hero-content">
              <div className="hero-badge fade-in-1">
                <span className="badge-text">Professional Laptop Services</span>
              </div>
              <h1 className="hero-title fade-in-2">
                We sell, repair,<br />
                and restore your<br />
                <span className="hero-title-italic">technology</span>
              </h1>
              <p className="hero-description fade-in-3">
                Expert laptop sales and repair services with a commitment to quality,
                speed, and customer satisfaction. Your technology, our expertise.
              </p>
              <div className="hero-buttons fade-in-4">
                <button className="btn-primary btn-browse" onClick={() => navigate('/laptops')}>
                  <ShoppingBag className="btn-icon" />
                  Shop Now
                </button>
                <button className="btn-secondary" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                  Book Repair
                </button>
              </div>
              <p className="hero-subtext fade-in-4">
                ✨ Fresh stock added weekly • 10 laptops + accessories available
              </p>
              <div className="hero-trust fade-in-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="trust-star" />
                ))}
                <span>Trusted by 100+ customers</span>
              </div>
            </div>

            {/* IMAGE 1 */}
            <div className="hero-image-wrapper fade-in-3">
              <img src={heroImg} alt="Tech expert with laptop" className="hero-image" />
              <div className="hero-image-badge">
                <Clock className="badge-clock-icon" />
                <div>
                  <div className="badge-title">24hr</div>
                  <div className="badge-sub">Fast turnaround</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="services">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">What We Do</span>
            <h2 className="section-title">Our Services</h2>
          </div>
          <div className="services-grid">
            {services.map((s, i) => (
              <div key={i} className="service-card">
                <div className="service-icon">{s.icon}</div>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-description">{s.description}</p>
                <ul className="service-features">
                  {s.features.map((f, j) => (
                    <li key={j}><CheckCircle className="check-icon" /><span>{f}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Repairs ── */}
      <section id="repairs" className="repairs">
        <div className="container">
          <div className="repairs-grid">
            <div className="repairs-content">
              <span className="section-badge">Common Repairs</span>
              <h2 className="section-title">We fix it all</h2>
              <p className="repairs-description">
                From simple screen replacements to complex motherboard repairs,
                our certified technicians handle every issue with precision and care.
              </p>
              <div className="turnaround-box">
                <Clock className="turnaround-icon" />
                <div>
                  <div className="turnaround-label">Average turnaround</div>
                  <div className="turnaround-time">24-48 hours</div>
                </div>
              </div>
            </div>
            <div className="repairs-list-grid">
              {repairs.map((r, i) => (
                <div key={i} className="repair-item">{r}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── About — IMAGE 2 ── */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-grid">

            {/* IMAGE 2 */}
            <div className="about-image-wrapper">
              <img src={aboutImg} alt="Our repair workshop" className="about-image" />
            </div>

            <div className="about-content">
              <span className="section-badge">Who We Are</span>
              <h2 className="section-title">Your local laptop<br />experts in Nairobi</h2>
              <p className="about-description">
                Based on Accra Road, BeIT Solutions has been helping individuals and
                businesses with their laptop needs for over 4 years. We combine technical
                expertise with honest, transparent service.
              </p>
              <p className="about-description">
                Whether you need a quick repair, a reliable refurbished laptop, or an upgrade
                to boost your performance — we've got you covered with quality you can trust.
              </p>
              <div className="about-stats">
                <div className="about-stat">
                  <div className="about-stat-number">100+</div>
                  <div className="about-stat-label">Repairs done</div>
                </div>
                <div className="about-stat">
                  <div className="about-stat-number">4+</div>
                  <div className="about-stat-label">Years experience</div>
                </div>
                <div className="about-stat">
                  <div className="about-stat-number">98%</div>
                  <div className="about-stat-label">Satisfaction rate</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Stats Banner ── */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            {[
              { n: "100+", l: "Repairs completed" },
              { n: "98%", l: "Customer satisfaction" },
              { n: "4+", l: "Years experience" },
              { n: "24hr", l: "Fast turnaround" },
            ].map((s, i) => (
              <div key={i} className="stat-item">
                <div className="stat-number">{s.n}</div>
                <div className="stat-label">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Us — IMAGE 3 ── */}
      <section className="why-us">
        <div className="container">
          <div className="why-us-grid">

            <div className="why-us-content">
              <span className="section-badge">Why BeIT Solutions</span>
              <h2 className="section-title">Repairs done right,<br />the first time</h2>
              <p className="why-us-description">
                We don't cut corners. Every repair uses quality parts, every laptop
                we sell is thoroughly tested, and every customer leaves satisfied.
              </p>
              <ul className="why-us-list">
                {[
                  "Certified technicians",
                  "Transparent pricing — no hidden fees",
                  "90-day repair guarantee",
                  "Free diagnosis on all devices",
                  "All major laptop brands serviced"
                ].map((item, i) => (
                  <li key={i}><CheckCircle className="check-icon" />{item}</li>
                ))}
              </ul>
            </div>

            {/* IMAGE 3 */}
            <div className="why-us-image-wrapper">
              <img src={teamImg} alt="Technician repairing a laptop" className="why-us-image" />
            </div>

          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <span className="section-badge">Get in Touch</span>
              <h2 className="section-title">Visit us or<br />get a quote</h2>
              <p className="contact-description">
                Stop by our shop or reach out for a free consultation and quote.
                We're here to help with all your laptop needs.
              </p>
              <div className="contact-details">
                <div className="contact-item">
                  <MapPin className="contact-icon" />
                  <div>
                    <div className="contact-label">Location</div>
                    <div className="contact-value">White Angle Hse, Accra rd<br />Nairobi, Kenya</div>
                  </div>
                </div>
                <div className="contact-item">
                  <Phone className="contact-icon" />
                  <div>
                    <div className="contact-label">Phone</div>
                    <div className="contact-value">+254 708 636 727</div>
                  </div>
                </div>
                <div className="contact-item">
                  <Mail className="contact-icon" />
                  <div>
                    <div className="contact-label">Email</div>
                    <div className="contact-value">wanyoikebenayah77@gmail.com</div>
                  </div>
                </div>
                <div className="contact-item">
                  <Clock className="contact-icon" />
                  <div>
                    <div className="contact-label">Hours</div>
                    <div className="contact-value">Mon – Fri: 9am – 6pm</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <h3 className="form-title">Request a Quote</h3>
              <form className="contact-form">
                <input type="text" placeholder="Full Name" className="form-input" />
                <input type="email" placeholder="Email Address" className="form-input" />
                <input type="tel" placeholder="Phone Number" className="form-input" />
                <select className="form-input">
                  <option>Service needed</option>
                  <option>Laptop Repair</option>
                  <option>Buy Laptop</option>
                  <option>Upgrade/Maintenance</option>
                </select>
                <textarea
                  placeholder="Tell us about your laptop issue or requirements"
                  rows="4"
                  className="form-input form-textarea"
                ></textarea>
                <button type="submit" className="btn-submit">Submit Request</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="logo">
              <div className="logo-icon footer-logo-icon"><Laptop className="icon" /></div>
              <span className="logo-text">BeIT Solutions</span>
            </div>
            <div className="footer-text">© 2026 BeIT Solutions. Quality laptop services in Nairobi.</div>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default HomePage;