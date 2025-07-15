import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: any[];
  theme: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, navLinks, theme }) => {
  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('mobile-menu-open');
      document.documentElement.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
      document.documentElement.classList.remove('mobile-menu-open');
    }
    
    return () => {
      document.body.classList.remove('mobile-menu-open');
      document.documentElement.classList.remove('mobile-menu-open');
    };
  }, [isOpen]);

  // Add animation styles
  useEffect(() => {
    const styleId = 'mobile-menu-animation-styles';
    if (!document.getElementById(styleId) && isOpen) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }
  }, [isOpen]);

  // Don't render anything if not open
  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.97)' : 'rgba(255, 255, 255, 0.97)',
        color: theme === 'dark' ? '#ffffff' : '#000000',
        zIndex: 99999,
        overflowY: 'auto',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        animation: 'fadeIn 0.2s ease-out',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: '1px solid',
        borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
      }}>
        <div>
          <img 
            src={theme === 'dark' ? '/lovable-uploads/Rashmi-logo-dark.png' : '/lovable-uploads/Rashmi-logo-light.png'} 
            alt="Rashmi Metaliks"
            style={{ height: '36px' }}
          />
        </div>
        
        <button 
          onClick={onClose}
          style={{
            background: '#E53935',
            color: 'white',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }}
        >
          <X size={22} />
        </button>
      </div>
      
      {/* Navigation */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {navLinks && navLinks.length > 0 ? (
          navLinks.map((link, index) => (
            <div 
              key={index} 
              style={{
                borderBottom: '1px solid',
                borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                paddingBottom: '16px',
                marginBottom: '16px'
              }}
            >
              <div style={{
                fontWeight: 'bold', 
                fontSize: '20px', 
                marginBottom: '12px',
                fontFamily: "'Playfair Display', serif"
              }}>
                {link.label || 'Missing Label'}
              </div>
              
              <div style={{paddingLeft: '16px'}}>
                {link.items && link.items.length > 0 ? (
                  link.items.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href || '#'}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '12px 8px',
                        color: theme === 'dark' ? '#ffffff' : '#000000',
                        textDecoration: 'none',
                        borderRadius: '8px',
                        transition: 'background-color 0.2s',
                        margin: '4px 0'
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        onClose();
                        setTimeout(() => { 
                          window.location.href = item.href || '/'; 
                        }, 50);
                      }}
                    >
                      {item.icon && (
                        <span style={{
                          marginRight: '12px', 
                          display: 'inline-flex',
                          color: '#E53935'
                        }}>
                          {item.icon}
                        </span>
                      )}
                      <span style={{ fontWeight: 500 }}>{item.label || 'Missing Item Label'}</span>
                    </a>
                  ))
                ) : null}
              </div>
            </div>
          ))
        ) : null}
      </div>
      
      {/* Close button */}
      <div style={{marginTop: '24px'}}>
        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
            color: theme === 'dark' ? '#ffffff' : '#000000',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '16px'
          }}
        >
          <span style={{marginRight: '8px'}}>Close Menu</span>
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default MobileMenu; 