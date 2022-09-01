import { typographyOptions } from '../options';

const { htmlFontSize, fontFamily, typeface } = typographyOptions;

// const pxToRem = (pixelNum: number, htmlFontSize: number) =>
//   `${pixelNum / htmlFontSize}rem`;

// type TypefaceType = typeof typeface;
// type TypefaceIndexSig = { [V in keyof TypefaceType]: TypefaceType[V] };

// const tyefaceConvert = (typeface: TypefaceIndexSig) => {
//   const convertedTypeface = Object.fromEntries(
//     Object.entries(typeface).map(([typefaceName, typefaceObject]) => {
//       const convertedClassValue = Object.fromEntries(
//         Object.entries(typefaceObject).map(([className, classValue]) => {
//           if (typeof classValue === 'number' && classValue !== 0) {
//             return [className, pxToRem(classValue, htmlFontSize)];
//           }
//           return [className, classValue];
//         }),
//       );
//       return [typefaceName, convertedClassValue];
//     }),
//   );
//   console.log(convertedTypeface);
//   return convertedTypeface;
// };
// interface TypographyProviderType {
//   htmlFontSize: typeof htmlFontSize;
//   fontFamily: string;
// }

export const typographyProvider = {
  htmlFontSize,
  fontFamily,
  ...typeface,
};
