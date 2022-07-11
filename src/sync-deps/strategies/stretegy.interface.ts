export interface IStrategy {
  run(): Promise<boolean>,
}