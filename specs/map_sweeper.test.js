const MapSweeper = require('../index');

describe('MapSweeper#set', () => {
  it('allows setting of values with no delete sweep', () => {
    const map = new MapSweeper()
    map.startSweeper = jest.fn()
    expect(map.startSweeper.mock.calls.length).toBe(0);
    map.set('a', 'a')
    map.set('b', 'b')
    expect(map.get('a')).toBe('a')
    expect(map.get('b')).toBe('b')
  })

  it('allows deleting keys after a sweep', (done) => {
    const map = new MapSweeper(0, 1)
    map.set('a', 'a')
    expect(map.get('a')).toBe('a')

    setTimeout(() => {
      map.stopSweeper()
      expect(map.get('a')).toBe(undefined)
      done()
    }, 2)
  })

  it('allows letting the caller know when a key is deleted', (done) => {
    const cb = jest.fn()
    const map = new MapSweeper(0, 1, cb)
    map.set('a', 'a')
    expect(map.get('a')).toBe('a')

    setTimeout(() => {
      map.stopSweeper()
      expect(cb.mock.calls.length).toBe(1);
      expect(map.get('a')).toBe(undefined)
      done()
    }, 2)
  })

})