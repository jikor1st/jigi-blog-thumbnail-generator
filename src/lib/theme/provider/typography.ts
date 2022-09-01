import { typographyOptions } from '../options';
// import { typographyGenerator } from '../utils';

const { htmlFontSize, fontFamily, typeface } = typographyOptions;

// const pxToRem = (pixelNum: number, htmlFontSize: HtmlFontSizeType) =>
//   pixelNum === 0 ? 0 : `${pixelNum / htmlFontSize}rem`;
type TypefaceType = typeof typeface;
interface TypographyProviderType extends TypefaceType {
  htmlFontSize: typeof htmlFontSize;
  fontFamily: string;
}

export const typographyProvider: TypographyProviderType = {
  htmlFontSize,
  fontFamily,
  ...typeface,
};
