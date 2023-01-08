// Can't run jest with window causing issues. This is because Jest uses Node environment whereas jsdom implements browser environments.
const window = require('./scripts/app')

describe('window', () => {
  test('use jsdom in this test file', () => {
    const element = window
    expect(element).not.toBeNull()
  })
})

// describe('firstHand', () => {
//   test('firsthand should have a length of 2', () => {
//     const hand = []
//     const sDeck = [
//       { Value: 10, Suit: 'Spades' },
//       { Value: 4, Suit: 'Diamonds' },
//       { Value: 'Jack', Suit: 'Hearts' },
//     ]
//     hand = [sDeck[0], sDeck[1]]
//     expect(hand).toHaveLength(2)
//   })
// })
