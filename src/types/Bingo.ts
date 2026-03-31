// Bingo Lists & Bingo Problems
export interface BingoEvent {
  eventId: number;
  groupId: number;
  year: number;
  semester: number;
  division: number;
  name: string;
  difficultyName: string;
  groupName: string;
  boardSize: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface BingoProblemResponse extends BingoEvent {
  problems: number[];
  problemDetails: BingoProblemDetail[];
}

export interface BingoProblemDetail {
  position: number;
  problemId: number;
  tier: number;
  tierLabel: string;
}

export interface BingoListResponse {
  year: number;
  semester: number;
  events: BingoEvent[];
}

// Bingo Rankings
export interface BingoRankingResponse {
  eventId: number;
  rankings: BingoRanking[];
}

export interface BingoRanking {
  rank: number;
  userId: string;
  name: string;
  baekjoonId: string;
  solvedCount: number;
  bingoCount: number;
  firstSolvedAt: string;
}
