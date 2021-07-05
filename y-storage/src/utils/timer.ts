const timer = (lastTime: string): string => {
  const now = new Date().getTime();
  const before = new Date(lastTime).getTime();
  const diffTime = Math.floor(now - before);
  const diffMinute = Math.floor(diffTime / 60000);
  const diffHour = Math.floor(diffTime / 60000 / 60);
  const diffDay = Math.floor(diffTime / 60000 / 60 / 24);
  const diffYear = Math.floor(diffTime / 60000 / 60 / 24 / 365);
  if (diffMinute < 1) {
    return `New`;
  }

  if (diffMinute < 60) {
    return `${diffMinute}분 전`;
  }

  if (diffHour < 24) {
    return `${diffHour}시간 전`;
  }

  if (diffDay < 365) {
    return `${diffDay}일 전`;
  }

  return `${diffYear}년 전`;
};

export default timer;
