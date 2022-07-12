import { IPackageType } from '../packge.type';

export interface IHandleContent {
  handle(oldFile: IPackageType, newFile: IPackageType, paths: string[] | null): boolean | string;
}