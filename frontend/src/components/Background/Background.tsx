import React, { useEffect } from 'react';
import SolidBackground from './SolidBackground';
import CustomBackground from './CustomBackground';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/StoreProvider';

interface BackgroundProps {
  type?: 'custom' | 'solid';
  value?: string;
  refreshTrigger?: number;
  children: React.ReactNode;
}

const Background: React.FC<BackgroundProps> = observer(({ children }) => {
  const { backgroundStore } = useStore();
  const { type, value, refreshTrigger } = backgroundStore;

  useEffect(() => {
    console.log('Background component called with type:', type, 'value:', value, 'refreshTrigger:', refreshTrigger);
  }, [type, value, refreshTrigger]);

  if (type === 'custom' && value) {
    return <CustomBackground query={value} refreshTrigger={refreshTrigger}>{children}</CustomBackground>;
  }

  if (type === 'solid' && value) {
    return <SolidBackground colorCode={value}>{children}</SolidBackground>;
  }

  return null;
});

export default Background;
