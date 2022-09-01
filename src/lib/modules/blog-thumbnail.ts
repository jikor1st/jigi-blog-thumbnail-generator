interface TextOptionsProps {
  color?: string;
  fontWeight?: any;
  fontStyle?: 'normal' | 'italic';
  fontSize?: string | number;
  fontFamily?: string;
  x?: number;
  y?: number;
  textAlign?: CanvasTextAlign;
  textBaseline?: CanvasTextBaseline;
  maxWidth?: number;
}

class Text {
  constructor() {}

  wrapText(ctx: CanvasRenderingContext2D) {}
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
    }: TextOptionsProps,
  ) {
    const textToString = typeof text !== 'string' ? text?.toString() : text;
    // console.log('textToString: ', textToString);

    const fontPos = ctx.measureText(textToString);
    if (textToString === 'ㄱ부터ㅎ까지') {
      console.log('fontPos: ', fontPos);
    }

    ctx.fillStyle = color;
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.fillText(textToString, x, y, maxWidth);
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

    // console.log('textArr:', this.textArr);
  }

  public update(key: any, text: string, inform?: TextOptionsProps) {
    const findTextIndex = this.textArr.findIndex(
      ({ key: textKey }) => textKey === key,
    );
    if (findTextIndex !== -1) {
      const prevData = this.textArr[findTextIndex].inform;
      this.textArr[findTextIndex].text = text;
      this.textArr[findTextIndex].inform = { ...prevData, ...inform };
    }
  }

  public show(ctx: CanvasRenderingContext2D) {
    this.textArr.map(({ instance, text, inform }) =>
      instance.draw(ctx, text, inform),
    );
  }
}
