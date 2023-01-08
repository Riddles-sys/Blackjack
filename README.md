# Blackjack

## Description

Blackjack game created with Vanilla JavaScript.

## Deployment link

##### _Project Preview_

## Working Team (Solo)

Solo project.

## Technologies Used

##### _Fig.1: Technologies used_

## Brief

Create solutions that can satisfy the scenarios of a Blackjack game.

- Deck of 52 cards
- Number cards worth face value (2-10)
- Jacks, Queens, and Kings are worth 10
- Aces are worth 1 or 11 (player chooses)
- Suit of the card doesn’t matter
- Start, Hit, Stand & Restart
- Display player’s cards
- Invite player input

## Planning

Initially, I used Excalidraw to create an idea of what I would like the design to look like.

##### _Fig.2: Project Wireframe_

After this was completed, I began creating a simplistic version of the game as I hadn’t worked with vanilla JavaScript for a while. I did this without creating a deck of suits and values and I was experimenting with templates for the cards. I decided that some of the buttons will be disabled when they will not be used e.g. Start button is enabled in the beginning but then after you ‘Start’, it is disabled. I also decided that at the start, the user should be shown the rules of the game.

##### _Fig.3: Draft 1_

## Build Process

This project was completed in four phases:
Phase One: Design/Plan.
Phase Two: Create a draft for better understanding.
Phase Three: Completing the requirements and establishing the MVP.
Phase Four: Adding styling and extra functionality/stretch goals.

### Phase One

### Phase Two

I initially began by creating a ‘function init()’ so that when the Dom is loaded on a browser, the code will initialise by listening to the ‘event’, making sure the Dom is ready before being able to use it.

I then split my app.js into three sections within a function init:

1. Elements - the HTML elements I will be manipulating.
2. Variables - that I will be using for the application
3. Events - that will take place during initialization.

##### _Fig.4: Function init_

This is where I began to work on my basic version.

##### _Fig.5: Basic styling_

### Phase Three

Working from my basic version, I began creating a deck of 52 cards. To do this I used a nested loop. I iterated along the length of the array of ‘valuesOfDeck’ and then along the length of the array of ‘suits’. Once this was completed, I used an empty ‘deck’ array to create an array of objects that would push a combination of value and suit e.g. [{ Value: valueOfDeck[i], Suit: suit[j] }].
The reason I had to push it into a new array of ‘deck’ is due to the fact that each iteration was replacing the last and so I needed to create a way to save each variation into one variable. This would continue to occur until each suit has each value creating a deck of 52.

##### _Fig.6: Deck Function_

My next object was to shuffle the ‘deck’. Initially, I thought to use an if statement for this as I wasn’t very comfortable with ‘while’ loops. However, after some experimentation, I decided to use a while loop as it allowed me to control better and have cleaner code. While the length of the deck is less than 52, the deck is randomised using ‘shuffled’, along the length of the deck. Similar to the function of creating a deck, I had to push each iteration into a new array to be able to use it later. However, I noticed that sometimes I was getting duplicates and so I introduced the splice method so that each iteration that is pushed into the shuffled deck ‘sDeck’ is removed from the original deck and so it shouldn’t be used again.

##### _Fig.7: Shuffling function_

The sDeck would then go on to be used for the firstHand which are the first two cards that would be used for the start of a game. I used the first two elements so that I could easily splice them from the array and remove a chance of any duplicates if the user wants to ‘Hit’.

To be able to display these, I created a variable for each card in the hand which would allow me to also display their value and suit as template literals, being able to create an output to display to the user what they have. I used this within a template I created, along with stylings, which would add to the innerHTML of a div I have created before.

##### _Fig.8: Display function_

I now needed a way to add up the total value for what is in the hand of the user. Along with this, I needed to make sure that the ‘Ace’ is able to get user input to change their value to 1 or 11 and that the value of Jack, Queen and King are all 10 - as these are strings initially, not numbers. Creating the value for the face cards was more simple than adding a value for ‘Ace’. To do this, I used window.prompt() to allow the user to input. However, I also tried to input an if statement which would force the user to only pick from 1 or 11 otherwise they would have to re-enter it. The entry is then saved as a variable which I put through a parseInt() to convert to an integer and add it to the sum. I also ensured that if the value of the hand is over 11, then the next ‘Ace’ will automatically be 1 as picking the value of 11 for ‘Ace’ in this situation will result in a game over.

##### _Fig.9: Prompt and values_

I then added an addCard function which will allow me to pick a random card from the length of the deck and added to the hand. This is then spliced so that the length of the deck is reduced and the chance for a duplicate is removed.

##### _Fig.10: Adding new card_

Another important function was the total function. This checks the sum and if the Blackjack has been won. I made sure that it also updates the innerHTML to indicate the current position of the game.

