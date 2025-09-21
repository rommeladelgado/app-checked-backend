export interface UseCase<I, O> {
    execute(input: I, ...inputs: string[]): Promise<O>;
}
