const handleImageError = (event) => {
  const imageWithError = event.target;
  imageWithError.onerror = null;
  imageWithError.src = "./src/assets/images/default.jpg";
};
