import { useState, useCallback } from 'react';

/**
 * Custom hook to manage cookies in the application
 * @param {string} cookieName - The name of the cookie
 * @param {any} initialValue - The initial value if cookie doesn't exist
 * @returns {[any, (value: any, options?: CookieOptions) => void, () => void]} A tuple with cookie value, setter, and remove functions
 */
const useCookies = (cookieName, initialValue = '') => {
  // Get initial cookie value or use initialValue if not found
  const getCookie = useCallback(() => {
    const cookies = document.cookie.split(';');
    const cookie = cookies.find((item) => item.trim().startsWith(`${cookieName}=`));
    if (cookie) {
      return JSON.parse(decodeURIComponent(cookie.split('=')[1]));
    }
    return initialValue;
  }, [cookieName, initialValue]);

  const [value, setValue] = useState(getCookie());

  // Set cookie with options
  const setCookie = useCallback((newValue, options = {}) => {
    const {
      path = '/',
      maxAge = 60 * 60 * 24 * 7,
      domain,
      secure = true,
      sameSite = 'Lax'
    } = options;

    let cookieString = `${cookieName}=${encodeURIComponent(JSON.stringify(newValue))}`;
    
    if (path) cookieString += `;path=${path}`;
    if (maxAge) cookieString += `;max-age=${maxAge}`;
    if (domain) cookieString += `;domain=${domain}`;
    if (secure) cookieString += ';secure';
    if (sameSite) cookieString += `;samesite=${sameSite}`;

    document.cookie = cookieString;
    setValue(newValue);
  }, [cookieName]);

  // Remove cookie
  const removeCookie = useCallback(() => {
    document.cookie = `${cookieName}=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    setValue(initialValue);
  }, [cookieName, initialValue]);

  return [value, setCookie, removeCookie];
};


export default useCookies;
