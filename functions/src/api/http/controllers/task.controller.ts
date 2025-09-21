import {TaskRepositoryImpl}
  from "@src/modules/tasks/infrastructure/task-repository-impl";
import {NextFunction, Request, Response}
  from "express";
import {CreateTaskUseCase}
  from "@src/modules/tasks/application/create-task.use-case";
import {UpdateTaskUseCase}
  from "@src/modules/tasks/application/update-task.use-case";
import {FindByIdTaskUseCase}
  from "@src/modules/tasks/application/find-by-id.use-case";
import {SearchTaskUseCase}
  from "@src/modules/tasks/application/search-task.use-case";
import {RemoveTaskUseCase}
  from "@src/modules/tasks/application/remove-task.use-case";
import {
  UpdateTaskRequest,
} from "@src/modules/tasks/application/models/update-task-request";
import {
  CreateTaskRequest,
} from "@src/modules/tasks/application/models/create-task-request";

const taskRepository = new TaskRepositoryImpl();
const createTask = new CreateTaskUseCase(taskRepository);
const updateTask = new UpdateTaskUseCase(taskRepository);
const findByIdTask = new FindByIdTaskUseCase(taskRepository);
const searchTask = new SearchTaskUseCase(taskRepository);
const removeTask = new RemoveTaskUseCase(taskRepository);

type Empty = Record<string, never>;
async function create(
  req: Request<Empty, unknown, CreateTaskRequest, Empty>,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.userId;
    await createTask.execute({...req.body}, userId);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
}

async function update(
  req: Request<Empty, unknown, UpdateTaskRequest, Empty>,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.userId;
    const taskId = req.params.taskId;
    await updateTask
      .execute({...req.body as UpdateTaskRequest}, taskId, userId);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
}

async function findById(
  req: Request<Empty, unknown, unknown, Empty>,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.userId;
    const taskId = req.params.taskId;
    const task= await findByIdTask.execute(taskId, userId);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({
        error: "Task not found",
      });
    }
  } catch (e) {
    next(e);
  }
}

async function search(
  req: Request<Empty, unknown, unknown, Empty>,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.userId;
    const query = req.params.query;
    const tasks = await searchTask.execute(query, userId);

    res.json(tasks);
  } catch (e) {
    next(e);
  }
}

async function remove(
  req: Request<Empty, unknown, unknown, Empty>,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.userId;
    const taskId = req.params.taskId;
    await removeTask.execute(taskId, userId);
    res.status(200).json({message: "Deleted Successfully"});
  } catch (e) {
    next(e);
  }
}

export {
  search,
  findById,
  create,
  update,
  remove,
};
