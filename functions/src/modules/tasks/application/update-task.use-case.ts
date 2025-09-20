import {TaskRepository} from "../domain/task-repository";
import {Task} from "../domain/entities/task";
import {UseCase} from "@src/shared/application/use-case";
import {UpdateTaskRequest} from "./models/update-task-request";


export class UpdateTaskUseCase
implements UseCase<UpdateTaskRequest, Task | null> {
  private taskRepository: TaskRepository;
  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(request: UpdateTaskRequest, taskId: string, userId: string) {
    return await this.taskRepository.update(request, taskId, userId);
  }
}
