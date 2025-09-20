import {TaskRepository} from "@src/modules/tasks/domain/task-repository";
import {RemoveTaskUseCase} from "@src/modules/tasks/application/remove-task.use-case";

describe("RemoveTaskUseCase", () => {
  let repo: jest.Mocked<TaskRepository>;
  let useCase: RemoveTaskUseCase;

  beforeEach(() => {
    repo = {
      create: jest.fn(),
      update: jest.fn(),
      findById: jest.fn(),
      search: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<TaskRepository>;

    useCase = new RemoveTaskUseCase(repo);
    jest.clearAllMocks();
  });

  it("calls repository delete with taskId and userId", async () => {
    repo.delete.mockResolvedValueOnce(true);

    await useCase.execute("task-123", "user-1");

    expect(repo.delete).toHaveBeenCalledTimes(1);
    expect(repo.delete).toHaveBeenCalledWith("task-123", "user-1");
  });
});
