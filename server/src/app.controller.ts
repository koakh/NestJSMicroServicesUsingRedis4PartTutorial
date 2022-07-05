import { Controller, Logger, Post, Body } from '@nestjs/common';
import { MathService } from './math.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  // Create a logger instance
  private logger = new Logger('AppController');

  // Inject the math service
  constructor(private mathService: MathService) { }

  // Define the message pattern for this method
  @MessagePattern('add')
  // Define the logic to be executed
  async accumulate(data: number[]) {
    // Log something on every call
    this.logger.log('Adding ' + data.toString());
    // use math service to calc result & return
    return this.mathService.accumulate(data);
  }
}
