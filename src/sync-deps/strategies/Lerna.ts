import { IHandleContent } from './handle-change/handle-content.interface';
import { IStrategy } from './stretegy.interface';

class Lerna implements IStrategy {

  public run(handleContent: IHandleContent): Promise<boolean> {

  }
}

export { Lerna };