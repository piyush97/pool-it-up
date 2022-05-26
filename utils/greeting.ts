const Greeter = () => {
  if (new Date().getHours() < 12) return 'Good Morning';
  if (new Date().getHours() > 12 && new Date().getHours() < 18) return 'Good Afternoon';
  return 'Good Evening';
};
export default Greeter;
