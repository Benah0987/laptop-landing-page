import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Laptop,  ArrowLeft, ShoppingBag, CheckCircle, Menu, X } from 'lucide-react';

function AccessoriesPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ACCESSORIES DATA - Add your actual accessories here
  const accessories = [
    {
      id: 1,
      name: "Dell 65W Laptop Charger",
      category: "chargers",
      price: "KSh 1,500",
      image: require('../images/accessories/charger1.png'),
      description: "Original Dell 65W charger compatible with most Dell laptops",
      compatibility: "Dell Latitude, Inspiron series",
      available: true
    },
    {
      id: 2,
      name: "HP 65W Laptop Charger",
      category: "chargers",
      price: "KSh 1,500",
      image: require('../images/accessories/charger2.jpeg'),
      description: "Original HP 65W charger for EliteBook and ProBook",
      compatibility: "HP EliteBook, ProBook series",
      available: true
    },
    {
      id: 3,
      name: "Wireless Mouse",
      category: "mouse",
      price: "KSh 800",
      image: require('../images/accessories/mouse1.png'),
      description: "2.4GHz wireless mouse with ergonomic design",
      compatibility: "Universal - works with all laptops",
      available: true
    },
    {
      id: 4,
      name: "Gaming Mouse",
      category: "mouse",
      price: "KSh 1,200",
      image: require('../images/accessories/mouse2.png'),
      description: "RGB gaming mouse with adjustable DPI",
      compatibility: "Universal - works with all laptops",
      available: true
    },
    {
      id: 5,
      name: "USB Keyboard",
      category: "keyboards",
      price: "KSh 1,000",
      image: require('../images/accessories/keyboard1.png'),
      description: "Standard USB wired keyboard",
      compatibility: "Universal - works with all laptops",
      available: true
    },
    {
      id: 6,
      name: "Wireless Keyboard",
      category: "keyboards",
      price: "KSh 1,500",
      image: require('../images/accessories/keyboard2.png'),
      description: "Slim wireless keyboard with quiet keys",
      compatibility: "Universal - works with all laptops",
      available: true
    },
    {
      id: 7,
      name: "Laptop Cooling Pad",
      category: "cooling",
      price: "KSh 1,800",
      image: require('../images/accessories/cooling1.png'),
      description: "Cooling pad with dual fans for better airflow",
      compatibility: "Fits 13-17 inch laptops",
      available: true
    },
    {
      id: 8,
      name: "USB-C Hub 4-in-1",
      category: "cables",
      price: "KSh 2,000",
      image: require('../images/accessories/hub1.png'),
      description: "4-port USB-C hub with USB 3.0 and HDMI",
      compatibility: "USB-C laptops",
      available: true
    },
    {
      id: 9,
      name: "Laptop Bag 15.6\"",
      category: "bags",
      price: "KSh 1,200",
      image: require('../images/accessories/bag1.png'),
      description: "Padded laptop bag with extra compartments",
      compatibility: "Fits up to 15.6 inch laptops",
      available: true
    },
    {
      id: 10,
      name: "8GB RAM DDR4",
      category: "ram",
      price: "KSh 3,500",
      image: require('../images/accessories/ram1.png'),
      description: "8GB DDR4 RAM 2666MHz for laptop upgrade",
      compatibility: "Compatible with most modern laptops",
      available: true
    }
  ];

  // Categories
  const categories = [
    { value: 'all', label: 'All Accessories', icon: '🛍️' },
    { value: 'chargers', label: 'Chargers', icon: '🔌' },
    { value: 'mouse', label: 'Mouse & Trackpads', icon: '🖱️' },
    { value: 'keyboards', label: 'Keyboards', icon: '⌨️' },
    { value: 'cooling', label: 'Cooling Pads', icon: '❄️' },
    { value: 'cables', label: 'Cables & Hubs', icon: '🔗' },
    { value: 'bags', label: 'Bags & Cases', icon: '💼' },
    { value: 'ram', label: 'RAM & Storage', icon: '💾' }
  ];

  // Filter accessories
  const filteredAccessories = accessories.filter(accessory => {
    return selectedCategory === 'all' || accessory.category === selectedCategory;
  });

  return (
    <div className="accessories-page">

      {/* ── Navigation ── */}
      <nav className="nav nav-scrolled">
        <div className="nav-container">
          <div className="nav-content">
            <div className="logo" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
              <div className="logo-icon"><Laptop className="icon" /></div>
              <span className="logo-text">BeIT Solutions</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="nav-links">
              <button className="btn-back" onClick={() => navigate('/')}>
                <ArrowLeft className="icon-sm" /> Back to Home
              </button>
              <button className="btn-nav" onClick={() => navigate('/laptops')}>
                Shop Laptops
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="icon" /> : <Menu className="icon" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="mobile-nav">
              <button className="btn-nav-mobile" onClick={() => { navigate('/'); setMobileMenuOpen(false); }}>
                <ArrowLeft className="icon-sm" /> Back to Home
              </button>
              <button className="btn-nav-mobile" onClick={() => { navigate('/laptops'); setMobileMenuOpen(false); }}>
                Shop Laptops
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* ── Header ── */}
      <section className="accessories-header">
        <div className="container">
          <div className="accessories-header-content">
            <h1 className="accessories-title">Computer Accessories</h1>
            <p className="accessories-subtitle">
              Quality accessories for your laptop - chargers, mice, keyboards, and more.
            </p>
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="categories-section">
        <div className="container">
          <div className="categories-grid">
            {categories.map(cat => (
              <button
                key={cat.value}
                className={`category-card ${selectedCategory === cat.value ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.value)}
              >
                <span className="category-icon">{cat.icon}</span>
                <span className="category-label">{cat.label}</span>
                <span className="category-count">
                  {cat.value === 'all' 
                    ? accessories.length 
                    : accessories.filter(a => a.category === cat.value).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products ── */}
      <section className="accessories-content">
        <div className="container">
          <div className="products-header">
            <h2 className="products-section-title">
              {selectedCategory === 'all' 
                ? 'All Accessories' 
                : categories.find(c => c.value === selectedCategory)?.label}
            </h2>
            <p className="products-count">
              {filteredAccessories.length} {filteredAccessories.length === 1 ? 'item' : 'items'}
            </p>
          </div>

          <div className="accessories-grid">
            {filteredAccessories.map(accessory => (
              <div key={accessory.id} className="accessory-card">
                
                {/* Image */}
                <div className="accessory-image-wrapper">
                  <img src={accessory.image} alt={accessory.name} className="accessory-image" />
                </div>

                {/* Content */}
                <div className="accessory-content">
                  <h3 className="accessory-name">{accessory.name}</h3>
                  <div className="accessory-price">{accessory.price}</div>
                  <p className="accessory-description">{accessory.description}</p>
                  
                  <div className="accessory-compatibility">
                    <CheckCircle className="compat-icon" />
                    <span>{accessory.compatibility}</span>
                  </div>

                  {/* CTA */}
                  <button className="btn-accessory" onClick={() => {
                    window.location.href = `https://wa.me/254708636727?text=Hi! I'm interested in the ${accessory.name}`;
                  }}>
                    <ShoppingBag className="btn-icon-sm" />
                    Buy Now
                  </button>
                </div>

              </div>
            ))}
          </div>

          {filteredAccessories.length === 0 && (
            <div className="no-results">
              <p>No accessories in this category yet. Check back soon!</p>
            </div>
          )}
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

export default AccessoriesPage;