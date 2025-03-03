const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
      <footer  className="bg-dark text-white text-center py-3">
        <p>&copy; {currentYear} Exotic Cars Rental. All Rights Reserved.</p>
      </footer>
    );
  };
  
  export default Footer;