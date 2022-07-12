export interface IPackageType {
  dependencies: Record<string, string> | undefined;
  peerDependencies: Record<string, string> | undefined;
  name: string;
}