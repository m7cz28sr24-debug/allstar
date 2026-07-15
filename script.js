// =========================
// All Star Song Library
// script.js Ver0.1
// =========================

const playerList = document.getElementById("playerList");
const template = document.getElementById("playerCardTemplate");

const btnCentral = document.getElementById("btnCentral");
const btnPacific = document.getElementById("btnPacific");

const searchInput = document.getElementById("searchInput");

const overlay = document.getElementById("overlay");
const bottomSheet = document.getElementById("bottomSheet");

const sheetName = document.getElementById("sheetName");
const sheetTeam = document.getElementById("sheetTeam");

const lyrics = document.getElementById("lyrics");
const furigana = document.getElementById("furigana");

const closeButton = document.getElementById("closeButton");

const fontButtons = document.querySelectorAll(".fontButton");

let currentLeague = "セ";

let currentFontSize =
    Number(localStorage.getItem("fontSize")) || 24;

document.documentElement.style.setProperty(
    "--fontSize",
    currentFontSize + "px"
);

// =========================
// 初期表示
// =========================

renderPlayers();

// =========================
// リーグ切替
// =========================

btnCentral.addEventListener("click", () => {

    currentLeague = "セ";

    btnCentral.classList.add("active");
    btnPacific.classList.remove("active");

    renderPlayers();

});

btnPacific.addEventListener("click", () => {

    currentLeague = "パ";

    btnPacific.classList.add("active");
    btnCentral.classList.remove("active");

    renderPlayers();

});

// =========================
// 検索
// =========================

searchInput.addEventListener("input", renderPlayers);

// =========================
// 一覧描画
// =========================

function renderPlayers(){

    playerList.innerHTML = "";

    const keyword =
        searchInput.value
            .trim()
            .toLowerCase();

    const result =
        players.filter(player=>{

            if(player.league !== currentLeague){

                return false;

            }

            return (

                player.name
                    .toLowerCase()
                    .includes(keyword)

                ||

                player.team
                    .toLowerCase()
                    .includes(keyword)

                ||

                player.furigana
                    .toLowerCase()
                    .includes(keyword)
                
                ||

                player.number
                    .includes(keyword)

            );

        });

    if(result.length===0){

        playerList.innerHTML=`
            <div style="
                text-align:center;
                color:#888;
                padding:40px;">
                該当する選手がありません。
            </div>
        `;

        return;

    }

    result.forEach(player=>{

        const card =
            template.content
            .cloneNode(true);

        card.querySelector(".teamLogo").src =
            player.logo;

        card.querySelector(".teamLogo").alt =
            player.team;

        card.querySelector(".playerName").textContent =
            `#${player.number}　${player.name}`;

        card.querySelector(".playerTeam").textContent =
            player.team;

        card.querySelector(".playerCard")
            .addEventListener(
                "click",
                ()=>openSheet(player)
            );

        playerList.appendChild(card);

    });

}

// =========================
// Bottom Sheet
// =========================

function openSheet(player){

    sheetName.textContent =
        player.name;

    sheetTeam.textContent =
        player.team;

    lyrics.textContent =
        player.song;

    furigana.textContent =
        player.songFurigana;

    overlay.classList.add("show");

    bottomSheet.classList.add("show");

    document.body.style.overflow="hidden";

}

function closeSheet(){

    overlay.classList.remove("show");

    bottomSheet.classList.remove("show");

    document.body.style.overflow="";

}

closeButton.addEventListener(
    "click",
    closeSheet
);

overlay.addEventListener(
    "click",
    closeSheet
);

// =========================
// ESCキー
// =========================

document.addEventListener(
    "keydown",
    e=>{

        if(e.key==="Escape"){

            closeSheet();

        }

    }
);

// =========================
// 文字サイズ変更
// =========================

fontButtons.forEach(button=>{

    button.addEventListener(
        "click",

        ()=>{

            const type =
                Number(button.dataset.size);

            if(type===-1){

                currentFontSize =
                    Math.max(
                        18,
                        currentFontSize-2
                    );

            }

            if(type===0){

                currentFontSize=24;

            }

            if(type===1){

                currentFontSize=
                    Math.min(
                        36,
                        currentFontSize+2
                    );

            }

            document.documentElement
            .style
            .setProperty(
                "--fontSize",
                currentFontSize+"px"
            );

            localStorage.setItem(
                "fontSize",
                currentFontSize
            );

        }

    );

});

// =========================
// Service Worker
// =========================

if("serviceWorker" in navigator){

    window.addEventListener("load",()=>{

        navigator.serviceWorker
        .register("service-worker.js")
        .catch(()=>{});

    });

}
