const canvas = document.getElementById("UI");
const ctx = canvas.getContext("2d");

const WIDTH = 800;
const HEIGHT = 800;

canvas.width = WIDTH;
canvas.height = HEIGHT;

const IMG_WIDTH = 150;
const IMG_HEIGHT = 150;

let CONFIG = {};

(async function () {
    const configData = await fetch("static/config.json").then(r => r.json());
    CONFIG = Object.fromEntries(configData.map(function (value) {
        const img = new Image();
        img.src = "static/" + value.img;
        return [value.type, { ...value, img }];
    }));
    startGame();
})();

class BasicWeapons {
    constructor(config,gameManager) {
        this.image = config.img; //img:"image path"//
        this.pos=this.randomPos();
        this.width=config.width;
        this.height=config.height;
        this.rangew=config.range_w;
        this.rangeh=config.range_h;
        this.spritemanager=new SpriteManager(config);
        this.gamemanager=gameManager;
        this.cd=config.actionInterval;
        this.nextAction=Date.now()+this.cd;
        this.flashDuration=config.flashDuration;
        this.visibleUntil=0;
    }

    randomPos(){
        let randomX = Math.floor(Math.random() * (WIDTH - this.rangew));
        let randomY = Math.floor(Math.random() * (HEIGHT - this.rangeh));

        return {
            x: randomX,
            y: randomY,
        }
    }

    action() {
        if(Date.now()<this.nextAction){
            return;
        }
       let total=0;
       this.gameManager.objects.jerrys.forEach((e)=>{
            if(e.pos.x>=this.pos.x&&e.pos.x<=this.pos.x+this.rangew
                &&e.pos.y>=this.pos.y&&e.pos.y<=this.pos.y+this.rangeh
            ){
                total++;
            }
       })

       this.gamemanager.score+=(total*CONFIG["Jerry"].reward);
       this.nextAction=Date.now()+this.cd;

       this.visibleUntil=Date.now()+this.flashDuration;
    }

    Upgrade() {
        // Template: Implete by Specific Class //
    }

    draw() {
        // Template: Implete by Specific Class //
        // Template: Implete by Specific Class //
        if(Date.now()<=this.visibleUntil){
            this.spritemanager.drawSprite(this.pos.x,this.pos.y);
        }
    }
}

class BasicJerrys {
    constructor(config) {
        this.image = config.img; //img:"image path"//
        this.reward = config.reward;
        this.pos = this.randomPos();
        this.width = config.width;
        this.height = config.height;
        this.moveduration=config.moveDuration;
        this.spritemanager = new SpriteManager(config);
        this.nextMove = Date.now() + this.moveduration;
    }

    randomPos() {
        let randomX = Math.floor(Math.random() * (WIDTH - this.width));
        let randomY = Math.floor(Math.random() * (HEIGHT - this.height));

        return {
            x: randomX,
            y: randomY,
        }
    }

    clicked(ClickPos) {
         
        return (ClickPos.x >= this.pos.x && ClickPos.x <= this.width + this.pos.x
            && ClickPos.y >= this.pos.y && ClickPos.y <= this.height + this.pos.y);
    }

    action() {

    }

    draw() {
        if(Date.now()>this.nextMove){
            this.nextMove = Date.now() + this.moveduration;
            this.pos=this.randomPos();
        }
        this.spritemanager.drawSprite(this.pos.x,this.pos.y);
    }
}

class Trap extends BasicJerrys{
    constructor(config) {
        super(config);
    }
}

class SpriteManager {
    constructor(config) {
        this.img = config.img;
        this.sx = config.sx;
        this.sy = config.sy;
        this.width = config.width;
        this.height = config.height;
        this.frameCount = config.frameCount;
        this.frameDuration = config.frameDuration;
        this.frameIndex = 0;
        this.nextframe = Date.now() + this.frameDuration;
        this.cfg=config;
    }

    drawSprite(x, y) {
        if (Date.now > this.nextframe) {
            this.frameIndex = (this.frameIndex + 1) % this.frameCount;
            this.nextframe = Date.now() + this.frameDuration;
        }

        if("range_w" in this.cfg){
            ctx.drawImage(this.img, this.sx * (this.frameIndex + 1), this.sy, this.width, this.height, x, y, this.cfg.range_w, this.cfg.range_h);
        }
        else{   
            ctx.drawImage(this.img, this.sx * (this.frameIndex + 1), this.sy, this.width, this.height, x, y, IMG_WIDTH, IMG_HEIGHT);
        }
    }
}

class GameManager {
    constructor() {
        this.score = 0;
        this.objects = {
            jerrys:[new BasicJerrys(CONFIG["Jerry"])],
            toms:[]
        };

        this.clickArea = {
            x: 0,
            y: 0,
        };

        document.addEventListener("click", (e) => {
            this.clickArea=this.clickCoord(e);
            //++---+++---++---++---+ logic +---++---++---++---++---++---++\\
            this.objects.jerrys.forEach((jerry)=>{
                if(jerry.clicked(this.clickArea)){
                    this.score+=jerry.reward;
                    this.updateBoard();
                }
            })
           
        })

    }

    gameLoop(){
        ctx.clearRect(0,0,WIDTH,HEIGHT);
        console.log(this.objects.jerrys);
        this.objects.jerrys.forEach((e)=>{
            e.draw();
        })
        requestAnimationFrame(this.gameLoop);
    }

    clickCoord(e){
        const cRect=canvas.getBoundingClientRect();
        const clientX=e.clientX;
        const clientY=e.clientY;

        clientX-=cRect.left;
        clientY-=cRect.top;

        const logicX=clientX*canvas.width/cRect.width;
        const logicY=clientY*canvas.height/cRect.height;

        return {
            x:logicX,
            y:logicY
        }

    }

    updateBoard(){
        const scoreboard=document.getElementById("score");
        const clickstate=document.getElementById("clickstate");

        scoreboard.textContent=this.score;
        clickstate.textContent=`You have Clicked A Jerry! Jerry is at: (${this.clickArea.x.toFixed(0)},${this.clickArea.y.toFixed(0)})`;


    }
}

function startGame(){
    const gameManager=new GameManager();
    gameManager.gameLoop();
}

// Upgrade Function : TODO
function upgradeJerrys(gameManager,key){
    const UpgradeTable=document.createElement("div");
    UpgradeTable.id="upgradetable";
    const p=UpgradeTable.createElement("p")
    p.textContent="Upgrade for More Jerrys!";
    const j=UpgradeTable.createElement("btn");
    UpgradeTable.appendChild();
    j.addEventListener("click",()=>{
        const a= new BasicJerrys();
        gameManager.objects.jerrys.push(a);
    })

}