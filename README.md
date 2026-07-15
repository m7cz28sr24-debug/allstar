# マイナビオールスター2026 応援歌アプリ 完成版

## GitHub Pagesへの配置

ZIPを解凍し、以下をGitHubリポジトリの直下へアップロードしてください。

- index.html
- style.css
- script.js
- data.js
- manifest.json
- service-worker.js
- icons フォルダ
- logos フォルダ

既存の同名ファイルは、この完成版で置き換えてください。

## 球団ロゴ

公式ロゴ画像は同梱していません。
logosフォルダへ、次のファイル名で配置してください。

- swallows.png
- giants.png
- tigers.png
- baystars.png
- dragons.png
- carp.png
- fighters.png
- marines.png
- buffaloes.png
- hawks.png
- eagles.png
- lions.png

ロゴが存在しない場合、アイコンや空白枠は表示されず、選手情報だけが表示されます。

## 実装機能

- セ・リーグ、パ・リーグ切替
- お気に入り登録・保存
- 選手名、球団名、背番号、ふりがな検索
- 守備位置フィルター
- 背番号バッジ
- 球団カラー表示
- Bottom Sheet表示
- 下方向スワイプで閉じる
- 前後の選手へ移動
- 歌詞コピー
- 歌詞サイズ変更・保存
- コール部分の強調表示
- ダークモード
- PWA
- オフラインキャッシュ
- iPhoneホーム画面追加対応

## 歌詞データ

著作権のある歌詞を一括転載できないため、この会話で提供された以下3選手分のみ収録しています。

- 古賀優大
- 坂本誠志郎
- 大城卓三

その他の選手はdata.jsのsongとsongFuriganaへ追記してください。


## Ver.1.1：応援歌の入力方法

- data.js：球団情報・選手名簿
- songs.js：応援歌とふりがな
- song-input.html：入力補助画面

応援歌追加時はdata.jsを編集せず、song-input.htmlを開いて入力します。
最後に出力されたsongs.jsをGitHubへアップロードし、既存のsongs.jsを置き換えてください。
