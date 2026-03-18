export interface MyStudyItem {
  studyId: string;
  name: string;
  year: number;
  semester: number;
  status: string;
  memberStatus: string;
  selectedWeekdays: string[];
}

export interface MyStudiesResponse {
  items: MyStudyItem[];
}

export interface JoinStudyResponse {
  studyId: string;
  status: string;
}

export interface CheckTextProps {
  text: string;
  divClassName?: string;
  iconClassName?: string;
  textClassName?: string;
  iconSrc?: string;
}

export interface ContentsProps {
  Week: number;
  Content: string;
}

export interface MentorProps {
  Name: string;
  Department: string;
  Email: string;
  Message?: string;
}
