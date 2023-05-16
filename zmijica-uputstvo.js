var Game={
    table:"midle",
    level:"normal"
};

$(document).ready(function(){



    $("#Igraj").click(function(){
        let tb=$("input[name='table']:checked").val();
        let lv=$("input[name='level']:checked").val();
        if(tb && lv){
            Game.table=tb;
            Game.level=lv;
            window.open("zmijica-igra.html");
        }
        
        
    });

});