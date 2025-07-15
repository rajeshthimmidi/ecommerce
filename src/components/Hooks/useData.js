import { useState, useEffect } from 'react';
import apiClient from '../utils/api-client';

const useData = (endpoint , customconfig, deps) => {
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState(""); 

  useEffect(() => {
    apiClient.get(endpoint, customconfig)
      .then(
        res => {
  if (endpoint === "/products" && data && data.products && customconfig && customconfig.params.page!==1) {
    const prevIds = new Set(data.products.map(p => p._id));
    setData(prev => ({
      ...prev,
      products: [
        ...prev.products,
        ...res.data.products.filter(p => !prevIds.has(p._id))
      ],
    }));
  } else {
    setData(res.data);
  }
})
      .catch(err => setErrors(err.message));
  }, deps ? [...deps] : []);

  return { data, errors };
};

export default useData;