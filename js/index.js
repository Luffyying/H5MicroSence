(function(){
    document.onreadystatechange = loading;

    var isAnimating = false;

    function loading(){

        if(document.readyState == "complete")
        {
            setTimeout(function(){
                $("#loading").hide().removeClass('page-current');
                $('.page-1-1').addClass('page-current ').removeClass('hide');
                $('#audiocontainer').show();
                playsound();
                isAnimating = true;
            },1000);
        }

    }

       //上下切换
       var now = {row: 1}, prev = {row: 0};

       function change() {
           console.log('now' + now.row + '%' + 'prev' + prev.row);
           if (isAnimating) {
               isAnimating = false;
               var prevPage = ".page-" + prev.row + "-" + 1, nowPage = ".page-" + now.row + "-" + 1;
               $(nowPage).removeClass("hide");
               $(prevPage).addClass(outClass);
               $(nowPage).addClass(inClass);
               $(nowPage).find("img").addClass("hide")
               setTimeout(function () {
                   $(prevPage).removeClass('page-current');
                   $(prevPage).removeClass(outClass);
                   $(prevPage).addClass("hide");
                   $(prevPage).find("img").addClass("hide");
                   $(nowPage).addClass('page-current');
                   $(nowPage).removeClass(inClass);
                   $(nowPage).find("img").removeClass("hide");//遍历nowpege后代中的img;
                   isAnimating = true;
               }, 600);
           }
       }

       //touch js;
       var startX, startY;
       var endX, endY;
       document.addEventListener('touchstart', function (e) {
           startX = e.touches[0].clientX;
           startY = e.touches[0].clientY;
       });
       document.addEventListener('touchmove', function (e) {
           e.preventDefault();
       });

       document.addEventListener('touchend', function (e) {
           endX = e.changedTouches[0].clientX;
           endY = e.changedTouches[0].clientY;
           var direction = getSlidDirection(startX, startY, endX, endY);
           var index;
           switch (direction) {
               case 0:
                   break;
               case 1:
                   if (isAnimating == false) {
                       return
                   }
                   prev.row = now.row;
                   if (prev.row != $('.page').size()) {
                       now.row = prev.row + 1;
                   } else {
                       now.row = 1;
                       prev.row = $('.page').size();
                   }
                   outClass = 'pt-page-moveToTop';
                   inClass = 'pt-page-moveFromBottom';
                   change();
                   break;
               case 2:
                   if (isAnimating == false) {
                       return
                   }
                   if (now.row == 1) {
                       now.row = $('.page').size();
                       prev.row = 1;
                   } else {
                       now.row = now.row - 1;
                       prev.row = now.row + 1;
                   }
                   outClass = 'pt-page-moveToBottom';
                   inClass = 'pt-page-moveFromTop';
                   change();
                   break;
           }
       });
       function getSlidDirection(startX, startY, endX, endY) {
           var dy = startY - endY;
           var dx = endX - startX;
           var result;
           var dis = getSlidDis(dx, dy);

           if (dis >= 45 && dis <= 135) {
               result = 1;
           } else if (dis >= -135 && dis <= -45) {
               result = 2;
           } else {
               return 0;
           }
           return result;
       }

       function getSlidDis(dx, dy) {
           return Math.atan2(dy, dx) * 180 / Math.PI;
       }
    var audiocontainer = $('#audiocontainer');

    function playsound() {
        if (audiocontainer != undefined) {
            audiocontainer.get(0).innerHTML = '<audio  src="' + gSound + '" id="bgsound" loop="loop" autoplay="autoplay"> </audio>';
        }
    }

    audiocontainer.on('click',function(){
        var audio = $('#bgsound').get(0);
        if(audio.paused){
            audio.play();
        }else{
            audio.pause();
        }

    });




})();