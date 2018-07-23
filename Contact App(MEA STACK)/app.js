app=angular.module("myapp",[]);
app.controller("c1",function ($scope,$http) {
    $scope.insertiont=true;
    $scope.insertion=true;
    $scope.editing=false;
    $scope.done=false;
    $scope.imgfile="defult.png";
    $scope.getdata=function () {
        $http.get("getrec").then(function(dt){
                $scope.userdata=dt.data;
        })
    };
    $scope.getdata();




    $scope.funins=function(){
        if(!$scope.txtname ||!$scope.txtgender||!$scope.txtcity||!$scope.txtphone) {
            alert("You Must fill All the details")
        }
        else if(!$scope.txtemail){
            alert("You type a wrong pattern of Email")
        }
        else {
            obj = {
                name: $scope.txtname,
                gender: $scope.txtgender,
                city: $scope.txtcity,
                phone: $scope.txtphone,
                email: $scope.txtemail,
                piclink: $scope.txtpic
            };
            $http({
                method: "post", url: "insrec", data: obj
            }).then(function (dt) {
                alert(dt.data);
                $scope.getdata();
                $scope.txtname = null;
                $scope.txtcity = null;
                $scope.txtgender = null;
                $scope.txtphone = null;
                $scope.txtemail = null;


            })
        }

    };
    $scope.showdata=function (index) {
        $scope.yo=index;
        $scope.insertiont=false;
        $scope.insertion=false;
        $scope.editing=true;
        $scope.done=false;
        $scope.shname=$scope.userdata[index].name;
        $scope.shcity=$scope.userdata[index].city;
        $scope.shphone=$scope.userdata[index].phone;
        $scope.shemail=$scope.userdata[index].email;
        $scope.shgender=$scope.userdata[index].gender;

    };
    $scope.funedit=function () {
        $scope.done=true;
        $scope.editing=false;
        $scope.insertiont=true;
        $scope.txtname = $scope.shname;
        $scope.txtcity = $scope.shcity;
        $scope.txtgender = $scope.shgender;
        $scope.txtphone = $scope.shphone;
        $scope.txtemail = $scope.shemail;
        $scope.oldname = $scope.shname;
        $scope.oldcity = $scope.shcity;
        $scope.oldgender = $scope.shgender;
        $scope.oldphone = $scope.shphone;
        $scope.oldemail = $scope.shemail;
        $scope.shname=null;
        $scope.shcity=null;
        $scope.shphone=null;
        $scope.shemail=null;
        $scope.shgender=null;



    };
    $scope.funclear=function () {
        $scope.txtname = null;
        $scope.txtcity = null;
        $scope.txtgender = null;
        $scope.txtphone = null;
        $scope.txtemail = null;
    };
    $scope.fundelete=function(un){
        $scope.ob={name:un};
        $http({
            url:"delrec",method:"post",data:$scope.ob
        }).then(function(dtt){
            alert(dtt.data);
            $scope.getdata();
            $scope.shname=null;
            $scope.shcity=null;
            $scope.shphone=null;
            $scope.shemail=null;
            $scope.shgender=null;
            $scope.insertiont=true;
            $scope.insertion=true;
            $scope.editing=false;
            $scope.done=false;
        })
    };
    $scope.funupdate=function () {
        if(!$scope.txtname ||!$scope.txtgender||!$scope.txtcity||!$scope.txtphone) {
            alert("You Must fill All the details")
        }
        else if(!$scope.txtemail){
                alert("You type a wrong pattern of Email")
            }
        else{
            $scope.obj12=[{
            name: $scope.oldname,
            gender: $scope.oldgender,
            city: $scope.oldcity,
            phone: $scope.oldphone,
            email: $scope.oldemail
        },{
            name: $scope.txtname,
            gender: $scope.txtgender,
            city: $scope.txtcity,
            phone: $scope.txtphone,
            email: $scope.txtemail
        }];
        $http({
            url:"updaterec",method:"post",data:$scope.obj12
        }).then(function(dtt){
            $scope.getdata();
            $scope.shname=$scope.txtname;
            $scope.shcity=$scope.txtcity;
            $scope.shgender=$scope.txtgender;
            $scope.shphone=$scope.txtphone;
            $scope.shemail=$scope.txtemail;
            $scope.insertiont=false;
            $scope.insertion=false;
            $scope.editing=true;
            $scope.done=false;
            $scope.funclear();
            alert(dtt.data);

        });



    }}


});