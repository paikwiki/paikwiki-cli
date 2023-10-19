export interface CommandProps<T> {
  name: string;
  options: Readonly<T[]>;
}
