const isClient = typeof window !== 'undefined';
export const isiOS = () => {
  return (
    isClient &&
    (['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(
      window.navigator.platform
    ) ||
      // iPad on iOS 13 detection
      (window.navigator.userAgent.includes('Mac') && 'ontouchend' in document))
  );
};

export const isSafari = () => {
  return isClient && /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent);
};

export const formatNumber = (num: number) => {
  const roundedNum = num.toFixed(2);
  //@ts-ignore
  return roundedNum < 1000
    ? roundedNum.toString()
    : roundedNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
