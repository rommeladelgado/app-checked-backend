import {TaskRepository} from "../domain/task-repository";
import {UseCase} from "@src/shared/application/use-case";


export class RemoveTaskUseCase implements UseCase<string, void> {
  private taskRepository: TaskRepository;
  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(taskId: string, userId: string) {
    await this.taskRepository.delete(taskId, userId);
  }
}
