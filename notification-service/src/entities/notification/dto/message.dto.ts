export class MessageDto {
  constructor(
    public userId: number,
    public message: {
      title: string;
      body: string;
    },
  ) {}
}
