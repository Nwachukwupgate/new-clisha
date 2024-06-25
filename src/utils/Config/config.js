function config() {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `bearer ${token}` } };
}

export default config;
