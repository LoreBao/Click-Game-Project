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

#### Consumables
*Bones* are the **Only** consumable added in Season 1, a consumable would act as a fuel for certain characters, such as **Dog**

#### Automatic
Automatic Characters/Upgrades would result it the user automatically getting points based on the set time period or set points per certain time period. 

**Examples**

- **Dog**
- **Grandma**

#### Destroyer
Destroyer could clear Jerrys either fast and single or slow and big range.

**Fast, Single**
The Character **Grandma** Clears Jerry by randomizing it's position quickly to try to capture a Jerry

**Slow, AOE**
The Characters **Godzilla** and **Bart Simpson** Clears Jerry by having a slower cooldown, but could clear entire rows and even the whole map, making them expensive upgrade/characters but deadly.


### Dealer
a *Dealer* upgrade/characters boosts your ability to gain more points in different ways. The only *Dealer* character in Season 1 would be **Tom**. **Tom** would increase your points/click based on the amount of **Tom**s you own


---

## Characters and Skills Explained

### Grandma
Grandma would automatically get points for you when having contact with a Jerry while jumping on the map. This upgrade is not recommended in early game phase since it requires percision

Recommend Use: Late-End Game where Jerrys are a lot


### Tom
Tom would increase your points per click depending on how much Toms you own.

Recommend Use: Early-Mid Game, when upgrades are too expensive and relies on manual clicking as primary point source

### Spike
Dog would automatically get points for you and the amount of points recieved automatically would be upgradable. However, bones are needed to make Dog work consistently. You can buy bones via "Buy Bones"

Recommend Use: Early-Mid Game, when a consistent point rate is needed

### Jerry Upgrade
Jerry Upgrade adds the amount of Jerrys on the map, making it easy to get points via clicking or characters. However, it would have 25% of summoning a trap.

Recommend use: Always, As soon as possible

### Godzilla
Godzilla could be purchased for 700 points and unlocked for 3500. Purchasing a Godzilla would clear out a entire row of Jerrys after it's cooldown (25s)

Recommend Use: Late-End Game where Jerrys are a lot


### Bart Simpson
Bart Simpson coul be purchased for 3000 points and unlocked for 5000. Purchasing a Bart Simpson would clear out your entire map of Jerrys after it's cooldown (25s)

Recommend Use: Late-End Game where Jerrys are a lot

---

## Achievement System
**寫作說明：** 說明成就類別（累積型、挑戰型、隱藏成就），每個成就應包含觸發條件、獎勵（若有）、以及成就顯示位置（指向 `ac.png`）。示範 3~5 個 Season 1 的成就範例欄位。

In the Game, there are many achievements waiting for you to unlock. Your goal is to collect all of them, each requiring a different level of dedication.

**Challenging**: Points Series (1,2,Champion): Requires dedication and progressing through early-mid game is required

**Beginner**: Tom and Jerry: Only need to Unlock Tom

**Medium**: Encycopedia: Not as Hard as the **Points Series**, but require a certain level of time to unlock all the characetrs

**Hardest**: Absolute Dedication: Need to unlock all achievements



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

Unlocking these two characters would dramatically increase your progress speed, allowing you to farm more points 

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



---

## License


---

## History
### Version 1.0


    