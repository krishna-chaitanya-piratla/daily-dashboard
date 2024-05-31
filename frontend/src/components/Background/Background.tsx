import React from 'react';
import SolidBackground from './SolidBackground';
import CustomBackground from './CustomBackground';

interface BackgroundProps {
  type?: 'custom' | 'solid';
  value?: string;
  children: React.ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ type = 'solid', value = '#2f2c5c', children }) => {
  if (type === 'custom') {
    return <CustomBackground query={value}>{children}</CustomBackground>;
  }

  return <SolidBackground colorCode={value}>{children}</SolidBackground>;
};

export default Background;
