import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-task.tdo';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { of } from 'rxjs';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskWithFilter(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter(t => t.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        t => t.title.includes(search) || t.description.includes(search),
      );
    }
    return tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find(t => t.id === id);
    if (!found) {
      throw new NotFoundException(`Task not found`);
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;
    const task: Task = {
      title,
      description,
      status: TaskStatus.OPEN,
      id: uuid.v1(),
    };
    this.tasks.push(task);
    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    this.tasks = this.tasks.map(task => ({
      ...task,
      status: task.id === id ? status : task.status,
    }));
    return this.getTaskById(id);
  }

  deleteTask(id: string): string {
    const found = this.getTaskById(id);
    this.tasks.filter(task => task.id !== found.id);
    return id;
  }
}
