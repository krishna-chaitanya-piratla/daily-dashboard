import React from 'react';

interface SolidBackgroundProps {
  colorCode?: string;
  children: React.ReactNode;
}

const SolidBackground: React.FC<SolidBackgroundProps> = ({ colorCode, children }) => {
  return (
    <div style={{ backgroundColor: colorCode, height: '100vh', width: '100vw' }}>
      {children}
    </div>
  );
};

export default SolidBackground;
