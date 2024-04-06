import { useState, useEffect } from 'react';

const useFetch = <T>(url: string): [T | null, boolean] => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data: T) => {
        setData(data);
        setIsLoading(false);
      });
  }, [url]);

  return [data, isLoading];
};

export default useFetch;
