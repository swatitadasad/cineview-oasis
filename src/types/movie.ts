export interface DbMovie {
  id: string;
  title: string;
  description: string | null;
  genre: string | null;
  year: number | null;
  rating: string | null;
  duration: string | null;
  thumbnail: string | null;
  video_url: string | null;
  featured: boolean | null;
  row_category: string | null;
  sort_order: number | null;
}
