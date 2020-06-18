const myWords = [
  "javascript",
  "html",
  "css",
  "coding",
  "programming",
  "github",
];

let strAlphabet = "abcdefghijklmnopqrstuvwxyz";
let arrAlphabet = strAlphabet.split("");
let randomAns = generateRandomWord();
generateAlphabet();
pickLetter();

function generateAlphabet() {
  for (let i = 0; i < arrAlphabet.length; i++) {
    let node = document.querySelector(".alphabet");
    let node2 = document.createElement("button");
    node2.className = arrAlphabet[i];
    let textNode = document.createTextNode(arrAlphabet[i]);
    node.appendChild(node2);
    node2.appendChild(textNode);
  }
}

function generateRandomWord() {
  let randomAns = myWords[Math.floor(Math.random() * myWords.length)];
  let node = document.querySelector(".container__word");
  for (let i = 0; i < randomAns.length; i++) {
    let node2 = document.createElement("p");
    node2.className = "word-" + randomAns[i];
    node.appendChild(node2);
    let textNode2 = document.createTextNode(randomAns[i]);
    node2.appendChild(textNode2);
  }
  return randomAns;
}

function pickLetter() {
  let pickedLetters = [];
  let wrongLetters = [];
  let rightLetters = [];
  let ansArr = randomAns.split("");

  for (letters of arrAlphabet) {
    let letter = letters;

    document.querySelector("." + letter).addEventListener("click", function () {
      // Do not continue if you already lost
      if (wrongLetters.length !== 9) {
        // Make letter(s) visable in word
        let nodes = document.querySelectorAll(".word-" + letter);
        for (let i = 0; i < nodes.length; i++) {
          nodes[i].style.color = "orangered";
        }

        // Do no continue if you have won
        if (ansArr.length > 0) {
          // Change color of letter
          document.querySelector("." + letter).style.color = "#c4421a";

          // Add letter to list for guess words
          if (!pickedLetters.includes(letter)) {
            pickedLetters.push(letter);

            // Place right or wrong letter in respektive array
            !randomAns.includes(letter)
              ? wrongLetters.push(letter)
              : rightLetters.push(letter);

            // Change image for each error
            if (!randomAns.includes(letter)) {
              document.querySelector("#hangman-img").src =
                "img/hangman-" + wrongLetters.length + ".png";
            }
          }
        }
      }
      while (ansArr.includes(letter)) {
        let index = ansArr.indexOf(letter);

        ansArr.splice(index, 1);
        console.log(ansArr.length);
      }
      if (ansArr.length == 0) {
        document.querySelector("#winner").style.display = "block";
      } else if (wrongLetters.length == 9) {
        document.querySelector("#loser").style.display = "block";
      }
    });
  }
}

// Reset game at press of button
document.querySelector("#restart").addEventListener("click", function () {
  location.reload();
});
