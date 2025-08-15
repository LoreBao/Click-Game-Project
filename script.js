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
        this.cfg=config;
        this.image = config.img; //img:"image path"//
        this.pos=this.randomPos();
        this._pendingPos=null;
        this.width=config.width;
        this.height=config.height;
        this.rangew=config.range_w;
        this.rangeh=config.range_h;
        this.spritemanager=new SpriteManager(config);
        this.gameManager=gameManager;
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
            return false;
        }
       let total=0;
      
       this.gameManager.objects.jerrys.forEach((e)=>{
            if(e.pos.x>=this.pos.x&&e.pos.x<=this.pos.x+this.rangew
                &&e.pos.y>=this.pos.y&&e.pos.y<=this.pos.y+this.rangeh
            ){
                total++;
            }
       })

       this.gameManager.score+=(total*CONFIG["Jerry"].reward);
       this.nextAction=Date.now()+this.cd;

       this.visibleUntil=Date.now()+this.flashDuration;
       this._pendingPos=this.randomPos();
       return true;
    }

    Upgrade() {
        // Template: Implete by Specific Class //
    }

    draw() {
        // Template: Implete by Specific Class //
        // Template: Implete by Specific Class //
        
        this.action();

        if(Date.now()<=this.visibleUntil){
            this.spritemanager.drawSprite(this.pos.x,this.pos.y);
            console.log(`Draw: ${this.cfg.type} success!`);  
        }
        else{
            if(this._pendingPos){
                this.pos=this._pendingPos;
                this._pendingPos=null;
            }
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
        if (Date.now() > this.nextframe) {
            this.frameIndex = (this.frameIndex + 1) % this.frameCount;
            this.nextframe = Date.now() + this.frameDuration;
        }

        if("range_w" in this.cfg){
            ctx.drawImage(this.img, this.sx + (this.frameIndex *  this.width), this.sy, this.width, this.height, x, y, this.cfg.range_w, this.cfg.range_h);
        }
        else{   
            ctx.drawImage(this.img, this.sx + (this.frameIndex * this.width), this.sy, this.width, this.height, x, y, IMG_WIDTH, IMG_HEIGHT);
        }
    }
}

class Godzilla extends BasicWeapons{
    constructor(config,gameManager){
        super(config,gameManager);
        this.usedtime=0;
        this.limit=config.limit;
        this.valid=true;
        
        if(this.rangew>=WIDTH){
            this.rangew=WIDTH;
        }
    }

    action(){
        if(this.valid){
            if(super.action()){
                this.usedtime++;
            }


            if(this.usedtime>=this.limit){
                this.valid=false;
            }
            
        }
    }
}

class Bartsimpson extends Godzilla{
    constructor(config,gameManager){
        super(config,gameManager);
        config.range_w=WIDTH;
        config.range_h=HEIGHT;

        this.rangew=WIDTH;
        this.rangeh=HEIGHT;

    }
    
    action(){
        
    }
}



class GameManager {
    constructor() {
        this.score = 0;
        this.objects = {
            jerrys:[new BasicJerrys(CONFIG["Jerry"])],
            toms:[],
            traps:[],
            grandmas:[],
            godzillas:[],
            bartsimpsons:[]
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

            this.objects.traps.forEach((traps)=>{
                if(traps.clicked(this.clickArea)){
                    this.score=Math.floor((1+traps.reward/100)*this.score);
                    this.updateBoard();
                }
            })
           
        })


        render(this,CONFIG);

        this.gameLoop=()=>{
            ctx.clearRect(0,0,WIDTH,HEIGHT);
           
            Object.entries(this.objects).forEach(([key,arr])=>{
                arr.forEach((e)=>{
                    e.draw();
                })
            })

            requestAnimationFrame(this.gameLoop);
        }

        this.gameLoop();

    }

    clickCoord(e){
        const cRect=canvas.getBoundingClientRect();
        let clientX=e.clientX;
        let clientY=e.clientY;

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


}

