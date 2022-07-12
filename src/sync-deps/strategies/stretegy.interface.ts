import { IHandleContent } from './handle-change/handle-content.interface';

export interface IStrategy {
  /**
   * @param writeOrOutput true for write-to-file, false to output on console
   */
  run(handleContent: IHandleContent): Promise<boolean>,
}