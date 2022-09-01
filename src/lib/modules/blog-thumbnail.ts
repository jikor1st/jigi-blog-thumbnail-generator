import { convert } from '@/lib/utils';
import { isContext } from 'vm';
interface TextOptionsProps {
  color?: string;
  fontWeight?: number | string;
  fontStyle?: 'normal' | 'italic';
  fontSize?: string | number;
  fontFamily?: string;
  lineHeight?: string;
  x?: number;
  y?: number;
  textAlign?: CanvasTextAlign;
  textBaseline?: CanvasTextBaseline;
  maxWidth?: number;
  multiline?: boolean;
}

interface WrapTextOptionsProps {
  x: number;
  y: number;
  maxWidth?: number;
  lineHeight: string;
}

class Text {
  constructor() {}

  wrapText(
    ctx: CanvasRenderingContext2D,
    text: string | number,
    {
      x,
      y,
      maxWidth = Number.MAX_SAFE_INTEGER,
      lineHeight,
    }: WrapTextOptionsProps,
  ) {
    const paragraphys = text.toString().split('\n');
    const textLines = [];

    for (let p = 0; p < paragraphys.length; p++) {
      let line = '';
      const words = paragraphys[p].split(' ');

      // loop
      for (let w = 0; w < words.length; w++) {
        const testLine = line + words[w] + ' ';
        const matrics = ctx.measureText(testLine);
        const testWidth = matrics.width;

        // make line break
        if (testWidth > maxWidth) {
          textLines.push(line.trim());
          line = words[w] + ' ';
        } else {
          line = testLine;
        }
      }
      textLines.push(line.trim());
    }

    // move text up centered vertically
    if (ctx.textBaseline === 'middle') {
      y = y - ((textLines.length - 1) * convert.pxToNum(lineHeight)) / 2;
    }

    // render text canvas
    for (let tl = 0; tl < textLines.length; tl++) {
      ctx.fillText(textLines[tl], x, y);
      y += convert.pxToNum(lineHeight);
    }
  }
  public draw(
    ctx: CanvasRenderingContext2D,
    text: string | number,
    {
      color = '#222222',
      fontWeight = 'normal',
      fontStyle = 'normal',
      fontSize = 16,
      fontFamily = 'sans-serif',
      textAlign = 'left',
      textBaseline = 'top',
      maxWidth = undefined,
      x = 0,
      y = 0,
      multiline = false,
      lineHeight = '0px',
    }: TextOptionsProps,
  ) {
    const textToString = typeof text !== 'string' ? text?.toString() : text;

    ctx.fillStyle = color;
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;

    if (multiline) {
      this.wrapText(ctx, text, {
        x,
        y,
        maxWidth,
        lineHeight,
      });
    } else {
      ctx.fillText(textToString, x, y, maxWidth);
    }
  }
}

interface TextArrType {
  key: string;
  text: string;
  inform: TextOptionsProps;
  instance: Text;
}

export class BlogThumbnail<IKeys> {
  textArr: TextArrType[];

  constructor(initialValues: string[]) {
    this.textArr = initialValues.map(key => ({
      key: key,
      text: '',
      inform: {
        color: '#222222',
        fontSize: '16px',
        fontFamily: 'Pretendard',
        x: 16,
        y: 16,
        textAlign: 'left',
        maxWidth: undefined,
      },
      instance: new Text(),
    }));
  }

  public update(key: string, text: string, inform?: TextOptionsProps) {
    const findTextIndex = this.textArr.findIndex(
      ({ key: textKey }) => textKey === key,
    );
    if (findTextIndex !== -1) {
      const prevData = this.textArr[findTextIndex].inform;
      this.textArr[findTextIndex].text = text;
      this.textArr[findTextIndex].inform = { ...prevData, ...inform };
    }
  }

  private canvasBackground(
    ctx: CanvasRenderingContext2D,
    stageWidth: number,
    stageHeight: number,
  ) {
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, stageWidth, stageHeight);
    ctx.restore();
  }

  public show(
    ctx: CanvasRenderingContext2D,
    stageWidth: number,
    stageHeight: number,
  ) {
    ctx.clearRect(0, 0, stageWidth, stageHeight);
    this.canvasBackground(ctx, stageWidth, stageHeight);

    this.textArr.map(({ instance, text, inform }) =>
      instance.draw(ctx, text, inform),
    );
  }

  public getImageData(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
  ) {
    try {
      return ctx.getImageData(x, y, width, height);
    } catch (e) {
      console.error(e);
    }
  }
}
