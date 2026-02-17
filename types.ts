
export interface GroundingSource {
  web?: {
    uri: string;
    title: string;
  };
}

export type SummaryLength = 'short' | 'medium' | 'long';

export interface VideoAnalysis {
  title: string;
  summary: string;
  keywords: string[];
  keyTakeaways: string[];
  sources: GroundingSource[];
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
