const searchParams = new URLSearchParams(window.location.search);

export const getSearchParam = (name: string) => searchParams.get(name);
