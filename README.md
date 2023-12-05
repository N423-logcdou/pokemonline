# Pokémonline
## Web 4 Link:
To see the complete Pokédex with all Pokémon, log in to this account:
Email: user@g.com
Password: password
This project is a Pokémon fan project where the goal is to collect Pokémon. The website allows users to create an account in order to store their game data in a Firestore database. Here is a list of the main pages of the website and their functionalities:
- Home: This page gives a brief description of the project as well as showing a couple photos of the game. Unlike the other pages on this site, you do not have to be logged in to access it.
- Play: This is the centerpiece of the project. It is a small game created using p5.js that allows logged in users to catch Pokémon. There are two main areas in this game with each having their own unique collection of Pokémon. To encounter a Pokémon, wait for the grass to start shaking and click on it. From here, you have a few options. You can attempt to catch the Pokémon by selecting "Ball" and choosing your Pokéball. You can also use an item to increase the catching odds. Only the first item actually does anything currently but I want to add the others in the future. The "Run" option causes you to leave the encounter. Pokémon that are encountered can be seen in the Pokédex page and those that are caught can be seen in the Storage page.
- Pokédex: This page shows a list of all of the Pokémon available in the game. As you encounter more Pokémon in the game, their information becomes available. Clicking on the Pokémon in the list takes you to a page with further information. Most of the information is sourced from the PokeAPI.
- Storage: This page allows you to manage Pokémon you have caught. You can give them a nickname or release them if you wish.
- User Profile: This page allows you to view your profile information. You can change your player sprite as well as your username here.
- Login/Logout: This project utilizes the Firebase authentication features in order to manage user accounts. The user ids are linked to users in the "Users" collection within the Firestore database.
