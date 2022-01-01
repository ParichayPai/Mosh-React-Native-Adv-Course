import React from "react";

export default useApi = (apiFunc) => {
  const [data, setData] = React.useState([]);
  const [hasError, setHasError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const request = async (...args) => {
    setIsLoading(true);
    const response = await apiFunc();
    setIsLoading(false);

    if (!response.ok) {
      return setHasError(true);
      // response.problem
    }

    setHasError(false);
    setData(response.data);
  };

  return { data, hasError, isLoading, request };
};
