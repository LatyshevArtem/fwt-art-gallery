import { useState, useLayoutEffect } from 'react';

interface UseMatchMedia {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const queries = [
  '(max-width: 767px)',
  '(min-width: 768px) and (max-width: 1439px)',
  '(min-width: 1440px)',
];

const useMatchMedia = (): UseMatchMedia => {
  const mediaQueryLists = queries.map((query) => matchMedia(query));

  const getMatchesList = () => mediaQueryLists.map((mediaQueryList) => mediaQueryList.matches);

  const [matchesList, setMatchesList] = useState(getMatchesList);

  useLayoutEffect(() => {
    const handler = () => setMatchesList(getMatchesList);

    mediaQueryLists.forEach((mediaQueryList) => mediaQueryList.addEventListener('change', handler));

    return () =>
      mediaQueryLists.forEach((mediaQueryList) =>
        mediaQueryList.removeEventListener('change', handler),
      );
  });

  return ['isMobile', 'isTablet', 'isDesktop'].reduce(
    (acc, screen, index) => ({ ...acc, [screen]: matchesList[index] }),
    {} as UseMatchMedia,
  );
};

export { useMatchMedia };
