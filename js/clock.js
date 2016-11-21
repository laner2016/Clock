/**
 * Created by ll on 2016/11/16.
 */
var cns = document.getElementById('clock');
var ctx = cns.getContext('2d');
var w = ctx.canvas.width;
var h = ctx.canvas.height;
var r = w / 2;
var rem = w / 400;

function drawBackground(){
    ctx.save();
    ctx.translate( r, r );
    ctx.beginPath();
    ctx.lineWidth = 10 * rem;
    ctx.arc( 0, 0, r - ctx.lineWidth / 2, 0, 2*Math.PI);
    ctx.stroke();

    var hourNumbers = [3,4,5,6,7,8,9,10,11,12,1,2];
    ctx.font = 18 * rem + 'px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'red';
    hourNumbers.forEach(function( number, i ){
        var rad = 2*Math.PI / 12 * i;
        var x = Math.cos(rad) * (r-30*rem);
        var y = Math.sin(rad) * (r-30*rem);
        ctx.fillText(number,x,y);
    });
    for( var i=0; i<60; i++){
        var rad = 2*Math.PI / 60 * i;
        var x = Math.cos(rad) * (r-16*rem);
        var y = Math.sin(rad) * (r-16*rem);
        ctx.beginPath();
        if( i%5 == 0 ){
            ctx.fillStyle = '#ff8080';
            ctx.arc( x, y, 2*rem, 0, 2*Math.PI);
        }else {
            ctx.fillStyle = '#bbb';
            ctx.arc( x, y, 2*rem, 0, 2*Math.PI);
        }
        ctx.fill();
    }
}
function drawHour(hour, minute){
    ctx.save();
    ctx.beginPath();
    var rad = 2*Math.PI / 12 * hour;
    var mrad = 2*Math.PI / 12 / 60 * minute;
    ctx.rotate(rad + mrad);
    ctx.lineCap = 'round';
    ctx.lineWidth = 8 * rem;
    ctx.moveTo(0, 10*rem);
    ctx.lineTo(0, -r/2);
    ctx.stroke();
    ctx.restore();
}
function drawMinute(minute, second){
    ctx.save();
    ctx.beginPath();
    var rad = 2*Math.PI / 60 * minute;
    var mrad = 2*Math.PI / 60 / 60 * second;
    ctx.rotate(rad + mrad);
    ctx.lineCap = 'round';
    ctx.lineWidth = 5 * rem;
    ctx.moveTo(0, 10*rem);
    ctx.lineTo(0, -r+50*rem);
    ctx.stroke();
    ctx.restore()
}
function drawSecond(second){
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = 'red';
    var rad = 2*Math.PI / 60 * second;
    ctx.rotate(rad);
    ctx.moveTo(-2*rem, 20*rem);
    ctx.lineTo(2*rem, 20*rem);
    ctx.lineTo(1, -r+18*rem);
    ctx.lineTo(-1, -r+18*rem);
    ctx.fill();
    ctx.restore();
}
function  drawDot(){
    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.arc(0, 0, 5*rem, 0, 2*Math.PI);
    ctx.fill();
}
function draw(){
    ctx.clearRect(0, 0, w, h);
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    drawBackground();
    drawHour(hour,minute);
    drawMinute(minute,second);
    drawSecond(second);
    drawDot();
    ctx.restore();
}
draw();
setInterval(draw,1000);