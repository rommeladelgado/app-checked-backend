export interface UseCase<I, O> { execute(input: I, ...inputs: any): Promise<O>; }
