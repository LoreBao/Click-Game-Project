const canvas=document.getElementById("UI");
const ctx=canvas.getContext("2d");

const WIDTH=800;
const HEIGHT=800;

canvas.width=WIDTH;
canvas.height=HEIGHT;

let config={};

(async function(){
    const configData=await fetch(".static/config.json").then(r=>r.json());
    config=Object.fromEntries(configData.map(function(value){
        const img=new Image();
        img.src="./static/"+value.img;
        return [value.type,{...value,img}];
    }));
})();

class BasicWeapons{
    constructor(image,score,price){
        this.image=image; //img:"image path"//
        this.score=score; //score:"weapons effect"//
        this.price=price; //price:"weapons cost"//
    }

    action(){
        // Template: Implete by Specific Class //
    }
    
    Upgrade(){
        // Template: Implete by Specific Class //
    }

    draw(){
        // Template: Implete by Specific Class //
    }
}

class BasicJerrys{
    constructor(config){
        this.image=config.img; //img:"image path"//
        this.reward=config.reward;
        this.pos=this.randomPos();
        this.width=config.width;
        this.height=config.height;
    }                                   

    randomPos(){
        let randomX=Math.floor(Math.random()*(WIDTH-this.width));
        let randomY=Math.floor(Math.random()*(HEIGHT-this.height));

        return {
            x: randomX,
            y: randomY,
        }
    }

    clicked(ClickPos){
            return (ClickPos.x>=this.pos.x&&ClickPos.x<=this.width+this.pos.x
            &&ClickPos.y>=this.pos.y&&ClickPos.y<=this.height+this.pos.y);
    }

    action(){

    }

    draw(){
        
    }
}

class SpriteManager{
    constructor(config){
        this.img=config.img;
        this.sx=config.sx;
        this.sy=config.sy;
        this.width=config.width;
        this.height=config.height;
        this.frameCount=config.frameCount;
        this.frameDuration=config.frameDuration;
        this.frameIndex=0;
        this.nextframe=Date.now()+this.frameDuration;
    }

    drawSprite(){
        if(Date.now>this.nextframe){
            this.frameIndex+=;
        }
    }
}

class GameManager{
    constructor(){
        this.score=0;
        this.objects=[];

        this.clickArea={
            x:0,
            y:0,
        };

        document.addEventListener("click",(e)=>{
            this.clickArea.x=e.clientX;
            this.clickArea.y=e.clientY;
        })
    }

}

