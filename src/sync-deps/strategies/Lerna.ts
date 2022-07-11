import { IStrategy } from './stretegy.interface';

class Lerna implements IStrategy {

  public run(): Promise<boolean> {

  }
}

export { Lerna };