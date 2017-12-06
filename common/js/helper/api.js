import isomorphicFetch from 'isomorphic-fetch';

const apiUrl = process.env.APPLICATION_BASE_URL || '';

// Overrides the fetch() method to add the base API url to the front.
export const fetch = (url, ...rest) => isomorphicFetch(apiUrl + url, ...rest);
