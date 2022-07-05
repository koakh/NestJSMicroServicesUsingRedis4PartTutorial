import { Controller, Logger, Post, Body } from '@nestjs/common';
import { MathService } from './math.service';

@Controller()
export class AppController {
  // Create a logger instance
  private logger = new Logger('AppController');

  // Inject the math service
  constructor(private mathService: MathService) { }

  // Map the 'POST /add' route to this method
  @Post('add')
  // Define the logic to be executed
  async accumulate(@Body('data') data: number[]) {
    // Log something on every call
    this.logger.log('Adding ' + data.toString());
    // use math service to calc result & return
    return this.mathService.accumulate(data);
  }
}