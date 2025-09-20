import {TaskRepository} from "@src/modules/tasks/domain/task-repository";
import {CreateTaskUseCase} from "@src/modules/tasks/application/create-task.use-case";
import {CreateTaskRequest} from "@src/modules/tasks/application/models/create-task-request";



describe("CreateTaskUseCase", () => {
  let repo: jest.Mocked<TaskRepository>;
  let useCase: CreateTaskUseCase;

  beforeEach(() => {
    repo = {
      create: jest.fn(),
      update: jest.fn(),
      findById: jest.fn(),
      search: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<TaskRepository>;

    useCase = new CreateTaskUseCase(repo);
    jest.clearAllMocks();
  });

  it("calls repository.create with the request and userId", async () => {
    const request: CreateTaskRequest = {
      title: "Grocery shopping",
      description: "Buy fruits, vegetables, and milk.",
    };
    const userId = "user-123";

    repo.create.mockResolvedValueOnce({} as any);

    await useCase.execute(request, userId);

    expect(repo.create).toHaveBeenCalledTimes(1);
    expect(repo.create).toHaveBeenCalledWith(request, userId);
  });

});
