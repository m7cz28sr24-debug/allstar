const playerList = document.getElementById("playerList");
const template = document.getElementById("playerCardTemplate");
const searchInput = document.getElementById("searchInput");
const clearSearchButton = document.getElementById("clearSearchButton");
const positionFilter = document.getElementById("positionFilter");
const leagueTabs = document.querySelectorAll(".leagueTab");
const resultCount = document.getElementById("resultCount");
const installButton = document.getElementById("installButton");

const overlay = document.getElementById("overlay");
const bottomSheet = document.getElementById("bottomSheet");
const sheetHandle = document.getElementById("sheetHandle");
const closeButton = document.getElementById("closeButton");
const sheetNumber = document.getElementById("sheetNumber");
const sheetName = document.getElementById("sheetName");
const sheetTeam = document.getElementById("sheetTeam");
const lyrics = document.getElementById("lyrics");
const furigana = document.getElementById("furigana");
const noLyricsMessage = document.getElementById("noLyricsMessage");
const sheetFavoriteButton = document.getElementById("sheetFavoriteButton");
const copyButton = document.getElementById("copyButton");
const fontSizeSlider = document.getElementById("fontSizeSlider");
const fontSizeValue = document.getElementById("fontSizeValue");
const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");
const toast = document.getElementById("toast");

let currentMode = "セ";
let currentPlayer = null;
let currentVisiblePlayers = [];
let currentPlayerIndex = -1;
let favorites = new Set(JSON.parse(localStorage.getItem("allstarFavorites") || "[]"));
let deferredInstallPrompt = null;
let toastTimer = null;

const savedFontSize = Number(localStorage.getItem("allstarLyricsSize")) || 24;
fontSizeSlider.value = String(savedFontSize);
applyFontSize(savedFontSize);

function normalizeText(value = "") {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[ぁ-ゖ]/g, character =>
      String.fromCharCode(character.charCodeAt(0) + 0x60)
    )
    .replace(/\s+/g, "");
}

function playerKey(player) {
  return `${player.team}:${player.number}:${player.name}`;
}

function isFavorite(player) {
  return favorites.has(playerKey(player));
}

function saveFavorites() {
  localStorage.setItem("allstarFavorites", JSON.stringify([...favorites]));
}

function teamColor(player) {
  return teams[player.team]?.color || "#d4af37";
}

function teamLogo(player) {
  return teams[player.team]?.logo || "";
}

function songData(player) {
  return songs[player.name] || { song: "", songFurigana: "" };
}

