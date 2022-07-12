import { IHandleContent } from './handle-change/handle-content.interface';
import { IStrategy } from './stretegy.interface';

class Lerna implements IStrategy {

  public run(handleContent: IHandleContent): Promise<boolean> {
    handleContent.handle({ 'sample': 'sample' }, { 'sample': 'sample' }, null);
    return Promise.resolve(true);
  }
}

export { Lerna };