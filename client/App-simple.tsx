function SimpleApp() {
  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      lineHeight: '1.6'
    }}>
      {/* Header */}
      <header style={{ 
        borderBottom: '1px solid #e5e7eb',
        paddingBottom: '20px',
        marginBottom: '40px'
      }}>
        <h1 style={{ 
          fontSize: '2.5em',
          color: '#1e40af',
          margin: '0',
          textAlign: 'center'
        }}>
          🚗 CarMarket365
        </h1>
        <p style={{ 
          textAlign: 'center',
          color: '#6b7280',
          margin: '10px 0 0 0'
        }}>
          Find Your Perfect Car
        </p>
      </header>

      {/* Hero Section */}
      <section style={{ 
        backgroundColor: '#f8fafc',
        padding: '60px 40px',
        borderRadius: '12px',
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <h2 style={{ 
          fontSize: '2em',
          color: '#1f2937',
          margin: '0 0 20px 0'
        }}>
          Browse Thousands of Quality Used Cars
        </h2>
        
        <div style={{ 
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <h3 style={{ color: '#374151', marginBottom: '20px' }}>Quick Search</h3>
          
          <div style={{ display: 'grid', gap: '15px' }}>
            <select style={{ 
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '16px'
            }}>
              <option>Any Make</option>
              <option>BMW</option>
              <option>Mercedes-Benz</option>
              <option>Toyota</option>
              <option>Honda</option>
            </select>
            
            <select style={{ 
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '16px'
            }}>
              <option>Any Model</option>
            </select>
            
            <button style={{ 
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}>
              🔍 Search Cars
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ textAlign: 'center', color: '#1f2937', marginBottom: '30px' }}>
          Why Choose CarMarket365?
        </h2>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          <div style={{ 
            backgroundColor: '#f0fdf4',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#166534' }}>✅ Verified Dealers</h3>
            <p style={{ color: '#15803d' }}>All our dealers are verified and trusted</p>
          </div>
          
          <div style={{ 
            backgroundColor: '#eff6ff',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#1d4ed8' }}>🚗 Quality Cars</h3>
            <p style={{ color: '#2563eb' }}>Thousands of quality used vehicles</p>
          </div>
          
          <div style={{ 
            backgroundColor: '#fef3c7',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#92400e' }}>💰 Best Prices</h3>
            <p style={{ color: '#d97706' }}>Competitive pricing on all vehicles</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        borderTop: '1px solid #e5e7eb',
        paddingTop: '20px',
        textAlign: 'center',
        color: '#6b7280'
      }}>
        <p>&copy; 2024 CarMarket365. All rights reserved.</p>
        <p>Your trusted marketplace for quality used cars.</p>
      </footer>
    </div>
  );
}

export default SimpleApp;