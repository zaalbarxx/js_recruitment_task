export const debounce = (
  callback: (...args: any[]) => void,
  wait: number,
  immediate = false
) => {
  let timeout: NodeJS.Timeout;

  return function (...args: any[]) {
    const callNow = immediate && !timeout;
    const next = () => callback(...args);

    clearTimeout(timeout);
    timeout = setTimeout(next, wait);

    if (callNow) {
      next();
    }
  };
};
