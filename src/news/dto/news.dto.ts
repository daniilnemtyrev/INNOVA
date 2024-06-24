export interface NewsDto {
  readonly id: number;
  readonly title: string;
  readonly text: string;
  readonly imagePath: string;
  readonly published: Date;
}

export interface UpdateNewsDto {
  id: number;
  title: string;
  text: string;
  published: Date;
  imagePath: {
    rawFile: {
      path: string;
    };
    src: string;
    name: string;
  };
}
