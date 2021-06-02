var app = angular.module("myapp",["ngRoute"]);
    app.config(function($routeProvider){
      $routeProvider
      .when("/quiz/:idSub/:nameSub",{templateUrl:"quiz111.html", controller:"quizctrl"})
      .when("/gioithieu",{templateUrl:"gioithieu.html"})
      .when("/diachi",{templateUrl:"diachi.html"})
      .when("/gopy",{templateUrl:"gopy.html"})
      .when("/hoidap",{templateUrl:"hoidap.html"})
      .when("/dangnhap",{templateUrl:"dangnhap.html", controller:"loginctrl"})
      .when("/dangky",{templateUrl:"dangky.html", controller:"regisctrl"})
      .when("/quenmk",{templateUrl:"quenmk.html", controller:"forgetctrl"})
      .when("/doimk",{templateUrl:"doimk.html", controller:"changepassctrl"})
      .when("/capnhat",{templateUrl:"capnhat.html", controller:"updatectrl"})
      .otherwise({templateUrl:"layout111.html"})
    });
    app.controller("myctrl", function($scope,$http){
        $scope.listMon = [];
        $http.get("js/Subjects.js").then(function(d){
          $scope.listMon = d.data;
        });
        $scope.start = 0;
        $scope.tiep= function(){
          $scope.start +=4;
        }
        $scope.lui=function(){
          $scope.start -=4;
        }
        $scope.dau=function(){
          $scope.start=0;
        }
        $scope.cuoi=function(){
          $scope.start = (Math.ceil($scope.listMon.length / 4) -1) * 4;
        }
    });
    app.controller("quizctrl", function($scope, $http, $routeParams){
        $scope.listquiz=[];
        $scope.idMH = $routeParams.idSub;
        $scope.tenMH = $routeParams.nameSub;
        $http.get("js/Quizs/" + $scope.idMH +".js").then(
            function(d){ 
              $scope.listquiz = d.data;
            },
            function(d) {alert("Lỗi");}
        );
        $scope.diem=0;
        $scope.check = function(index){
          if($scope.dapan == $scope.listquiz[index].AswerId){
            $scope.diem+=1;
          }
        }
        $scope.count = 0;
        $scope.end = $scope.listquiz.length - 1;
        $scope.first = function(){
            $scope.count = 0;
        }
        $scope.last= function(){
            $scope.count = $scope.end;
        }
        $scope.next = function(){
            $scope.count +=1;
            if($scope.count == $scope.end)
                $scope.count = 0;
        }
        $scope.back = function(){
            $scope.count -=1;
        }
        // Set the date we're counting down to
        var countDownDate = new Date().getTime() + 15 * 60 * 1000;

        // Update the count down every 1 second
        var x = setInterval(function() {

          // Get today's date and time
          var now = new Date().getTime();

          // Find the distance between now and the count down date
          var distance = countDownDate - now;

          // Time calculations for hours, minutes and seconds
          var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);

          // Display the result in the element with id="demo"
          document.getElementById("count").innerHTML =  hours + ":"
          + minutes + ":" + seconds;

          // If the count down is finished, write some text
          if (distance < 0) {
            clearInterval(x);
            document.getElementById("count").innerHTML = "Hết giờ";
          }
        }, 1000);
    });
    app.controller("loginctrl", function($scope, $http){
        $scope.listusers = [];
        $http.get("js/Students.js").then(
            function(d){ $scope.listusers = d.data; }
        );
        $scope.login= function(){
          var tk = sessionStorage.getItem("emaildangky");
          var mk = sessionStorage.getItem("matkhau");
            var e = $scope.e;
            var p = $scope.p;
            var tt = false;
            var user;
            if(e==tk && p==mk){
              sessionStorage.setItem("email",tk);
              Swal.fire(
                'Đăng nhập thành công!',
                'Chào mừng!',
                'success'
              )
              location.replace("Index.html");     
            }else{
              for(i=0; i < $scope.listusers.length; i++){
                user = $scope.listusers[i];
                if(e==user.email && p==user.password){
                tt=true;
                break;
                }
              }
            }
            if(tt){
                sessionStorage.setItem("email",user.email);
                sessionStorage.setItem("hoten",user.fullname);
                sessionStorage.setItem("taikhoan",user.username);
                sessionStorage.setItem("gioitinh",user.gender);
                sessionStorage.setItem("ngaysinh",user.birthday);
                sessionStorage.setItem("hocphi",user.schoolfee);
                sessionStorage.setItem("diem",user.marks);
              Swal.fire(
                'Đăng nhập thành công!',
                'Chào mừng!',
                'success'
              )
                location.replace("Index.html");
            }else{
              Swal.fire(
                'Đăng nhập thất bại!',
                'Kiểm tra lại email và mật khẩu!',
                'error'
              )
            }
          }
    });
    app.controller("regisctrl", function($scope, $http){
        $scope.users = [];
        $http.get("js/Students.js").then(
            function(d){ $scope.users = d.data; }
        );
        $scope.regis = function(){
          var p = $scope.user.password;
          var rp = $scope.repass;
          var one;
          if(p == rp){
            one = $scope.user
            $scope.users.push(angular.copy($scope.user));
            sessionStorage.setItem("emaildangky", one.email);
            sessionStorage.setItem("matkhau", one.password);
            Swal.fire({
              title: 'Đăng ký thành công!',
              text: "Bạn có muốn chuyển sang trang Đăng nhập ?",
              icon: 'success',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes'
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.replace("#!dangnhap");
                window.close();
              }
            })            
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Mật khẩu không trùng khớp',
              footer: 'Mời kiểm tra lại mật khẩu'
            })            
          } 
        }
    });
    app.controller("forgetctrl", function($scope, $http){
        $scope.listusers = [];
        $http.get("js/Students.js").then(
            function(d){ $scope.listusers = d.data; }
        );
        $scope.forget= function(){
            var e = $scope.e;
            var p;
            var tt = false;
            for(i=0; i < $scope.listusers.length; i++){
              if(e==$scope.listusers[i].email){
                p= $scope.listusers[i].password
                tt=true;
                break;
              }
            }
            if(tt){
              Swal.fire({
                title: 'Mật khẩu của bạn là ' + p,
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Không tồn tại email!'
              })            
            }
          }
    });
    app.controller("changepassctrl", function($scope, $http){
        $scope.listusers = [];
        $http.get("js/Students.js").then(
            function(d){ $scope.listusers = d.data; }
        );
        $scope.update = function(){
          for(i=0; i < $scope.listusers.length; i++){
            var p = $scope.user.password;
            var rp = $scope.repass;
            if($scope.user.email==$scope.listusers[i].email){
              if($scope.oldpassword==$scope.listusers[i].password){
                if(p == rp){
                  $scope.listusers[$scope.index] = angular.copy($scope.user);
                  Swal.fire({
                    title: 'Đổi mật khẩu thành công!',
                    text: "Bạn có muốn chuyển sang trang Đăng nhập ?",
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes'
                  }).then((result) => {
                      if (result.isConfirmed) {
                        window.location.replace("#!dangnhap");
                        window.close();
                      }
                    })        
                }else{
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Mật khẩu không trùng khớp',
                    footer: 'Mời kiểm tra lại mật khẩu'
                  })            
                } 
              }else{
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Mật khẩu cũ không chính xác!'
                })           
              }         
              break;
            }else{
              Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Không tồn tại email!'
            })        
            }
          } 
        }
    });
    app.controller("updatectrl", function($scope, $http){
        var e = sessionStorage.getItem("email");
        if(e!="") $scope.email = e;
        var ht = sessionStorage.getItem("hoten");
        if(ht!="") $scope.fullname = ht;
        var tk = sessionStorage.getItem("taikhoan");
        if(tk!="") $scope.username = tk;
        var gt = sessionStorage.getItem("gioitinh");
        if(gt!="") $scope.gender = gt;
        var ns = sessionStorage.getItem("ngaysinh");
        if(ns!="") $scope.date = ns;
        var hp = sessionStorage.getItem("hocphi");
        if(hp!="") $scope.fee = parseFloat(hp);
        var diem = sessionStorage.getItem("diem");
        if(diem!="") $scope.mark = parseFloat(diem);
        $scope.listusers = [];
        $http.get("js/Students.js").then(
          function(d){ $scope.listusers = d.data; }
        );
        $scope.update = function(){
          var check = 0;
          for(i=0; i < $scope.listusers.length; i++){
            if(e==$scope.listusers[i].email){
              $scope.listusers[i].username = tk;
              $scope.listusers[i].fullname = ht;
              $scope.listusers[i].gender = gt.toString();
              $scope.listusers[i].birthday = ns;
              $scope.listusers[i].schoolfee = hp.toString();
              $scope.listusers[i].marks = diem.toString();
              check = 1;
              break;
            }
          }
          if(check == 1){
            Swal.fire(
              'Cập nhật thành công!',
              'Chúc mừng!',
              'success'
            )
          }
          else{
            Swal.fire(
              'Cập nhật thất bại!',
              'Hơi xui :(( !',
              'error'
            )
          }
        }
    });