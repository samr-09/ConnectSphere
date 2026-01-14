export const toggleTheme = () => {
  const root = document.documentElement;
  root.classList.toggle('dark');

  const isDark = root.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
};
