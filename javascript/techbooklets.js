var containerWidth = $(flipbookContainer).width();
$("#flipbook").turn({
    width: containerWidth,
    height: containerWidth/1.5,
    autoCenter: false
});

var flipbookEL = document.getElementById('flipbook');
    window.addEventListener('resize', function (e) {
    var temp = parseInt(flipbookEL.style.width);

    flipbookEL.style.width = '';
    flipbookEL.style.height = '';

    $(flipbookEL).turn('size', flipbookEL.clientWidth, temp/1.5);
});



