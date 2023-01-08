function init() {
  // import cardsDisplay from './cards'

  // ! Elements
  const playerCard = document.querySelector('.game__scores-player')
  const startButton = document.querySelector('#startBtn')
  const randomButton = document.querySelector('#randomBtn')
  const restartButton = document.querySelector('#restartBtn')
  const endButton = document.querySelector('#endGameBtn')
  const gameNotification = document.querySelector('.game__noti')
  const wins = document.querySelector('#winner')

  // ! Variables
  const valueOfDeck = [
    'Ace',
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    'Jack',
    'Queen',
    'King',
  ]
  const suit = ['Spades', 'Clubs', 'Diamonds', 'Hearts']
  const lose = 'Game over. You lose'
  let sum = 0
  let blackJack = false
  let hand = []
  let sDeck = []
  let deck = []
  let aceValueSet = false

  // ! Events
  startButton.addEventListener('click', startGame)
  randomButton.addEventListener('click', addCard)
  endButton.addEventListener('click', standResult)
  restartButton.addEventListener('click', restartGame)
  startButton.disabled = false
  randomButton.disabled = true
  restartButton.disabled = true
  endButton.disabled = true

  function startGame() {
    startButton.disabled = true
    randomButton.disabled = false
    restartButton.disabled = false
    endButton.disabled = false
    gameNotification.innerHTML = ''
    deckOfCards()
    shuffleDeck()
    firstHand()
    display()
    total()
  }

  // creates 52 deck of cards
  function deckOfCards() {
    // iterate along the length of values
    for (let i = 0; i < valueOfDeck.length; i++) {
      // iterate along the length of suit
      for (let j = 0; j < suit.length; j++) {
        // for each value, suit is added and then pushed into the 'deck'
        deck.push({ Value: valueOfDeck[i], Suit: suit[j] })
        console.log('cards deck', deck)
      }
    }
  }

  // to shuffle the deck of cards
  function shuffleDeck() {
    // whilst the length of deck is less than 52, shuffle a random card into it
    while (sDeck.length < 52) {
      const shuffled = Math.floor(Math.random() * deck.length)
      // card at the shuffled random number of the deck is picked and populated into sDeck array
      sDeck.push(deck[shuffled])
      // remove duplicate possibility of shuffled by splicing the first element
      deck.splice(shuffled, 1)
      console.log('shuffled deck', sDeck)
    }
  }

  // Puts two cards into the hand
  function firstHand() {
    // first hand are the two first elements of sDeck
    hand = [sDeck[0], sDeck[1]]
    // removes the cards that are in the hand from the card in the deck
    sDeck.splice(0, 2)
    // remove first two elements so they can't be picked
    console.log('hand2', hand)
    console.log('sliced deck', sDeck)
  }

  function display() {
    for (let i = 0; i < hand.length; i++) {
      // for each element in hand
      const card = hand[i]
      // insert new div with template and literals
      const template = `<div classname='winner__card' style='width:300px; height: 400px; border: 3px solid black; margin: 15px; padding: 10px; background: rgba(0, 0, 0, 0.2); box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75); color: #FAE8AA; background-color: #d12d36'>${card.Value} of ${card.Suit}</div>`
      wins.innerHTML += template
    }
    sumOf()
  }

  function sumOf() {
    for (let i = 0; i < hand.length; i++) {
      const card = hand[i]
      // if the 'value' of card is converted to a value
      if (
        card.Value === 'Queen' ||
        card.Value === 'King' ||
        card.Value === 'Jack'
      ) {
        sum += 10
        // if the value is an 'Ace' and the sum is less than or eual to 10 otherwise picking 11 will cause Game Over.
      } else if (card.Value === 'Ace' && sum <= 10) {
        // user picking the value through a prompt which comes back as a
        let aceValue = window.prompt('Enter the value of Ace as: 1 or 11')
        if (aceValue === '1' || (aceValue === '11' && aceValueSet === false)) {
          sum += parseInt(aceValue)
          // ! This doesn't work properly as when a new card is added, aceValue has already been set we can't set the value again.
          aceValueSet = true
          // this is to ensure that the answer picked by the user is 1 or 11
        } else if (aceValue != '1' || aceValue != '11') {
          // aceValueSet
          let aceValue = window.prompt('You can only pick 1 or 11')
          sum += parseInt(aceValue)
        }
      } else if (card.Value === 'Ace' && sum >= 11) {
        sum += 1
      } else {
        console.log('value of card', card.Value)
        sum += card.Value
      }
      console.log('summm ----->', sum)
      // sum += card.Value
    }
  }

  // adding a new random card
  function addCard() {
    let randomCard = Math.floor(Math.random() * 50)
    hand.push(sDeck[randomCard])
    // removes the random card from the shuffled deck.
    sDeck.splice(0, 1)
    console.log('second splice', sDeck)

    console.log('random ----->', randomCard)
    console.log('addhand', hand)
    wins.innerHTML = ''
    display()
    // need to make sum 0 again so that the count function is accurate instead of recounting.
    sum = 0
    // delaying the sum or else the function runs quicker than the ability to display it.
    const delaySum = setInterval(() => {
      // have to clear or it will keep running
      clearInterval(delaySum)
      sumOf()
      total()
      // time of delay
    }, 200)
  }

  // looking at the total sum and providing a response.
  function total() {
    if (sum <= 20) {
      playerCard.innerHTML = `Your Current Score: ${sum}`
    } else if (sum === 21) {
      gameNotification.innerHTML += `You have Blackjack!`
      blackJack = true
    } else if (sum > 21) {
      playerCard.innerHTML = ''
      gameOver()
    }
    return total
  }

  // standup function
  function standResult() {
    if (sum <= 21) {
      wins.innerHTML = ''
      validTemplate = `<div class='game__over' style='width:auto; height: 300px; border: 3px solid black; margin: 15px; padding: 5px; box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);'>Your hand is valid <br> Your total score was ${sum}<div>`
      gameNotification.innerHTML += validTemplate
    } else {
      gameOver()
    }
    startButton.disabled = true
    randomButton.disabled = true
    restartButton.disabled = false
    endButton.disabled = true
  }

  // variables need to be cleared for restart
  function restartGame() {
    sum = 0
    wins.innerHTML = ''
    gameNotification.innerHTML = ''
    hand = []
    deck = []
    sDeck = []
    const restartInterval = setInterval(() => {
      clearInterval(restartInterval)
      startButton.disabled = true
      randomButton.disabled = false
      restartButton.disabled = false
      endButton.disabled = false
      deckOfCards()
      shuffleDeck()
      firstHand()
      display()
      total()
    })
  }

  function gameOver() {
    startButton.disabled = true
    randomButton.disabled = true
    endButton.disabled = true
    const delayEnd = setInterval(() => {
      clearInterval(delayEnd)
      lostGameScreen()
    }, 200)
  }

  // for when game is over
  function lostGameScreen() {
    wins.innerHTML = ''
    loseTemplate = `<div class='game__over' style='width:auto; height: 400px; border: 3px solid black; margin: 15px; padding: 10px; box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75); background-color: #FAE8AA; display: flex; flex-direction: column; justify-content: center'>${lose} <br> Your total score was: ${sum}<div>`
    gameNotification.innerHTML += loseTemplate
  }
}

window.addEventListener('DOMContentLoaded', init)
