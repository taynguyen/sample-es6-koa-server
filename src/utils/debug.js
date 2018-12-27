class Debug {
  constructor() {
    this.error = this.log = console.log
  }
}

export default new Debug()
