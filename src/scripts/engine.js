const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.querySelector("#score-box"),
    },
    cardSprites: {
        avatar: document.querySelector("#card-image"),
        name: document.querySelector("#card-name"),
        type: document.querySelector("#card-type"),
    },
    fieldCards: {
        player: document.getElementById("#player-field-cards"),
        computer: document.getElementById("#computer-field-cards"),
    },
    actions: {
        button: document.getElementById("#next-duel"),
    },
};

const playerSides = {
    player1: "player-cards",
    computer: "computer-cards",
};

const pathImages = "./src/assets/icons/";

const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: `${pathImages}dragon.png`,
        winOf:[1],
        loseOf:[2],
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: `${pathImages}magician.png`,
        winOf:[2],
        loseOf:[0],
    },
    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        img: `${pathImages}exodia.png`,
        winOf:[0],
        loseOf:[1],
    },
];

async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

async function createCardImage(IdCard, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", IdCard);
    cardImage.classList.add("card");

    if(fieldSide === playerSides.player1){ 
        cardImage.addEventListener("click", () => {
            setCardsField(cardImage.getAttribute("data-id"))
        });

    }

    cardImage.addEventListener("mouseover", () => {
        drawSelectCard(IdCard);
    });

    return cardImage;
}

async function drawSelectCard(index) {
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = cardData[index].type;
}

async function drawCards(cardNumbers, fieldSide) {
    for(let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);
        document.getElementById(fieldSide).appendChild(cardImage)
    }
};

function init() {
    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.computer);
};

init();