var Canon=function(a,b,c,d){this.elem=a;this.ballProtoElem=b;this.ox=c;this.oy=d;this.num=this.alpha=0;this.onBallMove=null;this.move=function(a){this.alpha+=a;this.radian=this.alpha*Math.PI/180;this.cos=Math.cos(this.radian);this.sin=Math.sin(this.radian);this.refresh()};this.refresh=function(){this.elem.style.transform="rotate("+this.alpha+"deg)"};this.shoot=function(a){this.num+=1;var b=this.createBallAsset(),a=new Ball(a,b,this.cos,this.sin);a.onMove=this.onBallMove;a.x=this.ox;a.y=this.oy;a.num=
this.num;a.refresh();a.go()};this.createBallAsset=function(){var a=this.ballProtoElem.cloneNode();a.style.display="block";a.id="ball_"+this.num;get("#main").appendChild(a);return a};this.move(0)},Ball=function(a,b,c,d){this.speed=a;this.elem=b;this.cos=c;this.sin=d;this.num=null;this.viewfinder={};this.go=function(){this.loopId=setInterval(this.move.bind(this),1)};this.move=function(){this.x+=this.sin*this.speed;this.y+=-1*this.cos*this.speed;this.refresh();null!=this.onMove&&(this.viewfinder.xStart=
this.x+8,this.viewfinder.xEnd=this.x+8+14,this.viewfinder.yStart=this.y+8,this.viewfinder.yEnd=this.y+8+14,this.viewfinder.ball=this,this.onMove(this.viewfinder));0>=this.y&&(this.cos=-this.cos);if(570<=this.x||0>=this.x)this.sin=-this.sin;400<=this.y&&this.remove()};this.remove=function(){this.stop();get("#main").removeChild(this.elem)};this.stop=function(){clearInterval(this.loopId)};this.refresh=function(){this.elem.style.left=""+this.x+"px";this.elem.style.top=""+this.y+"px"}},Target=function(a,
b,c){this.elem=a.cloneNode();this.xStart=b;this.yStart=c;this.diam=10;this.xEnd=b+this.diam;this.yEnd=c+this.diam;this.elem.style.display="block";get("#main").appendChild(this.elem);this.elem.style.left=""+this.xStart+"px";this.elem.style.top=""+this.yStart+"px"},ROTATE_STEP=1,CANON_BALL_SPEED=1,canon=new Canon(get("#canon"),get("#ballProto"),285,315);document.addEventListener("keydown",onKeyDown,!1);log("Viser la cible verte en utilisant :");log("  fl\u00e8ches gauche et droite pour la rotation du canon.");
log("  la barre d'espace pour tirer.");var x=Math.floor(600*Math.random()),y=Math.floor(200*Math.random()),target=new Target(get("#targetProto"),x,y);
canon.onBallMove=function(a){if(target.xStart>=a.xStart&&target.xEnd<=a.xEnd&&target.yStart>=a.yStart&&target.yEnd<=a.yEnd){a.ball.stop();document.removeEventListener("keydown",onKeyDown,!1);var b=get(".msg");b.style.display="block";b.innerHTML+="Vous avez GAGNE !!! :-)<br/>";1<a.ball.num&&(b.innerHTML+="... avec "+(a.ball.num+1)+" essais :-( <br/>");b.innerHTML+="<br/>";b.innerHTML+="Rafra\u00eechir la page pour red\u00e9marrer.<br/>"}};
function onKeyDown(a){37==a.keyCode&&-90<canon.alpha-ROTATE_STEP?canon.move(-ROTATE_STEP):39==a.keyCode&&90>canon.alpha+ROTATE_STEP?canon.move(+ROTATE_STEP):(32==a.keyCode||38==a.keyCode)&&canon.shoot(CANON_BALL_SPEED)}function log(a){get("#info").innerHTML+=a+"<br/>"}function get(a){return document.querySelectorAll(a)[0]};
