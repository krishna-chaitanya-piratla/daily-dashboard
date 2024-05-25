import React, { useEffect, useState } from 'react';
import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY!,
});

interface BackgroundImageProps {
  query: string;
  children: React.ReactNode;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ query, children }) => {
  const [backgroundImage, setBackgroundImage] = useState<string>('');

  useEffect(() => {
    console.log(`abcd = ${process.env.UNSPLASH_ACCESS_KEY}`);
    const fetchRandomPhoto = async () => {
      try {
        const result = await unsplash.photos.getRandom({ query });
        if (result.errors) {
          console.error('Error fetching photo:', result.errors[0]);
        } else {
          const photo = Array.isArray(result.response) ? result.response[0] : result.response;
          setBackgroundImage(photo.urls.regular);
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

export default BackgroundImage;
