export interface Package {
  name: string;
  duration: string;
  description: string;
  price: number;
  fullPrice: number | null;
  savings: number | null;
  highlight: string | null;
}
