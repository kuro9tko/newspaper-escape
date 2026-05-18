const EMPTY = "　";
const WALL = "壁";
const TREE = "木";
const PUSH_TREE = "押木";
const GUIDE = "▶︎";

const MOUNTAIN = "山";
const SOIL = "土";
const WATER = "水";

const PLAYER = "吾";
const KEY = "鍵";
const DOOR = "門";      // ゴール
const SLOT = "⬜︎";

const SIX = "六";
const FIVE = "五";
const PLUS = "＋";
const DIVIDE = "÷";

const KANE = "金";
const KEN = "建";
const TAKAI = "喬";
const BRIDGE = "橋";

const SHI = "士";
const JOU = "冗";
const URI = "売";

const TATSU = "立";
const MOKU = "木";
const MOKU_PART = "木部";
const SHIN_LEFT = "亲"; // 立 + 木 でできる中間部品
const KIN = "斤";
const SHIN = "新";

const MON_PART = "門部"; // 見た目は「門」、合成用
const MIMI = "耳";
const KIKU = "聞";

const DOKU = "読";

const stages = [
  {
    name: "「吾」がプレイヤーです。「鍵」で「門」を開きましょう",
    message: "「吾」を動かそう。「鍵」で「門」を開こう",
    clearMessage: "門がひらいた。",
    map: [
      [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
      [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
      [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
      [GUIDE,GUIDE,GUIDE,GUIDE,GUIDE,GUIDE,GUIDE,GUIDE,GUIDE],
      [GUIDE,GUIDE,GUIDE,PLAYER,EMPTY,EMPTY,KEY,EMPTY,DOOR],
      [GUIDE,GUIDE,GUIDE,GUIDE,GUIDE,GUIDE,GUIDE,GUIDE,GUIDE],
      [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
      [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
      [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
    ],
  },
  {
    name: "鍵と橋",
    message: "漢字を組み立てよう",
    clearMessage: "門がひらいた。",
    map: [
      [TREE,TREE,TREE,TREE,TREE,TREE,TREE,TREE,TREE],
      [TREE,TREE,TREE,TREE,TREE,TREE,TREE,TREE,TREE],
      [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
      [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
      [PLAYER,EMPTY,KANE,SLOT,PLUS,KEN,EMPTY,EMPTY,DOOR],
      [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
      [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
      [TREE,TREE,TREE,TREE,TREE,TREE,TREE,TREE,TREE],
      [TREE,TREE,TREE,TREE,TREE,TREE,TREE,TREE,TREE],
    ],
    combineRules: [
      {
        left: KANE,
        connector: PLUS,
        right: KEN,
        result: KEY,
        message: "鍵ができた。"
      },
      {
        left: PUSH_TREE,
        connector: PLUS,
        right: TAKAI,
        result: BRIDGE,
        message: "橋ができた。"
      }
    ]
  },
  {
    name: "読売新聞",
    message: "キーワードが鍵？",
    clearMessage: "門がひらいた。",
    map: [
      [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
      [EMPTY,EMPTY,EMPTY,EMPTY,TATSU,EMPTY,EMPTY,EMPTY,EMPTY],
      [EMPTY,SHI,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,MON_PART,EMPTY],
      [EMPTY,EMPTY,SLOT,EMPTY,SLOT,EMPTY,EMPTY,EMPTY,EMPTY],
      [PLAYER,DOKU,PLUS,EMPTY,PLUS,SLOT,EMPTY,PLUS,EMPTY],
      [EMPTY,JOU,SLOT,EMPTY,SLOT,PLUS,KIN,SLOT,EMPTY],
      [EMPTY,EMPTY,EMPTY,EMPTY,MOKU_PART,EMPTY,EMPTY,MIMI,EMPTY],
      [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
      [EMPTY,EMPTY,EMPTY,EMPTY,DOOR,EMPTY,EMPTY,EMPTY,EMPTY],
    ],
    combineRules: [
      {
        left: SHI,
        connector: PLUS,
        right: JOU,
        result: URI,
        direction: "vertical",
        message: "売ができた。"
      },
      {
        left: TATSU,
        connector: PLUS,
        right: MOKU_PART,
        result: SHIN_LEFT,
        direction: "vertical",
        message: "字の一部ができた。"
      },
      {
        left: SHIN_LEFT,
        connector: PLUS,
        right: KIN,
        result: SHIN,
        direction: "horizontal",
        message: "新ができた。"
      },
      {
        left: MON_PART,
        connector: PLUS,
        right: MIMI,
        result: KIKU,
        direction: "vertical",
        message: "聞ができた。"
      }
    ],
    keywordRule: {
      word: [DOKU, URI, SHIN, KIKU],
      result: KEY,
      spawn: { x: 5, y: 8 },
      message: "読売新聞。鍵が見つかった。"
    }
  },
  {
    name: "六五",
    message: "何を割る？",
    clearMessage: "65周年、そしてその先へ。皆様に心から感謝申し上げます。",
    map: [
      [EMPTY,EMPTY,EMPTY,EMPTY,PLAYER,EMPTY,EMPTY,EMPTY,EMPTY],
      [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
      [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
      [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,SLOT,EMPTY,EMPTY],
      [EMPTY,EMPTY,SIX,EMPTY,EMPTY,EMPTY,DIVIDE,EMPTY,EMPTY],
      [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,SLOT,EMPTY,EMPTY],
      [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
      [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
      [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
    ],
    splitRule: {
      source: PLAYER,
      topSlot: { x: 6, y: 3 },
      connector: { x: 6, y: 4 },
      bottomSlot: { x: 6, y: 5 },
      resultPlayer: FIVE,
      message: "吾は五になった。"
    },
    finalKeywordRule: {
      left: SIX,
      right: FIVE,
      message: "六五"
    }
  }
];

let currentStageIndex = 0;
let map = [];
let playerPos;
let currentPlayerChar = PLAYER;
let playerStartHintActive = false;
let combineEffectCells = [];

let bgmStarted = false;

let soundSettings = {
  bgmEnabled: true,
  seEnabled: true,
  bgmVolume: 0.35,
  seVolume: 0.7
};

const sounds = {
  bgm: new Audio("audio/bgm.mp3"),
  move: new Audio("audio/move.mp3"),
  box: new Audio("audio/box.mp3"),
  correct: new Audio("audio/correct.mp3"),
  gameover: new Audio("audio/gameover.mp3"),
  clear: new Audio("audio/clear.mp3")
};

const DEBUG_START_STAGE = 0;

sounds.bgm.loop = true;
sounds.bgm.volume = 0.35;

sounds.move.volume = 0.4;
sounds.box.volume = 0.6;
sounds.correct.volume = 0.7;
sounds.gameover.volume = 0.8;
sounds.clear.volume = 0.8;

function startBgm() {
  if (!soundSettings.bgmEnabled) return;
  if (bgmStarted) return;

  bgmStarted = true;
  sounds.bgm.currentTime = 0;
  sounds.bgm.play().catch(() => {});
}

function playSound(name) {
  if (!soundSettings.seEnabled) return;

  const sound = sounds[name];
  if (!sound) return;

  sound.currentTime = 0;
  sound.play().catch(() => {});
}

const SOUND_SETTINGS_KEY = "kanji_game_sound_settings";

function loadSoundSettings() {
  const raw = localStorage.getItem(SOUND_SETTINGS_KEY);

  if (!raw) {
    return;
  }

  try {
    const saved = JSON.parse(raw);

    soundSettings = {
      ...soundSettings,
      ...saved
    };
  } catch (e) {
    console.warn("音設定の読み込みに失敗しました", e);
  }
}

function saveSoundSettings() {
  localStorage.setItem(
    SOUND_SETTINGS_KEY,
    JSON.stringify(soundSettings)
  );
}

function applySoundSettings() {
  sounds.bgm.volume = soundSettings.bgmEnabled
    ? soundSettings.bgmVolume
    : 0;

  const seVolume = soundSettings.seEnabled
    ? soundSettings.seVolume
    : 0;

  sounds.move.volume = seVolume * 0.6;
  sounds.box.volume = seVolume * 0.8;
  sounds.correct.volume = seVolume;
  sounds.gameover.volume = seVolume;
  sounds.clear.volume = seVolume;
}

function cloneMap(sourceMap) {
  return sourceMap.map(row => [...row]);
}

function findPlayer() {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === currentPlayerChar) {
        return { x, y };
      }
    }
  }

  console.error("PLAYER が見つかりません", currentPlayerChar, map);
  return { x: 1, y: 1 };
}

function isInsideMap(x, y) {
  return (
    y >= 0 &&
    y < map.length &&
    x >= 0 &&
    x < map[y].length
  );
}

function startStage(index) {
  currentStageIndex = index;

  const stage = stages[currentStageIndex];

  currentPlayerChar = PLAYER;
  playerStartHintActive = true;

  if (stage.keywordRule) {
    stage.keywordRule.done = false;
  }

  if (stage.splitRule) {
    stage.splitRule.done = false;
  }

  if (stage.finalKeywordRule) {
    stage.finalKeywordRule.done = false;
  }

  map = cloneMap(stage.map);

  playerPos = findPlayer();

  setTimeout(() => {
    playerStartHintActive = false;
    draw();
  }, 1200);

  slotsActive = false;

  const overlay = document.getElementById("overlay");
  if (overlay) {
    overlay.style.display = "none";
  }

  const doorEffect = document.getElementById("door-effect");
  if (doorEffect) {
    doorEffect.style.display = "none";
    doorEffect.classList.remove("active");
  }

  const message = document.getElementById("message");
  if (message) {
    message.style.color = "white";
  }

  setMessage(stage.message);

  console.log("startStage 実行", currentStageIndex);
  console.log(map);

  draw();

  // if (bgmStarted) {
  //   sounds.bgm.currentTime = 0;
  //   sounds.bgm.play().catch(() => {});
  // }
}

function initGame() {
  startStage(DEBUG_START_STAGE);
}

function restartStage() {
  startStage(currentStageIndex);
}

function draw() {
  const container = document.getElementById("game-container");

  if (!container) {
    console.error("game-container が見つかりません");
    return;
  }

  if (!map) {
    console.error("map が初期化されていません");
    return;
  }

  container.innerHTML = "";

  container.style.display = "grid";
  container.style.gridTemplateColumns =
    `repeat(${map[0].length}, 42px)`;

  map.forEach((row, y) => {
    row.forEach((cell, x) => {
      const div = document.createElement("div");

      div.classList.add("tile");

      const isCombining = combineEffectCells.some(pos => {
        return pos.x === x && pos.y === y;
      });

      if (isCombining) {
        div.classList.add("combine-effect");
      }

      if (cell === WALL) div.classList.add("wall");
      if (cell === TREE) div.classList.add("tree");
      if (cell === GUIDE) div.classList.add("guide");
      if (cell === MOUNTAIN) div.classList.add("mountain");
      if (cell === SOIL) div.classList.add("soil");
      if (cell === WATER) div.classList.add("water");

      const isPlayerTile =
        playerPos &&
        x === playerPos.x &&
        y === playerPos.y;

      if (isPlayerTile) {
        div.classList.add("player");
      }

      if (isPlayerTile && playerStartHintActive) {
        div.classList.add("player-start-hint");
      }
      if (cell === currentPlayerChar && playerStartHintActive) {
        div.classList.add("player-start-hint");
      }
      if (cell === DOOR) div.classList.add("door");

      if (cell === KEY) div.classList.add("key");
      if (cell === SLOT) div.classList.add("slot");
      if (cell === PLUS) div.classList.add("plus");

      if (cell === KANE) div.classList.add("kanji-part");
      if (cell === KEN) div.classList.add("kanji-part");
      if (cell === TAKAI) div.classList.add("kanji-part");
      if (cell === BRIDGE) div.classList.add("kanji-part");
      if (cell === PUSH_TREE) div.classList.add("kanji-part");

      if (cell === SHI) div.classList.add("kanji-part");
      if (cell === JOU) div.classList.add("kanji-part");
      if (cell === URI) div.classList.add("kanji-part");

      if (cell === TATSU) div.classList.add("kanji-part");
      if (cell === MOKU_PART) div.classList.add("kanji-part");
      if (cell === SHIN_LEFT) div.classList.add("kanji-part");
      if (cell === KIN) div.classList.add("kanji-part");
      if (cell === SHIN) div.classList.add("kanji-part");

      if (cell === MON_PART) div.classList.add("kanji-part");
      if (cell === MIMI) div.classList.add("kanji-part");
      if (cell === KIKU) div.classList.add("kanji-part");

      if (cell === DOKU) div.classList.add("kanji-part");

      let displayText = cell;

      if (cell === PUSH_TREE) {
        displayText = TREE;
      }

      if (cell === MON_PART) {
        displayText = "門";
      }

      if (cell === MOKU_PART) {
        displayText = "木";
      }

      div.textContent = displayText;
      container.appendChild(div);
    });
  });
}

function getTilePixelPosition(x, y) {
  const container = document.getElementById("game-container");
  const firstTile = container.querySelector(".tile");

  if (!container || !firstTile) {
    return { left: x * 42, top: y * 42 };
  }

  const tileRect = firstTile.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  const tileSize = tileRect.width;

  return {
    left: x * tileSize,
    top: y * tileSize
  };
}

function move(dx, dy) {
  startBgm();

  if (playerStartHintActive) {
    playerStartHintActive = false;
  }

  const nx = playerPos.x + dx;
  const ny = playerPos.y + dy;

  if (!isInsideMap(nx, ny)) {
    return;
  }

  const target = map[ny][nx];

  if (
    target === WALL ||
    target === TREE ||
    target === GUIDE ||
    target === MOUNTAIN ||
    target === SOIL ||
    target === WATER
  ) {
    return;
  }

  // 押せるもの
  if ([
      SIX, FIVE,
      KEY,
      KANE, KEN, TAKAI, BRIDGE, PUSH_TREE,

      SHI, JOU, URI,
      TATSU, MOKU_PART, SHIN_LEFT, KIN, SHIN,
      MON_PART, MIMI, KIKU,
      DOKU
    ].includes(target)) {

    const nnx = nx + dx;
    const nny = ny + dy;

    if (!isInsideMap(nnx, nny)) {
      return;
    }

    const nextTarget = map[nny][nnx];

    // GAME OVER
    if (nextTarget === SLOT && target === PLUS) {

      gameOver();
      return;
    }

    // 鍵を扉へ
    if (target === KEY && nextTarget === DOOR) {
      playSound("correct");

      playUnlockEffect(nx, ny, nnx, nny, () => {
        clearStage();
      });

      return;
    }

    if (
      nextTarget === EMPTY ||
      nextTarget === SLOT
    ) {

      map[nny][nnx] = target;
      map[ny][nx] = EMPTY;

      checkCombineRules();
      checkKeywordRule();

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
  playSound("move");

  map[playerPos.y][playerPos.x] = EMPTY;

  map[ny][nx] = currentPlayerChar;

  playerPos.x = nx;
  playerPos.y = ny;

  checkSplitRule();
  checkFinalKeywordRule();

  draw();
}

function checkCombineRules() {
  const stage = stages[currentStageIndex];

  if (!stage.combineRules) return;

  applyOneCombineRule(stage);
}

function applyOneCombineRule(stage) {
  for (const rule of stage.combineRules) {
    const direction = rule.direction || "horizontal";

    const dx = direction === "horizontal" ? 1 : 0;
    const dy = direction === "vertical" ? 1 : 0;

    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        const x1 = x;
        const y1 = y;

        const x2 = x + dx;
        const y2 = y + dy;

        const x3 = x + dx * 2;
        const y3 = y + dy * 2;

        if (
          !isInsideMap(x1, y1) ||
          !isInsideMap(x2, y2) ||
          !isInsideMap(x3, y3)
        ) {
          continue;
        }

        if (
          map[y1][x1] === rule.left &&
          map[y2][x2] === rule.connector &&
          map[y3][x3] === rule.right
        ) {
          playCombineEffect(
            [
              { x: x1, y: y1 },
              { x: x2, y: y2 },
              { x: x3, y: y3 }
            ],
            () => {
              map[y1][x1] = EMPTY;
              map[y2][x2] = EMPTY;
              map[y3][x3] = rule.result;

              setMessage(rule.message);
              playSound("correct");

              combineEffectCells = [];
              draw();

              // 連鎖確認
              setTimeout(() => {
                checkCombineRules();
                checkKeywordRule();
              }, 80);
            }
          );

          return true;
        }
      }
    }
  }

  return false;
}

function playCombineEffect(cells, onComplete) {
  combineEffectCells = cells;
  draw();

  setTimeout(() => {
    if (onComplete) onComplete();
  }, 350);
}

function gameOver() {
  playSound("gameover");

  setMessage("GAME OVER");

  document.getElementById("message").style.color = "red";

  setTimeout(() => {

    restartStage();

    document.getElementById("message").style.color = "white";

  }, 1500);
}

function playUnlockEffect(keyX, keyY, doorX, doorY, onComplete) {
  const container = document.getElementById("game-container");
  if (!container) {
    if (onComplete) onComplete();
    return;
  }

  let layer = container.querySelector(".unlock-effect-layer");

  if (!layer) {
    layer = document.createElement("div");
    layer.className = "unlock-effect-layer";
    container.appendChild(layer);
  }

  layer.innerHTML = "";

  const keyStart = getTilePixelPosition(keyX, keyY);
  const doorPos = getTilePixelPosition(doorX, doorY);

  const flyingKey = document.createElement("div");
  flyingKey.className = "flying-key";
  flyingKey.textContent = KEY;
  flyingKey.style.left = `${keyStart.left}px`;
  flyingKey.style.top = `${keyStart.top}px`;

  layer.appendChild(flyingKey);

  // 盤面上の鍵は一旦消す
  map[keyY][keyX] = EMPTY;
  draw();

  // draw() で layer が消える可能性があるので再取得
  layer = container.querySelector(".unlock-effect-layer");
  if (!layer) {
    layer = document.createElement("div");
    layer.className = "unlock-effect-layer";
    container.appendChild(layer);
  }

  layer.appendChild(flyingKey);

  requestAnimationFrame(() => {
    flyingKey.style.transform =
      `translate(${doorPos.left - keyStart.left}px, ${doorPos.top - keyStart.top}px)`;
  });

  setTimeout(() => {
    flyingKey.remove();

    // 門を消す
    map[doorY][doorX] = EMPTY;
    draw();

    createDoorScatterEffect(doorX, doorY);

    setTimeout(() => {
      if (onComplete) onComplete();
    }, 650);
  }, 600);
}

function createDoorScatterEffect(doorX, doorY) {
  const container = document.getElementById("game-container");
  if (!container) return;

  let layer = container.querySelector(".unlock-effect-layer");

  if (!layer) {
    layer = document.createElement("div");
    layer.className = "unlock-effect-layer";
    container.appendChild(layer);
  }

  const doorPos = getTilePixelPosition(doorX, doorY);

  const directions = [
    { dx: -60, dy: -50, rot: "-40deg" },
    { dx:  60, dy: -45, rot: "35deg" },
    { dx: -55, dy:  45, rot: "50deg" },
    { dx:  65, dy:  50, rot: "-55deg" },
    { dx:   0, dy: -70, rot: "20deg" },
    { dx:   0, dy:  70, rot: "-25deg" },
  ];

  directions.forEach(dir => {
    const piece = document.createElement("div");
    piece.className = "door-piece";
    piece.textContent = DOOR;

    piece.style.left = `${doorPos.left}px`;
    piece.style.top = `${doorPos.top}px`;

    piece.style.setProperty("--dx", `${dir.dx}px`);
    piece.style.setProperty("--dy", `${dir.dy}px`);
    piece.style.setProperty("--rot", dir.rot);

    layer.appendChild(piece);

    setTimeout(() => {
      piece.remove();
    }, 650);
  });
}

function clearStage() {
  const stage = stages[currentStageIndex];

  playSound("clear");

  setMessage(stage.clearMessage || "ステージクリア！");

  const nextStageIndex = currentStageIndex + 1;

  if (nextStageIndex < stages.length) {
    setTimeout(() => {
      startStage(nextStageIndex);
    }, 1000);
  } else {
    setTimeout(() => {
      clearGame();
    }, 1000);
  }
}

function clearGame() {
  playSound("clear");

  sounds.bgm.pause();

  document.getElementById("door-effect").style.display = "flex";

  setTimeout(() => {
    document.getElementById("door-effect").style.display = "none";
    document.getElementById("overlay").style.display = "flex";
  }, 2500);
}

function setMessage(text) {
  const message = document.getElementById("message");

  if (!message) {
    console.error("message が見つかりません");
    return;
  }

  message.textContent = text;
}

function checkKeywordRule() {
  const stage = stages[currentStageIndex];

  if (!stage.keywordRule) return;

  const rule = stage.keywordRule;

  if (rule.done) return;

  const found = findWordHorizontal(rule.word);

  if (!found) return;

  rule.done = true;

  setMessage(rule.message || "鍵が見つかった。");
  playSound("correct");

  showKeywordEffect(() => {
    const spawnX = rule.spawn.x;
    const spawnY = rule.spawn.y;

    if (map[spawnY][spawnX] === EMPTY || map[spawnY][spawnX] === SLOT) {
      map[spawnY][spawnX] = rule.result;
    }

    draw();
  });
}

function checkSplitRule() {
  const stage = stages[currentStageIndex];

  if (!stage.splitRule) return;

  const rule = stage.splitRule;

  if (rule.done) return;

  const top = rule.topSlot;
  const bottom = rule.bottomSlot;
  const connector = rule.connector;

  const playerIsOnTopSlot =
    playerPos.x === top.x &&
    playerPos.y === top.y &&
    currentPlayerChar === rule.source;

  if (!playerIsOnTopSlot) return;

  if (map[connector.y][connector.x] !== DIVIDE) return;
  if (map[bottom.y][bottom.x] !== SLOT) return;

  rule.done = true;

  currentPlayerChar = rule.resultPlayer;

  map[playerPos.y][playerPos.x] = currentPlayerChar;

  setMessage(rule.message || "吾は五になった。");
  playSound("correct");
}

function checkFinalKeywordRule() {
  const stage = stages[currentStageIndex];

  if (!stage.finalKeywordRule) return;

  const rule = stage.finalKeywordRule;

  if (rule.done) return;

  const sixPos = findCell(rule.left);
  if (!sixPos) return;

  const neighbors = [
    { x: sixPos.x + 1, y: sixPos.y },
    { x: sixPos.x - 1, y: sixPos.y },
    { x: sixPos.x, y: sixPos.y + 1 },
    { x: sixPos.x, y: sixPos.y - 1 },
  ];

  const fiveIsNextToSix = neighbors.some(pos => {
    if (!isInsideMap(pos.x, pos.y)) return false;
    return map[pos.y][pos.x] === rule.right;
  });

  if (!fiveIsNextToSix) return;

  rule.done = true;

  setMessage(rule.message || "六五");
  playSound("correct");

  // いったん仮でエンディングへ進める
  setTimeout(() => {
    showFinalClearText();
  }, 800);
}

function showFinalClearText() {
  const clearText = document.getElementById("clear-text");

  if (clearText) {
    clearText.innerHTML = "65周年、そしてその先へ。<br><br>皆様に心から感謝申し上げます。";
  }

  const overlay = document.getElementById("overlay");
  if (overlay) {
    overlay.style.display = "flex";
  }

  sounds.bgm.pause();
  playSound("clear");
}

function findWordHorizontal(word) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x <= map[y].length - word.length; x++) {
      let matched = true;

      for (let i = 0; i < word.length; i++) {
        if (map[y][x + i] !== word[i]) {
          matched = false;
          break;
        }
      }

      if (matched) {
        return { x, y };
      }
    }
  }

  return null;
}

function findCell(char) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === char) {
        return { x, y };
      }
    }
  }

  return null;
}

function showKeywordEffect(onComplete) {
  const effect = document.getElementById("keyword-effect");

  if (!effect) {
    if (onComplete) onComplete();
    return;
  }

  effect.textContent = "読売新聞";

  effect.classList.remove("active");
  effect.style.display = "flex";

  void effect.offsetWidth;

  effect.classList.add("active");

  setTimeout(() => {
    effect.textContent = "鍵";

    void effect.offsetWidth;

    setTimeout(() => {
      effect.classList.remove("active");
      effect.style.display = "none";

      if (onComplete) onComplete();
    }, 800);
  }, 900);
}

document.querySelectorAll(".move").forEach(button => {
  button.addEventListener("pointerdown", event => {
    event.preventDefault();

    const dx = Number(button.dataset.dx);
    const dy = Number(button.dataset.dy);

    move(dx, dy);
  });
});

function setupSoundSettingsUI() {
  const bgmToggle = document.getElementById("bgm-toggle");
  const seToggle = document.getElementById("se-toggle");
  const bgmVolume = document.getElementById("bgm-volume");
  const seVolume = document.getElementById("se-volume");

  if (!bgmToggle || !seToggle || !bgmVolume || !seVolume) {
    return;
  }

  bgmToggle.checked = soundSettings.bgmEnabled;
  seToggle.checked = soundSettings.seEnabled;
  bgmVolume.value = soundSettings.bgmVolume;
  seVolume.value = soundSettings.seVolume;

  bgmToggle.addEventListener("change", () => {
    soundSettings.bgmEnabled = bgmToggle.checked;

    if (!soundSettings.bgmEnabled) {
      sounds.bgm.pause();
    } else if (bgmStarted) {
      sounds.bgm.play().catch(() => {});
    }

    applySoundSettings();
    saveSoundSettings();
  });

  seToggle.addEventListener("change", () => {
    soundSettings.seEnabled = seToggle.checked;

    applySoundSettings();
    saveSoundSettings();
  });

  bgmVolume.addEventListener("input", () => {
    soundSettings.bgmVolume = Number(bgmVolume.value);

    applySoundSettings();
    saveSoundSettings();
  });

  seVolume.addEventListener("input", () => {
    soundSettings.seVolume = Number(seVolume.value);

    applySoundSettings();
    saveSoundSettings();
  });
}

function restartBgmFromBeginning() {
  if (!bgmStarted) return;

  sounds.bgm.pause();
  sounds.bgm.currentTime = 0;

  if (soundSettings.bgmEnabled) {
    sounds.bgm.play().catch(() => {});
  }
}

window.addEventListener("load", () => {
  const startButton = document.getElementById("start-button");

  if (startButton) {
    startButton.addEventListener("pointerdown", event => {
      event.preventDefault();

      document.body.classList.remove("game-not-started");

      const startScreen = document.getElementById("start-screen");
      if (startScreen) {
        startScreen.style.display = "none";
      }

      initGame();
    });
  }
});