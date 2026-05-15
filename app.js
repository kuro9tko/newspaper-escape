const EMPTY = "　";
const WALL = "壁";
const PLAYER = "私";
const BOX = "箱";
const KEY = "鍵";
const DOOR = "扉";
const SLOT = "欄";

const SIX = "六";
const FIVE = "五";
const PLUS = "＋";

const initialMap = [
  [WALL,WALL,WALL,WALL,DOOR,WALL,WALL,WALL,WALL],
  [WALL,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,WALL],
  [WALL,EMPTY,SIX,EMPTY,PLUS,EMPTY,FIVE,EMPTY,WALL],
  [WALL,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,WALL],
  [WALL,EMPTY,EMPTY,EMPTY,BOX,EMPTY,EMPTY,EMPTY,WALL],
  [WALL,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,WALL],
  [WALL,PLAYER,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,WALL],
  [WALL,WALL,WALL,WALL,WALL,WALL,WALL,WALL,WALL]
];

let map;
let playerPos;

let slotsActive = false;

function initGame() {

  map = JSON.parse(JSON.stringify(initialMap));

  playerPos = { x: 1, y: 6 };

  document.getElementById("overlay").style.display = "none";

  setMessage("「箱」に触れてください");

  draw();
}

function draw() {

  const container = document.getElementById("game-container");

  container.innerHTML = "";

  container.style.gridTemplateColumns =
    `repeat(${map[0].length}, 42px)`;

  map.forEach(row => {

    row.forEach(cell => {

      const div = document.createElement("div");

      div.classList.add("tile");

      if (cell === WALL) div.classList.add("wall");
      if (cell === PLAYER) div.classList.add("player");
      if (cell === BOX) div.classList.add("box");
      if (cell === KEY) div.classList.add("key");
      if (cell === SLOT) div.classList.add("slot");
      if (cell === PLUS) div.classList.add("plus");

      div.textContent = cell;

      container.appendChild(div);

    });

  });

}

function move(dx, dy) {

  const nx = playerPos.x + dx;
  const ny = playerPos.y + dy;

  const target = map[ny][nx];

  if (target === WALL) return;

  // 箱
  if (target === BOX) {

    if (!slotsActive) {

      slotsActive = true;

      map[1][2] = SLOT;
      map[1][6] = SLOT;

      setMessage("「六」と「五」を運んでください");

      draw();
    }

    return;
  }

  // 押せるもの
  if ([SIX, FIVE, PLUS, KEY].includes(target)) {

    const nnx = nx + dx;
    const nny = ny + dy;

    const nextTarget = map[nny][nnx];

    // GAME OVER
    if (nextTarget === SLOT && target === PLUS) {

      gameOver();
      return;
    }

    // 鍵を扉へ
    if (target === KEY && nextTarget === DOOR) {

      clearGame();
      return;
    }

    if (
      nextTarget === EMPTY ||
      nextTarget === SLOT
    ) {

      map[nny][nnx] = target;
      map[ny][nx] = EMPTY;

      checkAnswer();

    } else {

      return;
    }
  }

  // 扉
  if (target === DOOR) {

    setMessage("「鍵」が必要です");

    return;
  }

  // プレイヤー移動
  map[playerPos.y][playerPos.x] = EMPTY;

  map[ny][nx] = PLAYER;

  playerPos.x = nx;
  playerPos.y = ny;

  draw();
}

function checkAnswer() {

  if (
    map[1][2] === SIX &&
    map[1][6] === FIVE
  ) {

    for (let y = 0; y < map.length; y++) {

      for (let x = 0; x < map[y].length; x++) {

        if (map[y][x] === BOX) {

          map[y][x] = KEY;

        }

      }

    }

    setMessage("「鍵」が現れた");

  }

  // 間違い
  else if (
    map[1][2] !== SLOT &&
    map[1][6] !== SLOT
  ) {

    gameOver();
  }

  draw();
}

function gameOver() {

  setMessage("GAME OVER");

  document.getElementById("message").style.color = "red";

  setTimeout(() => {

    initGame();

    document.getElementById("message").style.color = "white";

  }, 1500);
}

function clearGame() {

  document.getElementById("overlay").style.display = "flex";
}

function setMessage(text) {

  document.getElementById("message").textContent = text;
}

initGame();