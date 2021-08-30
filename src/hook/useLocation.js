import { useState, useEffect } from "react";

const useLocation = () => {
  const [userReject, setUserReject] = useState(false);
  const [location, setLocation] = useState(null);

  // Run at initial render only
  useEffect(() => {
    const getLocation = async () => {
      try {
        const data = await getCoords();
        const { latitude: lat, longitude: lon } = data.coords;
        setLocation([lat, lon]);
        // setLocationLoading(false);
      } catch (err) {
        if (err.code === 1) {
          setUserReject(true);
        }
      }
    };
    getLocation();
  }, []);

  const getCoords = () => {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
    });
  };

  return [userReject, location];
};

export default useLocation;
