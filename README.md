# Click a Jerry
*Slogan : 簡短的介紹你的遊戲*

![遊戲預覽](your_image_path)

## Table of contents
- [Intro](#Intro)
- [Quick Start](#Quick-Start)
- [Controls and UI](#Controls-and-UI)
- [Core Mechnism](#Core-Mechnism)
- [Upgrades System](#Upgrades-System)
- [Characters and Skills Explained](#Characters-and-Skills-Explained)
- [Achievement System](#Achievement-System)
- [Beginner Tutorial Flow](#Beginner-Tutorial-Flow)
- [FAQ](#FAQ)
- [Contribution and Contact](#Contribution-and-Contact)
- [License](#License)
- [Appendix](#Appendix)
- [History](#History)

---

## Intro
Welcome to Click A Jerry, In this game, your main goal is to progress and unlock every upgrade and achievement. 

Target Audience/Players: Users who enjoy short,fun minigames

Game Length: 1-2 hours



---

## Quick Start
Your first step is to open the Game tab, go to your browser (recommend Microsoft Edge) and Enter: "LoreBao.github.io/Click-Project" to Enter the Game

Your Next Step is to Locate a Jerry, upon clicking it activates the game, giving you points on every click of a Jerry

Find Upgrades/Unlock on your right side, this is where you unlock characters and upgrades, You'll need the right amount or above of points to activate certain actions, such as Upgrading a *Grandma* or Unlocking *Godzilla*

You may find the **Achievements** Tab on your left, it is not required but ideal to try to unlock achievements as satisfaction. In your Early Game (15-20mins), the easiest achievement would be *Tom and Jerry*, which is **Addamount a Jerry** and **Unlocking a Tom**




---

## Controls and UI
**Click**
You may use your *Left-Button* on your mouse to execute the *click* action, clicking on a Jerry may give you points based on **Jerry.reward**, which can be increased based on the amount of **Toms**

**Score**
Located on the Left-Top side, this UI displays your total score

**Characters Tab**
Located on the right side, this is where the user manages all the characters, several actions include

    - **Upgrade**: Upgrading The Characters Attributes

    - **Unlock**: Activate The Character for future uses

**Side Screen**
Below the Jerry Screen, This is where **Tom** and **Dog** Display once you unlock them

---

## Core Mechnism
**寫作說明：** 解釋遊戲的基礎規則與數值流程：
- 點擊 Jerry -> 獲得 points（點數計算方式、是否有暴擊或多重 Jerry）。
- Jerry 出現/數量規則（同時上限、刷新頻率）。
- 分數用處（升級、購買角色、解鎖成就）。
- UI 上的即時反饋（文字、動畫、聲音提示）。

可放一個簡單表格示例：`points per click`、`max jerrys on screen`、`spawn interval`（只需示範欄位名稱與建議填入內容的位置）。

**Game Cycle**
Click a Jerry for points, every click of a Jerry would give you points determined by (Jerry.reward), this can only be increased via **Toms**

When adding a Jerry (**AddAmount** Jerry), there is a *25%* chance of summoning a **Trap**, clicking on a trap would result in a decrease of 50% of all your points!

Jerry would respawn/randomized their position every three seconds, there are *No Limits* of how much Jerry could be on your screen, you may increase the amount via **AddAmount** Jerry Upgrade.

Scores can be used for:

    - Upgrade
    - Unlock
    - BuyBones
    - IncreaseRange
    - DecreaseCD
    - Addamount

Audio would play based on actions such as:

    - Clicking a Trap: *scream.mp3*
    - Achieve All Achievements: *mango.mp3*

    

---

## Upgrades System
**寫作說明：** 概述商店系統與升級類型，並示範如何呈現每個商品的欄位：
- 商品名稱
- 類型（Destroyer / Automatic / Dealer / Consumable / One-time）
- 基本效果
- 價格成長公式（例：Price = base * 2^n 或 *1.5）
- 升級效果（每等級額外數值）
- 上限（Max）
- 冷卻或消耗（若有）

在這段插入 `tutorialupgrades.png` 作為右側商店示意圖。建議使用表格來列出 Season 1 的全部可購物品（第一版示例）。



---

## Characters and Skills Explained
**寫作說明：** 逐一列出遊戲內的角色/技能（帶小節），每個角色下提供：功能敘述、具體數值（或示範欄位）、價格曲線、升級效果、特別規則（例：Grandma 最多 1 個，Godzilla 一次用兩次等），以及對新手/進階玩家的策略建議。

### Grandma
- 寫作說明：Action、價格成長、Upgrade 效果（半徑、-CD）、Max（1）、使用時機示例。

### Tom
- 寫作說明：如何提升 click-power、價格成長、是否可疊加（unlimited）、每等級加成範例。

### Spike
- 寫作說明：自動產生點數的機制、需餵食骨頭（consumable）規則、升級帶來的變化（頻率/收益/消耗）。

### Jerry Upgrade
- 寫作說明：增加同時 Jerry 數量與每次點擊點數、風險（25% mouse trap 機率）、價格成長公式、平衡建議。

### Godzilla
- 寫作說明：一次性武器但可用 2 次、清空一列、價格與上限、使用情境建議。

### Bart Simpson
- 寫作說明：一次性武器、清空全場、價格與上限、使用情境（大招類）。

---

## Achievement System
**寫作說明：** 說明成就類別（累積型、挑戰型、隱藏成就），每個成就應包含觸發條件、獎勵（若有）、以及成就顯示位置（指向 `ac.png`）。示範 3~5 個 Season 1 的成就範例欄位。

---

### Early Game: Guide
During the early game phase of the game, one of the best characters you should unlock is **Tom** because of his trait to add your click power. 

In this phase, the easiest achievement for you to unlock would be **Tom and Jerry** which involves the user having both a Jerry (which is unlocked by default) and a Tom. 

After unlocking Tom, it is recommending to progress into unlocking **Dog** due to its overpowered ability to gain points automatically. However, mandatory purchase of bones is required in order to keep **Dog** working (Bones can be purchased via *Buy Bones* Upgrade onec **Dog** is unlocked)

**Notes:** It is not recommended to Unlock **Grandma** this early due to its close-ranged attacks that would be less effective if Jerrys are not enough


### Mid-Game: Guide
After Unlocking **Grandma**, **Tom** and **Dog**, work your way into unlocking one of the two most powerful characters: **Godzilla** and **Bart Simpson**

**Godzilla**: Clear entire row of Jerrys after it's cooldown
**Bart Simpson** Clear every Jerrys after its cooldown

Unlocking these two characters woul dramatically increase your progress speed, allowing you to farm more points 

### End-Game: Guide
After unlocking all the characters, it is ideal to move on into unlocking the *Points Master* achievement set, which includes:

- *Points Master I*: Achieve 1 Million Points
- *Points Master II*: Achieve 10 Million Points
- *Points Champion*: Achieve 1 Billion Points

**Notes:**: Use and upgrade characters strategically, such as upgrading **Grandma** to the maximum to increase Jerry farming to another level

Other Achievements are also ideal to look into, such as:

- *Encylcpedia*: Unlock All Characters
- *Absolute Dedication*: Unlock All Achievements

After finshing these, you would finish the game as quickly and efficently as possible.


---

## FAQ
**寫作說明：** 列出玩家可能問的問題（例如：如何解除 mouse trap、骨頭從哪買、Grandma 為何不出現、價格為何跳很快），並給簡短解答。也可放入 debug tip（例如清除 cookies、如何回報 bug）。

Q: Why doesn't trap show up?
A: Upgrading Jerry would summon a trap, the default would show one Jerry

Q: I bought Bart Simpson, But it didnt show up
A: There is a 25s cooldown

Q: Why is Dog angry?
A: Bones are needed to make dog continue working, buy them via "Buy Bones"

---


## Contribution and Contact

這邊你不用寫

---

## License
MIT License (這邊你不用寫)

---

## Appendix
**寫作說明：** 放上完整的參數表或數值表格（例如：每個角色的 base price、price growth formula、base effect、CD、max），以及放置圖片檔名索引：
- `jt.png` — Jerry 範例圖
- `tutorialupgrades.png` — 右側商店範例
- `ac.png` — 成就視覺
- `tomt.png` — Tom 範例圖

---

## History
### Version 1.0
**寫作說明：** 該版本時間，還有版本內容，以條列式呈現。或是以後有版本更新也要註記在這裡

    