const changeSize = (size: number): string => {
  return `${(size / 10 ** 6).toFixed(2)}MB`;
};

export default changeSize;
