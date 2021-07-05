const getDate = (last: Date): string => {
  const year = last.getFullYear();
  const month = last.getMonth() + 1;
  const date = last.getDate();
  const hour = last.getHours();
  return `${year}년 ${month}월 ${date}일 ${hour}시`;
};

export default getDate;
