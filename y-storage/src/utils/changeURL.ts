const changeURL = (vid: string): string => {
  return `https://i.ytimg.com/vi/${vid.slice(0, -4)}/mqdefault.jpg`;
};

export default changeURL;
