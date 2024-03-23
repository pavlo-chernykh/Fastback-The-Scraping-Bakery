export class ScrapeProductDetailsDto {
  name: string;
  brand: string;
  price: string;
  isAvailable: boolean;
  isInSale: boolean;
  description: string;
  saleDescription?: string;
}