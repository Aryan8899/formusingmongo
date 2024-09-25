declare namespace NodeJS {
  interface Global {
    mongoClientPromise: Promise<any>;
  }
}
