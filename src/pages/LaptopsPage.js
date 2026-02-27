import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Laptop, Filter, ArrowLeft, Cpu, HardDrive, Monitor, Battery, CheckCircle } from 'lucide-react';

function LaptopsPage() {
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');

  // YOUR LAPTOPS - All image extensions corrected!
  const laptops = [
    {
      id: 1,
      name: "HP Probook 11G4",
      brand: "HP",
      condition: "refurbished",
      price: "KSh 16,000",
      image: require('../images/laptops/laptop1.webp'),
      specs: {
        processor: "Intel CoreM3 8th Gen",
        ram: "8GB DDR4",
        storage: "128GB SSD",
        display: "14\" FHD touchscreen",
        battery: "6-8 hours"
      },
      warranty: "90 days",
      available: true
    },
    {
      id: 2,
      name: "HP Elitebook 1030G8",
      brand: "HP",
      condition: "refurbished",
      price: "KSh 46,000",
      image: require('../images/laptops/laptop2.png'),
      specs: {
        processor: "Intel Core i5 11th Gen",
        ram: "16GB DDR4",
        storage: "512GB SSD",
        display: "14\" FHD touchscreen",
        battery: "6-8 hours"
      },
      warranty: "90 days",
      available: true
    },
    {
      id: 3,
      name: "Dell Latitude E7270",
      brand: "Dell",
      condition: "refurbished",
      price: "KSh 16,000",
      image: require('../images/laptops/laptop3.png'),
      specs: {
        processor: "Intel Core i5 6th Gen",
        ram: "8GB DDR4",
        storage: "256GB SSD",
        display: "14\" FHD touchscreen",
        battery: "6-8 hours"
      },
      warranty: "90 days",
      available: true
    },
    {
      id: 4,
      name: "HP Elitebook 1030G3",
      brand: "HP",
      condition: "refurbished",
      price: "KSh 37,000",
      image: require('../images/laptops/laptop4.png'),
      specs: {
        processor: "Intel Core i5 11th Gen",
        ram: "8GB DDR4",
        storage: "512GB SSD",
        display: "14\" FHD touchscreen",
        battery: "6-8 hours"
      },
      warranty: "90 days",
      available: true
    },
    {
      id: 5,
      name: "HP Elitebook 1030G8",
      brand: "HP",
      condition: "refurbished",
      price: "KSh 60,000",
      image: require('../images/laptops/laptop5.png'),
      specs: {
        processor: "Intel Core i7 11th Gen",
        ram: "32GB DDR4",
        storage: "512GB SSD",
        display: "14\" FHD touchscreen",
        battery: "6-8 hours"
      },
      warranty: "90 days",
      available: true
    },
    {
      id: 6,
      name: "MacBook Air 13-inch (2015)",
      brand: "Apple",
      condition: "refurbished",
      price: "KSh 44,000",
      image: require('../images/laptops/laptop6.png'),
      specs: {
        processor: "Intel Core i5 (1.3GHz – 1.8GHz, 5th Gen)",
        ram: "8GB LPDDR3",
        storage: "256GB SSD",
        display: "13.3\" LED-backlit",
        battery: "6-8 hours"
      },
      warranty: "90 days",
      available: true
    }
  ];

  // Filter laptops
  const filteredLaptops = laptops.filter(laptop => {
    const brandMatch = selectedBrand === 'all' || laptop.brand === selectedBrand;
    const conditionMatch = selectedCondition === 'all' || laptop.condition === selectedCondition;
    return brandMatch && conditionMatch;
  });

  return (
    <div className="laptops-page">

      {/* ── Navigation ── */}
      <nav className="nav nav-scrolled">
        <div className="nav-container">
          <div className="nav-content">
            <div className="logo" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
              <div className="logo-icon"><Laptop className="icon" /></div>
              <span className="logo-text">BeIT Solutions</span>
            </div>
            <div className="nav-links">
              <button className="btn-back" onClick={() => navigate('/')}>
                <ArrowLeft className="icon-sm" /> Back to Home
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Header ── */}
      <section className="laptops-header">
        <div className="container">
          <div className="laptops-header-content">
            <h1 className="laptops-title">Available Laptops</h1>
            <p className="laptops-subtitle">
              Quality tested laptops with warranty. All devices thoroughly inspected and ready to use.
            </p>
          </div>
        </div>
      </section>

      {/* ── Filters & Products ── */}
      <section className="laptops-content">
        <div className="container">
          <div className="laptops-layout">

            {/* Sidebar Filters */}
            <aside className="filters-sidebar">
              <div className="filters-header">
                <Filter className="icon-sm" />
                <h3>Filters</h3>
              </div>

              <div className="filter-group">
                <h4 className="filter-title">Brand</h4>
                <div className="filter-options">
                  {['all', 'Dell', 'HP', 'Apple'].map(brand => (
                    <label key={brand} className="filter-option">
                      <input
                        type="radio"
                        name="brand"
                        value={brand}
                        checked={selectedBrand === brand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                      />
                      <span>{brand === 'all' ? 'All Brands' : brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h4 className="filter-title">Condition</h4>
                <div className="filter-options">
                  {[
                    { value: 'all', label: 'All' },
                    { value: 'new', label: 'Brand New' },
                    { value: 'refurbished', label: 'Certified Refurbished' }
                  ].map(option => (
                    <label key={option.value} className="filter-option">
                      <input
                        type="radio"
                        name="condition"
                        value={option.value}
                        checked={selectedCondition === option.value}
                        onChange={(e) => setSelectedCondition(e.target.value)}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-info">
                <CheckCircle className="icon-sm" />
                <div>
                  <div className="info-title">Quality Guarantee</div>
                  <div className="info-text">All laptops tested & come with warranty</div>
                </div>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="products-area">
              <div className="products-header">
                <p className="products-count">
                  Showing {filteredLaptops.length} {filteredLaptops.length === 1 ? 'laptop' : 'laptops'}
                </p>
              </div>

              <div className="products-grid">
                {filteredLaptops.map(laptop => (
                  <div key={laptop.id} className="product-card">
                    
                    {/* Image */}
                    <div className="product-image-wrapper">
                      <img src={laptop.image} alt={laptop.name} className="product-image" />
                      <div className="product-badges">
                        <span className={`badge ${laptop.condition}`}>
                          {laptop.condition === 'new' ? 'Brand New' : 'Certified Refurbished'}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="product-content">
                      <h3 className="product-name">{laptop.name}</h3>
                      <div className="product-price">{laptop.price}</div>

                      {/* Specs */}
                      <div className="product-specs">
                        <div className="spec-item">
                          <Cpu className="spec-icon" />
                          <span>{laptop.specs.processor}</span>
                        </div>
                        <div className="spec-item">
                          <HardDrive className="spec-icon" />
                          <span>{laptop.specs.ram} | {laptop.specs.storage}</span>
                        </div>
                        <div className="spec-item">
                          <Monitor className="spec-icon" />
                          <span>{laptop.specs.display}</span>
                        </div>
                        <div className="spec-item">
                          <Battery className="spec-icon" />
                          <span>{laptop.specs.battery}</span>
                        </div>
                      </div>

                      {/* Warranty */}
                      <div className="product-warranty">
                        <CheckCircle className="warranty-icon" />
                        <span>{laptop.warranty} warranty included</span>
                      </div>

                      {/* CTA */}
                      <button className="btn-product" onClick={() => {
                        window.location.href = `https://wa.me/254708636727?text=Hi! I'm interested in the ${laptop.name}`;
                      }}>
                        Contact to Buy
                      </button>
                    </div>

                  </div>
                ))}
              </div>

              {filteredLaptops.length === 0 && (
                <div className="no-results">
                  <p>No laptops match your filters. Try adjusting your selection.</p>
                </div>
              )}
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

export default LaptopsPage;