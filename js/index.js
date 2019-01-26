// 设备屏幕宽度
var winWidth = $(window).width();
// 设备屏幕高度
var winHeight = $(window).height();
// 滑动出去的距离
var scrollTop = $(window).scrollTop();
// 导航点
var Lis = [$('#menu>ul>li:nth-child(1)'),'',$('#menu>ul>li:nth-child(3)'),$('#menu>ul>li:nth-child(2)'),$('#menu>ul>li:nth-child(4)'),$('#menu>ul>li:nth-child(5)')];
//翻屏变量，初始第一屏
var i = 0;
//该变量作用是鼠标滑轮一直向下或者向上滑动时出现抖动现象
var s = 0;
var starttime = 0,
    endtime = 0;
page_resize()
heightFiexd()
// phone下拉导航,语言切换toggle
$('#more').click(function () {
    $('#menu').toggle();
})
$('.select').click(function () {
    $('.languages').toggle()
    $('.select>span').toggleClass('rotate180')
})
$('.pc_language').on('click', 'li', function () {
    $(this).parent().siblings().html($(this).text() + '<span></span>');
    $('.pc_language .languages').hide()
    return false;
})
$('.phone_language').on('click', 'li', function () {
    $(this).parent().siblings().html($(this).text() + '<span></span>');
    $('.phone_language .languages').hide()
    return false;
})
// 联系我们板块鼠标移上去显示二维码
$('#contact').on('click', '.wechat', function () {
    $('.serve_wechat').toggle();
})
// PC端窗口缩放样式自适应
$(window).resize(function () {
    var winWidth = $(window).width();
    var winHeight = $(window).height();
    if (winWidth > 768) {
        window.location.reload();
    }
    page_resize();
})
// 滚动时动画执行
$(document).scroll(function () {
    if (winWidth < 768 && $(window).scrollTop() > 1000) {
        $('.go_up').show();
    } else {
        $('.go_up').hide();
    }
    if (winWidth > 1170) {
        page_animate();
    }
})
// app 下载
var u = navigator.userAgent;
var ua = navigator.userAgent.toLowerCase();
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
$('#ios').click(function () {
    if (ua.match(/MicroMessenger/i) == "micromessenger") { //微信内置浏览器
        window.location.href = 'http://bibicoin.io/download.html';
    } else {
        if (isIOS) { //ios系统
            window.location.href = 'https://testflight.apple.com/join/hn49jUgD';
        }else{
            alert('请使用苹果手机下载');
            return;
        }
    }
})
$('#android').click(function () {
    _hmt.push(['_trackEvent', 'software', 'download', 'bibicoin']);
    if (ua.match(/MicroMessenger/i) == "micromessenger") { //微信内置浏览器
        window.location.href = 'http://bibicoin.io/download.html';
    } else {
       if(isIOS){
            alert('请使用安卓手机下载');
            return;
        }else{
            window.location.href = 'http://bibicoin.io/download/bibicoin.apk';
        }
    }
})
// 锚点跳转
$('#menu>ul>li:not(.btns)').click(function () {
    i = $(this).index();
    if (i == 1) {
        i = 3;
    } else if (i == 3) {
        i = 4;
    } else if (i == 4) {
        i = 5;
    }
    if (winWidth > 1170) {
        $('body,html').stop().animate({
            scrollTop: i * (winHeight - 80)
        }, 1000);
    }

    $('#menu>ul>li:not(.btns)').removeClass('active');
    $(this).addClass('active')
})
// PC端每次滑动翻一屏
$('#main').mousewheel(function (event, delta) {
    if (winWidth > 1170) {
        // 记录翻屏的初始时间
        starttime = new Date().getTime();
        // 下移
        if (delta < 0 && i >= 0 && i <= 5) {
            //在500ms内执行一次翻屏
            if (s >= 0 && (starttime == 0 || (endtime - starttime) <= -500)) {
                s = 1;
                i++;
                if (i > 5) {
                    i = 5
                }
                // 翻屏
                renderPage(i, true);
                //记录翻屏的结束时间
                endtime = new Date().getTime();
                if (i != 1) {
                    $('#menu li').removeClass('active');
                    Lis[i].addClass('active')
                }
            }
            // 上移
        } else if (delta > 0 && i >= 1 && s == 1 && (starttime == 0 || (endtime - starttime) <= -500)) {
            i--;
            if (i < 0) {
                i = 0
            }
            renderPage(i, true);
            endtime = new Date().getTime();
            if (i != 1) {
                $('#menu li').removeClass('active');
                Lis[i].addClass('active')
            }
        }
    }
});
// PC端翻屏原理----改变scrollTop的高度
function renderPage(pageNumber, isScroll) {
    if (isScroll) {
        $('body,html').stop().animate({
            scrollTop: pageNumber * (winHeight - 80)
        }, 1000);
        page_animate();
        return false;
    }
    return;
}
// 屏幕宽度大于1170时高度每一屏的固定
function heightFiexd() {
    if (winWidth > 1170) {
        $('#home,#page,#service,#download,#about').css('height', winHeight - 80);
    } else {
        $('#page>div .right>img').attr('src', '../img/bg2.png?v=201901220001');
    }
}
// PC端屏幕缩放时导航以及语言下拉切换
function page_resize() {
    $('#menu>ul>li>a').click(function () {
        if (winWidth <= 1170) {
            $('#menu').css('display', 'none');
        }
    })
    $('.page_btn>a').click(function () {
        if (winWidth <= 1170) {
            $('#menu').css('display', 'none');
        }
    })
    heightFiexd();
}
// 封装页面动画
function page_animate() {
    if (i == 0) {
        $('#home h1').removeClass("noaniamte").addClass('animated bounceInDown')
        $('#home p').removeClass("noaniamte").addClass('animated bounceInUp')
    } else if (i == 1) {
        $('#page .left').removeClass("noaniamte").addClass('animated bounceInRight')
    } else if (i == 2) {
        $('#service h1').removeClass("noaniamte").addClass('animated zoomIn')
        $('#service p').removeClass("noaniamte").addClass('animated zoomIn')
        $('#service .card>div>.logo').removeClass("noaniamte").addClass('animated rotateIn')
    } else if (i == 3) {
        $('#download .right').removeClass("noaniamte").addClass('animated rollIn')
    } else if (i == 4) {
        $('#about>div').removeClass("noaniamte").addClass('animated bounceIn')
    } else if (i == 5) {
        $('#contact .rotate').removeClass("noaniamte").addClass('animated wobble')
    }
}
// 微信分享
