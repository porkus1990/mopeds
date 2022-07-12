import { IHandleContent } from './handle-change/handle-content.interface';
import { IStrategy } from './stretegy.interface';

class Lerna implements IStrategy {

  public run(handleContent: IHandleContent): Promise<boolean> {
    handleContent.handle({ dependencies: { 'sample': 'sample' }, name: 'sample', peerDependencies: {} }, { dependencies: { 'sample': 'sample' }, name: 'sample', peerDependencies: {} }, null);
    return Promise.resolve(true);
  }
}

export { Lerna };