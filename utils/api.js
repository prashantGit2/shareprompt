const getFetchData = async (url, headers = {}) => {
  try {
    const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });
      const data = await res.json();
      return data;
  } catch (error) {
    return error;
  }
};

const postFetchData = async (url, body, headers = {}) => {
    try {
        const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        body: JSON.stringify(body),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        return error;
    }
    }
    
