import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Laptop, ArrowLeft, CheckCircle, ShoppingBag, Menu, X } from 'lucide-react';

function ProductDetailPage() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // COMBINED PRODUCT DATABASE
  const allProducts = [
    // LAPTOPS
    {
      id: 1,
      type: 'laptop',
      name: "HP Probook 11G4",
      brand: "HP",
      price: "KSh 16,000",
      image: require('../images/laptops/laptop1.webp'),
      specs: {
        processor: "Intel CoreM3 8th Gen",
        ram: "8GB DDR4",
        storage: "128GB SSD",
        display: "14\" FHD touchscreen",
        battery: "6-8 hours"
      },
      warranty: "90 days"
    },
    // Add more products here...
    {
      id: 22,
      type: 'laptop',
      name: "Premium 13.3\" Ultrabook",
      brand: "Generic",
      price: "KSh 80,000",
      image: require('../images/laptops/laptop22.png'),
      specs: {
        processor: "Intel Core i5 13th Gen",
        ram: "16GB DDR4",
        storage: "512GB NVMe SSD",
        display: "13.3\" FHD with narrow bezels",
        battery: "8-10 hours"
      },
      warranty: "1 year",
      features: "Ultra-Slim Design | Premium Aluminum | Backlit Keyboard | Fingerprint Reader",
      fullDescription: "High-speed, efficient processing power with seamless multitasking and zero lag. Lightning-fast boot times with ample storage for files. Premium silver aluminum chassis built for maximum durability.",
      details: [
        "Intel Core i5 (13th Generation) – High-speed, efficient processing power",
        "16GB RAM – Seamless multitasking and zero lag",
        "512GB NVMe SSD – Lightning-fast boot times and ample storage for files",
        "13.3-inch crisp, high-definition display with narrow bezels for maximum viewing area",
        "Ultra-slim, professional silver aluminum chassis built for premium durability",
        "Premium backlit keyboard with spacious precision touchpad",
        "Fingerprint reader for quick, secure access",
        "USB Type-C / Thunderbolt, HDMI, and high-speed Wi-Fi connectivity"
      ]
    }
  ];

  const product = allProducts.find(p => p.id === parseInt(productId));

  if (!product) {
    return (
      <div className="product-detail-page">
        <nav className="nav nav-scrolled">
          <div className="nav-container">
            <div className="nav-content">
              <div className="logo" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
                <div className="logo-icon"><Laptop className="icon" /></div>
                <span className="logo-text">BeIT Solutions</span>
              </div>
              <button className="btn-back" onClick={() => navigate('/laptops')}>
                <ArrowLeft className="icon-sm" /> Back to Shop
              </button>
            </div>
          </div>
        </nav>
        <div className="container" style={{textAlign: 'center', padding: '4rem 0'}}>
          <h1>Product not found</h1>
          <button className="btn-primary" onClick={() => navigate('/laptops')} style={{marginTop: '2rem'}}>
            Return to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">

      {/* Navigation */}
      <nav className="nav nav-scrolled">
        <div className="nav-container">
          <div className="nav-content">
            <div className="logo" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
              <div className="logo-icon"><Laptop className="icon" /></div>
              <span className="logo-text">BeIT Solutions</span>
            </div>
            <div className="nav-links">
              <button className="btn-back" onClick={() => navigate('/laptops')}>
                <ArrowLeft className="icon-sm" /> Back to Shop
              </button>
            </div>
            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="icon" /> : <Menu className="icon" />}
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="mobile-nav">
              <button className="btn-nav-mobile" onClick={() => { navigate('/laptops'); setMobileMenuOpen(false); }}>
                <ArrowLeft className="icon-sm" /> Back to Shop
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Product Detail */}
      <section className="product-detail">
        <div className="container">
          <div className="detail-grid">
            
            {/* Product Image */}
            <div className="detail-image-wrapper">
              <img src={product.image} alt={product.name} className="detail-image" />
              {product.type === 'laptop' && (
                <div className="detail-badge">Certified Refurbished</div>
              )}
            </div>

            {/* Product Info */}
            <div className="detail-content">
              <h1 className="detail-title">{product.name}</h1>
              
              <div className="detail-price">{product.price}</div>
              
              {product.features && (
                <div className="detail-features-tag">✨ {product.features}</div>
              )}

              <div className="detail-warranty">
                <CheckCircle className="warranty-icon" />
                <span>{product.warranty} warranty included</span>
              </div>

              {/* Specs Grid */}
              {product.specs && (
                <div className="detail-specs-grid">
                  <div className="detail-spec-item">
                    <div className="spec-label">Processor</div>
                    <div className="spec-value">{product.specs.processor}</div>
                  </div>
                  <div className="detail-spec-item">
                    <div className="spec-label">Memory</div>
                    <div className="spec-value">{product.specs.ram}</div>
                  </div>
                  <div className="detail-spec-item">
                    <div className="spec-label">Storage</div>
                    <div className="spec-value">{product.specs.storage}</div>
                  </div>
                  <div className="detail-spec-item">
                    <div className="spec-label">Display</div>
                    <div className="spec-value">{product.specs.display}</div>
                  </div>
                </div>
              )}

              {/* Full Description */}
              {product.fullDescription && (
                <div className="detail-description">
                  <h3>About This Product</h3>
                  <p>{product.fullDescription}</p>
                </div>
              )}

              {/* Detailed Features List */}
              {product.details && (
                <div className="detail-specifications">
                  <h3>Full Specifications</h3>
                  <ul className="specs-list">
                    {product.details.map((detail, idx) => (
                      <li key={idx}>
                        <CheckCircle className="check-icon" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Description from accessories */}
              {product.description && !product.fullDescription && (
                <div className="detail-description">
                  <h3>Product Information</h3>
                  <p>{product.description}</p>
                </div>
              )}

              {/* Compatibility */}
              {product.compatibility && (
                <div className="detail-compatibility">
                  <h3>Compatibility</h3>
                  <p>{product.compatibility}</p>
                </div>
              )}

              {/* Highlights */}
              {product.highlights && (
                <div className="detail-highlights">
                  <h3>Key Highlights</h3>
                  <p>{product.highlights}</p>
                </div>
              )}

              {/* Accessory Details */}
              {product.details && product.type !== 'laptop' && (
                <div className="detail-features-list">
                  <h3>Features</h3>
                  <ul className="features-list">
                    {product.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Call to Action */}
              <button 
                className="btn-detail-buy"
                onClick={() => {
                  window.location.href = `https://wa.me/254708636727?text=Hi! I'm interested in the ${product.name}`;
                }}
              >
                <ShoppingBag className="btn-icon" />
                Contact to Buy via WhatsApp
              </button>

              <p className="detail-contact-info">
                📞 +254 708 636 727 | 📧 wanyoikebenayah77@gmail.com
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Related Products Section */}
      <section className="related-products">
        <div className="container">
          <h2 className="section-title">You might also like</h2>
          <button className="btn-view-more" onClick={() => navigate('/laptops')}>
            View All Products in Shop
          </button>
        </div>
      </section>

      {/* Footer */}
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

export default ProductDetailPage;