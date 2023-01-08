// Can't run jest with window causing issues. This is because Jest uses Node environment whereas jsdom implements browser environments.
const window = require('./scripts/app')
// const deckOfCards = require('./scripts/app')

describe('window', () => {
  test('use jsdom in this test file', () => {
    const element = window
    expect(element).not.toBeNull()
  })
})
