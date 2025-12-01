export interface Strokes {
  points: number[];
  mode: 'brush' | 'eraser';
  color?: string;
  size: number;
}

export class Page {
  page: number; // This will now represent the logical page number (1-based);
  strokes: Strokes[];

  constructor(pageNumber: number) {
    this.page = pageNumber;
    this.strokes = [];
  }
}

export class Store {
  currentPage: number; // This will represent the 0-based index of the current page in the 'pages' array
  pages: Array<Page>;
  shouldReset?: boolean

  constructor() {
    this.currentPage = 0;
    this.pages = []
    this.shouldReset = false
  }
}