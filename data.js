// 球団情報（ロゴと色）はここだけで管理します。
const teams = {
  "東京ヤクルトスワローズ": { logo: "logos/swallows.png", color: "#0f8a5f" },
  "読売ジャイアンツ": { logo: "logos/giants.png", color: "#f26a21" },
  "阪神タイガース": { logo: "logos/tigers.png", color: "#f4c300" },
  "横浜DeNAベイスターズ": { logo: "logos/baystars.png", color: "#0067b1" },
  "中日ドラゴンズ": { logo: "logos/dragons.png", color: "#164194" },
  "広島東洋カープ": { logo: "logos/carp.png", color: "#d71920" },
  "北海道日本ハムファイターズ": { logo: "logos/fighters.png", color: "#1770b8" },
  "千葉ロッテマリーンズ": { logo: "logos/marines.png", color: "#111111" },
  "オリックス・バファローズ": { logo: "logos/buffaloes.png", color: "#b58a31" },
  "福岡ソフトバンクホークス": { logo: "logos/hawks.png", color: "#f6c900" },
  "東北楽天ゴールデンイーグルス": { logo: "logos/eagles.png", color: "#8b1538" },
  "埼玉西武ライオンズ": { logo: "logos/lions.png", color: "#123e7c" },
};

// 選手情報。logo・song・songFuriganaは持たせません。
const players = [
  {
    league: "セ",
    position: "投手",
    team: "東京ヤクルトスワローズ",
    number: "26",
    name: "山野太一",
    furigana: "やまのたいち"
  },
  {
    league: "セ",
    position: "投手",
    team: "読売ジャイアンツ",
    number: "15",
    name: "大勢",
    furigana: "たいせい"
  },
  {
    league: "セ",
    position: "投手",
    team: "東京ヤクルトスワローズ",
    number: "11",
    name: "Ｊ．キハダ",
    furigana: "じぇーきはだ"
  },
  {
    league: "セ",
    position: "投手",
    team: "阪神タイガース",
    number: "29",
    name: "髙橋遥人",
    furigana: "たかはしはると"
  },
  {
    league: "セ",
    position: "投手",
    team: "阪神タイガース",
    number: "98",
    name: "Ｒ．ドリス",
    furigana: "あーるどりす"
  },
  {
    league: "セ",
    position: "投手",
    team: "横浜DeNAベイスターズ",
    number: "11",
    name: "東克樹",
    furigana: "あずまかつき"
  },
  {
    league: "セ",
    position: "投手",
    team: "横浜DeNAベイスターズ",
    number: "62",
    name: "Ｓ．レイノルズ",
    furigana: "えすれいのるず"
  },
  {
    league: "セ",
    position: "投手",
    team: "読売ジャイアンツ",
    number: "45",
    name: "田中瑛斗",
    furigana: "たなかえいと"
  },
  {
    league: "セ",
    position: "投手",
    team: "読売ジャイアンツ",
    number: "97",
    name: "井上温大",
    furigana: "いのうえはると"
  },
  {
    league: "セ",
    position: "投手",
    team: "中日ドラゴンズ",
    number: "22",
    name: "大野雄大",
    furigana: "おおのゆうだい"
  },
  {
    league: "セ",
    position: "投手",
    team: "中日ドラゴンズ",
    number: "90",
    name: "松山晋也",
    furigana: "まつやましんや"
  },
  {
    league: "セ",
    position: "投手",
    team: "広島東洋カープ",
    number: "53",
    name: "岡本駿",
    furigana: "おかもとしゅん"
  },
  {
    league: "セ",
    position: "投手",
    team: "広島東洋カープ",
    number: "68",
    name: "Ｔ．ハーン",
    furigana: "てぃーはーん"
  },
  {
    league: "セ",
    position: "投手",
    team: "東京ヤクルトスワローズ",
    number: "17",
    name: "清水昇",
    furigana: "しみずのぼる"
  },
  {
    league: "セ",
    position: "投手",
    team: "東京ヤクルトスワローズ",
    number: "24",
    name: "星知弥",
    furigana: "ほしともや"
  },
  {
    league: "セ",
    position: "捕手",
    team: "東京ヤクルトスワローズ",
    number: "2",
    name: "古賀優大",
    furigana: "こがゆうだい"
  },
  {
    league: "セ",
    position: "捕手",
    team: "阪神タイガース",
    number: "12",
    name: "坂本誠志郎",
    furigana: "さかもとせいしろう"
  },
  {
    league: "セ",
    position: "捕手",
    team: "読売ジャイアンツ",
    number: "24",
    name: "大城卓三",
    furigana: "おおしろたくみ"
  },
  {
    league: "セ",
    position: "捕手",
    team: "広島東洋カープ",
    number: "31",
    name: "坂倉将吾",
    furigana: "さかくらしょうご"
  },
  {
    league: "セ",
    position: "内野手",
    team: "阪神タイガース",
    number: "3",
    name: "大山悠輔",
    furigana: "おおやまゆうすけ"
  },
  {
    league: "セ",
    position: "内野手",
    team: "阪神タイガース",
    number: "7",
    name: "中野拓夢",
    furigana: "なかのたくむ"
  },
  {
    league: "セ",
    position: "内野手",
    team: "阪神タイガース",
    number: "8",
    name: "佐藤輝明",
    furigana: "さとうてるあき"
  },
  {
    league: "セ",
    position: "内野手",
    team: "中日ドラゴンズ",
    number: "5",
    name: "村松開人",
    furigana: "むらまつかいと"
  },
  {
    league: "セ",
    position: "内野手",
    team: "東京ヤクルトスワローズ",
    number: "7",
    name: "長岡秀樹",
    furigana: "ながおかひでき"
  },
  {
    league: "セ",
    position: "内野手",
    team: "横浜DeNAベイスターズ",
    number: "2",
    name: "牧秀悟",
    furigana: "まきしゅうご"
  },
  {
    league: "セ",
    position: "内野手",
    team: "読売ジャイアンツ",
    number: "32",
    name: "浦田俊輔",
    furigana: "うらたしゅんすけ"
  },
  {
    league: "セ",
    position: "内野手",
    team: "読売ジャイアンツ",
    number: "6",
    name: "坂本勇人",
    furigana: "さかもとはやと"
  },
  {
    league: "セ",
    position: "外野手",
    team: "阪神タイガース",
    number: "1",
    name: "森下翔太",
    furigana: "もりしたしょうた"
  },
  {
    league: "セ",
    position: "外野手",
    team: "中日ドラゴンズ",
    number: "55",
    name: "細川成也",
    furigana: "ほそかわせいや"
  },
  {
    league: "セ",
    position: "外野手",
    team: "東京ヤクルトスワローズ",
    number: "63",
    name: "増田珠",
    furigana: "ますだしゅ"
  },
  {
    league: "セ",
    position: "外野手",
    team: "読売ジャイアンツ",
    number: "13",
    name: "Ｔ．キャベッジ",
    furigana: "てぃーきゃべっじ"
  },
  {
    league: "パ",
    position: "投手",
    team: "北海道日本ハムファイターズ",
    number: "17",
    name: "伊藤大海",
    furigana: "いとうひろみ"
  },
  {
    league: "パ",
    position: "投手",
    team: "千葉ロッテマリーンズ",
    number: "47",
    name: "鈴木昭汰",
    furigana: "すずきしょうた"
  },
  {
    league: "パ",
    position: "投手",
    team: "オリックス・バファローズ",
    number: "42",
    name: "Ａ．マチャド",
    furigana: "えーまちゃど"
  },
  {
    league: "パ",
    position: "投手",
    team: "福岡ソフトバンクホークス",
    number: "19",
    name: "大津亮介",
    furigana: "おおつりょうすけ"
  },
  {
    league: "パ",
    position: "投手",
    team: "福岡ソフトバンクホークス",
    number: "54",
    name: "Ｒ．オスナ",
    furigana: "あーるおすな"
  },
  {
    league: "パ",
    position: "投手",
    team: "北海道日本ハムファイターズ",
    number: "15",
    name: "北山亘基",
    furigana: "きたやまこうき"
  },
  {
    league: "パ",
    position: "投手",
    team: "オリックス・バファローズ",
    number: "00",
    name: "Ａ．エスピノーザ",
    furigana: "えーえすぴのーざ"
  },
  {
    league: "パ",
    position: "投手",
    team: "オリックス・バファローズ",
    number: "15",
    name: "椋木蓮",
    furigana: "むくのきれん"
  },
  {
    league: "パ",
    position: "投手",
    team: "東北楽天ゴールデンイーグルス",
    number: "46",
    name: "藤平尚真",
    furigana: "ふじひらしょうま"
  },
  {
    league: "パ",
    position: "投手",
    team: "埼玉西武ライオンズ",
    number: "13",
    name: "髙橋光成",
    furigana: "たかはしこうな"
  },
  {
    league: "パ",
    position: "投手",
    team: "埼玉西武ライオンズ",
    number: "20",
    name: "岩城颯空",
    furigana: "いわきそら"
  },
  {
    league: "パ",
    position: "投手",
    team: "埼玉西武ライオンズ",
    number: "61",
    name: "平良海馬",
    furigana: "たいらかいま"
  },
  {
    league: "パ",
    position: "投手",
    team: "千葉ロッテマリーンズ",
    number: "15",
    name: "横山陸人",
    furigana: "よこやまりくと"
  },
  {
    league: "パ",
    position: "捕手",
    team: "北海道日本ハムファイターズ",
    number: "64",
    name: "田宮裕涼",
    furigana: "たみやゆあ"
  },
  {
    league: "パ",
    position: "捕手",
    team: "オリックス・バファローズ",
    number: "2",
    name: "若月健矢",
    furigana: "わかつきけんや"
  },
  {
    league: "パ",
    position: "内野手",
    team: "北海道日本ハムファイターズ",
    number: "21",
    name: "清宮幸太郎",
    furigana: "きよみやこうたろう"
  },
  {
    league: "パ",
    position: "内野手",
    team: "埼玉西武ライオンズ",
    number: "26",
    name: "Ｔ．ネビン",
    furigana: "てぃーねびん"
  },
  {
    league: "パ",
    position: "内野手",
    team: "千葉ロッテマリーンズ",
    number: "57",
    name: "小川龍成",
    furigana: "おがわりゅうせい"
  },
  {
    league: "パ",
    position: "内野手",
    team: "埼玉西武ライオンズ",
    number: "62",
    name: "滝澤夏央",
    furigana: "たきざわなつお"
  },
  {
    league: "パ",
    position: "内野手",
    team: "福岡ソフトバンクホークス",
    number: "24",
    name: "栗原陵矢",
    furigana: "くりはらりょうや"
  },
  {
    league: "パ",
    position: "内野手",
    team: "北海道日本ハムファイターズ",
    number: "43",
    name: "水野達稀",
    furigana: "みずのたつき"
  },
  {
    league: "パ",
    position: "内野手",
    team: "東北楽天ゴールデンイーグルス",
    number: "6",
    name: "村林一輝",
    furigana: "むらばやしいつき"
  },
  {
    league: "パ",
    position: "内野手",
    team: "オリックス・バファローズ",
    number: "1",
    name: "太田椋",
    furigana: "おおたりょう"
  },
  {
    league: "パ",
    position: "外野手",
    team: "北海道日本ハムファイターズ",
    number: "66",
    name: "万波中正",
    furigana: "まんなみちゅうせい"
  },
  {
    league: "パ",
    position: "外野手",
    team: "千葉ロッテマリーンズ",
    number: "6",
    name: "西川史礁",
    furigana: "にしかわみしょう"
  },
  {
    league: "パ",
    position: "外野手",
    team: "福岡ソフトバンクホークス",
    number: "23",
    name: "周東佑京",
    furigana: "しゅうとううきょう"
  },
  {
    league: "パ",
    position: "外野手",
    team: "福岡ソフトバンクホークス",
    number: "3",
    name: "近藤健介",
    furigana: "こんどうけんすけ"
  },
  {
    league: "パ",
    position: "外野手",
    team: "オリックス・バファローズ",
    number: "7",
    name: "西川龍馬",
    furigana: "にしかわりょうま"
  },
  {
    league: "パ",
    position: "外野手",
    team: "東北楽天ゴールデンイーグルス",
    number: "8",
    name: "辰己涼介",
    furigana: "たつみりょうすけ"
  },
  {
    league: "パ",
    position: "外野手",
    team: "福岡ソフトバンクホークス",
    number: "9",
    name: "柳田悠岐",
    furigana: "やなぎたゆうき"
  },
   {
    league: "パ",
    position: "DH",
    team: "北海道日本ハムファイターズ",
    number: "99",
    name: "Ｆ．レイエス",
    furigana: "えふれいえす"
  },
];
