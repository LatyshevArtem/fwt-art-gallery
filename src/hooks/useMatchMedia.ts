import { useState, useLayoutEffect } from 'react';

interface IUseMatchMedia {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const QUERIES = [
  '(max-width: 767px)',
  '(min-width: 768px) and (max-width: 1439px)',
  '(min-width: 1440px)',
];

const useMatchMedia = (): IUseMatchMedia => {
  const mediaQueryLists = QUERIES.map((query) => matchMedia(query));

  const getMatchesList = () => mediaQueryLists.map((mql) => mql.matches);

  const [matchesList, setMatchesList] = useState(getMatchesList);

  useLayoutEffect(() => {
    const handler = () => setMatchesList(getMatchesList);

    mediaQueryLists.forEach((mql) => mql.addEventListener('change', handler));

    return () => mediaQueryLists.forEach((mql) => mql.removeEventListener('change', handler));
  });

  return ['isMobile', 'isTablet', 'isDesktop'].reduce(
    (acc, screen, index) => ({ ...acc, [screen]: matchesList[index] }),
    {} as IUseMatchMedia,
  );
};

export { useMatchMedia };
