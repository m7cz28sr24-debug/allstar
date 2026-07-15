const playerList = document.getElementById("playerList");
const template = document.getElementById("playerCardTemplate");
const searchInput = document.getElementById("searchInput");
const leagueButtons = document.querySelectorAll(".leagueButton");

const overlay = document.getElementById("overlay");
const bottomSheet = document.getElementById("bottomSheet");
const sheetHandle = document.getElementById("sheetHandle");
const closeButton = document.getElementById("closeButton");
const sheetNumber = document.getElementById("sheetNumber");
const sheetName = document.getElementById("sheetName");
const sheetTeam = document.getElementById("sheetTeam");
const lyrics = document.getElementById("lyrics");
const furigana = document.getElementById("furigana");
const sheetFavoriteButton = document.getElementById("sheetFavoriteButton");
const fontButtons = document.querySelectorAll(".fontButton");

let currentLeague = "セ";
let currentPlayer = null;
let currentFontSize = Number(localStorage.getItem("allstarFontSize")) || 24;
let favorites = new Set(JSON.parse(localStorage.getItem("allstarFavorites") || "[]"));

document.documentElement.style.setProperty("--fontSize", `${currentFontSize}px`);

function normalizeText(value = "") {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 0x60))
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

function triggerHaptic() {
  if ("vibrate" in navigator) navigator.vibrate(10);
}

function setActiveLeague(league) {
  currentLeague = league;
  leagueButtons.forEach(button => {
    button.classList.toggle("active", button.dataset.league === league);
  });
  renderPlayers();
}

leagueButtons.forEach(button => {
  button.addEventListener("click", () => setActiveLeague(button.dataset.league));
});

searchInput.addEventListener("input", renderPlayers);

function getFilteredPlayers() {
  const keyword = normalizeText(searchInput.value);

  return players.filter(player => {
    if (currentLeague === "お気に入り") {
      if (!isFavorite(player)) return false;
    } else if (player.league !== currentLeague) {
      return false;
    }

    if (!keyword) return true;

    const searchable = [
      player.name,
      player.furigana,
      player.team,
      player.number
    ].map(normalizeText);

    return searchable.some(value => value.includes(keyword));
  });
}

function renderPlayers() {
  playerList.innerHTML = "";
  const result = getFilteredPlayers();

  if (result.length === 0) {
    const message = currentLeague === "お気に入り"
      ? "お気に入りの選手がいません。"
      : "該当する選手がありません。";

    playerList.innerHTML = `<div class="emptyState">${message}</div>`;
    return;
  }

  result.forEach(player => {
    const fragment = template.content.cloneNode(true);
    const card = fragment.querySelector(".playerCard");
    const logoArea = fragment.querySelector(".logoArea");
    const logo = fragment.querySelector(".teamLogo");
    const numberBadge = fragment.querySelector(".numberBadge");
    const playerName = fragment.querySelector(".playerName");
    const playerTeam = fragment.querySelector(".playerTeam");
    const favoriteButton = fragment.querySelector(".cardFavorite");

    logo.src = player.logo;
    logo.alt = `${player.team}のロゴ`;
    logo.addEventListener("error", () => logoArea.classList.add("logoError"), { once: true });

    numberBadge.textContent = `#${player.number}`;
    playerName.textContent = player.name;
    playerTeam.textContent = player.team;

    favoriteButton.textContent = isFavorite(player) ? "★" : "☆";
    favoriteButton.classList.toggle("isFavorite", isFavorite(player));
    favoriteButton.setAttribute(
      "aria-label",
      isFavorite(player) ? "お気に入りから削除" : "お気に入りに追加"
    );

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

    playerList.appendChild(fragment);
  });
}

function toggleFavorite(player) {
  const key = playerKey(player);

  if (favorites.has(key)) {
    favorites.delete(key);
  } else {
    favorites.add(key);
  }

  saveFavorites();
  triggerHaptic();
  renderPlayers();

  if (currentPlayer && playerKey(currentPlayer) === key) {
    updateSheetFavorite();
  }
}

function updateSheetFavorite() {
  if (!currentPlayer) return;

  const favorite = isFavorite(currentPlayer);
  sheetFavoriteButton.textContent = favorite ? "★ お気に入り済み" : "☆ お気に入り";
  sheetFavoriteButton.classList.toggle("isFavorite", favorite);
}

function openSheet(player) {
  currentPlayer = player;

  sheetNumber.textContent = `#${player.number}`;
  sheetName.textContent = player.name;
  sheetTeam.textContent = player.team;
  lyrics.textContent = player.song || "応援歌データは未登録です。";
  furigana.textContent = player.songFurigana || "";
  updateSheetFavorite();

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
  }, 280);
}

closeButton.addEventListener("click", closeSheet);
overlay.addEventListener("click", closeSheet);

sheetFavoriteButton.addEventListener("click", () => {
  if (currentPlayer) toggleFavorite(currentPlayer);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !bottomSheet.hidden) closeSheet();
});

fontButtons.forEach(button => {
  button.addEventListener("click", () => {
    const type = Number(button.dataset.size);

    if (type === -1) currentFontSize = Math.max(18, currentFontSize - 2);
    if (type === 0) currentFontSize = 24;
    if (type === 1) currentFontSize = Math.min(36, currentFontSize + 2);

    document.documentElement.style.setProperty("--fontSize", `${currentFontSize}px`);
    localStorage.setItem("allstarFontSize", currentFontSize);
    triggerHaptic();
  });
});

let dragStartY = 0;
let dragCurrentY = 0;
let dragging = false;

sheetHandle.addEventListener("touchstart", event => {
  dragStartY = event.touches[0].clientY;
  dragCurrentY = dragStartY;
  dragging = true;
  bottomSheet.style.transition = "none";
}, { passive: true });

sheetHandle.addEventListener("touchmove", event => {
  if (!dragging) return;

  dragCurrentY = event.touches[0].clientY;
  const distance = Math.max(0, dragCurrentY - dragStartY);
  bottomSheet.style.transform = `translate(-50%, ${distance}px)`;
}, { passive: true });

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

renderPlayers();
