import {TaskRepositoryImpl}
  from "../../../modules/tasks/infrastructure/task-repository-impl";
import {NextFunction, Request, Response}
  from "express";
import {CreateTaskUseCase}
  from "../../../modules/tasks/application/create-task.use-case";
import {UpdateTaskUseCase}
  from "../../../modules/tasks/application/update-task.use-case";
import {FindByIdTaskUseCase}
  from "../../../modules/tasks/application/find-by-id.use-case";
import {SearchTaskUseCase}
  from "../../../modules/tasks/application/search-task-use-case";
import {RemoveTaskUseCase}
  from "../../../modules/tasks/application/remove-task.use-case";

const taskRepository = new TaskRepositoryImpl();

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).userId;
    const createTaskUseCase = new CreateTaskUseCase(taskRepository);
    await createTaskUseCase.execute({...req.body}, userId);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).userId;
    const taskId = req.params.taskId;
    const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
    await updateTaskUseCase.execute({...req.body}, taskId, userId);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
}

// eslint-disable-next-line max-len
async function findById(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).userId;
    const taskId = req.params.taskId;
    const findByIdTaskUseCase = new FindByIdTaskUseCase(taskRepository);
    const task= await findByIdTaskUseCase.execute(taskId, userId);
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

async function search(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).userId;
    const query = req.params.query;
    const searchTaskUseCase = new SearchTaskUseCase(taskRepository);
    const tasks = await searchTaskUseCase.execute(query, userId);

    res.json(tasks);
  } catch (e) {
    next(e);
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {

    const userId = (req as any).userId;
    const taskId = req.params.taskId;
    const removeTaskUseCase = new RemoveTaskUseCase(taskRepository);
    await removeTaskUseCase.execute(taskId, userId);
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
