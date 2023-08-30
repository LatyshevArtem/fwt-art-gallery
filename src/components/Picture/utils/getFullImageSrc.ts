export const getFullImageSrc = (relativePath: string) =>
  `${process.env.REACT_APP_BASE_URL}/${relativePath}`;
