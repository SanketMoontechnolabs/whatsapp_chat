  export const URLS = {}

  if (process.env.NODE_ENV === 'development') {
    Object.assign(URLS, {
      BASE_URL: `${import.meta.env.VITE_REACT_APP_ENDPOINT}/api/v1`,
      SOCKETURL: import.meta.env.VITE_REACT_APP_ENDPOINT,
      IMAGE_URL: import.meta.env.VITE_REACT_APP_ENDPOINT,
      X_API_KEY: import.meta.env.VITE_REACT_APP_API_KEY,
    })
  } else {
    Object.assign(URLS, {
      BASE_URL: `${import.meta.env.VITE_REACT_APP_LIVEPOINT}/api/v1`,
      X_API_KEY: import.meta.env.VITE_REACT_APP_LIVE_API_KEY,
      SOCKETURL: import.meta.env.VITE_REACT_APP_LIVEPOINT,
      IMAGE_URL: import.meta.env.VITE_REACT_APP_LIVEPOINT,
    })
  }
