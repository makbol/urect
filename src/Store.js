const DEFAULT_KEY = 'urect';

export default class Store {
  constructor(key = DEFAULT_KEY) {
    this.key = key;
  }

  export(data) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  import() {
    return JSON.parse(localStorage.getItem(this.key) || null);
  }
}
