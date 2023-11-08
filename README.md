# Marble Raffle

Marble Raffle is a web-based application that allows users to perform non-uniform random selections where the probability distribution dynamically changes based on the item weights represented by marbles. This project utilizes simple HTML, CSS, and JavaScript to implement its functionality, including local storage for persistence across sessions.

![Marble Raffle Logo](https://img.icons8.com/ultraviolet/40/dice.png)


## Features

- **Add Items**: Users can add new items to the raffle list.
- **Roll**: A random item is selected, with items containing more marbles (weights) having a higher chance of being selected.
- **Reset**: The list can be reset to its default state with one item.
- **Persistence**: The current state of the item list is saved to the browser's local storage, allowing the list to be reloaded upon revisiting or refreshing the page.
- **Dynamic Weight Adjustment**: Each time an item is selected during a roll, the selected item loses all its marbles, while all items receive an additional marble.


## Live Demo

Experience Marble Raffle live with no installation required! The application is hosted on GitHub Pages, allowing you to try it out directly in your web browser. Check it out here: [Marble Raffle Live Demo](https://alkenderesi.github.io/marble-raffle/)

Simply navigate to the link to start using the app right away.


## Installation

No installation is required. Simply clone the repository to your local machine and open the `index.html` file in any modern web browser.

```bash
git clone https://github.com/alkenderesi/marble-raffle.git
cd marble-raffle
open index.html # or use any web browser to open the file
```

## Usage

- To **add** an item, click the "ADD" button in the footer.
- To **roll** the raffle, click the "ROLL" button to randomly select an item based on the current weights.
- To **reset** the list to its initial state, click the "RESET" button.
- To **remove** an individual item, click the 'X' button next to the item you wish to remove.


## How It Works

- Each item in the raffle list can have multiple marbles, which represent the weight of that item.
- When the "ROLL" button is clicked, the application calculates the probability of each item being selected based on its weight.
- After a selection, all marbles are removed from the selected item and one marble is added to all items (including the currently selected one), adjusting the probability distribution for the next roll.


## Local Storage

The application uses the browser's `localStorage` to save the state of the raffle list. This ensures that the user's data is retained between sessions, while never being sent to any third party.


## License

This project is open source and available under the [MIT License](LICENSE).
