function move(distance){
    $('html,body').animate({scrollTop: distance},1000);
    alert(pos_body);
}

$(document).ready(function() {
    $(window).scroll(function(event) {
       var pos_body = $('html,body').scrollTop();
       if(pos_body>120){
          $('.back-to-top').addClass('hien-ra');
       }
       else{
          $('.back-to-top').removeClass('hien-ra');
       }
    });
    $('.back-to-top').click(function(event) {
       $('html,body').animate({scrollTop: 0},1000);
    });
 });

 function show(item){
     var div=$(item).children('div')[0]
     var img=$(div).children('img')[0]
     let showImage=$('img.zoom-image');
     var filename = img.src.replace(/^.*[\\\/]/,'');
     showImage[0].src='image/' + filename;
     let showContainer=$('.showContainer')
     showContainer.show(400);
 }

 function hide(){
     let showContainer=$('.showContainer')
     showContainer.hide(400);
 }
 