function triggerHaptic() {
  if ("vibrate" in navigator) {
    navigator.vibrate(10);
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

function setMode(mode) {
  currentMode = mode;

  leagueTabs.forEach(tab => {
    const selected = tab.dataset.mode === mode;
    tab.classList.toggle("active", selected);
    tab.setAttribute("aria-selected", String(selected));
  });

  renderPlayers();
}

leagueTabs.forEach(tab => {
  tab.addEventListener("click", () => setMode(tab.dataset.mode));
});

searchInput.addEventListener("input", () => {
  clearSearchButton.hidden = searchInput.value.length === 0;
  renderPlayers();
});

clearSearchButton.addEventListener("click", () => {
  searchInput.value = "";
  clearSearchButton.hidden = true;
  searchInput.focus();
  renderPlayers();
});

positionFilter.addEventListener("change", renderPlayers);

function getFilteredPlayers() {
  const keyword = normalizeText(searchInput.value);
  const selectedPosition = positionFilter.value;

  return players.filter(player => {
    if (currentMode === "お気に入り") {
      if (!isFavorite(player)) return false;
    } else if (player.league !== currentMode) {
      return false;
    }

    if (selectedPosition && player.position !== selectedPosition) {
      return false;
    }

    if (!keyword) return true;

    const searchableValues = [
      player.name,
      player.furigana,
      player.team,
      player.number,
      player.position
    ].map(normalizeText);

    return searchableValues.some(value => value.includes(keyword));
  });
}

function renderPlayers() {
  currentVisiblePlayers = getFilteredPlayers();
  playerList.innerHTML = "";
  resultCount.textContent = `${currentVisiblePlayers.length}人`;

  if (currentVisiblePlayers.length === 0) {
    const message =
      currentMode === "お気に入り"
        ? "お気に入りの選手がいません。"
        : "該当する選手がありません。";

    playerList.innerHTML = `<div class="emptyState">${message}</div>`;
    return;
  }

  const fragment = document.createDocumentFragment();

  currentVisiblePlayers.forEach(player => {
    const cardFragment = template.content.cloneNode(true);
    const card = cardFragment.querySelector(".playerCard");
    const accent = cardFragment.querySelector(".teamAccent");
    const logoArea = cardFragment.querySelector(".logoArea");
    const logo = cardFragment.querySelector(".teamLogo");
    const numberBadge = cardFragment.querySelector(".numberBadge");
    const playerName = cardFragment.querySelector(".playerName");
    const playerMeta = cardFragment.querySelector(".playerMeta");
    const favoriteButton = cardFragment.querySelector(".cardFavorite");

    const color = teamColor(player);
    card.style.setProperty("--team-color", color);
    accent.style.background = color;

    const logoPath = teamLogo(player);

    if (logoPath) {
      logo.src = logoPath;
      logo.alt = `${player.team}のロゴ`;
      logo.addEventListener(
        "error",
        () => {
          logoArea.remove();
        },
        { once: true }
      );
    } else {
      logoArea.remove();
    }

    numberBadge.textContent = `#${player.number}`;
    playerName.textContent = player.name;
    playerMeta.textContent = `${player.team}・${player.position}`;

    updateCardFavoriteButton(favoriteButton, player);

    favoriteButton.addEventListener("click", event => {
      event.stopPropagation();
      toggleFavorite(player);
    });

    card.addEventListener("click", () => openSheet(player));

    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openSheet(player);
      }
    });

    fragment.appendChild(cardFragment);
  });

  playerList.appendChild(fragment);
}

function updateCardFavoriteButton(button, player) {
  const favorite = isFavorite(player);
  button.textContent = favorite ? "★" : "☆";
  button.classList.toggle("isFavorite", favorite);
  button.setAttribute(
    "aria-label",
    favorite ? "お気に入りから削除" : "お気に入りに追加"
  );
}

function toggleFavorite(player) {
  const key = playerKey(player);

  if (favorites.has(key)) {
    favorites.delete(key);
    showToast("お気に入りから削除しました");
  } else {
    favorites.add(key);
    showToast("お気に入りに追加しました");
  }

  saveFavorites();
  triggerHaptic();
  renderPlayers();

  if (currentPlayer && playerKey(currentPlayer) === key) {
    updateSheetFavoriteButton();
  }
}

function updateSheetFavoriteButton() {
  if (!currentPlayer) return;

  const favorite = isFavorite(currentPlayer);
  sheetFavoriteButton.textContent = favorite
    ? "★ お気に入り済み"
    : "☆ お気に入り";
  sheetFavoriteButton.classList.toggle("isFavorite", favorite);
}

function renderLyrics(songText) {
  lyrics.innerHTML = "";

  if (!songText) {
    noLyricsMessage.hidden = false;
    return;
  }

  noLyricsMessage.hidden = true;

  const lines = songText.split("\n");

  lines.forEach((line, index) => {
    const lineElement = document.createElement("span");
    const isCallLine =
      /かっとばせ|ぶちかませ|オイ|おい|ゴー|GO|それ|そーれ|レッツゴー|Let's go/i.test(line);

    if (isCallLine) {
      lineElement.className = "callLine";
    }

    lineElement.textContent = line;
    lyrics.appendChild(lineElement);

    if (index < lines.length - 1) {
      lyrics.appendChild(document.createElement("br"));
    }
  });
}

function openSheet(player) {
  currentPlayer = player;
  currentPlayerIndex = currentVisiblePlayers.findIndex(
    item => playerKey(item) === playerKey(player)
  );

  const color = teamColor(player);
  bottomSheet.style.setProperty("--team-color", color);

  sheetNumber.textContent = `#${player.number}`;
  sheetName.textContent = player.name;
  sheetTeam.textContent = `${player.team}・${player.position}`;

  const playerSong = songData(player);
  renderLyrics(playerSong.song);
  furigana.textContent = playerSong.songFurigana;

  updateSheetFavoriteButton();
  updateNavigationButtons();

  overlay.hidden = false;
  bottomSheet.hidden = false;

  requestAnimationFrame(() => {
    overlay.classList.add("show");
    bottomSheet.classList.add("show");
  });

  document.body.style.overflow = "hidden";
  closeButton.focus();
  triggerHaptic();
}

