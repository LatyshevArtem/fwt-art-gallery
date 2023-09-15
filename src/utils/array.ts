export const pushWithCopy = <T>(array: T[], ...items: T[]) => {
  const copiedArray = [...array];
  copiedArray.push(...items);
  return copiedArray;
};
