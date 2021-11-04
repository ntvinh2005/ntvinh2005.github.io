
$(document).ready(function() {
   hide()
    $(window).scroll(function(event) {
       var pos_body = $('html,body').scrollTop();
       if(pos_body>280){
          $('.back-to-top').addClass('show');
       }
       else{
          $('.back-to-top').removeClass('show');
       }
    });
    $('.back-to-top').click(function(event) {
       $('html,body').animate({scrollTop: 280},1000);
    });
 });
