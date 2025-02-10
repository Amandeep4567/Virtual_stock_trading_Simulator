// services/cacheService.js
const cache = new Map();

const set = (key, value, ttl) => {
  const expireAt = Date.now() + ttl * 1000;
  cache.set(key, { value, expireAt });
};

const get = (key) => {
  const cached = cache.get(key);

  if (!cached) {
    return null;
  }

  if (Date.now() > cached.expireAt) {
    cache.delete(key);
    return null;
  }

  return cached.value;
};

export default { set, get };
