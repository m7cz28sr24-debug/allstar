const players = [
  {
    league: "セ",
    team: "東京ヤクルトスワローズ",
    logo: "logos/swallows.png",
    number: "57",
    name: "古賀優大",
    furigana: "こがゆうだい",
    song:
`溢れる情熱 心奮わす
ホームを守る 最後の砦となれ`,
    songFurigana:
`あふれるじょうねつ こころふるわす
ほーむをまもる さいごのとりでとなれ`
  },
  {
    league: "セ",
    team: "阪神タイガース",
    logo: "logos/tigers.png",
    number: "12",
    name: "坂本誠志郎",
    furigana: "さかもとせいしろう",
    song:
`狙いを定め 強気で攻めろ
お前の時代を築け さぁぶちかませ

かっとばせー
さーかーもとー`,
    songFurigana:
`ねらいをさだめ つよきでせめろ
おまえのじだいをきずけ さぁぶちかませ

かっとばせー
さーかーもとー`
  },
  {
    league: "セ",
    team: "読売ジャイアンツ",
    logo: "logos/giants.png",
    number: "24",
    name: "大城卓三",
    furigana: "おおしろたくみ",
    song:
`鋭いまなざし
満ちあふれる男気
魅せろパワー
フルスイング
ぶち込め大城`,
    songFurigana:
`するどいまなざし
みちあふれるおとこぎ
みせろぱわー
ふるすいんぐ
ぶちこめおおしろ`
  }

  /*
  追加例

  ,{
    league: "パ",
    team: "福岡ソフトバンクホークス",
    logo: "logos/hawks.png",
    number: "3",
    name: "選手名",
    furigana: "せんしゅめい",
    song: `応援歌`,
    songFurigana: `おうえんか`
  }
  */
];

players.sort((a, b) =>
  a.furigana.localeCompare(b.furigana, "ja")
);
