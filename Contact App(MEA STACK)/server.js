exp=require("express");
mj=require("mongojs");
bp=require("body-parser");
app=exp();
app.use(bp.json());
app.listen(3000);
app.use(exp.static(__dirname));
app.use(bp.json());
console.log("started at port no 3000.....");
con=mj("mongodb://prosnady04:bumba9093@ds129051.mlab.com:29051/new_user");

////getdata
app.get("/getrec",function(req,res){
    con.Student.find(function(err,result){
        if(err)
            res.send(err);
        else
            res.send(result);
    })
});

///insertdata
app.post("/insrec",function(req,res){
    var reqdt=req.body;
    con.Student.insert(reqdt);
    res.send("Inserted")
});



//////////delete
app.post("/delrec",function(req,res){
    con.Student.remove(req.body,function(){
        res.send("Deleted");
    })

});


/////////updaterec
app.post("/updaterec",function (re,rs) {
    var dat=re.body;
    con.Student.update(dat[0],dat[1]);
    rs.send("Update");

});