$(document).ready(function(){
    let bestResults=localStorage.getItem("topResults");
    bestResults=JSON.parse(result);

    let result=localStorage.getItem("currentResult");
    result=JSON.parse(result);
    
    

    function makeCurr(){
        let row1=$("<tr></tr>");
        let row2=$("<tr></tr>");
        let cell1=$("<td></td>").text("Ime: ");
        let cell2=$("<td></td>").text(result.username);
        let cell3=$("<td></td>").text("Poeni: ");
        let cell4=$("<td></td>").text(result.points);
        row1.append(cell1);
        row1.append(cell2);
        row2.append(cell3);
        row2.append(cell4);
        
        $("#currUser").append(row1);
        $("#currUser").append(row2);
        
    }

    function listAll(){
        bestResults.forEach(element => {
            let row1=$("<tr></tr>");
            let cell1=$("<td></td>").text("Ime: ");
            let cell2=$("<td></td>").text(element.username);
            let cell3=$("<td></td>").text("Poeni: ");
            let cell4=$("<td></td>").text(element.points);
            row1.append(cell1);
            row1.append(cell2);
            row1.append(cell3);
            row1.append(cell4);
            $("#topResults").append(row1);
        });
    }

    listAll();
    makeCurr();

});