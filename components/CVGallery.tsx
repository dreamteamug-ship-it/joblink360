import React, { useState } from 'react';

export const CVGallery = ({ auditData }) => {
  const [theme, setTheme] = useState('sovereign'); // sovereign, pearl, modern

  const themes = {
    sovereign: { bg: '#0A192F', accent: '#D4AF37', font: 'Montserrat' },
    pearl: { bg: '#FFFDF5', accent: '#1A1A1A', font: 'Lato' },
    modern: { bg: '#1A1A1A', accent: '#00F2FF', font: 'Montserrat' }
  };

  return (
    <div className="gallery-container" style={{ padding: '20px' }}>
      <div className="theme-selector" style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={() => setTheme('sovereign')} style={{ padding: '10px', background: '#0A192F', color: '#D4AF37', cursor: 'pointer' }}>Sovereign</button>
        <button onClick={() => setTheme('pearl')} style={{ padding: '10px', background: '#FFFDF5', border: '1px solid #ddd', cursor: 'pointer' }}>Classic Pearl</button>
        <button onClick={() => setTheme('modern')} style={{ padding: '10px', background: '#1A1A1A', color: '#00F2FF', cursor: 'pointer' }}>Modern Tech</button>
      </div>

      <div className="preview-area" style={{ 
        backgroundColor: themes[theme].bg, 
        color: theme === 'pearl' ? '#000' : '#fff',
        padding: '40px',
        minHeight: '400px',
        border: `4px solid ${themes[theme].accent}`,
        fontFamily: themes[theme].font
      }}>
        <h1 style={{ color: themes[theme].accent }}>{auditData.name || "Student Name"}</h1>
        <p>Tier Status: {auditData.tier || "Auditing..."}</p>
        <hr style={{ borderColor: themes[theme].accent }} />
        <div className="content">
          <p>Verified Strengths: {auditData.strengths || "Analyzing..."}</p>
        </div>
      </div>
      
      <p style={{ fontSize: '12px', marginTop: '10px' }}>Project owned, managed and Deployed by Delite Productions House</p>
    </div>
  );
};