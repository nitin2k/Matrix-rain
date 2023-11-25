const canvas=document.getElementById("canvas1");
const ctx=canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
const size=20;
let grd=ctx.createRadialGradient(canvas.width/2,canvas.height/2,canvas.height/8,canvas.width/2,canvas.height/2,canvas.height);
grd.addColorStop(0,'hsl(10,100%,50%)');
grd.addColorStop(0.25,'hsl(200,100%,50%)');
grd.addColorStop(0.5,'hsl(300,100%,50%)');
grd.addColorStop(1,'hsl(410,100%,50%)');
let lastTime=0,nowTime=0,timeDiff=0;
let fps=30;

const charactersList='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+-<>?|!@#$%^&*()~`';
const symbolArray=[];



addEventListener('resize',function(){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    grd=ctx.createRadialGradient(canvas.width/2,canvas.height/2,canvas.height/8,canvas.width/2,canvas.height/2,canvas.height);
    grd.addColorStop(0,'hsl(10,100%,50%)');
    grd.addColorStop(0.25,'hsl(200,100%,50%)');
    grd.addColorStop(0.5,'hsl(300,100%,50%)');
    grd.addColorStop(1,'hsl(410,100%,50%)');
})

class Symbol{
    constructor(x,size){
        this.x=x;
        this.y=Math.random()*canvas.height-canvas.height;
        this.font=`${size}px Agency FB`;
        this.symbol=charactersList[Math.floor(Math.random()*charactersList.length)];
        this.color=grd;
        this.rainspeed=1;
    }
    draw(){
        ctx.fillStyle=this.color;
        ctx.font=this.font;
        ctx.fillText(this.symbol,this.x,this.y);
    }
    update(){
        this.y+=size;
        this.symbol=charactersList[Math.floor(Math.random()*charactersList.length)];
        
    }
}

function generateSymbols(){
    if(symbolArray.length<canvas.width/size){
        for(let a=0;a<canvas.width;a+=size){
            symbolArray.push(new Symbol(a,size));
        }
    }
}

function animate(timeStamp){
    generateSymbols();
    nowTime=timeStamp;
    timeDiff=nowTime-lastTime;
    if(timeDiff>(1000/fps)){
        ctx.fillStyle='rgba(0,0,0,0.04)';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle='white';
        ctx.font='40px Agency FB';
        ctx.fillText('MATRIX',canvas.width,canvas.height);
        for(let a=0;a<symbolArray.length;a++){
            symbolArray[a].draw();
            symbolArray[a].update();
            if(symbolArray[a].y>canvas.height){
                symbolArray.splice(a,1);
            }
        }
        lastTime=nowTime;
        timeStamp=0;
    }
    ctx.fillStyle='white';
    ctx.font=`40px Agency FB`;
    ctx.fillText('MATRIX RAIN',canvas.width/2-20,canvas.height/2);
    ctx.font=`20px Agency FB`;
    ctx.fillText('by Nitin Sharma',canvas.width/2-20,canvas.height/2+20);
    requestAnimationFrame(animate);
}
animate();