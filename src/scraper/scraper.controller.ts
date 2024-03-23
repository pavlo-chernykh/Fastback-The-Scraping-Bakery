import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ScraperService } from './scraper.service';

@Controller('scraper')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @Get()
  async handleRequest(
    @Query('productId') productId: string,
    @Query('processId') processId: string,
    @Res() res: Response
  ): Promise<any> {
    try {
      if (productId) {
        const processId = await this.scraperService.startScrapingProcess(productId);
        res.json({ processId });
      } else if (processId) {
        const result = this.scraperService.getScrapingResult(processId);
        res.json(result);
      } else {
        res.status(400).json({ error: 'Invalid request' });
      }
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}
