/*
SPDX-License-Identifier: MIT
SPDX-FileCopyrightText: 2025 LoreBao
*/

const canvas = document.getElementById("UI");
const ctx = canvas.getContext("2d");

const sideCanvas = document.getElementById("side-screen");
const sideCtx=sideCanvas.getContext("2d");

sideCanvas.width=800;
sideCanvas.height=300;

const WIDTH = 800;
const HEIGHT = 800;

canvas.width = WIDTH;
canvas.height = HEIGHT;

const IMG_WIDTH = 150;
const IMG_HEIGHT = 150;

let CONFIG = {};

//-0-0-0 Achievement setting -0-0-0 
let GAMESTARTTIME=null;
let ACHIEVEMENTS=[
    {
        title:"Points Master I:100k Points!",
        achieved:false,
        achieveTime:null,
        condition:(gameManager)=>{
            return gameManager.score>=100000;
        }
    },

    {
        title:"Points Master II:200k Points!",
        achieved:false,
        achieveTime:null,
        condition:(gameManager)=>{
            return gameManager.score>=200000;
        }
    },

    {
        title:"Points Champion: 500k Points!",
        achieved:false,
        achieveTime:null,
        condition:(gameManager)=>{
            return gameManager.score>=5000000;
        }
    },

    {
        title:"Encyclopedia: Unlock all Characters",
        achieved:false,
        achieveTime:null,
        condition:(gameManager)=>{
            const configkeys=Object.keys(CONFIG);
            for(let i=0; i<configkeys.length; i++){
                if(configkeys[i]==="Audio"){
                    continue;
                }
                if(!CONFIG[configkeys[i]].unlock){
                    return false;
                }
            }
            return true;
        }
    },


    {
        title:"Tom and Jerry: Unlock both Jerry and Tom",
        achieved:false,
        achieveTime:null,
        condition:(gameManager)=>{
            return gameManager.objects.toms.length>0;
        }
    },

    {
        title:"Absolute Dedication: Complete all previous achievements",
        achieved:false,
        achieveTime:null,
        condition:(gameManager)=>{
            for(let i=0; i<ACHIEVEMENTS.length-1; i++){
                if(!ACHIEVEMENTS[i].achieved){
                    return false;
                }
            }
            AUDIO.play("win",1,0.2);
            return true;
        }
    },
    
];

// ===Added Audio Manager=== //
class  AudioManager{
    constructor(cfg){
        this.cfg=cfg;
        this.buffer={};
        this.minGap={};
        this.lastPlay={};
        this.unlock=false;
        this.ctx=null;
    }

    async init(){
        if(this.unlock){
            return;
        }
        
        this.unlock=true;
        this.ctx= new (window.AudioContext|| window.webkitAudioContext)();
        await this.ctx.resume();
        addLog("Audio Initialization Successful");
    }

    async load(){
        const keys=Object.keys(this.cfg);
        
        
        const promises=keys.map(async (key)=>{
            const url="static/"+this.cfg[key].url;
            if(!url){
                return;
            }
            const fetchurl=await fetch(url);
            if(!fetchurl.ok){
                this.buffer[key]=null;
                addLog(`Audio Load Failed: ${key}`);
            }
            const arrBuffer= await fetchurl.arrayBuffer();
            const arrDecode= await this.ctx.decodeAudioData(arrBuffer);
            this.buffer[key]=arrDecode;
            this.minGap[key]=this.cfg[key].minGap;
        })

        await Promise.all(promises);
        addLog("All Audio has Loaded Successfully!");
    }

    play(key,playbackRate,volume){ 
        if(!this.unlock||!this.buffer[key]){
            addLog(`Audio ${key} has failed to load (E)`);
        }

        const now=Date.now();
        const minGap=this.minGap[key]??0;
        if(now-(this.lastPlay[key]||0)<minGap){
            return;
        }
        addLog(`play: ${key}:${this.buffer[key]}`);
        this.lastPlay[key]=now;
        const player=this.ctx.createBufferSource();
        player.buffer=this.buffer[key];
        player.playbackRate.value=playbackRate;
        const gainNode=this.ctx.createGain();
        gainNode.gain.value=volume;

        player.connect(gainNode).connect(this.ctx.destination);

        player.onended=()=>{
            player.disconnect();
            gainNode.disconnect();
        }
        player.start(0);
    }

}

