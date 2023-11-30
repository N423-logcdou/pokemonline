import { updateUserInfo, userData, capitalizeFirstLetter } from "./model";

export const s = (p) => {
  let locationPokemon = [
    {
      name: "pidgey",
      poolVal: 50,
      minLevel: 5,
      maxLevel: 17,
    },
    {
      name: "pidgeotto",
      poolVal: 15,
      minLevel: 18,
      maxLevel: 35,
    },
    {
      name: "pidgeot",
      poolVal: 10,
      minLevel: 36,
      maxLevel: 55,
    },
    {
      name: "zigzagoon",
      poolVal: 50,
      minLevel: 5,
      maxLevel: 20,
    },
    {
      name: "linoone",
      poolVal: 10,
      minLevel: 20,
      maxLevel: 32,
    },
    {
      name: "sentret",
      poolVal: 50,
      minLevel: 5,
      maxLevel: 14,
    },
    {
      name: "furret",
      poolVal: 15,
      minLevel: 15,
      maxLevel: 30,
    },
    {
      name: "wurmple",
      poolVal: 50,
      minLevel: 5,
      maxLevel: 10,
    },
    {
      name: "silcoon",
      poolVal: 20,
      minLevel: 7,
      maxLevel: 20,
    },
    {
      name: "beautifly",
      poolVal: 10,
      minLevel: 10,
      maxLevel: 32,
    },
    {
      name: "cascoon",
      poolVal: 20,
      minLevel: 7,
      maxLevel: 20,
    },
    {
      name: "dustox",
      poolVal: 10,
      minLevel: 10,
      maxLevel: 32,
    },
    {
      name: "oddish",
      poolVal: 25,
      minLevel: 7,
      maxLevel: 10,
    },
    {
      name: "gloom",
      poolVal: 10,
      minLevel: 21,
      maxLevel: 32,
    },
    {
      name: "vileplume",
      poolVal: 8,
      minLevel: 21,
      maxLevel: 45,
    },
    {
      name: "bellossom",
      poolVal: 5,
      minLevel: 21,
      maxLevel: 45,
    },
    {
      name: "paras",
      poolVal: 25,
      minLevel: 7,
      maxLevel: 23,
    },
    {
      name: "parasect",
      poolVal: 10,
      minLevel: 24,
      maxLevel: 45,
    },
  ];

  class TallGrass {
    isShaking = false;
    constructor(x, y, isShaking) {
      this.x = x;
      this.y = y;
      this.isShaking = isShaking;
    }
  }

  let pokemon;
  let trainer;

  let ballBtn;
  let itemBtn;
  let runBtn;

  let throwable;
  let ballBottom;
  let ballTop;

  let textbox;
  let smallMenu;

  let pokemonUI;
  let levelIcon;

  let pokeballBtn;
  let greatballBtn;
  let ultraballBtn;

  let razzBtn;
  let nanabBtn;
  let pinapBtn;

  let razzBerry;
  let nanabBerry;
  let pinapBerry;

  let razzIcn;
  let nanabIcn;
  let pinapIcn;

  let ballStationary;
  let ballWobble1;
  let ballWobble2;

  let overworldBG;
  let tallGrassImg;

  let overworldLocation = "path";
  let tallGrassList = [];
  let shakeXOffset = 0;
  let shakeYOffset = 0;

  let rectShow = false;
  let rectOpac = 0;
  let rectX = 0;
  let rectY = 0;
  let rectW = 160;
  let rectH = 144;

  let wobbleFrame = 0;

  let pokeX = -56;
  let pokeY = 0;

  let trainerX = 208;
  let trainerY = 48;
  let canvasScale = 4;

  let itemX = 66;
  let itemY = 76;
  let itemYVel = 0;
  let itemYAcc = 0;

  let finalBallX = 124;

  let ballBottomY = 48;
  let ballTopY = 48;
  let ballTopYVel = 0;
  let ballTopYAcc = 0;

  let ballStationaryX = 123;

  let targetPokeX = -56;
  let targetPokeY = 0;

  let targetTrainerX = 208;
  let targetTrainerY = 48;

  let encounterPokemon;
  let encounterLevel;

  let encounterText = "";

  let itemThrown;
  let itemTargetX;
  let throwMod = 20;

  let pokeFont;

  // Booleans

  // True when in the overworld
  let inOverworld = true;

  let encounterStartAnim = false;

  // True when in a Pokemon Encounter
  let inEncounter = false;
  // True when encounter is interactable (after animation is complete)
  let encounterInteract = false;
  // True when encounter menu is interactive
  let encounterMenu = false;

  // Indicates the current interactable menu
  let currentMenu = "none";

  // Indicates if a berry is active
  let activeBerry = "none";

  // Indicates whether next click ends the encounter
  let encounterNearlyDone = false;

  let pokeInBall = false;

  let throwing = false;

  let ballOpen = false;
  let ballParticle = false;
  let ballRocking = false;
  let ballCaught = false;

  // is screen grayscale? (encounter only)
  let grayscale = false;

  // Updates canvas size depending on window width
  function updateCanvasScale() {
    if (p.windowWidth > 1000) {
      canvasScale = 4;
    } else if (p.windowWidth > 600) {
      canvasScale = 3;
    } else if (p.windowWidth > 360) {
      canvasScale = 2;
    } else {
      canvasScale = 1;
    }
  }

  // Initializes tall grass in overworld
  function initOverworld() {
    console.log("init overworld");
    tallGrassList = [];
    if (overworldLocation == "path") {
      tallGrassList.push(new TallGrass(80, 32));
      tallGrassList.push(new TallGrass(96, 32));
      tallGrassList.push(new TallGrass(80, 48));
      tallGrassList.push(new TallGrass(96, 48));
      tallGrassList.push(new TallGrass(80, 64));
      tallGrassList.push(new TallGrass(96, 64));
      tallGrassList.push(new TallGrass(80, 80));
      tallGrassList.push(new TallGrass(96, 80));
      tallGrassList.push(new TallGrass(80, 96));
      tallGrassList.push(new TallGrass(96, 96));
      tallGrassList.push(new TallGrass(80, 112));
      tallGrassList.push(new TallGrass(96, 112));
    }
  }

  //Picks a random tall grass to shake
  function grassShake() {
    let shakeRand = Math.ceil(p.random(0, tallGrassList.length)) - 1;
    tallGrassList[shakeRand].isShaking = true;
    setTimeout(() => {
      tallGrassList[shakeRand].isShaking = false;
    }, p.random(3000, 10000));
  }

  //Battle Transition
  function battleTransition() {
    rectShow = true;
    rectOpac = 0.25;
    setTimeout(() => {
      rectOpac = 0.5;
    }, 50);
    setTimeout(() => {
      rectOpac = 0.75;
    }, 100);
    setTimeout(() => {
      rectOpac = 1;
    }, 150);
    setTimeout(() => {
      rectOpac = 0.5;
    }, 200);
    setTimeout(() => {
      rectOpac = 0.25;
    }, 250);
    setTimeout(() => {
      rectOpac = 0;
    }, 300);
    setTimeout(() => {
      rectOpac = 0.25;
    }, 350);
    setTimeout(() => {
      rectOpac = 0.5;
    }, 400);
    setTimeout(() => {
      rectOpac = 0.75;
    }, 450);
    setTimeout(() => {
      rectOpac = 1;
    }, 500);
    setTimeout(() => {
      rectOpac = 0.75;
    }, 550);
    setTimeout(() => {
      rectOpac = 0.5;
    }, 600);
    setTimeout(() => {
      rectOpac = 0.25;
    }, 650);
    setTimeout(() => {
      rectOpac = 0;
    }, 700);

    setTimeout(() => {
      rectOpac = 1;
      rectH = 16;
    }, 1000);
    setTimeout(() => {
      rectH = 32;
    }, 1050);
    setTimeout(() => {
      rectH = 48;
    }, 1100);
    setTimeout(() => {
      rectH = 64;
    }, 1150);
    setTimeout(() => {
      rectH = 80;
    }, 1200);
    setTimeout(() => {
      rectH = 96;
    }, 1250);
    setTimeout(() => {
      rectH = 112;
    }, 1300);
    setTimeout(() => {
      rectH = 128;
    }, 1350);
    setTimeout(() => {
      rectH = 144;
    }, 1400);
  }

  // Runs before encounter starts
  async function preEncounter(poke) {
    battleTransition();
    await $.getJSON(
      `https://pokeapi.co/api/v2/pokemon-species/${poke.name}`,
      function (data) {
        encounterPokemon = data;
      }
    );

    encounterLevel = Math.floor(
      Math.random() * (poke.maxLevel - poke.minLevel) + poke.minLevel
    );

    // Delay for encounter start animation
    setTimeout(() => {
      encounter(encounterPokemon.name);
    }, 3000);
  }

  function checkPokedex() {
    let seen = false;
    userData.pokedex.forEach((pokemon) => {
      if (encounterPokemon.name == pokemon.name) {
        seen = true;
      }
    });
    if (!seen) {
      userData.pokedex.push({ name: encounterPokemon.name, caught: false });
    }
  }

  function addCaughtStatus() {
    userData.pokedex.forEach((pokemon) => {
      if (encounterPokemon.name == pokemon.name) {
        pokemon.caught = true;
      }
    });
  }

  // Runs when preEncounter is finished
  async function encounter(poke) {
    rectOpac = 0;
    rectShow = false;
    inEncounter = true;
    inOverworld = false;
    encounterText = "";
    pokemon = await p.loadImage(`./images/game-images/pokemon/${poke}.png`);
    pokeX = -56;
    trainerX = 208;
    targetPokeX = 96;
    targetTrainerX = 16;
    grayscale = true;
    checkPokedex();
    updateUserInfo();

    // Ensures everything is set up within the given time (p5 animations can get out of sync)
    setTimeout(() => {
      encounterText = `Wild  ${encounterPokemon.name.toUpperCase()} appeared!`;
      pokeX = 96;
      trainerX = 16;
      encounterInteract = true;
    }, 1270);
  }

  // Displays menu options when ready
  function showEncounterMenu() {
    encounterMenu = true;
    encounterText = "";
    setTimeout(() => {
      currentMenu = "main";
    }, 10);
  }

  // Pool randomizer for wild Pokemon
  function randomPokemon(pokeList) {
    let totalPool = 0;
    let randomGen = Math.random();

    pokeList.forEach((pokemon) => {
      totalPool += pokemon.poolVal;
    });
    let randomNum = randomGen * totalPool;

    let poolIteration = 0;
    for (let i = 0; i < pokeList.length; i++) {
      poolIteration += pokeList[i].poolVal;
      if (randomNum < poolIteration) {
        return pokeList[i];
      }
    }
  }

  // Runs for every "ball wobble" when attempting to catch a Pokemon
  function ballWobble(y) {
    let randValue = Math.random() * 65535;
    if (randValue >= y) {
      return true;
    } else {
      return false;
    }
  }

  // Runs all necessary calculations for capturing a Pokemon (nasty code. need to look into later)
  function calcCatch(catchRate, level, ball) {
    let throwBonus;
    if (level - throwMod > 1) {
      throwBonus = level - throwMod;
    } else {
      throwBonus = 1;
    }

    let berryBuff = 1;

    if (activeBerry == "razz") {
      berryBuff = 1.5;
      //console.log("applying berry");
    }

    console.log("catch rate: " + catchRate);
    console.log("level: " + level);
    console.log("ball: " + ball);
    console.log("throw bonus: " + throwBonus);

    let x =
      (((3 * level - 2 * throwBonus) * (catchRate * ball)) / (3 * level)) *
      berryBuff;
    console.log("X: " + x);
    let y = Math.floor(65535 / Math.sqrt(Math.sqrt(255 / x)));
    console.log("Y: " + y);
    if (x > 255) {
      y = 65536;
    }
    setTimeout(() => {
      if (ballWobble(y)) {
        console.log("Oh no! The Pokémon broke free!");
        currentMenu = "none";
        encounterMenu = false;
        ballRocking = false;
        pokeInBall = false;
        activeBerry = "none";
        encounterText = "Oh no! The Pokémon broke free!";
        return;
      } else {
        console.log("wobble");
        wobbleAnim();
        setTimeout(() => {
          if (ballWobble(y)) {
            console.log("Aww! It appeared to be caught!");
            currentMenu = "none";
            encounterMenu = false;
            ballRocking = false;
            pokeInBall = false;
            activeBerry = "none";
            encounterText = "Aww! It appeared to be caught!";
            return;
          } else {
            console.log("wobble");
            wobbleAnim();
            setTimeout(() => {
              if (ballWobble(y)) {
                console.log("Aargh! Almost had it!");
                currentMenu = "none";
                encounterMenu = false;
                ballRocking = false;
                pokeInBall = false;
                activeBerry = "none";
                encounterText = "Aargh! Almost had it!";
                return;
              } else {
                console.log("wobble");
                wobbleAnim();
                setTimeout(() => {
                  if (ballWobble(y)) {
                    console.log("Shoot! It was so close, too!");
                    currentMenu = "none";
                    encounterMenu = false;
                    ballRocking = false;
                    pokeInBall = false;
                    activeBerry = "none";
                    encounterText = "Shoot! It was so close, too!";
                    return;
                  } else {
                    console.log("caught!");
                    currentMenu = "none";
                    encounterMenu = false;
                    encounterNearlyDone = true;
                    encounterText = `Gotcha! ${encounterPokemon.name.toUpperCase()} was caught!`;
                    userData.pokemon.push({
                      name: encounterPokemon.name,
                      level: encounterLevel,
                      nickname: capitalizeFirstLetter(encounterPokemon.name),
                    });
                    addCaughtStatus();
                    updateUserInfo();
                  }
                }, 800);
              }
            }, 800);
          }
        }, 800);
      }
    }, 3000);
  }

  // Resets variables when encounter is complete
  function encounterComplete() {
    currentMenu = "none";
    encounterMenu = false;
    encounterInteract = false;
    inEncounter = false;
    activeBerry = "none";
    encounterNearlyDone = false;
    pokeInBall = false;
    ballRocking = false;
    ballCaught = false;

    inOverworld = true;
    initOverworld();
    encounterStartAnim = false;
  }

  function throwItem(itemName) {
    if (itemName == "pokeball") {
      throwable = p.loadImage("./images/game-images/pokeball.png");
      ballTop = p.loadImage("./images/game-images/pokeball_top.png");
      ballBottom = p.loadImage("./images/game-images/pokeball_bottom.png");
      ballStationary = p.loadImage("./images/game-images/pokeball.png");
      ballWobble1 = p.loadImage("./images/game-images/pokeball_1.png");
      ballWobble2 = p.loadImage("./images/game-images/pokeball_2.png");
      calcCatch(encounterPokemon.capture_rate, encounterLevel, 1);
      setTimeout(() => {
        ballOpen = true;
        ballOpenAnim();
      }, 500);
    }

    if (itemName == "greatball") {
      throwable = p.loadImage("./images/game-images/greatball.png");
      ballTop = p.loadImage("./images/game-images/greatball_top.png");
      ballBottom = p.loadImage("./images/game-images/greatball_bottom.png");
      ballStationary = p.loadImage("./images/game-images/greatball.png");
      ballWobble1 = p.loadImage("./images/game-images/greatball_1.png");
      ballWobble2 = p.loadImage("./images/game-images/greatball_2.png");
      calcCatch(encounterPokemon.capture_rate, encounterLevel, 1.5);
      setTimeout(() => {
        ballOpen = true;
        ballOpenAnim();
      }, 500);
    }

    if (itemName == "ultraball") {
      throwable = p.loadImage("./images/game-images/ultraball.png");
      ballTop = p.loadImage("./images/game-images/ultraball_top.png");
      ballBottom = p.loadImage("./images/game-images/ultraball_bottom.png");
      ballStationary = p.loadImage("./images/game-images/ultraball.png");
      ballWobble1 = p.loadImage("./images/game-images/ultraball_1.png");
      ballWobble2 = p.loadImage("./images/game-images/ultraball_2.png");
      calcCatch(encounterPokemon.capture_rate, encounterLevel, 2);
      setTimeout(() => {
        ballOpen = true;
        ballOpenAnim();
      }, 500);
    }

    if (itemName == "razz") {
      throwable = razzBerry;

      setTimeout(() => {
        activeBerry = "razz";
        currentMenu = "main";
      }, 500);
    }

    if (itemName == "nanab") {
      throwable = nanabBerry;

      setTimeout(() => {
        activeBerry = "nanab";
        currentMenu = "main";
      }, 500);
    }

    if (itemName == "pinap") {
      throwable = pinapBerry;

      setTimeout(() => {
        activeBerry = "pinap";
        currentMenu = "main";
      }, 500);
    }
    itemThrown = itemName;
    itemTargetX = 123;
    itemX = 65;
    itemY = 76;
    itemYVel = -8.6;
    itemYAcc = 0.5;
    throwing = true;
  }

  function ballOpenAnim() {
    ballTopYVel = -5;
    ballTopYAcc = 0.25;
    pokeInBall = true;

    setTimeout(() => {
      ballRocking = true;
    }, 700);
  }

  function wobbleAnim() {
    wobbleFrame = 1;
    setTimeout(() => {
      wobbleFrame = 0;
    }, 150);
    setTimeout(() => {
      wobbleFrame = 2;
    }, 300);
    setTimeout(() => {
      wobbleFrame = 0;
    }, 450);
  }

  // Preload function for p5. Loads static image files
  p.preload = function () {
    pokeFont = p.loadFont("./css/fonts/pokefont.ttf");

    pokemon = p.loadImage("./images/game-images/pokemon/ditto.png");

    switch (userData.icon) {
      case 0:
        trainer = p.loadImage("./images/game-images/trainer.png");
        break;
      case 1:
        trainer = p.loadImage("./images/game-images/trainer2.png");
        break;
      default:
        trainer = p.loadImage("./images/game-images/trainer.png");
    }

    textbox = p.loadImage("./images/game-images/textbox.png");
    smallMenu = p.loadImage("./images/game-images/small_menu.png");

    pokemonUI = p.loadImage("./images/game-images/pokemon_ui.png");
    levelIcon = p.loadImage("./images/game-images/lvl_icon.png");

    ballBtn = p.loadImage("./images/game-images/ball_btn.png");
    itemBtn = p.loadImage("./images/game-images/item_btn.png");
    runBtn = p.loadImage("./images/game-images/run_btn.png");

    pokeballBtn = p.loadImage("./images/game-images/pokeball_btn.png");
    greatballBtn = p.loadImage("./images/game-images/greatball_btn.png");
    ultraballBtn = p.loadImage("./images/game-images/ultraball_btn.png");

    razzBtn = p.loadImage("./images/game-images/razz_btn.png");
    nanabBtn = p.loadImage("./images/game-images/nanab_btn.png");
    pinapBtn = p.loadImage("./images/game-images/pinap_btn.png");

    razzBerry = p.loadImage("./images/game-images/razz_berry.png");
    nanabBerry = p.loadImage("./images/game-images/nanab_berry.png");
    pinapBerry = p.loadImage("./images/game-images/pinap_berry.png");

    razzIcn = p.loadImage("./images/game-images/razz_berry_icn.png");
    nanabIcn = p.loadImage("./images/game-images/nanab_berry_icn.png");
    pinapIcn = p.loadImage("./images/game-images/pinap_berry_icn.png");

    throwable = p.loadImage("./images/game-images/ultraball.png");
    throwable = p.loadImage("./images/game-images/greatball.png");
    throwable = p.loadImage("./images/game-images/pokeball.png");

    ballTop = p.loadImage("./images/game-images/ultraball_top.png");
    ballTop = p.loadImage("./images/game-images/greatball_top.png");
    ballTop = p.loadImage("./images/game-images/pokeball_top.png");

    ballBottom = p.loadImage("./images/game-images/ultraball_bottom.png");
    ballBottom = p.loadImage("./images/game-images/greatball_bottom.png");
    ballBottom = p.loadImage("./images/game-images/pokeball_bottom.png");

    ballStationary = p.loadImage("./images/game-images/pokeball.png");
    ballWobble1 = p.loadImage("./images/game-images/pokeball_1.png");
    ballWobble2 = p.loadImage("./images/game-images/pokeball_2.png");

    overworldBG = p.loadImage("./images/game-images/overworld_1.png");
    tallGrassImg = p.loadImage("./images/game-images/tall_grass.png");
  };

  // Setup function for p5. Initializes canvas & fonts
  p.setup = function () {
    updateCanvasScale();
    let cvs = p.createCanvas(160 * canvasScale, 144 * canvasScale);
    cvs.position(p.windowWidth / 2 - (160 * canvasScale) / 2, 350);
    pokeFont = p.loadFont("./css/fonts/pokefont.ttf");
    p.textFont(pokeFont);

    initOverworld();
    setInterval(() => {
      if (!encounterStartAnim && inOverworld) {
        grassShake();
      }
    }, p.random(5000, 18000));

    //preEncounter(randomPokemon(locationPokemon)); //TEMPORARY
    //encounter(encounterPokemon);
  };

  // Runs every frame in p5.
  p.draw = function () {
    p.background(255);

    // Everything to render only when in overworld
    if (inOverworld) {
      overworldBG.resizeNN(160 * canvasScale, 144 * canvasScale);
      tallGrassImg.resizeNN(16 * canvasScale, 16 * canvasScale);
      p.image(overworldBG, 0, 0);

      tallGrassList.forEach((grass) => {
        if (grass.isShaking && !encounterStartAnim) {
          p.push();
          p.translate(p.random(-2, 2) * canvasScale, 0);
          p.image(
            tallGrassImg,
            (grass.x + shakeXOffset) * canvasScale,
            (grass.y + shakeYOffset) * canvasScale
          );
          p.pop();
        } else {
          p.image(
            tallGrassImg,
            (grass.x + shakeXOffset) * canvasScale,
            (grass.y + shakeYOffset) * canvasScale
          );
        }
      });
    }

    // Everything to render only during an encounter
    if (inEncounter) {
      if (pokeX < targetPokeX) {
        pokeX += 2 / (p.frameRate() / 60);
      } else {
        grayscale = false;
      }

      if (trainerX > targetTrainerX) {
        trainerX -= 2.5 / (p.frameRate() / 60);
      }
      // Encounter Elements
      trainer.resizeNN(48 * canvasScale, 48 * canvasScale);
      textbox.resizeNN(160 * canvasScale, 48 * canvasScale);
      smallMenu.resizeNN(96 * canvasScale, 48 * canvasScale);
      pokemon.resizeNN(56 * canvasScale, 56 * canvasScale);
      throwable.resizeNN(14 * canvasScale, 12 * canvasScale);
      ballTop.resizeNN(12 * canvasScale, 12 * canvasScale);
      ballBottom.resizeNN(12 * canvasScale, 12 * canvasScale);

      razzIcn.resizeNN(8 * canvasScale, 8 * canvasScale);
      nanabIcn.resizeNN(8 * canvasScale, 8 * canvasScale);
      pinapIcn.resizeNN(8 * canvasScale, 8 * canvasScale);

      ballStationary.resizeNN(14 * canvasScale, 12 * canvasScale);
      ballWobble1.resizeNN(14 * canvasScale, 12 * canvasScale);
      ballWobble2.resizeNN(14 * canvasScale, 12 * canvasScale);

      if (pokeInBall == false) {
        p.image(pokemon, pokeX * canvasScale, pokeY * canvasScale);
      }

      if (activeBerry != "none") {
        if (activeBerry == "razz") {
          p.image(razzIcn, 16 * canvasScale, 19 * canvasScale);
        }
        if (activeBerry == "nanab") {
          p.image(nanabIcn, 16 * canvasScale, 19 * canvasScale);
        }
        if (activeBerry == "pinap") {
          p.image(pinapIcn, 16 * canvasScale, 19 * canvasScale);
        }
      }

      p.image(trainer, trainerX * canvasScale, trainerY * canvasScale);
      p.image(textbox, 0, 96 * canvasScale);
      p.textSize(8 * canvasScale);
      p.textLeading(16 * canvasScale);
      p.textWrap(p.WORD);
      p.text(
        encounterText,
        8 * canvasScale,
        118 * canvasScale,
        144 * canvasScale
      );

      if (encounterInteract) {
        pokemonUI.resizeNN(79 * canvasScale, 15 * canvasScale);
        p.image(pokemonUI, 9 * canvasScale, 16 * canvasScale);
        levelIcon.resizeNN(8 * canvasScale, 8 * canvasScale);
        p.image(levelIcon, 48 * canvasScale, 8 * canvasScale);
        p.textSize(8 * canvasScale);
        p.text(
          encounterPokemon.name.toUpperCase(),
          8 * canvasScale,
          7.5 * canvasScale
        );
        p.text(encounterLevel, 56 * canvasScale, 15.5 * canvasScale);
      }

      if (encounterMenu) {
        if (currentMenu == "main") {
          //image(smallMenu, 64*canvasScale, 96*canvasScale);
          ballBtn.resizeNN(48 * canvasScale, 24 * canvasScale);
          itemBtn.resizeNN(48 * canvasScale, 24 * canvasScale);
          runBtn.resizeNN(48 * canvasScale, 24 * canvasScale);

          p.image(ballBtn, 8 * canvasScale, 109 * canvasScale);
          p.image(itemBtn, 56 * canvasScale, 109 * canvasScale);
          p.image(runBtn, 104 * canvasScale, 109 * canvasScale);
        }

        if (currentMenu == "ball") {
          pokeballBtn.resizeNN(48 * canvasScale, 24 * canvasScale);
          greatballBtn.resizeNN(48 * canvasScale, 24 * canvasScale);
          ultraballBtn.resizeNN(48 * canvasScale, 24 * canvasScale);

          p.image(pokeballBtn, 8 * canvasScale, 109 * canvasScale);
          p.image(greatballBtn, 56 * canvasScale, 109 * canvasScale);
          p.image(ultraballBtn, 104 * canvasScale, 109 * canvasScale);

          p.text(
            "x" + userData.items.pokeballs.poke,
            27 * canvasScale,
            126 * canvasScale
          );
          p.text(
            "x" + userData.items.pokeballs.great,
            75 * canvasScale,
            126 * canvasScale
          );
          p.text(
            "x" + userData.items.pokeballs.ultra,
            123 * canvasScale,
            126 * canvasScale
          );
        }

        if (currentMenu == "item") {
          razzBtn.resizeNN(48 * canvasScale, 24 * canvasScale);
          nanabBtn.resizeNN(48 * canvasScale, 24 * canvasScale);
          pinapBtn.resizeNN(48 * canvasScale, 24 * canvasScale);

          p.image(razzBtn, 8 * canvasScale, 109 * canvasScale);
          p.image(nanabBtn, 56 * canvasScale, 109 * canvasScale);
          p.image(pinapBtn, 104 * canvasScale, 109 * canvasScale);

          p.text(
            "x" + userData.items.berries.razz,
            27 * canvasScale,
            126 * canvasScale
          );
          p.text(
            "x" + userData.items.berries.nanab,
            75 * canvasScale,
            126 * canvasScale
          );
          p.text(
            "x" + userData.items.berries.pinap,
            123 * canvasScale,
            126 * canvasScale
          );
        }
      }

      if (throwing) {
        p.image(throwable, itemX * canvasScale, itemY * canvasScale);
        if (itemX * canvasScale < itemTargetX * canvasScale) {
          itemX += 2;
          itemYVel += itemYAcc;
          itemY += itemYVel;
        } else {
          throwing = false;
        }
      }

      if (ballOpen) {
        p.image(
          ballBottom,
          finalBallX * canvasScale,
          ballBottomY * canvasScale
        );
        p.image(ballTop, finalBallX * canvasScale, ballTopY * canvasScale);

        ballTopYVel += ballTopYAcc;
        ballTopY += ballTopYVel;

        if (ballTopY > ballBottomY) {
          ballOpen = false;
          ballTopY = ballBottomY;
        }
      }

      if (ballRocking) {
        if (wobbleFrame == 0) {
          p.image(
            ballStationary,
            ballStationaryX * canvasScale,
            ballBottomY * canvasScale
          );
        }
        if (wobbleFrame == 1) {
          p.image(
            ballWobble1,
            ballStationaryX * canvasScale,
            ballBottomY * canvasScale
          );
        }
        if (wobbleFrame == 2) {
          p.image(
            ballWobble2,
            ballStationaryX * canvasScale,
            ballBottomY * canvasScale
          );
        }
      }

      //Filter Code
      if (grayscale == true) {
        p.filter(p.GRAY);
      }
    }
    //Black rectangle used for transitions
    if (rectShow) {
      p.push();
      p.fill(0, 0, 0, rectOpac * 255);
      p.noStroke();
      p.rect(
        rectX * canvasScale,
        rectY * canvasScale,
        rectW * canvasScale,
        rectH * canvasScale
      );
      p.pop();
    }
  };

  // Resizes canvas when window is resized
  p.windowResized = function () {
    updateCanvasScale();
    p.resizeCanvas(160 * canvasScale, 144 * canvasScale);
    //cvs.position(p.windowWidth / 2 - (160 * canvasScale) / 2, 200);
  };

  function screenInteract() {
    if (inOverworld) {
      tallGrassList.forEach((grass) => {
        if (
          p.mouseX > grass.x * canvasScale &&
          p.mouseX < (grass.x + 16) * canvasScale &&
          p.mouseY > grass.y * canvasScale &&
          p.mouseY < (grass.y + 16) * canvasScale &&
          grass.isShaking &&
          !encounterStartAnim
        ) {
          console.log("test");
          encounterStartAnim = true;
          preEncounter(randomPokemon(locationPokemon));
        }
      });
    }

    //Either moves on to main encounter menu, or ends the encounter depending on booleans
    if (encounterInteract & !encounterMenu) {
      if (!encounterNearlyDone) {
        showEncounterMenu();
      } else {
        encounterComplete();
      }
    }

    if (encounterMenu) {
      // MAIN MENU CLICK LISTENERS
      if (currentMenu == "main") {
        if (
          p.mouseX > 8 * canvasScale &&
          p.mouseX < (8 + 48) * canvasScale &&
          p.mouseY > 109 * canvasScale &&
          p.mouseY < (109 + 24) * canvasScale
        ) {
          setTimeout(() => {
            currentMenu = "ball";
          }, 10);
          //calcCatch(encounterPokemon.capture_rate, encounterLevel, 2);
        }

        if (
          p.mouseX > 56 * canvasScale &&
          p.mouseX < (56 + 48) * canvasScale &&
          p.mouseY > 109 * canvasScale &&
          p.mouseY < (109 + 24) * canvasScale &&
          activeBerry == "none"
        ) {
          setTimeout(() => {
            currentMenu = "item";
          }, 10);
        }

        if (
          p.mouseX > 104 * canvasScale &&
          p.mouseX < (104 + 48) * canvasScale &&
          p.mouseY > 109 * canvasScale &&
          p.mouseY < (109 + 24) * canvasScale
        ) {
          setTimeout(() => {
            encounterNearlyDone = true;
            currentMenu = "none";
            encounterMenu = false;
            encounterText = "Got away safely!";
          }, 10);

          //encounterComplete();
        }
      }

      // POKEBALL MENU CLICK LISTENERS
      if (currentMenu == "ball") {
        if (
          p.mouseX > 8 * canvasScale &&
          p.mouseX < (8 + 48) * canvasScale &&
          p.mouseY > 109 * canvasScale &&
          p.mouseY < (109 + 24) * canvasScale &&
          userData.items.pokeballs.poke > 0
        ) {
          throwItem("pokeball");
          currentMenu = "none";
          userData.items.pokeballs.poke--;
          updateUserInfo();
        }

        if (
          p.mouseX > 56 * canvasScale &&
          p.mouseX < (56 + 48) * canvasScale &&
          p.mouseY > 109 * canvasScale &&
          p.mouseY < (109 + 24) * canvasScale &&
          userData.items.pokeballs.great > 0
        ) {
          throwItem("greatball");
          currentMenu = "none";
          userData.items.pokeballs.great--;
          updateUserInfo();
        }

        if (
          p.mouseX > 104 * canvasScale &&
          p.mouseX < (104 + 48) * canvasScale &&
          p.mouseY > 109 * canvasScale &&
          p.mouseY < (109 + 24) * canvasScale &&
          userData.items.pokeballs.ultra > 0
        ) {
          throwItem("ultraball");
          currentMenu = "none";
          userData.items.pokeballs.ultra--;
          updateUserInfo();
        }
      }

      // POKEBALL MENU CLICK LISTENERS
      if (currentMenu == "item") {
        if (
          p.mouseX > 8 * canvasScale &&
          p.mouseX < (8 + 48) * canvasScale &&
          p.mouseY > 109 * canvasScale &&
          p.mouseY < (109 + 24) * canvasScale &&
          userData.items.pokeballs.poke > 0
        ) {
          throwItem("razz");
          currentMenu = "none";
          userData.items.berries.razz--;
          updateUserInfo();
        }

        if (
          p.mouseX > 56 * canvasScale &&
          p.mouseX < (56 + 48) * canvasScale &&
          p.mouseY > 109 * canvasScale &&
          p.mouseY < (109 + 24) * canvasScale &&
          userData.items.pokeballs.great > 0
        ) {
          throwItem("nanab");
          currentMenu = "none";
          userData.items.berries.nanab--;
          updateUserInfo();
        }

        if (
          p.mouseX > 104 * canvasScale &&
          p.mouseX < (104 + 48) * canvasScale &&
          p.mouseY > 109 * canvasScale &&
          p.mouseY < (109 + 24) * canvasScale &&
          userData.items.pokeballs.ultra > 0
        ) {
          throwItem("pinap");
          currentMenu = "pinap";
          userData.items.pokeballs.ultra--;
          updateUserInfo();
        }
      }
    }
  }

  p.mouseClicked = function () {
    screenInteract();
  };

  p.touchEnded = function () {
    screenInteract();
  };
};
