class MapSweeper {
  constructor(sweepMil=200, ttl, cb) {
    this.map = new Map();

    if(!ttl) {
      return;
    }

    this.ttl = ttl;
    this.sweepMil = sweepMil;
    const cbType = typeof(cb);
    if(cb && cbType !== 'function') {
      throw new Error(`MapSweeper cb expected a function but got ${cbType}`)
    }
    if(cb) {
      this.cb = cb;
    }
    this.int = undefined;
    this.startSweeper();
  }
  startSweeper() {
    this.int = setInterval(() => {
      const now = (new Date()).getTime()

      const keys = this.map.keys();
      let index;
      for(index = 0; index < this.map.size; index++) {
        const key = keys.next().value
        const item = this.map.get(key)

        if( (now - item.createdAt) >= this.ttl) {
          if(this.cb) {
            this.cb(item)
          }
          this.map.delete(key)
        }
      }
    }, this.sweepMil)
  }
  stopSweeper() {
    clearInterval(this.int)
  }

  set(k, v) {
    const now = (new Date()).getTime()
    this.map.set(k, {
      createdAt: now,
      value: v
    })
  }
  get(k) {
    const record = this.map.get(k)
    return record === undefined ? undefined : record.value
  }
}

module.exports = MapSweeper;
