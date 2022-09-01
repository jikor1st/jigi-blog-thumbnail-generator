const pxToRem = (pixelNum: number, htmlFontSize: number) =>
  pixelNum === 0 ? 0 : `${pixelNum / htmlFontSize}rem`;

const fontWeightKeyToNum = (weightKey: any, fontWeight: any) => {
  return fontWeight[weightKey];
};

export function typographyGenerator<T, F>(
  typeface: { [TV in keyof T]: T[TV] },
  htmlFontSize: number,
  fontWeight: { [FV in keyof F]: F[FV] },
) {
  const convertedTypeface = Object.entries(typeface).map(
    ([typo, properties]: any) => {
      const convertedProperties = Object.entries(properties).map(
        ([className, value]) => {
          if (typeof value === 'number') {
            return [className, pxToRem(value, htmlFontSize)];
          } else if (className === 'fontWeight') {
            return [className, fontWeightKeyToNum(value, fontWeight)];
          } else return [className, value];
        },
      );
      return [typo, Object.fromEntries(convertedProperties)];
    },
  );

  return Object.fromEntries(convertedTypeface);
}
