export interface Review {
  review_id?: number;
  title?: string;
  review?: string;
  author?: string;
  source?: string;
  tags?: string[];
  column?: boolean;
  date_created?: string;
}
