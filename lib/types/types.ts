export type Newable<T> = new (...args: any[]) => T;

export type ValidationMessages = {
  httpErrorMessage: string;
  wsErrorMessage: string;
};
