(function (j) {
    var w = '<div id="siBar-wrapper" class="v3"><!--[if lte IE 8]><div class="ie8"><![endif]--><ul class="inner"><li id="siBar-sicom" class="nav-item sicom"><div class="sport-site"></div></li><li id="siBar-social-facebook" class="nav-item facebook"><div class="icon"><a href="#" target="_blank"></a></div></li><li id="siBar-social-twitter" class="nav-item twitter"><div class="icon"><a href="#" target="_blank"></a></div></li><li id="siBar-top-stories" class="nav-item"><a href="#" target="_self"><span>Top Stories</span></a></li><li id="siBar-blogs" class="nav-item"><a href="#" target="_self"><span>Blogs</span></a></li><li id="siBar-extramustard" class="nav-item"><a href="#" target="_self"><span>Extra Mustard</span></a><div id="siBar-extramustard-drop" class="story-drop dropdown"><div class="lip"></div></div></li><li id="siBar-edge" class="nav-item"><a href="#" target="_blank"><span>Edge</span></a></li><li id="siBar-swim" class="nav-item"><a href="#" target="_self"><span>Swimsuit</span></a></li><li id="siBar-more" class="nav-item more"><span>Partners</span> </li><li id="siBar-newsletter" class="nav-item newsletter"><span>Newsletter</span></li><li id="siBar-magazine" class="nav-item magazine"><a href="#" target="_blank"><span>Magazine</span></a></li></ul><!--[if IE]></div><![endif]--></div>',
        x = (window.location.hostname.match(/turner\.com|siblogs\.com/i)) ? "dev" : "prod",
        s = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent),
        f = (x === "dev") ? "http://sipreview.turner.com:84" : "http://sportsillustrated.cnn.com",
        t = (x === "dev") ? "/.element/ssi/sibar/siBar.json.html" : "/.element/ssi/sibar/siBar.json.html",
        h = "",
        y = "nbar_si",
        o = "nbar_top_dd",
        n = "nbar_blogs_dd",
        A = "nbar_em_dd",
        r = "nbar_fn_dd",
        a = "nbar_swim_dd",
        e = "",
        u = (function () {
            if (typeof j().on === "function") {
                return "on";
            } else {
                if (typeof j().live === "function") {
                    return "live";
                } else {
                    if (typeof j().bind === "function") {
                        return "bind";
                    }
                }
            }
        }()),
        d, z, g, b, m, q, p, c, k, v, l;
    v = function () {
        j("body").prepend(w);
        var ref = document.referrer;
        if (ref.match(/^https?:\/\/([^\/]+\.)?aol\.com(\/|$)/i)) {
            var aolBar = '<div id="aol" style="top:0px"><a href="' + ref + '"><img src="http://i.cdn.turner.com/si/.element/img/4.2/global/back-to-aol.png" alt="Back to AOL"></a></div>';
            $('body').prepend(aolBar);
            $('#siBar-wrapper').css('top', 32);
            $('#aol').css('top', 0);
            $('#aol').css('position', 'absolute');
            $('.cnnPage').css('margin-top', 64);
            $('#wrapper-content').css('margin-top', 32);
        }
        j.getScript(f + t);
    };
    window.siBar_loadData = function (D) {
        var C, F, E, B;
        z(D.more);
        g();
        b();
        p(D.subscribe);
        c(D.sicom);
        k(D.topstories, "top-stories");
        m(D.extramustard, "extramustard");
        m(D.swimDaily, "swimdaily");
        k(D.fannation, "fannation");
        d(D.swimModels, D.swimDaily);
        F = j("#siBar-newsletter-submit");
        E = j("#siBar-newsletter-input");
        B = j("#siBar-newsletter-validation");
        F[u]("click", function (G) {
            var H = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
            B.css("visibility", "hidden");
            if (!E.val().match(H)) {
                B.css("visibility", "visible");
                G.preventDefault();
            }
            return true;
        });
    };

    function i(B) {
        if ((B.indexOf("sportsillustrated.cnn.com") !== -1) || (B.indexOf("si.com") !== -1)) {
            h = "?sct=";
        } else {
            h = "?xid=";
        }
    }



    c = function (D) {
        var B = j("#siBar-sicom-drop"),
            C, E;
        D.image = "sibar-logo-v2.png";
        E = '<a href="' + D.url + '" title="' + D.title + "?sct=" + y + '" target="_self" class="si-logo"></a>';
        j("#siBar-sicom").prepend(E);
        C = '<ul class="drop-nav">';
        j.each(D.navigation, function (F, G) {
            C += '<li><a href="' + G.url + '" target="_self">' + G.title + "</a></li>";
        });
        C += "</ul>";
        B.prepend(C);
    };
    p = function (B) {
        j("#siBar-subscribe-link").attr("href", B.url);
    };
    k = function (F, D) {
        var B, E, C;
        C = (D === "fannation") ? "_blank" : "_self";
        B = j("#siBar-" + D + "-drop");
        if (D === "fannation") {
            e = r;
        } else {
            e = o;
        }
        E = '<ul class="drop-nav">';
        j.each(F, function (G, H) {
            i(H.link);
            if (G === 0) {
                E += '<li class="topstory story"><a href="' + H.link + h + e + '" target="' + C + '"><div class="thumb"><img src="' + H.image + '"/></div><div class="story"><div class="timestamp">' + H.date + '</div><h2 class="headline">' + H.title + "</h2></div></a><li>";
            } else {
                E += ((G === (F.length - 1)) ? '<li class="story last">' : '<li class="story">') + '<a href="' + H.link + h + e + '" target="' + C + '"><div class="timestamp">' + H.date + '</div><h3 class="headline">' + H.title + "</h3></a></li>";
            }
        });
        E += "</ul>";
        B.prepend(E);
    };
    q = function (G) {
        var C = function (K, J) {
                return Math.floor(Math.random() * (J - K + 1)) + K;
            },
            E = [],
            I = [],
            H = G,
            B = 4,
            F = "",
            D;
        while (E.length < B) {
            D = C(0, (H.length - 1));
            if (j.inArray(D, I) === -1) {
                E.push(H[D]);
                I.push(D);
            }
        }
        j.each(E, function (J, K) {
            F += '<div class="model-wrapper"><a href="http://sportsillustrated.cnn.com' + K.uri + "?sct=" + a + '" title="' + K.name + '" target="_self"><div class="model"><img class="image" src="' + K.image + '"/><span class="name">' + K.name + "</span></div></a></div>";
        });
        return F;
    };

    z = function (D) {
        var B = j("#siBar-more-drop"),
            C;
        C = '<ul class="drop-nav">';
        j.each(D, function (E, F) {
            C += '<li><a href="' + F.url + '" target="_blank">' + F.name + "</a></li>";
        });
        C += "</ul>";
        B.prepend(C);
    };
    if (typeof j !== "function" || (j() === null || typeof j().jquery === "undefined")) {
        throw new Error("SI Network Bar requires jQuery v1.0 or higher");
    }
    j(document).ready(function () {
        if (s && window.location.hostname.match(/college\-basketball\.si\.com/)) {
            return;
        }
        v();
    });
}(jQuery));