let AUDIO = null;
(async function () {
    const configData = await fetch("static/config.json").then(r => r.json());
    CONFIG = Object.fromEntries(configData.map(function (value) {
        const img = new Image();
        img.src = "static/" + value.img;

        if(value.action1){
            value.action1.img=img;
        }

        if(value.action2){
            value.action2.img=img;
        }

        
        return [value.type, { ...value, img }];
    }));

    await Promise.all(Object.values(CONFIG).map(c => {
    return new Promise(resolve => {
        if (!c.img) return resolve();
        if (c.img.complete) return resolve();
        c.img.onload = () => resolve();
        c.img.onerror = () => resolve(); // 失敗也繼續
    });
    }));
    
    AUDIO=new AudioManager(CONFIG["Audio"]);
    document.addEventListener("pointerdown",async ()=>{
        await AUDIO.init();
        await AUDIO.load();
    },{once:true});
    addLog("Game has Started!");
    GAMESTARTTIME=Date.now();
    renderAchievements();
    startGame();
})();

class BasicWeapons {
    constructor(config,gameManager) {
        this.cfg=config;
        this.type=config.type;
        this.image = config.img;
        this.width=config.width;
        this.height=config.height;
        this.rangew=config.range_w;
        this.rangeh=config.range_h;
        this.pos=this.randomPos();
        this._pendingPos=null;
        this.spritemanager=new SpriteManager(config,"main");
        this.gameManager=gameManager;
        this.cd=config.actionInterval;
        this.nextAction=Date.now()+this.cd;
        this.flashDuration=config.flashDuration;
        this.visibleUntil=0;
    }

    randomPos(){
        if(this.rangew>WIDTH){
            this.rangew=WIDTH;  
        }
        
        if(this.rangeh>HEIGHT){
            this.rangeh=HEIGHT;
        }

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
       addLog(`${this.type}: captured ${total} amount of Jerrys!`);

       this.visibleUntil=Date.now()+this.flashDuration;
       this._pendingPos=this.randomPos();
       if(total>0){
        this.gameManager.updateBoard();
       }
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
        this.type=config.type;
        this.image = config.img; //img:"image path"//
        this.width = config.width;
        this.height = config.height; 
        this.reward = config.reward;
        this.pos = this.randomPos();

        this.moveduration=config.moveDuration;
        this.spritemanager = new SpriteManager(config,"main");
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
    constructor(config,mode) {
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
        this.mode=mode;
    }

    drawSprite(x, y) {
        if (Date.now() > this.nextframe) {
            this.frameIndex = (this.frameIndex + 1) % this.frameCount;
            this.nextframe = Date.now() + this.frameDuration;
        }
        
        if(this.mode=="main"){
            if("range_w" in this.cfg){
                ctx.drawImage(this.img, this.sx + (this.frameIndex *  this.width), this.sy, this.width, this.height, x, y, this.cfg.range_w, this.cfg.range_h);
            }
            else{   
                ctx.drawImage(this.img, this.sx + (this.frameIndex * this.width), this.sy, this.width, this.height, x, y, IMG_WIDTH, IMG_HEIGHT);
            }
        }
        else if(this.mode=="side"){
            if("range_w" in this.cfg){
                sideCtx.drawImage(this.img, this.sx + (this.frameIndex *  this.width), this.sy, this.width, this.height, x, y, this.cfg.range_w, this.cfg.range_h);
            }
            else{   
                sideCtx.drawImage(this.img, this.sx + (this.frameIndex * this.width), this.sy, this.width, this.height, x, y, IMG_WIDTH, IMG_HEIGHT);
            }
        }



    }
}

class Godzilla extends BasicWeapons{
    constructor(config,gameManager){
        super(config,gameManager);
        this.usedtime=0;
        this.limit=config.limit;
        this.valid=true;
        
        if(this.rangew!=WIDTH){
            this.rangew=WIDTH;
        }
    }

