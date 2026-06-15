export type PlayContentKey = 
  | 'love_letter' 
  | 'memory_lane' 
  | 'inside_jokes' 
  | 'compliment_machine' 
  | 'future_together'
  | 'boyfriend_stats';

export interface Profile {
  id: string;
  name: string;
  avatarUrl: string;
  isGirlfriend: boolean;
  tagline: string;
}

export interface BoyfriendReview {
  score: number; // e.g. 10/10, 100/10
  reviewText: string;
  attributes: {
    label: string;
    value: number; // out of 100
  }[];
}

export interface Movie {
  id: string;
  title: string;
  backdropUrl: string;
  posterUrl: string;
  description: string;
  shortDescription: string;
  matchScore: number;
  year: number;
  rating: string; // e.g., "100% Love", "Lovely", "PG"
  duration: string; // e.g., "1h 45m" or "Infinity"
  genres: string[];
  boyfriendReview?: BoyfriendReview;
  playContentKey: PlayContentKey;
  isCustomAction?: boolean;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
}

export interface InsideJoke {
  id: string;
  setup: string;
  punchline: string;
  reaction: string;
}