// Upgrade Function : TODO
function upgradeJerry(gameManager,key){
    let jconfig=CONFIG["Jerry"];
    switch(key){
        case "addAmount":
            if(gameManager.score>=jconfig.upgradeInfo.addAmount.price){
                if(Math.random()<=1){
                    gameManager.objects.traps.push(new Trap(CONFIG["Trap"]));
                }
                else{
                    gameManager.objects.jerrys.push(new BasicJerrys(CONFIG["Jerry"]));
                }

                gameManager.score-=jconfig.upgradeInfo.addAmount.price;
                CONFIG["Jerry"].upgradeInfo.addAmount.price=Math.floor(jconfig.upgradeInfo.addAmount.priceFactor*jconfig.upgradeInfo.addAmount.price);
                render(gameManager,CONFIG);
                gameManager.updateBoard();

            }
            else{                gameManager.score-=jconfig.upgradeInfo.addAmount.price;
                CONFIG["Jerry"].upgradeInfo.addAmount.price=Math.floor(jconfig.upgradeInfo.addAmount.priceFactor*jconfig.upgradeInfo.addAmount.price);
                render(gameManager,CONFIG);
                gameManager.updateBoard();
                alert("No Money , Poor! -Jerry ")
            }
            break;
    }

}

function render(gameManager,config){
    const upgradeContainer=document.getElementById("UpgradeTable");
    upgradeContainer.innerHTML="";
    Object.entries(config).forEach(([type,info])=>{ //type: "Jerry", info :{"type":"Jerry","width":100..etc}
        const div=document.createElement("div");
        div.id=type;
        div.classList.add("character-panel");
        const header=document.createElement("h3");
        header.textContent=type;
        div.appendChild(header);
        // <----[ -UNLOCK- ]-----> //

        if(info.unlock){
            const ul=document.createElement("ul");
            Object.entries(info.upgradeInfo).forEach(([key,skillInfo])=>{
                //key: addAmount, skillInfo: {"desc":"..","price":100...etc}
                const li=document.createElement("li");
                li.textContent=`${skillInfo.desc} | Price: ${skillInfo.price} | Increase Factor: ${skillInfo.priceFactor}`;
                const upgradeButton=document.createElement("button");
                upgradeButton.textContent=key;
                upgradeButton.addEventListener("click", (e)=>{
                    // <----- [ -Todo- ]-----> //
                    
                    const targetFunction=findUpgradeFunction(type);
                    if(targetFunction){
                        targetFunction(gameManager,key);
                    }
                })
                li.appendChild(upgradeButton);
                ul.appendChild(li);
                
            })
            div.appendChild(ul);
        }
        else{
            // Lock //
            const lockBtn=document.createElement("button");
            lockBtn.textContent="Unlock";
            lockBtn.addEventListener("click",(e)=>{
                console.log("Trigger Unlock");
                const targetFunction=findUpgradeFunction(type);
                if(targetFunction){

                    targetFunction(gameManager,"Unlock");
                }    
            })
            div.appendChild(lockBtn);
        }

        upgradeContainer.appendChild(div);

    })
}

function findUpgradeFunction(type){
    switch(type){
        case "Grandma":
            return upgradeGrandma;
        case  "Jerry":
            return upgradeJerry;
        case "Godzilla":
            return upgradeGodzilla;
        case "Bart_Simpson":
            return upgradeBartSimpson;
    }
}

