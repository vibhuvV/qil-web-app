export class InvalidLocalStorageKey extends Error {
  constructor(message = "Invalid Key") {
    super(message);
  }
}
