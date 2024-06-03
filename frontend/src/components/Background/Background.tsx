import React, { useEffect } from 'react';
import SolidBackground from './SolidBackground';
import CustomBackground from './CustomBackground';

interface BackgroundProps {
  type?: 'custom' | 'solid';
  value?: string;
  refreshTrigger?: number;
  children: React.ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ type = 'solid', value = '#2f2c5c', refreshTrigger = 0, children }) => {
  useEffect(() => {
    console.log('Background component called with type:', type, 'value:', value, 'refreshTrigger:', refreshTrigger);
  }, [type, value, refreshTrigger]);

  if (type === 'custom') {
    return <CustomBackground query={value} refreshTrigger={refreshTrigger}>{children}</CustomBackground>;
  }

  return <SolidBackground colorCode={value}>{children}</SolidBackground>;
};

export default Background;
