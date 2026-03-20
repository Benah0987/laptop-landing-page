import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Laptop, ArrowLeft, Cpu, HardDrive, Monitor, Battery, CheckCircle, ShoppingBag, Menu, X } from 'lucide-react';

function LaptopsPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('laptops');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // LAPTOPS DATA
  const laptops = [
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
    {
      id: 2,
      type: 'laptop',
      name: "HP Elitebook 1030G8",
      brand: "HP",
      price: "KSh 46,000",
      image: require('../images/laptops/laptop2.png'),
      specs: {
        processor: "Intel Core i5 11th Gen",
        ram: "16GB DDR4",
        storage: "512GB SSD",
        display: "14\" FHD touchscreen",
        battery: "6-8 hours"
      },
      warranty: "90 days"
    },
    {
      id: 3,
      type: 'laptop',
      name: "Dell Latitude E7270",
      brand: "Dell",
      price: "KSh 16,000",
      image: require('../images/laptops/laptop3.png'),
      specs: {
        processor: "Intel Core i5 6th Gen",
        ram: "8GB DDR4",
        storage: "256GB SSD",
        display: "14\" FHD touchscreen",
        battery: "6-8 hours"
      },
      warranty: "90 days"
    },
    {
      id: 4,
      type: 'laptop',
      name: "HP Elitebook 1030G3",
      brand: "HP",
      price: "KSh 37,000",
      image: require('../images/laptops/laptop4.png'),
      specs: {
        processor: "Intel Core i5 11th Gen",
        ram: "8GB DDR4",
        storage: "512GB SSD",
        display: "14\" FHD touchscreen",
        battery: "6-8 hours"
      },
      warranty: "90 days"
    },
    {
      id: 5,
      type: 'laptop',
      name: "HP Elitebook 1030G8",
      brand: "HP",
      price: "KSh 60,000",
      image: require('../images/laptops/laptop5.png'),
      specs: {
        processor: "Intel Core i7 11th Gen",
        ram: "32GB DDR4",
        storage: "512GB SSD",
        display: "14\" FHD touchscreen",
        battery: "6-8 hours"
      },
      warranty: "90 days"
    },
    {
      id: 6,
      type: 'laptop',
      name: "MacBook Air 13-inch (2015)",
      brand: "Apple",
      price: "KSh 44,000",
      image: require('../images/laptops/laptop6.png'),
      specs: {
        processor: "Intel Core i5 5th Gen",
        ram: "8GB LPDDR3",
        storage: "256GB SSD",
        display: "13.3\" LED-backlit",
        battery: "6-8 hours"
      },
      warranty: "90 days"
    },
    {
      id: 7,
      type: 'laptop',
      name: "HP Elite X2 1012 G1",
      brand: "HP",
      price: "KSh 30,000",
      image: require('../images/laptops/laptop7.png'),
      specs: {
        processor: "Intel Core M5 6th Gen",
        ram: "8GB DDR4",
        storage: "256GB SSD",
        display: "12\" FHD touchscreen",
        battery: "6-8 hours"
      },
      warranty: "90 days"
    },
    {
      id: 8,
      type: 'laptop',
      name: "Lenovo X1 Yoga",
      brand: "Lenovo",
      price: "KSh 40,000",
      image: require('../images/laptops/laptop8.png'),
      specs: {
        processor: "Intel Core i7 8th Gen",
        ram: "16GB DDR4",
        storage: "256GB SSD",
        display: "14\" FHD touchscreen 360°",
        battery: "6-8 hours"
      },
      warranty: "90 days"
    },
    {
      id: 9,
      type: 'laptop',
      name: "Dell Latitude 5440",
      brand: "Dell",
      price: "KSh 20,000",
      image: require('../images/laptops/laptop9.png'),
      specs: {
        processor: "Intel Core i5 4th Gen",
        ram: "8GB DDR4",
        storage: "256GB SSD",
        display: "14\" FHD",
        battery: "6-8 hours"
      },
      warranty: "90 days"
    },
    {
      id: 10,
      type: 'laptop',
      name: "HP Elite Dragonfly 1040 G7",
      brand: "HP",
      price: "KSh 55,000",
      image: require('../images/laptops/laptop10.png'),
      specs: {
        processor: "Intel Core i7 10th Gen",
        ram: "16GB DDR4",
        storage: "512GB SSD",
        display: "14\" FHD touchscreen 360°",
        battery: "6-8 hours"
      },
      warranty: "90 days"
    }
  ];

  // ACCESSORIES DATA
  const accessories = [
    {
      id: 101,
      type: 'accessory',
      category: "chargers",
      name: "Dell 65W Laptop Charger",
      price: "KSh 1,500",
      image: require('../images/accessories/charger1.png'),
      description: "Original Dell 65W charger compatible with most Dell laptops",
      compatibility: "Dell Latitude, Inspiron series"
    },
    {
      id: 102,
      type: 'accessory',
      category: "chargers",
      name: "HP 65W Laptop Charger",
      price: "KSh 1,500",
      image: require('../images/accessories/charger2.jpeg'),
      description: "Original HP 65W charger for EliteBook and ProBook",
      compatibility: "HP EliteBook, ProBook series"
    },
    {
      id: 103,
      type: 'accessory',
      category: "mouse",
      name: "Wireless Mouse",
      price: "KSh 800",
      image: require('../images/accessories/mouse1.png'),
      description: "2.4GHz wireless mouse with ergonomic design",
      compatibility: "Universal - works with all laptops"
    },
    {
      id: 104,
      type: 'accessory',
      category: "keyboards",
      name: "Wireless Keyboard",
      price: "KSh 1,500",
      image: require('../images/accessories/keyboard1.png'),
      description: "Slim wireless keyboard with quiet keys",
      compatibility: "Universal - works with all laptops"
    },
    {
      id: 105,
      type: 'accessory',
      category: "cooling",
      name: "Laptop Cooling Pad",
      price: "KSh 1,800",
      image: require('../images/accessories/cooling1.png'),
      description: "Cooling pad with dual fans for better airflow",
      compatibility: "Fits 13-17 inch laptops"
    },
    {
      id: 106,
      type: 'accessory',
      category: "cables",
      name: "USB-C Hub 4-in-1",
      price: "KSh 2,000",
      image: require('../images/accessories/hub1.png'),
      description: "4-port USB-C hub with USB 3.0 and HDMI",
      compatibility: "USB-C laptops"
    },
    {
      id: 107,
      type: 'accessory',
      category: "bags",
      name: "Laptop Bag 15.6\"",
      price: "KSh 1,200",
      image: require('../images/accessories/bag1.png'),
      description: "Padded laptop bag with extra compartments",
      compatibility: "Fits up to 15.6 inch laptops"
    },
    {
      id: 108,
      type: 'accessory',
      category: "ram",
      name: "8GB RAM DDR4",
      price: "KSh 3,500",
      image: require('../images/accessories/ram1.png'),
      description: "8GB DDR4 RAM 2666MHz for laptop upgrade",
      compatibility: "Compatible with most modern laptops"
    }
  ];

  // CATEGORIES
  const categories = [
    { value: 'laptops', label: 'Laptops', icon: '💻', count: laptops.length },
    { value: 'chargers', label: 'Chargers', icon: '🔌', count: accessories.filter(a => a.category === 'chargers').length },
    { value: 'mouse', label: 'Mouse', icon: '🖱️', count: accessories.filter(a => a.category === 'mouse').length },
    { value: 'keyboards', label: 'Keyboards', icon: '⌨️', count: accessories.filter(a => a.category === 'keyboards').length },
    { value: 'cooling', label: 'Cooling', icon: '❄️', count: accessories.filter(a => a.category === 'cooling').length },
    { value: 'cables', label: 'Cables & Hubs', icon: '🔗', count: accessories.filter(a => a.category === 'cables').length },
    { value: 'bags', label: 'Bags', icon: '💼', count: accessories.filter(a => a.category === 'bags').length },
    { value: 'ram', label: 'RAM', icon: '💾', count: accessories.filter(a => a.category === 'ram').length }
  ];

  // Filter logic
  const getFilteredItems = () => {
    if (selectedCategory === 'laptops') {
      return selectedBrand === 'all' 
        ? laptops 
        : laptops.filter(l => l.brand === selectedBrand);
    } else {
      return accessories.filter(a => a.category === selectedCategory);
    }
  };

  const filteredItems = getFilteredItems();
  const isLaptopCategory = selectedCategory === 'laptops';

  return (
    <div className="laptops-page">

      {/* Navigation */}
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
            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="icon" /> : <Menu className="icon" />}
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="mobile-nav">
              <button className="btn-nav-mobile" onClick={() => { navigate('/'); setMobileMenuOpen(false); }}>
                <ArrowLeft className="icon-sm" /> Back to Home
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Header */}
      <section className="laptops-header">
        <div className="container">
          <div className="laptops-header-content">
            <h1 className="laptops-title">Shop</h1>
            <p className="laptops-subtitle">
              Quality laptops and accessories - all tested and ready for you
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="container">
          <div className="categories-grid">
            {categories.map(cat => (
              <button
                key={cat.value}
                className={`category-card ${selectedCategory === cat.value ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCategory(cat.value);
                  setSelectedBrand('all');
                }}
              >
                <span className="category-icon">{cat.icon}</span>
                <span className="category-label">{cat.label}</span>
                <span className="category-count">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Filter (only for laptops) */}
      {isLaptopCategory && (
        <section className="brand-filter-section">
          <div className="container">
            <div className="brand-filters">
              {['all', 'Dell', 'HP', 'Lenovo', 'Apple'].map(brand => (
                <button
                  key={brand}
                  className={`brand-btn ${selectedBrand === brand ? 'active' : ''}`}
                  onClick={() => setSelectedBrand(brand)}
                >
                  {brand === 'all' ? 'All Brands' : brand}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products */}
      <section className="laptops-content">
        <div className="container">
          <div className="products-header">
            <h2 className="products-section-title">
              {categories.find(c => c.value === selectedCategory)?.label}
              {isLaptopCategory && selectedBrand !== 'all' && ` - ${selectedBrand}`}
            </h2>
            <p className="products-count">
              {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
            </p>
          </div>

          <div className={isLaptopCategory ? 'products-grid' : 'accessories-grid'}>
            {filteredItems.map(item => (
              <div key={item.id} className={isLaptopCategory ? 'product-card' : 'accessory-card'}>
                
                {/* Image */}
                <div className={isLaptopCategory ? 'product-image-wrapper' : 'accessory-image-wrapper'}>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className={isLaptopCategory ? 'product-image' : 'accessory-image'} 
                  />
                  {isLaptopCategory && (
                    <div className="product-badges">
                      <span className="badge refurbished">Certified Refurbished</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className={isLaptopCategory ? 'product-content' : 'accessory-content'}>
                  <h3 className={isLaptopCategory ? 'product-name' : 'accessory-name'}>{item.name}</h3>
                  <div className={isLaptopCategory ? 'product-price' : 'accessory-price'}>{item.price}</div>

                  {isLaptopCategory ? (
                    <>
                      {/* Laptop Specs */}
                      <div className="product-specs">
                        <div className="spec-item">
                          <Cpu className="spec-icon" />
                          <span>{item.specs.processor}</span>
                        </div>
                        <div className="spec-item">
                          <HardDrive className="spec-icon" />
                          <span>{item.specs.ram} | {item.specs.storage}</span>
                        </div>
                        <div className="spec-item">
                          <Monitor className="spec-icon" />
                          <span>{item.specs.display}</span>
                        </div>
                        <div className="spec-item">
                          <Battery className="spec-icon" />
                          <span>{item.specs.battery}</span>
                        </div>
                      </div>
                      <div className="product-warranty">
                        <CheckCircle className="warranty-icon" />
                        <span>{item.warranty} warranty included</span>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Accessory Info */}
                      <p className="accessory-description">{item.description}</p>
                      <div className="accessory-compatibility">
                        <CheckCircle className="compat-icon" />
                        <span>{item.compatibility}</span>
                      </div>
                    </>
                  )}

                  {/* Buy Button */}
                  <button 
                    className={isLaptopCategory ? 'btn-product' : 'btn-accessory'} 
                    onClick={() => {
                      window.location.href = `https://wa.me/254708636727?text=Hi! I'm interested in the ${item.name}`;
                    }}
                  >
                    {isLaptopCategory ? (
                      'Contact to Buy'
                    ) : (
                      <>
                        <ShoppingBag className="btn-icon-sm" />
                        Buy Now
                      </>
                    )}
                  </button>
                </div>

              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="no-results">
              <p>No items in this category yet. Check back soon!</p>
            </div>
          )}
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

export default LaptopsPage;