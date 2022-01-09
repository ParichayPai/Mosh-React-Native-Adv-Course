import React from "react";

export default useApi = (apiFunc) => {
  const [data, setData] = React.useState([]);
  const [hasError, setHasError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const request = async (...args) => {
    setIsLoading(true);
    const response = await apiFunc(...args);
    setIsLoading(false);

    setHasError(!response.ok);
    setData(response.data);
    return response;
  };

  return { data, hasError, isLoading, request };
};
