import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
 
const ScrollToTop = () => {
  const location = useLocation();
 
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [location]); // Trigger when location changes
 
  return null; // This component doesn't render anything
};
 
export default ScrollToTop;