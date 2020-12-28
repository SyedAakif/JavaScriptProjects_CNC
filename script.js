$(document).ready(function(){
    $(window).scroll(function(){
        if(this.scrollY > 20){
            $('.nav-bar').addClass("sticky");
        } else {
            $('.nav-bar').removeClass("sticky");
        }
        if (this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        } else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script 
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop:0});
    });
    

    // Toggle menu/nav-bar script 
    $('.menu-btn').click(function(){
        $('.nav-bar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    })

    // Typing animation script
    var typed = new Typed(".typing",{
        strings: ["Mechanical Engineer", "Developer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2",{
        strings: ["Mechanical Engineer", "Developer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });
  
    // // Owl-crousel Script 
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            },
        }
    });
})