export interface ImageModel {
  title: string;
  description: string;
  id: number;
  email: string;
}

export interface ImageInfoModel {
  title: string;
  description: string;
  id: number;
  userName: string;
  creationTime: string;
  size: string;
  isDirectory: string;
  isSymbolicLink: string;
  isRegularFile: string;
  lastAccessTime: string;
  fileKey: string;
}
