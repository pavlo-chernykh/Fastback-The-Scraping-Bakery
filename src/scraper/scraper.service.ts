import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { ScrapeProductDetailsDto } from './dtos/ScrapeProductDetailsDTO';

type ProcessMapType = {
  [key: string]: ScrapeProductDetailsDto | string;
}

@Injectable()
export class ScraperService {
  private processMap = new Map<string, ProcessMapType>();

  async scrapeProductDetails(productId: string): Promise<ScrapeProductDetailsDto | string> {
    const url = `https://www.nike.com/w?q=${productId}`;

    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      const productElement = $('.product-card').first();

      const name = productElement.find('.product-card__title').text().trim();
      const brand = 'Nike';
      const description = productElement.find('.product-card__subtitle').text().trim();
      const price = productElement.find('.product-price.is--current-price').text().trim();
      const oldPrice = productElement.find('.product-price.us__styling.is--striked-out').text().trim();
      const isInSale = !!oldPrice;
      //this element is not present in html, we get it only when js is hydrating the page, so we calculate and paste here saleDescription
      const saleDescription = oldPrice ?
      `${Math.floor(((parseFloat(oldPrice.substring(1)) - parseFloat(price.substring(1))) / parseFloat(oldPrice.substring(1)) * 100))}% off` : '';

      return {
        name,
        brand,
        price,
        //unavailable items will throw 404 and get to catch block
        isAvailable: true,
        isInSale,
        ...(saleDescription ? {saleDescription} : {}),
        description,
      };
    } catch (error) {
      console.error('Failed to scrape product details:', error.message);
      return `We could not find anything for ${productId}.`
    }
  }

  async startScrapingProcess(productId: string): Promise<string> {  
    const processId = Date.now().toString();
    this.processMap.set(processId, null); // will initially set to null to invoke 'not ready' status

    setTimeout(async () => {
      const productData = await this.scrapeProductDetails(productId);
      this.processMap.set(processId, { product: productData });
    }, 10000); 

    return processId;
  }

  getScrapingResult(processId: string): any {
    return this.processMap.get(processId) || { status: 'not ready' };
  }
}
