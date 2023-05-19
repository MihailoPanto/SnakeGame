$(document).ready(function(){

    let table=localStorage.getItem("table");
    let level=localStorage.getItem("level");

    // alert(table+level)

    let m;
    let n;
    let snakeFields=[];
    let food=-1;
    let superFood=-1;
    let direction="right";
    let started=false;
    let ended=false;
    let points=0;

    let snakeInterval;
    let foodInterval;
    

    //postavljanje zmijice da krece uvek od sredine(priblizno sredine)
    function snakeInitialization(){
        // let index=Math.floor(Math.random()*m*n);
        let mm=Math.floor(m/2);
        let nn=Math.floor(n/2);
        let index=mm*n+nn;
        snakeFields.push(index);
        // $("#"+index).css({"background-color":"blue"});
        $("#"+index).addClass("snake");
    }

    //postavljanje obicne hrane na random mesto
    function foodInitialization(){
        let index=Math.floor(Math.random()*m*n);
        while(snakeFields.includes(index) || superFood==index){
            index=Math.floor(Math.random()*m*n);
        }
        $("#"+index).addClass("food");
        $("#"+index).text("F");
        food=index;
    }


    //super food brisanje nakon nekoliko sekundi
    function superFoodDelete(){

        $("#"+superFood).text("");
        $("#"+superFood).removeClass("superFood");
        superFood=-1;
    }

    //pravljenje super hrane nakon 10 sekundi
    function superFoodInitialization(){
        let index=Math.floor(Math.random()*m*n);
        while(snakeFields.includes(index) || food==index){
            index=Math.floor(Math.random()*m*n);
        }
        superFood=index;
        $("#"+index).addClass("superFood");
        $("#"+index).text("S");
        //da nestaju posle 3 do 9 sekundi
        setTimeout(superFoodDelete,Math.floor(Math.random(9-3+1)+3)*1000);
    }

    

    //kreiranje tablice po kojoj ce se zmijica kretati velicine odredjene u podesavanjima igre
    function gameInitialization(){
        
        if(table=="small"){
            m=10;
            n=10;
        }else if(table=="big"){
            m=20;
            n=20;
        }else if(table="midle"){
            m=15;
            n=15;
        }
        for(let i=0;i<m;i++){
            let red=$("<tr></tr>");
            for(let j=0;j<n;j++){
                let celija=$("<td></td>").attr("id",i*n+j)
                        .css({
                            "width":"30px",
                            "height":"30px",
                            "border-style":"solid"
                        }).text("");
                
                red.append(celija);
            }
            $("#gameTable").append(red);
        }
    }

    function makeNewResult(user,points){
        let res={
            "username":user,
            "points":points
        }
        //postavljam ga kao poslednjeg odigranog
        localStorage.setItem("currentResult",JSON.stringify(res));

        //dodajem ga u niz ako ima manje od 5 rezultata i ako je veci od najlosijeg sacuvanog
        let topResults=localStorage.getItem("topResults");
        topResults=JSON.parse(topResults);
        if(!topResults) topResults=[];
        if(topResults.length <5 || (topResults.length==5 && topResults[4].points<res.points)){
            topResults.push(res);
            topResults.sort(komparator);
            if(topResults.length==6)topResults.pop();
            localStorage.setItem("topResults",JSON.stringify(topResults));
        }
        
    }

    function komparator(a,b){
        return parseInt(b.points)-parseInt(a.points);
    }

    //zavrsava se igra
    function endGame(){
        clearInterval(snakeInterval);
        clearInterval(foodInterval);
        snakeFields=[];
        superFood=-1;
        food=-1;
        started=false;
        ended=true;

        let user=prompt("Unesite korisnicko ime");
        if(!user) user="Nepoznato";

        makeNewResult(user,points);
        points=0;
        // window.open("zmijica-rezultati.html","_blank");
        //da otvori u istom prozoru
        window.open("zmijica-rezultati.html", "_self");
        
    }

    //provera da li je zavrsena igra
    function checkGameEnd(x,y){
        if(x<0 || x>=m || y<0 || y>=n || snakeFields.includes(x*n+y)){
            endGame();
            return;
        }
    }

    //pojedi hranu
    function growSnake(x){
        let newArray=[];
        newArray.push(x);
        for(let i=0;i<snakeFields.length;i++){
            newArray.push(snakeFields[i]);
        }
        $("#"+x).addClass("snake");
        
        snakeFields=newArray;
    }

    //osvezavanje poena
    function pointsUpdate(){
        let bestResult=localStorage.getItem("bestResult");
        //resultNow
        //resultBest
        $("#resultNow").text(points);
        if(!bestResult || points>bestResult){
            localStorage.setItem("bestResult",points);    
            bestResult=points; 
        }
        $("#resultBest").text(bestResult);
    }

    // Pomeranje zmijice posle intervala odredjenog izabranim levelom
    function moveSnake(){
        let x=Math.floor(snakeFields[0]/m);
        let y=Math.floor(snakeFields[0]%n);
        switch(direction){
            case "left":
                checkGameEnd(x,y-1);
                let id1=x*n+y-1;
                if(id1==food){
                    $("#"+id1).text("");
                    $("#"+id1).removeClass("food");
                    food=-1;
                    growSnake(id1);
                    foodInitialization();
                    points++;
                    pointsUpdate();
                }else if(id1==superFood){
                    $("#"+id1).text("");
                    $("#"+id1).removeClass("superFood");
                    superFood=-1;
                    growSnake(id1);
                    points+=10;
                    pointsUpdate();
                }else{
                    growSnake(id1);
                    let tail=snakeFields.pop();
                    $("#"+tail).removeClass("snake");
                }
                if(snakeFields.length==m*n){
                    alert("Pobedili ste!")
                    endGame();
                    return;
                }
                break;
            case "up":
                checkGameEnd(x-1,y);
                let id2=(x-1)*n+y;
                if(id2==food){
                    $("#"+id2).text("");
                    $("#"+id2).removeClass("food");
                    food=-1;
                    growSnake(id2);
                    foodInitialization();
                    points++;
                    pointsUpdate();
                }else if(id2==superFood){
                    $("#"+id2).text("");
                    $("#"+id2).removeClass("superFood");
                    superFood=-1;
                    growSnake(id2);
                    points+=10;
                    pointsUpdate();
                }else{
                    growSnake(id2);
                    let tail=snakeFields.pop();
                    $("#"+tail).removeClass("snake");
                }
                if(snakeFields.length==m*n){
                    alert("Pobedili ste!")
                    endGame();
                    return;
                }
                break;
            case "right":
                checkGameEnd(x,y+1);
                let id3=x*n+y+1;
                if(id3==food){
                    $("#"+id3).text("");
                    $("#"+id3).removeClass("food");
                    food=-1;
                    growSnake(id3);
                    foodInitialization();
                    points++;
                    pointsUpdate();
                }else if(id3==superFood){
                    $("#"+id3).text("");
                    $("#"+id3).removeClass("superFood");
                    superFood=-1;
                    growSnake(id3);
                    points+=10;
                    pointsUpdate();
                }else{
                    growSnake(id3);
                    let tail=snakeFields.pop();
                    $("#"+tail).removeClass("snake");
                }
                if(snakeFields.length==m*n){
                    alert("Pobedili ste!")
                    endGame();
                    return;
                }
                break;
            case "down":
                checkGameEnd(x+1,y);
                let id4=(x+1)*n+y;
                if(id4==food){
                    $("#"+id4).text("");
                    $("#"+id4).removeClass("food");
                    food=-1;
                    growSnake(id4);
                    foodInitialization();
                    points++;
                    pointsUpdate();
                }else if(id4==superFood){
                    $("#"+id4).text("");
                    $("#"+id4).removeClass("superFood");
                    superFood=-1;
                    growSnake(id4);
                    points+=10;
                    pointsUpdate();
                }else{
                    growSnake(id4);
                    let tail=snakeFields.pop();
                    $("#"+tail).removeClass("snake");
                }
                if(snakeFields.length==m*n){
                    alert("Pobedili ste!")
                    endGame();
                    return;
                }
                break;
        }
    }

    gameInitialization();
    snakeInitialization();
    foodInitialization();
    pointsUpdate();

    //pokretanje igre na dugme Start Game
    $("#startGame").click(function(){
        if(started || ended)return;
        started=true;
        let interval;
        switch(level){
            case "easy":
                interval=300;
                break;
            case "normal":
                interval=200;
                break;
            case "hard":
                interval=100;
                break;
        }
        snakeInterval=setInterval(moveSnake,interval);
        foodInterval=setInterval(superFoodInitialization,10000);
        // disapereInterval=setInterval(superFoodDelete,15000);
    });

    //promena pravca zmijice nakon sto je igra pokrenuta
    $(document).keydown(function(event){
        if(!started || ended) return;
        switch(event.which){
            case 37:
                //left
                if(direction!="right") direction="left";
                break;
            case 38:
                //up
                if(direction!="down") direction="up";
                break;
            case 39:
                //right
                if(direction!="left") direction="right";
                break;
            case 40:
                //down
                if(direction!="up") direction="down";
                break;
        }
    });

});