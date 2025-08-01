const canvas=document.getElementById("UI");
const ctx=canvas.getContext("2d");

const WIDTH=800;
const HEIGHT=800;

canvas.width=WIDTH;
canvas.height=HEIGHT;

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
    constructor(image,score){
        this.image=image; //img:"image path"//
        this.score=score; //score:"pts/click"//
    }

    action(){

    }

    draw(){
        
    }
}