function upgradeGrandma(gameManager,key){
    let gconfig=CONFIG["Grandma"];
    switch(key){
        case "Unlock":
            if(gameManager.score>=gconfig.unlockPrice&&gconfig.unlock==false){
                CONFIG["Grandma"].unlock=true;
                gameManager.objects.grandmas.push(new BasicWeapons(CONFIG["Grandma"],gameManager));
                gameManager.score-=gconfig.unlockPrice;
                gameManager.updateBoard();
                render(gameManager,CONFIG);
            }
            break;
        case "reduceCD":
            if(gameManager.score>=gconfig.upgradeInfo.reduceCD.price){
                gameManager.score-=gconfig.upgradeInfo.reduceCD.price;
                gconfig.upgradeInfo.reduceCD.price=Math.floor(gconfig.upgradeInfo.reduceCD.price*gconfig.upgradeInfo.reduceCD.priceFactor)
                gconfig.actionInterval=Math.floor(gconfig.actionInterval*0.95);
                if(gconfig.flashDuration>gconfig.actionInterval){
                    gconfig.flashDuration=gconfig.actionInterval;
                }
                gameManager.updateBoard();
                render(gameManager,CONFIG);

                let total=gameManager.objects.grandmas.length;
                gameManager.objects.grandmas=[];

                for(let i=0; i<total; i++){
                    gameManager.objects.grandmas.push(new BasicWeapons(CONFIG["Grandma"],gameManager));
                }
            }
            break;
    }


}

function upgradeGodzilla(gameManager,key){
    let config=CONFIG["Godzilla"];

    switch(key){
        case "Unlock":
            if(gameManager.score>=config.unlockPrice&&config.unlock==false){
                CONFIG["Godzilla"].unlock=true;
                gameManager.objects.godzillas.push(new Godzilla(CONFIG["Godzilla"],gameManager));
                gameManager.score-=config.unlockPrice;
                gameManager.updateBoard();
                render(gameManager,CONFIG);

            }
            break;
        case "buyOne":
            if(gameManager.score>=config.upgradeInfo.buyOne.price){
                gameManager.score-=config.upgradeInfo.buyOne.price;
                config.upgradeInfo.buyOne.price= Math.floor(config.upgradeInfo.buyOne.price*config.upgradeInfo.buyOne.priceFactor);
                if(gameManager.objects.godzillas.length>=1){
                    gameManager.objects.godzillas.pop();
                }
                gameManager.objects.godzillas.push(new Godzilla(CONFIG["Godzilla"],gameManager));
                gameManager.updateBoard();
                render(gameManager,CONFIG);
            }
            break;
        case "increaseRange":
            if(gameManager.score>=config.upgradeInfo.increaseRange.price){
                gameManager.score-=config.upgradeInfo.increaseRange.price;
                config.upgradeInfo.increaseRange.price= Math.floor(config.upgradeInfo.increaseRange.price*config.upgradeInfo.increaseRange.priceFactor);
                config.range_h=Math.floor(config.range_h*1.05);
                gameManager.updateBoard();
                render(gameManager,CONFIG);
            }

            
        
    }
}

function upgradeBartSimpson(gameManager,key){
    let config=CONFIG["Bart_Simpson"];

    switch(key){
        case "Unlock":
            if(gameManager.score>=config.unlockPrice&&config.unlock==false){
                CONFIG["Bart_Simpson"].unlock=true;
                gameManager.objects.bartsimpsons.push(new Bartsimpson(CONFIG["Bart_Simpson"],gameManager));
                gameManager.score-=config.unlockPrice;
                gameManager.updateBoard();
                render(gameManager,CONFIG);
            }
            break;
        case "buyOne":
            if(gameManager.score>=config.upgradeInfo.buyOne.price){
                gameManager.score-=config.upgradeInfo.buyOne.price;
                config.upgradeInfo.buyOne.price= Math.floor(config.upgradeInfo.buyOne.price*config.upgradeInfo.buyOne.priceFactor);
                if(gameManager.objects.bartsimpsons.length>=1){
                    gameManager.objects.bartsimpsons.pop();
                }
                gameManager.objects.bartsimpsons.push(new Bartsimpson(CONFIG["Bart_Simpson"],gameManager));
                gameManager.updateBoard();
                render(gameManager,CONFIG);
            }
            break;
    }
}