    action(){
        if(this.valid){
            if(super.action()){
                this.usedtime++;
                addLog(`${this.type} can be used for ${this.limit-this.usedtime} times!`);
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
}

class Dog{
    constructor(cfg,gameManager){
        this.cfg=cfg;
        this.gameManager=gameManager;
        this.type=cfg.type;
        this.actionInterval=cfg.actionInterval;
        this.gainPoint=cfg.gainPoint;
        this.totalBones=0;
        this.currentAction="action2";
        this.consumeBones=cfg.consumeBones;
        this.nextAction=Date.now()+this.actionInterval;
        this.spriteManagers={
            "action1":new SpriteManager(cfg.action1,"side"),
            "action2":new SpriteManager(cfg.action2,"side")
        }
        this.pos={
            x:sideCanvas.width/2,
            y:sideCanvas.height/2
        }
    }

    setAction(name){
        if(name=="action1"){
            this.currentAction="action1";
            this.spriteManagers.action1.frameIndex=0;
            this.spriteManagers.action1.nextframe=Date.now()+this.spriteManagers.action1.frameDuration;
        }

        else{
            this.currentAction="action2";
            this.spriteManagers.action2.frameIndex=0;
            this.spriteManagers.action2.nextframe=Date.now()+this.spriteManagers.action2.frameDuration;
        }
    }

    action(){
        if(Date.now()>=this.nextAction){
            if(this.consumeBones<=this.totalBones){
                this.totalBones-=this.consumeBones;
                let addPoint = Math.floor(this.gainPoint*this.consumeBones);
                this.gameManager.score+= addPoint;
                this.setAction("action1");
                this.gameManager.updateBoard();
                render(this.gameManager,CONFIG);
                addLog(`Dog has eaten ${this.consumeBones} bones and brought ${addPoint} points for you!`);
            }
            else{
                this.setAction("action2");
                AUDIO.play("bark",1,0.2);
                addLog("Dog is angry and refuse to bring you points! Buy some bones!")
                
            }
            this.nextAction=Date.now()+this.actionInterval;
        }

    }

    draw(){
        this.action();
        if(this.currentAction=="action1"){
            this.spriteManagers.action1.drawSprite(this.pos.x,this.pos.y);
        }
        else{
            this.spriteManagers.action2.drawSprite(this.pos.x,this.pos.y);
        }
    }


}

class Tom{
    constructor(config,gameManager){
        this.config=config;
        this.type=config.type;
        this.gameManager=gameManager;
        this.spriteManager=new SpriteManager(config,"side");
        this.id=gameManager.objects.toms.length;
        this.pos={
            x:this.id*IMG_WIDTH,
            y:0,
        }
    }

    draw(){
        this.spriteManager.drawSprite(this.pos.x,this.pos.y);
    }
}


class GameManager {
    constructor() {
        this.score = 1;
        this.objects = {
            jerrys:[new BasicJerrys(CONFIG["Jerry"])],
            toms:[],
            traps:[],
            grandmas:[],
            godzillas:[],
            bartsimpsons:[],
            dogs:[]
        };
        this.pps=document.getElementById("pps");
        this.clock=document.getElementById("game-clock");
        
        setInterval(()=>{
            this.pps.textContent=`${(this.score/((Date.now()-GAMESTARTTIME)/1000)).toFixed(0)} points/sec`;
            const totalms=Date.now()-GAMESTARTTIME;
            const totalsec=Math.floor(totalms/1000);
            const totalmin=Math.floor(totalsec/60);

            this.clock.textContent=`${totalmin} mins ${totalsec} sec`;
        },1000)

        this.clickArea = {
            x: 0,
            y: 0,
        };

        canvas.addEventListener("click", (e) => {
            this.clickArea=this.clickCoord(e);
            //++---+++---++---++---+ logic +---++---++---++---++---++---++\\
            this.objects.jerrys.forEach((jerry)=>{
                if(jerry.clicked(this.clickArea)){
                    this.score+=jerry.reward;
                    AUDIO.play("click",1,0.2); 
                    addLog(`Jerry Has Been Clicked! It was at (${this.clickArea.x.toFixed(0)},${this.clickArea.y.toFixed(0)})`);
                    this.updateBoard();
                }
                
            })

            this.objects.traps.forEach((traps)=>{
                if(traps.clicked(this.clickArea)){
                    this.score=Math.floor((1+traps.reward/100)*this.score);
                    this.updateBoard();
                    AUDIO.play("scream",1,0.2);
                    addLog("Click Jerry, Not Trap!")
                }
            })
           
        })


        render(this,CONFIG);

        this.gameLoop=()=>{
            ctx.clearRect(0,0,WIDTH,HEIGHT);
            sideCtx.clearRect(0,0,sideCanvas.width,sideCanvas.height);
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
        scoreboard.textContent=this.score;
        updateachivementpanel(this);
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
                if(Math.random()<=0.25){
                    gameManager.objects.traps.push(new Trap(CONFIG["Trap"]));
                    CONFIG["Trap"].unlock=true;
                    addLog("Bad Luck! It's a Trap!");
                }
                else{
                    gameManager.objects.jerrys.push(new BasicJerrys(CONFIG["Jerry"]));
                    addLog("A Jerry has been Added!");
                }

                gameManager.score-=jconfig.upgradeInfo.addAmount.price;
                CONFIG["Jerry"].upgradeInfo.addAmount.price=Math.floor(jconfig.upgradeInfo.addAmount.priceFactor*jconfig.upgradeInfo.addAmount.price);
                render(gameManager,CONFIG);
                gameManager.updateBoard();

            }
            break;
    }

}

function render(gameManager,config){
    const upgradeContainer=document.getElementById("UpgradeTable");
    upgradeContainer.innerHTML="";
    Object.entries(config).forEach(([type,info])=>{ //type: "Jerry", info :{"type":"Jerry","width":100..etc}
        if(type==="Trap"||type==="Audio"){
            return;
        }
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
            if(type==="Dog"){
                const infoli=document.createElement("li");
                const doginfo=gameManager.objects.dogs[0];
                infoli.textContent=`Total Bones:${doginfo.totalBones}, Consumes: ${doginfo.consumeBones} Bones per ${doginfo.actionInterval}`;
                div.appendChild(infoli);
            }
            div.appendChild(ul);
        
        }
        else{
            // Lock //
            const lockBtn=document.createElement("button");
            lockBtn.textContent="Unlock";
            lockBtn.addEventListener("click",(e)=>{
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
        case "Dog":
            return upgradeDog;
        case "Tom":
            return upgradeTom;
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
                addLog("Grandma unlocked!");
            }
            break;
        case "reduceCD":
            if(gameManager.score>=gconfig.upgradeInfo.reduceCD.price){
                gameManager.score-=gconfig.upgradeInfo.reduceCD.price;
                gconfig.upgradeInfo.reduceCD.price=Math.floor(gconfig.upgradeInfo.reduceCD.price*gconfig.upgradeInfo.reduceCD.priceFactor)
                gconfig.actionInterval=Math.floor(gconfig.actionInterval*0.95);
                if(gconfig.flashDuration>gconfig.actionInterval){
                    gconfig.flashDuration=gconfig.actionInterval-100;
                }
                gameManager.updateBoard();
                render(gameManager,CONFIG);

                let total=gameManager.objects.grandmas.length;
                gameManager.objects.grandmas=[];

                for(let i=0; i<total; i++){
                    gameManager.objects.grandmas.push(new BasicWeapons(CONFIG["Grandma"],gameManager));
                }
                addLog(`Grandma upgraded reduceCD success, current CD is ${(gconfig.actionInterval/1000).toFixed(1)}s`);
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
                addLog(`${config.type} Unlocked Success!`);
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
                addLog(`${config.type} increase range success, current range ${config.range_h}px`);
            }

            
        
    }
}

function upgradeDog(gameManager,key){
    let config=CONFIG["Dog"];
    
    switch(key){
        case "Unlock":
            if(gameManager.score>=config.unlockPrice&&config.unlock==false){
                CONFIG["Dog"].unlock=true;
                gameManager.objects.dogs.push(new Dog(CONFIG["Dog"],gameManager));
                gameManager.score-=config.unlockPrice;
                gameManager.updateBoard();
                render(gameManager,CONFIG);
                addLog(`${config.type} Unlock Success!`);
            }
            break;
        case "buyBones":
             if(gameManager.score>=config.upgradeInfo.buyBones.price){
                gameManager.score-=config.upgradeInfo.buyBones.price;
                gameManager.objects.dogs[0].totalBones+=config.upgradeInfo.buyBones.amount;
                gameManager.updateBoard();
                render(gameManager,CONFIG);
             }
             break;
        case "upgrade":
            if(gameManager.score>=config.upgradeInfo.upgrade.price){
                gameManager.score-=config.upgradeInfo.upgrade.price;
                config.consumeBones=Math.floor(config.consumeBones*(1+config.upgradeInfo.upgrade.ratio));
                config.gainPoint=Math.floor(config.gainPoint*(1+config.upgradeInfo.upgrade.ratio+0.2));
                config.upgradeInfo.upgrade.price=Math.floor(config.upgradeInfo.upgrade.price*config.upgradeInfo.upgrade.priceFactor);
                config.actionInterval=Math.floor(config.actionInterval*(1-config.upgradeInfo.upgrade.ratio));
                config.upgradeInfo.upgrade.price=Math.floor(config.upgradeInfo.upgrade.price*config.upgradeInfo.upgrade.priceFactor);
                const theBones=gameManager.objects.dogs[0].totalBones;
                gameManager.objects.dogs=[];
                gameManager.objects.dogs.push(new Dog(config,gameManager));
                gameManager.objects.dogs[0].totalBones=theBones;
                gameManager.updateBoard();
                render(gameManager,CONFIG);
            }
            break;
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
                addLog(`${config.type} Unlock Success!`);
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
                addLog(`${config.type} Buy One Success!`);
            }
            break;
    }
}

function upgradeTom(gameManager,key){
    let config=CONFIG["Tom"];

    switch(key){
        case "Unlock":
            if(gameManager.score>=config.unlockPrice&&config.unlock==false){
                CONFIG["Tom"].unlock=true;
                gameManager.objects.toms.push(new Tom(CONFIG["Tom"],gameManager));
                gameManager.score-=config.unlockPrice;
                gameManager.updateBoard();
                let length=gameManager.objects.jerrys.length;
                CONFIG["Jerry"].reward+=1;
                gameManager.objects.jerrys=[];
                for(let i=0; i<length; i++){
                    gameManager.objects.jerrys.push(new BasicJerrys(CONFIG["Jerry"]));
                }
                
                render(gameManager,CONFIG);
                addLog(`${config.type} Unlock Success!`);

            }
            break;
        case "buyOne":
            if(gameManager.score>=config.upgradeInfo.buyOne.price){
                gameManager.score-=config.upgradeInfo.buyOne.price;
                config.upgradeInfo.buyOne.price= Math.floor(config.upgradeInfo.buyOne.price*config.upgradeInfo.buyOne.priceFactor);
                gameManager.objects.toms.push(new Tom(CONFIG["Tom"],gameManager));
                gameManager.updateBoard();
                let length=gameManager.objects.jerrys.length;
                CONFIG["Jerry"].reward=Math.floor(CONFIG["Jerry"].reward*(1+config.upgradeInfo.buyOne.rewardFactor));
                gameManager.objects.jerrys=[];
                for(let i=0; i<length; i++){
                    gameManager.objects.jerrys.push(new BasicJerrys(CONFIG["Jerry"]));
                }
                render(gameManager,CONFIG);
                addLog(`${config.type} Buy One Success! Current Reward: ${CONFIG["Jerry"].reward}`);
            }
            break;
    }
}

function addLog(msg){
    const lp=document.getElementById("log-panel");
    const newMessage=document.createElement("div");
    newMessage.textContent=`[${new Date().toLocaleTimeString()}] ${msg}`;
    lp.appendChild(newMessage);

    lp.scrollTop=lp.scrollHeight;
}

// 0-0-0-Achievement  Function-0-0-0

function renderAchievements(){
    const achievementList=document.getElementById("achievement-list");
    achievementList.innerHTML="";
    ACHIEVEMENTS.forEach((e)=>{
        const status=document.createElement("div");
        if(e.achieved){
            const totalms=e.achieveTime-GAMESTARTTIME;
            const totalsec=Math.floor(totalms/1000);
            const totalmin=Math.floor(totalsec/60);
            status.textContent=`${e.title}: Completed in under ${totalmin} mins ${totalsec-totalmin*60} secs `;
            status.style.color="lime";
        }
        else{
            status.textContent=`${e.title}: incomplete`;
            status.style.color="red";
        }
        achievementList.appendChild(status);
    })
}

function updateachivementpanel(gameManager){
    ACHIEVEMENTS.forEach((e)=>{
        if(e.achieved){
            return;
        }
        if(e.condition(gameManager)){
            e.achieveTime=Date.now();
            e.achieved=true;
            addLog(`${e.title}, Completed!`);
        }
    })
    renderAchievements();
}

