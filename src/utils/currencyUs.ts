export default (price?: number) => {
  if (!price) {
    return '00.00';
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};
