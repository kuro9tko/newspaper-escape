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
const DOOR = "扉";      // ゴール
const SLOT = "⬜︎";

const SIX = "六";
const FIVE = "五";
const TEN = "十";
const MOUTH = "口";
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
    name: "鍵でひらく",
    message: "吾が動く。鍵で扉はひらく",
    clearMessage: "扉がひらいた。",
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
    message: "漢字を組み立てる",
    clearMessage: "扉がひらいた。",
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
    message: "キーワードが鍵になる",
    clearMessage: "扉がひらいた。",
    map: [
      [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
      [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
      [EMPTY,EMPTY,SHI,SLOT,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
      [EMPTY,EMPTY,EMPTY,PLUS,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
      [PLAYER,EMPTY,DOKU,SLOT,SHIN,KIKU,EMPTY,EMPTY,DOOR],
      [EMPTY,EMPTY,EMPTY,JOU,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
      [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
      [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
      [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
    ],
    combineRules: [
      {
        left: SHI,
        connector: PLUS,
        right: JOU,
        result: URI,
        direction: "vertical",
        message: "売ができた。"
      }
    ],
    keywordRule: {
      word: [DOKU, URI, SHIN, KIKU],
      result: KEY,
      message: "読売新聞。鍵が見つかった。"
    }
  },
  {
    name: "六五",
    message: "何を割る？",
    clearMessage: "65周年、そしてその先へ。皆様に心から感謝申し上げます。",
    map: [
      [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,DOOR],
      [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
      [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
      [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,SLOT,EMPTY,EMPTY],
      [PLAYER,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,DIVIDE,EMPTY,EMPTY],
      [EMPTY,EMPTY,SIX,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
      [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
      [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
      [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
    ],
    lastStageRule: {
      slot: { x: 6, y: 3 },
      divide: { x: 6, y: 4 },
      mouthSpawn: { x: 6, y: 5 }
    }
  }
];

let currentStageIndex = 0;
let map = [];
let playerPos;
let currentPlayerChar = PLAYER;
let playerStartHintActive = false;
let combineEffectCells = [];
let isAnimating = false;
let lastStageMode = "none";

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
  lastStageMode = "none";

  if (stage.keywordRule) {
    stage.keywordRule.done = false;
  }

  if (stage.splitRule) {
    stage.splitRule.done = false;
  }

  if (stage.finalKeywordRule) {
    stage.finalKeywordRule.done = false;
  }

  if (stage.normalEndingRule) {
    stage.normalEndingRule.done = false;
  }

  if (stage.trueKeywordRule) {
    stage.trueKeywordRule.done = false;
  }

  if (stage.trueEndingRule) {
    stage.trueEndingRule.done = false;
  }

  map = cloneMap(stage.map);

  playerPos = findPlayer();

  setTimeout(() => {
    playerStartHintActive = false;
    draw();
  }, 1200);

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

  const stageLabel = document.getElementById("stage-label");
  if (stageLabel) {
    stageLabel.textContent = `${currentStageIndex + 1} / ${stages.length}`;
  }

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
  restartBgmFromBeginning();
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
      if (cell === PLUS) {
        div.classList.add("plus");
        div.classList.add("kanji-part");
      }

      if (cell === DIVIDE) {
        div.classList.add("divide");
        div.classList.add("kanji-part");
      }

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

      if (cell === TEN) div.classList.add("kanji-part");
      if (cell === MOUTH) div.classList.add("kanji-part");

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
  if (isAnimating) return;
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

  const stage = stages[currentStageIndex];

const pushableTiles = [
  SIX, FIVE,
  PLUS,
  KEY,
  KANE, KEN, TAKAI, BRIDGE, PUSH_TREE,

  SHI, JOU, URI,
  TATSU, MOKU_PART, SHIN_LEFT, KIN, SHIN,
  MON_PART, MIMI, KIKU,
  DOKU
];

// ラストステージ限定
if (stage.lastStageRule) {
  pushableTiles.push(DIVIDE);
  pushableTiles.push(TEN);
  pushableTiles.push(FIVE);
}

// 押せるもの
if (pushableTiles.includes(target)) {

    const nnx = nx + dx;
    const nny = ny + dy;

    if (!isInsideMap(nnx, nny)) {
      return;
    }

    const nextTarget = map[nny][nnx];

    // 鍵を扉へ
    if (target === KEY && nextTarget === DOOR) {
      playSound("correct");

      const stage = stages[currentStageIndex];

      playUnlockEffect(nx, ny, nnx, nny, () => {
        if (
          stage.lastStageRule &&
          lastStageMode === "trueReady" &&
          currentPlayerChar === MOUTH
        ) {
          showTrueEnding();
        } else {
          clearStage();
        }
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

  checkLastStageSplitRule();
  checkLastStageTrueKeyword();
  checkLastStageNormalEnding();

  draw();
}

function checkCombineRules() {
  const stage = stages[currentStageIndex];

  if (!stage.combineRules) return false;

  return applyOneCombineRule(stage);
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
          isAnimating = true;

          const cells = [
            { x: x1, y: y1 },
            { x: x2, y: y2 },
            { x: x3, y: y3 }
          ];

          combineEffectCells = cells;
          draw();

          setTimeout(() => {
            clearNearbySlots(cells);

            map[y1][x1] = EMPTY;
            map[y2][x2] = EMPTY;
            map[y3][x3] = rule.result;

            setMessage(rule.message);
            playSound("correct");

            combineEffectCells = [];
            draw();

            isAnimating = false;

            setTimeout(() => {
              const chained = checkCombineRules();

              if (!chained) {
                checkKeywordRule();
              }
            }, 80);
          }, 350);

          return true;
        }
      }
    }
  }

  return false;
}

function clearNearbySlots(cells) {
  const targets = [];

  cells.forEach(cell => {
    targets.push(cell);

    targets.push({ x: cell.x + 1, y: cell.y });
    targets.push({ x: cell.x - 1, y: cell.y });
    targets.push({ x: cell.x, y: cell.y + 1 });
    targets.push({ x: cell.x, y: cell.y - 1 });
  });

  targets.forEach(pos => {
    if (!isInsideMap(pos.x, pos.y)) return;

    if (map[pos.y][pos.x] === SLOT) {
      map[pos.y][pos.x] = EMPTY;
    }
  });
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
    }, 1400);
  } else {
    setTimeout(() => {
      clearGame();
    }, 1400);
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
    const wordY = found.y;
    const wordStartX = found.x;
    const wordEndX = found.x + rule.word.length - 1;

    // まず「読 売 新 聞」を消す
    for (let i = 0; i < rule.word.length; i++) {
      map[wordY][wordStartX + i] = EMPTY;
    }

    // 右端、「聞」があった位置に鍵を出す
    map[wordY][wordEndX] = rule.result;

    draw();
  });
}

function checkSplitRule() {
  const stage = stages[currentStageIndex];

  if (!stage.splitRule) return;

  const rule = stage.splitRule;

  if (rule.done) return;

  const top = rule.topSlot;
  const connector = rule.connector;

  const playerIsOnTopSlot =
    playerPos.x === top.x &&
    playerPos.y === top.y &&
    currentPlayerChar === rule.source;

  if (!playerIsOnTopSlot) return;

  if (map[connector.y][connector.x] !== DIVIDE) return;

  rule.done = true;

  isAnimating = true;

  combineEffectCells = [
    { x: top.x, y: top.y },
    { x: connector.x, y: connector.y }
  ];

  draw();

  setTimeout(() => {
    // 上スロットの吾 → 五
    map[top.y][top.x] = rule.resultTop || FIVE;

    // ÷ → 十
    map[connector.y][connector.x] = rule.resultConnector || TEN;

    // 操作キャラを口に変更
    currentPlayerChar = rule.resultPlayer || MOUTH;

    const spawn = rule.playerSpawn || { x: top.x, y: top.y + 2 };
    map[spawn.y][spawn.x] = currentPlayerChar;

    playerPos = { x: spawn.x, y: spawn.y };

    combineEffectCells = [];
    isAnimating = false;

    setMessage(rule.message || "吾は、五と口に分かれた。");
    playSound("correct");

    draw();
  }, 500);
}

function checkLastStageSplitRule() {
  const stage = stages[currentStageIndex];

  if (!stage.lastStageRule) return;
  if (lastStageMode !== "none") return;
  if (currentPlayerChar !== PLAYER) return;

  const rule = stage.lastStageRule;
  const slot = rule.slot;
  const divide = rule.divide;
  const mouthSpawn = rule.mouthSpawn;

  const playerIsOnSlot =
    playerPos.x === slot.x &&
    playerPos.y === slot.y;

  if (!playerIsOnSlot) return;

  if (map[divide.y][divide.x] !== DIVIDE) return;

  isAnimating = true;

  combineEffectCells = [
    { x: slot.x, y: slot.y },
    { x: divide.x, y: divide.y },
    { x: mouthSpawn.x, y: mouthSpawn.y }
  ];

  draw();

  setTimeout(() => {
    // 吾 → 五
    map[slot.y][slot.x] = FIVE;

    // ÷ → 十
    map[divide.y][divide.x] = TEN;

    // 下に口を出す
    map[mouthSpawn.y][mouthSpawn.x] = MOUTH;

    // まずは五を操作対象にする
    currentPlayerChar = FIVE;
    playerPos = { x: slot.x, y: slot.y };

    lastStageMode = "split";

    combineEffectCells = [];
    isAnimating = false;

    setMessage("吾は、五と口に分かれた。");
    playSound("correct");

    playerStartHintActive = true;
    setTimeout(() => {
      playerStartHintActive = false;
      draw();
    }, 1200);

    draw();
  }, 600);
}

function checkFinalKeywordRule() {
  const stage = stages[currentStageIndex];

  if (!stage.normalEndingRule) return;

  const rule = stage.normalEndingRule;

  if (rule.done) return;

  // トゥルー分岐に入って口を操作している場合は、通常エンドを発動しない
  if (currentPlayerChar === MOUTH) return;

  const sixPos = findCell(rule.left);
  if (!sixPos) return;

  const rightX = sixPos.x + 1;
  const rightY = sixPos.y;

  if (!isInsideMap(rightX, rightY)) return;

  if (map[rightY][rightX] !== rule.right) return;

  rule.done = true;

  setMessage(rule.message || "六五");
  playSound("correct");

  setTimeout(() => {
    show65EndingEffect();
  }, 800);
}

function checkLastStageNormalEnding() {
  const stage = stages[currentStageIndex];

  if (!stage.lastStageRule) return;
  if (lastStageMode !== "split") return;
  if (currentPlayerChar !== FIVE) return;

  const sixPos = findCell(SIX);
  if (!sixPos) return;

  const rightX = sixPos.x + 1;
  const rightY = sixPos.y;

  if (!isInsideMap(rightX, rightY)) return;

  if (map[rightY][rightX] !== FIVE) return;

  lastStageMode = "ended";

  setMessage("六五");
  playSound("correct");

  setTimeout(() => {
    show65EndingEffect();
  }, 800);
}

function checkLastStageTrueKeyword() {
  const stage = stages[currentStageIndex];

  if (!stage.lastStageRule) return;
  if (lastStageMode !== "split") return;
  if (currentPlayerChar !== FIVE) return;

  const found = findWordVertical([SIX, TEN, FIVE]);
  if (!found) return;

  isAnimating = true;

  const cells = [
    { x: found.x, y: found.y },
    { x: found.x, y: found.y + 1 },
    { x: found.x, y: found.y + 2 }
  ];

  combineEffectCells = cells;
  setMessage("六十五。鍵が見つかった。");
  playSound("correct");
  draw();

  setTimeout(() => {
    // 六十五を消す
    map[found.y][found.x] = EMPTY;
    map[found.y + 1][found.x] = KEY;
    map[found.y + 2][found.x] = EMPTY;

    // 操作対象を口に変更
    currentPlayerChar = MOUTH;

    const mouthPos = findCell(MOUTH);
    if (mouthPos) {
      playerPos = mouthPos;
    }

    lastStageMode = "trueReady";

    combineEffectCells = [];
    isAnimating = false;

    playerStartHintActive = true;
    setTimeout(() => {
      playerStartHintActive = false;
      draw();
    }, 1200);

    draw();
  }, 650);
}

function findWordVertical(word) {
  for (let y = 0; y <= map.length - word.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      let matched = true;

      for (let i = 0; i < word.length; i++) {
        if (map[y + i][x] !== word[i]) {
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

function setupSoundPopup() {
  const soundButton = document.getElementById("sound-button");
  const soundPopup = document.getElementById("sound-popup");
  const soundBackdrop = document.getElementById("sound-backdrop");

  if (!soundButton || !soundPopup) return;

  function openSoundPopup() {
    soundPopup.classList.remove("hidden");

    if (soundBackdrop) {
      soundBackdrop.classList.remove("hidden");
    }
  }

  function closeSoundPopup() {
    soundPopup.classList.add("hidden");

    if (soundBackdrop) {
      soundBackdrop.classList.add("hidden");
    }
  }

  soundButton.addEventListener("pointerdown", event => {
    event.preventDefault();
    event.stopPropagation();

    if (soundPopup.classList.contains("hidden")) {
      openSoundPopup();
    } else {
      closeSoundPopup();
    }
  });

  if (soundBackdrop) {
    soundBackdrop.addEventListener("pointerdown", event => {
      event.preventDefault();
      closeSoundPopup();
    });
  }
}

function restartBgmFromBeginning() {
  if (!bgmStarted) return;

  sounds.bgm.pause();
  sounds.bgm.currentTime = 0;

  if (soundSettings.bgmEnabled) {
    sounds.bgm.play().catch(() => {});
  }
}

function show65EndingEffect() {
  playSound("correct");

  const effect = document.getElementById("ending65-effect");

  if (!effect) {
    showFinalClearText();
    return;
  }

  effect.classList.remove("active");
  effect.style.display = "flex";

  void effect.offsetWidth;

  effect.classList.add("active");

  setTimeout(() => {
    effect.classList.remove("active");
    effect.style.display = "none";

    showFinalClearText();
  }, 2200);
}

function checkTrueKeywordRule() {
  const stage = stages[currentStageIndex];

  if (!stage.trueKeywordRule) return;

  const rule = stage.trueKeywordRule;

  if (rule.done) return;

  const found = findWordVertical(rule.word);

  if (!found) return;

  rule.done = true;

  isAnimating = true;

  const cells = rule.word.map((_, i) => {
    return { x: found.x, y: found.y + i };
  });

  combineEffectCells = cells;
  setMessage(rule.message || "六十五。鍵が見つかった。");
  playSound("correct");
  draw();

  setTimeout(() => {
    for (let i = 0; i < rule.word.length; i++) {
      map[found.y + i][found.x] = EMPTY;
    }

    // 中央、「十」があった位置に鍵を出す
    map[found.y + 1][found.x] = rule.result;

    combineEffectCells = [];
    isAnimating = false;

    draw();
  }, 650);
}

function findWordVertical(word) {
  for (let y = 0; y <= map.length - word.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      let matched = true;

      for (let i = 0; i < word.length; i++) {
        if (map[y + i][x] !== word[i]) {
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

function showTrueEnding() {
  lastStageMode = "ended";

  const clearText = document.getElementById("clear-text");

  if (clearText) {
    clearText.innerHTML =
      "六十五周年、そしてその先へ。<br><br>" +
      "これからも、地域とともに。<br><br>" +
      "皆様に心から感謝申し上げます。";
  }

  const overlay = document.getElementById("overlay");
  if (overlay) {
    overlay.style.display = "flex";
  }

  sounds.bgm.pause();
  playSound("clear");
}

window.addEventListener("load", () => {
  loadSoundSettings();
  applySoundSettings();
  setupSoundSettingsUI();
  setupSoundPopup();

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

document.querySelectorAll(".move").forEach(button => {
  button.addEventListener("pointerdown", event => {
    event.preventDefault();

    const dx = Number(button.dataset.dx);
    const dy = Number(button.dataset.dy);

    move(dx, dy);
  });
});

const restartButton = document.getElementById("restart");

if (restartButton) {
  restartButton.addEventListener("pointerdown", event => {
    event.preventDefault();
    restartStage();
  });
}
