$('.main,.tip_msg').css('height', $(window).height());
$('.tip_msg').css('width', $(window).width());
var count = 0;
$('#download').click(function () {
    if (count == 0) {
        console.log(123);
        _hmt.push(['_trackEvent', 'software', 'download', 'bibicoin']);
        var u = navigator.userAgent;
        var ua = navigator.userAgent.toLowerCase();
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (ua.match(/MicroMessenger/i) == "micromessenger") { //微信内置浏览器
            $('.tip_msg').show();
            if (isAndroid) { //安卓系统
                $('.tip p').html('请点击右上角<br>选择"在浏览器中打开"')
            }
            if (isiOS) { //ios系统
                $('.tip p').html('请点击右上角<br>选择"在Safari中打开"')
            }
        } else {
            if (isAndroid) { //安卓系统
                window.location.href =
                    'http://bibicoin.io/download/bibicoin.apk';
            }
            if (isiOS) { //ios系统
                window.location.href =
                    'https://testflight.apple.com/join/hn49jUgD';
            }
        }
        count = 1;
    }else{
        return;
    }
    
})

$('.tip_msg').click(function () {
    $(this).hide();
    return false;
})