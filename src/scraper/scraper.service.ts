import { Injectable } from '@nestjs/common';

interface Product {
  name: string;
  brand: string;
  price: number;
  isAvailable: boolean;
  isInSale: boolean;
  saleDescription: string;
  description: string;
}

@Injectable()
export class ScraperService {
  private processMap = new Map<string, any>();
  private mockProducts: Record<string, Product> = {
    '123': {
      name: 'Air Max',
      brand: 'Nike',
      price: 299.99,
      isAvailable: true,
      isInSale: true,
      saleDescription: 'Spring sale!',
      description: 'The latest in air cushioning technology.',
    },
    '456': {
      name: 'Revolution 5',
      brand: 'Nike',
      price: 89.99,
      isAvailable: true,
      isInSale: false,
      saleDescription: '',
      description: 'Comfort and style for everyday wear.',
    },
  };

  async startScrapingProcess(productId: string): Promise<string> {
    if (!this.mockProducts[productId]) {
      throw new Error('Product not found');
    }
    

    const processId = Date.now().toString();
    this.processMap.set(processId, null); // will initially set to null

    setTimeout(() => {
      const productData = this.mockProducts[productId];
      this.processMap.set(processId, { product: productData });
    }, 10000); 

    return processId;
  }

  getScrapingResult(processId: string): any {
    return this.processMap.get(processId) || { status: 'not ready' };
  }
}
