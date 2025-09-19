
import {CreateTaskRequest} from "./models/create-task-request";
import {TaskRepository} from "../domain/task-repository";
import {Task} from "../domain/entities/task";
import {UseCase} from "../../../shared/application/use-case";
import {UpdateTaskRequest} from "./models/update-task-request";


export class RemoveTaskUseCase implements UseCase<string, void>{
  private taskRepository: TaskRepository;
  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(taskId: string, userId: string) {
    await this.taskRepository.delete(taskId, userId);
  }
}
