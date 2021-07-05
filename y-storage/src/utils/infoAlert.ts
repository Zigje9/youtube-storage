export const fileInfoAlert = (vid: string, size: number): void => {
  alert(`\n비디오 아이디는 ${vid.slice(0, -4)}\n용량은 ${size}bit 입니다.`);
};

export const timeInfoAlert = (date: Date): void => {
  alert(`\n저장된 시간은\n${date}입니다.`);
};

export const newInfo = (): void => {
  alert(`\n최근 업데이트된 시간입니다.`);
};

export const totalNumber = (): void => {
  alert(`\n현재 저장되어있는 곡의 수입니다.`);
};