function closeSheet() {
  overlay.classList.remove("show");
  bottomSheet.classList.remove("show");
  document.body.style.overflow = "";

  window.setTimeout(() => {
    overlay.hidden = true;
    bottomSheet.hidden = true;
    bottomSheet.style.transform = "";
    currentPlayer = null;
    currentPlayerIndex = -1;
  }, 280);
}

function updateNavigationButtons() {
  previousButton.disabled = currentPlayerIndex <= 0;
  nextButton.disabled =
    currentPlayerIndex < 0 ||
    currentPlayerIndex >= currentVisiblePlayers.length - 1;
}

function showAdjacentPlayer(offset) {
  const nextIndex = currentPlayerIndex + offset;

  if (nextIndex < 0 || nextIndex >= currentVisiblePlayers.length) {
    return;
  }

  openSheet(currentVisiblePlayers[nextIndex]);
}

closeButton.addEventListener("click", closeSheet);
overlay.addEventListener("click", closeSheet);
previousButton.addEventListener("click", () => showAdjacentPlayer(-1));
nextButton.addEventListener("click", () => showAdjacentPlayer(1));

sheetFavoriteButton.addEventListener("click", () => {
  if (currentPlayer) toggleFavorite(currentPlayer);
});

copyButton.addEventListener("click", async () => {
  if (!currentPlayer) return;

  const playerSong = songData(currentPlayer);

  if (!playerSong.song) {
    showToast("コピーできる歌詞がありません");
    return;
  }

  const copyText = `${currentPlayer.name}（${currentPlayer.team}）\n\n${playerSong.song}`;

  try {
    await navigator.clipboard.writeText(copyText);
    showToast("歌詞をコピーしました");
  } catch {
    const textArea = document.createElement("textarea");
    textArea.value = copyText;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
    showToast("歌詞をコピーしました");
  }
});

function applyFontSize(size) {
  const safeSize = Math.min(36, Math.max(18, Number(size)));
  document.documentElement.style.setProperty("--lyrics-size", `${safeSize}px`);
  fontSizeValue.value = `${safeSize}px`;
  localStorage.setItem("allstarLyricsSize", String(safeSize));
}

fontSizeSlider.addEventListener("input", () => {
  applyFontSize(fontSizeSlider.value);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !bottomSheet.hidden) {
    closeSheet();
  }

  if (!bottomSheet.hidden && event.key === "ArrowLeft") {
    showAdjacentPlayer(-1);
  }

  if (!bottomSheet.hidden && event.key === "ArrowRight") {
    showAdjacentPlayer(1);
  }
});

let dragStartY = 0;
let dragCurrentY = 0;
let dragging = false;

sheetHandle.addEventListener(
  "touchstart",
  event => {
    dragStartY = event.touches[0].clientY;
    dragCurrentY = dragStartY;
    dragging = true;
    bottomSheet.style.transition = "none";
  },
  { passive: true }
);

sheetHandle.addEventListener(
  "touchmove",
  event => {
    if (!dragging) return;

    dragCurrentY = event.touches[0].clientY;
    const distance = Math.max(0, dragCurrentY - dragStartY);
    bottomSheet.style.transform = `translate(-50%, ${distance}px)`;
  },
  { passive: true }
);

sheetHandle.addEventListener("touchend", () => {
  if (!dragging) return;

  const distance = dragCurrentY - dragStartY;
  dragging = false;
  bottomSheet.style.transition = "";

  if (distance > 90) {
    closeSheet();
  } else {
    bottomSheet.style.transform = "";
  }
});

window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault();
  deferredInstallPrompt = event;
  installButton.hidden = false;
});

installButton.addEventListener("click", async () => {
  if (!deferredInstallPrompt) return;

  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  installButton.hidden = true;
});

window.addEventListener("appinstalled", () => {
  installButton.hidden = true;
  showToast("ホーム画面に追加されました");
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(error => {
      console.error("Service Worker registration failed:", error);
    });
  });
}

renderPlayers();
