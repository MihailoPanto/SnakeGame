$(document).ready(function(){
    let bestResults=localStorage.getItem("topResults");
    bestResults=JSON.parse(bestResults);

    let result=localStorage.getItem("currentResult");
    result=JSON.parse(result);
    
    

    function makeCurr(){
        let row1=$("<tr></tr>");
        let cell1=$("<td></td>").text("Ime----"+result.username);
        
        let cell2=$("<td></td>").text("Poeni----"+result.points);
        
        row1.append(cell1);
        // row1.append($("<td></td>").text(" .......... "));
        row1.append(cell2);
        
        $("#currUser").append(row1);
    }

    function listAll(){
        bestResults.forEach(element => {
            let row1=$("<tr></tr>");
            let cell1=$("<td></td>").text("Ime----"+element.username);
            let cell2=$("<td></td>").text("Poeni----"+element.points);
            row1.append(cell1);
            // row1.append($("<td></td>").text(" .......... "));
            row1.append(cell2);
            $("#topResults").append(row1);
        });
    }

    $("#uputstvoPage").click(function(){
        window.open("zmijica-uputstvo.html", "_self");
    });

    listAll();
    makeCurr();

});