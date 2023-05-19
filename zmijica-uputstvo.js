$(document).ready(function(){

    $("#Results").click(function(){
        window.open("zmijica-rezultati.html", "_self");
    })

    $("#Igraj").click(function(){
        let tb=$("input[name='table']:checked").val();
        let lv=$("input[name='level']:checked").val();
        if(tb && lv){
            localStorage.setItem("table",tb);
            localStorage.setItem("level",lv)


            // window.open("zmijica-igra.html");
            window.open("zmijica-igra.html" ,"_self");
        }
        
        
    });

});