If an individual decided to ‘Stand’ their points aren’t recorded but they do not ‘lose’ the game as their hand is still valid if the sum is under 21. I used a similar function that I created to display the hand, creating a template to add to the innerHTML and adding it in - indicating the sum result to the user.

##### _Fig.11: Stand_

Restarting the game was similar. However, I had to use ‘setInterval’ in this function. This allowed me to add a timer for when the functions within it will be processed. I had to make sure I also clear the interval so that it doesn’t run repeatedly. If I didn’t add this then some actions may run quicker than others leaving a function that didn’t run completely before the game restarted e.g. sum wasn’t reset before restarting the game. This was also the case for the gameOver function.

##### _Fig.12: Game over_

### Phase Four

I had added some styling initially, e.g. a background image and basic buttons. I love styling so I decided to put a little bit of time into it.

I also tried to implement Jest testing in this to ensure my code is reliable although I ran into barriers.

##### _Fig.13: Styling buttons_

## Challenges

### One:

For a few days I was stuck on the function to create a deck and to shuffle it. This was mainly because I wasn’t sure what to do. However, I remembered a time when I made a getDate function. This gave me some clarity regarding how I can approach this issue.

##### _Fig.14: getDate_

### Two:

It was difficult to understand how I can use Jest in vanilla JS. I kept receiving the error below and had to read documentation and research on how to fix this issue, but I believe I had done so as can be seen in the images below:

##### _Fig.15: Jest error_

### Three:

I found it difficult, initially, to understand how I can get the values from an object, and push that object into a separate array - to then display the specific object’s keys and values to the user at the end. For this is had to use the MDN web docs, reading it to get a better understanding of how I can do this as there were options to use forEach and such. I iterated over the hand to then define each iteration in the card variable, which I could then use as temporal literals. This breakthrough allowed me to progress in many different functions of the game.

## Wins

### One:

On many occasions I had issues with the ‘sums’ and the ‘deck’ as on occasions this would give me more than 52 cards or a total that would double what it should be. I used debugging via console.log and found the issue of incorrect amounts. As the functions were called a number of times I had to console log after each time to make sure I knew which was causing the error. An example of this is when I logged ‘sum’ within the addCard function. The big win here is that I reset the sum to 0 so that when the sumOf function runs again, it counts the value of the hand from 0 again, rather than doubling what had already been computed.

##### _Fig.16: sumOf function_

### Two:

When the display wasn’t updating but realising that my functions were running and that the console.log was correct. This is why I had to add a few setIntervals to delay some of the functions, ensuring that the data was coming through to the display.

### Three:

Figuring out how to use Jest to run tests on vanilla JS.

### Four:

Getting a better understanding of how to manipulate objects - refer to Fig. 8. This was a big issue for me for most of the project and once I understood it, pieces began to fit into place. This was one of those ‘step away from the PC and dream the solution’ moments. It was a big deal to me.

## Key Learnings/Takeaways

I love working on building games like these to enhance my understanding of fundamental JavaScript. It provides me with valuable skills and refreshes knowledge I may have lost if I no longer need to do DOM manipulation because other frameworks have a virtual DOM e.g. React. It always ignites a passion in me to continue working through the problems I have to create viable solutions that sometimes surprise me too. However, I also enjoy that there are a number of different methods to find those solutions. Talking over code and getting an understanding of how someone else would approach is valuable and necessary for me to grow as a developer.

## Bugs

- If there is an ‘Ace’ card before the end, whenever the sumOf function iterates over the hand, it gets recounted, setting off the window.prompt() having to reinput the value of the Ace. I tried to sort this by creating a variable ‘aceSetValue = false’ and making it true if a user inputs a value. However, I ran out of time for the deadline of this project was at the time of writing this, I was unable to ensure a value is set at one time.
- Every so often I see a duplicate in my sDeck. I’m not sure exactly why this happens but I need to investigate it further as it is a recent discovery, despite my attempts to ensure no duplicity takes place.

## Future Improvements

- To be able to connect each card to an image so that an image is displayed rather than written.
- I would love to be able to write my unit test first - this is an area that I need to improve on as most of the time was spent trying to get Jest to work.
- I would like to create more eye-catching styling but as that wasn’t the aim of this project, I didn’t give it any priority.
- I want to be able to have a score function. I tried to implement it before but was unable to and decided that achieving the MVP was better time spent.
- I want to find a different method for reducing the amount of code I have written to make it easier to read. Initially, I created additional pages as ‘components’ where I created the templates and import them in, but I decided that as this project was smaller than what I’m used to, it would be better to keep it in the same place.
- The ability to add more players than one so that you can play against someone else or the computer.
