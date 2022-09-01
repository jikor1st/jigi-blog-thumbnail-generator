const pxToNum = (pxValue: string) => parseInt(pxValue.split('px')[0]);

const convert = {
  pxToNum,
};

export { convert };
