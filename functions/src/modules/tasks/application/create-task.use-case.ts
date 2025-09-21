
import {UseCase} from "@src/shared/application/use-case";
import {
  CreateTaskRequest,
} from "@src/modules/tasks/application/models/create-task-request";
import {TaskRepository} from "@src/modules/tasks/domain/task-repository";


export class CreateTaskUseCase implements UseCase<CreateTaskRequest, void> {
  private taskRepository: TaskRepository;
  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(request: CreateTaskRequest, userId: string) {
    await this.taskRepository.create(request, userId);
  }
}
