const requestControllers = new Map(); // Stores controllers for manual aborting

/**
 * Fetch with timeout and abort support.
 * @param {string} url - The request URL.
 * @param {object} options - Fetch options (method, headers, body).
 * @param {number} timeout - Timeout in milliseconds.
 * @param {string} requestKey - Unique key for manual request cancellation.
 * @returns {Promise<any>}
 */
export const fetchWithTimeout = async <T>(
  url: string,
  options: object = {},
  timeout: number = 5000,
  requestKey?: string,
): Promise<T> => {
  const controller = new AbortController();
  const signal = controller.signal;

  // Set up a timeout to cancel the request
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  // Store the controller if requestKey is provided
  if (requestKey) {
    requestControllers.set(requestKey, controller);
  }

  try {
    const response = await fetch(url, {...options, signal});

    if (!response.ok) {
      throw new Error(
        `HTTP Error: ${response.status} - ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data;
  } finally {
    clearTimeout(timeoutId);
    if (requestKey) {
      requestControllers.delete(requestKey); // Cleanup
    }
  }
};

/**
 * Aborts a fetch request manually.
 * @param {string} requestKey - Unique key of the request to cancel.
 */
export const abortRequest = (requestKey: string) => {
  if (requestControllers.has(requestKey)) {
    requestControllers.get(requestKey).abort();
    requestControllers.delete(requestKey);
  }
};
