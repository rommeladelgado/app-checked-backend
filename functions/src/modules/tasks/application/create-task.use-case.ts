
import {CreateTaskRequest} from "./models/create-task-request";
import {TaskRepository} from "../domain/task-repository";
import {Task} from "../domain/entities/task";
import {UseCase} from "../../../shared/application/use-case";


export class CreateTaskUseCase implements UseCase<CreateTaskRequest, void> {
  private taskRepository: TaskRepository;
  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(request: CreateTaskRequest, userId: string) {
    await this.taskRepository.create(request, userId);
  }
}
