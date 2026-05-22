// 타입 정의

export interface MainEvent {
  id: number;
  title: string;
  start: string;
  end: string;
  imgUrl: string | null;
}

export interface Award {
  tabIdx: number;
  year: number;
  type: [number, number, number, number];
}
