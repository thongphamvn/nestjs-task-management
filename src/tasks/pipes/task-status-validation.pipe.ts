import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatues = [
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN,
    TaskStatus.DONE,
  ];
  transform(value: any) {
    console.log('value', value);
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`Invalid status`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatues.indexOf(status);
    return idx !== -1;
  }
}
