import React, { useEffect, useState } from 'react';
import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY!,
});

interface CustomBackgroundProps {
  query: string;
  children: React.ReactNode;
}

const CustomBackground: React.FC<CustomBackgroundProps> = ({ query, children }) => {
  const [backgroundImage, setBackgroundImage] = useState<string>('');

  useEffect(() => {
    console.log('CustomBackground useEffect called with query:', query);

    const fetchRandomPhoto = async () => {
      try {
        const result = await unsplash.photos.getRandom({ query });
        if (result.errors) {
          console.error('Error fetching photo:', result.errors[0]);
        } else {
          const photo = Array.isArray(result.response) ? result.response[0] : result.response;
          setBackgroundImage(photo.urls.regular);
          console.log('Background image set to:', photo.urls.regular);
        }
      } catch (error) {
        console.error('Error fetching photo:', error);
      }
    };

    fetchRandomPhoto();
  }, [query]);

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', height: '100vh' }}>
      {children}
    </div>
  );
};

export default CustomBackground;
