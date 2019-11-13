export const setAuth = (values) => {
  Object.entries(values).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });
};

export const checkAuth = item => !!localStorage.getItem(item);

export const getAuth = item => localStorage.getItem(item);

export const removeAuth = item => localStorage.removeItem(item);

export const removeAll = () => localStorage.clear();
