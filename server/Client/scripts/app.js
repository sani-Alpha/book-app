$(function(){

    $('.body').load('./pages/library.html');

    $('.navbar > .library').click(function(){
        $('.body').load('./pages/library.html');
    });

    $('.navbar > .about').click(function(){
        $('.body').load('./pages/about.html');
    });

    $('.navbar > .addbook').click(function(){
        $('.body').load('./pages/addBook.html');
    });

    $('.navbar > .item').click(function(){
        if(!$(this).hasClass('icon')) {
            $('.item').removeClass('active');
            $(this).addClass('active');
        }
    });

    $('.icon').click(function (){
        let x = $('.navbar');
        if (x.hasClass('navbar')) {
            x.toggleClass('responsive');
        } 
    });

    $('.home').click(function () {
        window.location.reload();
    })
});