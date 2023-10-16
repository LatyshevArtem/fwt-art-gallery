export const getPageNumbers = (totalPageNumbers: number, currentPageNumber: number) => {
  let pageNumbers = new Array(totalPageNumbers).fill(null).map((_, index) => index + 1);

  if (totalPageNumbers > 7 && currentPageNumber <= 3) {
    pageNumbers = [1, 2, 3, 4];
  } else if (
    totalPageNumbers > 7 &&
    currentPageNumber > 3 &&
    currentPageNumber < totalPageNumbers - 2
  ) {
    pageNumbers = [currentPageNumber - 1, currentPageNumber, currentPageNumber + 1];
  } else if (totalPageNumbers > 7 && currentPageNumber >= totalPageNumbers - 2) {
    pageNumbers = [
      totalPageNumbers - 3,
      totalPageNumbers - 2,
      totalPageNumbers - 1,
      totalPageNumbers,
    ];
  }

  return pageNumbers;
};
