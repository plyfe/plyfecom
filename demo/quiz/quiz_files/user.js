
var BF_Quiz = function () {
        this.quizes = {};
        this.answerResponse = "#{a} is the correct answer.";
        this.init = function () {
            var b = $(document.body)[bfjs.selector]("#buzz_sub_buzz .quiz");
            bfjs.universal_each(b, function (d, m) {
                var k = $(d)[bfjs.read_attr]("rel:quiz_type");
                var c = $(d)[bfjs.read_attr]("rel:id");
                var f = $(d)[bfjs.read_attr]("rel:swap") == "1" ? true : false;
                var g = $(d)[bfjs.selector](".quiz_question");
                var j = (k == "single question") ? ".quiz_reveal" : ".quiz_result";
                var h = $(d)[bfjs.selector](j);
                var e = $(d)[bfjs.read_attr]("rel:question_count");
                var l = $(d)[bfjs.selector](".quiz_result_area").first();
                bf_quiz.quizes[m] = {};
                bf_quiz.quizes[m]["id"] = c;
                bf_quiz.quizes[m]["type"] = k;
                bf_quiz.quizes[m]["swap"] = f;
                bf_quiz.quizes[m]["el"] = $(d);
                bf_quiz.quizes[m]["questions"] = {};
                bf_quiz.quizes[m]["results"] = {};
                bf_quiz.quizes[m]["question_count"] = e;
                bf_quiz.quizes[m]["quiz_result_area_el"] = l;
                bf_quiz.quizes[m]["completed"] = false;
                bf_quiz.quizes[m]["result_verb"] = $(d)[bfjs.read_attr]("rel:result_verb");
                bf_quiz.quizes[m]["result_subject"] = $(d)[bfjs.read_attr]("rel:result_subject");
                bf_quiz.quizes[m]["answer_positions"] = [];
                bf_quiz.quizes[m]["el"][bfjs.add_class](bf_quiz.quizes[m]["type"].replace(" ", "_") + "_quiz");
                if (bf_quiz.isChecklist(bf_quiz.quizes[m]["type"])) {
                    bf_quiz.quizes[m].el[bfjs.selector](".show_results").first()[bfjs.observer]("click", function (n) {
                        $(n.target)[bfjs.up](".show_results_container").hide();
                        bf_quiz.quiz_shares(bf_quiz.quizes[m]);
                        bf_quiz.show_results(bf_quiz.quizes[m]);
                        bf_quiz.quiz_complete(bf_quiz.quizes[m]);
                        bfjs.universal_each(bf_quiz.quizes[m].questions[0].answers, function (p, o) {
                            if ($(p)[bfjs.has_class]("selected")) {
                                return
                            }
                            bfjs.toggleClass(p, "deactivated", true)
                        })
                    })
                }
                bfjs.universal_each(g, function (s, u) {
                    var n = $(s)[bfjs.read_attr]("rel:id");
                    var z = $(s)[bfjs.selector](".quiz_answer");
                    var w = $(s)[bfjs.selector](".quiz_reveal");
                    var p = $(s)[bfjs.read_attr]("rel:question_type");
                    var t = bf_quiz.quizes[m]["questions"];
                    t[u] = {};
                    t[u]["id"] = n;
                    t[u]["el"] = $(s);
                    t[u]["answers"] = z;
                    t[u]["image"] = $(s)[bfjs.selector](".quiz_img").first();
                    t[u]["reveal"] = w;
                    t[u]["type"] = p;
                    t[u]["response"] = null;
                    t[u]["correct"] = null;
                    t[u]["personality_index"] = null;
                    var o = $(s)[bfjs.selector](".quiz_un_reveal");
                    if (o.length > 0) {
                        o.first()[bfjs.observer]("click", function (H) {
                            var B = $(t[u]["image"])[bfjs.read_attr]("rel:question_src");
                            var F = $(t[u]["image"])[bfjs.read_attr]("rel:reveal_src");
                            var A = $(t[u]["image"])[bfjs.read_attr]("src");
                            var C = $(t[u]["image"])[bfjs.read_attr]("rel:attr");
                            var E = $(t[u]["image"])[bfjs.read_attr]("rel:reveal_attr");
                            var G = $(t[u]["image"])[bfjs.up]()[bfjs.selector](".buzz_attribution").first();
                            var D = "";
                            if (F && A == F) {
                                $(t[u]["image"])[bfjs.write_attr]("src", B);
                                if (C) {
                                    D = C
                                }
                                $(H.target)[bfjs.update_html]("Show new image")
                            } else {
                                if (F) {
                                    if (E) {
                                        D = E
                                    }
                                    $(t[u]["image"])[bfjs.write_attr]("src", F);
                                    $(H.target)[bfjs.update_html]("Show original image")
                                }
                            }
                            if (G) {
                                G[bfjs.update_html](D)
                            }
                        })
                    }
                    bfjs.universal_each(z, function (B, A) {
                        var C = $(B);
                        C[bfjs.observer]("mouseover", function (E) {
                            var D = E || window.event;
                            if (!E.relatedTarget && E.fromElement) {
                                E.relatedTarget = E.fromElement === E.target ? E.toElement : E.fromElement
                            }
                            if ((E.relatedTarget && $(E.relatedTarget)[bfjs.up](".quiz_answer") == B) || B === t[u].response) {
                                return
                            }
                            if (B === t[u].response || (bf_quiz.isChecklist(bf_quiz.quizes[m].type) && C[bfjs.has_class]("selected"))) {
                                return
                            }
                            bf_quiz.style(0, t[u], B)
                        });
                        C[bfjs.observer]("mouseout", function (E) {
                            var D = E || window.event;
                            if (!E.target) {
                                E.target = E.srcElement || document
                            }
                            if (!E.relatedTarget && E.fromElement) {
                                E.relatedTarget = E.fromElement === E.target ? E.toElement : E.fromElement
                            }
                            if (bf_quiz.isChecklist(bf_quiz.quizes[m].type) && C[bfjs.has_class]("selected")) {
                                return
                            }
                            if ((E.relatedTarget && $(E.relatedTarget)[bfjs.up](".quiz_answer") != B) && (E.target == B || $(E.target)[bfjs.up](".quiz_answer") == B)) {
                                bf_quiz.style(1, t[u], B)
                            }
                        });
                        C[bfjs.observer]("click", function (D) {
                            if (D.target.nodeName.toLowerCase() == "a" && $(D.target)[bfjs.up]()[bfjs.has_class]("sub_buzz_source_via")) {
                                return true
                            }
                            if (bf_quiz.isChecklist(bf_quiz.quizes[m].type)) {
                                return bf_quiz.toggleSelection(m, u, A)
                            }
                            bf_quiz.answered(m, u, A);
                            bf_quiz.submit_quiz(bf_quiz.quizes[m])
                        })
                    })
                });
                bfjs.universal_each(h, function (n, o) {
                    var s = $(n)[bfjs.read_attr]("rel:range_start");
                    var u = $(n)[bfjs.read_attr]("rel:range_end");
                    var p = bf_quiz.quizes[m]["results"];
                    var t = $(n)[bfjs.read_attr]("rel:id");
                    p[o] = {};
                    p[o]["id"] = t;
                    p[o]["el"] = $(n);
                    p[o]["range_start"] = s;
                    p[o]["range_end"] = u
                })
            })
        };
        this.style = function (b, c, f) {
            var e = (typeof window.jQuery != "undefined") ? "parents" : "up";
            var d = $(c.el)[e](".quiz")[bfjs.read_attr]("rel:quiz_type");
            if (bf_quiz.isChecklist(d)) {
                if (b == 2) {
                    bfjs.toggleClass(f, "selected", true)
                } else {
                    if (b == 1) {
                        bfjs.toggleClass(f, "selected")
                    }
                }
            }
            if ((b == 2 || b >= 4) && c.response && f == bfjs.getFirstEl(c.response)) {
                bfjs.toggleClass(f, "selected", true)
            }
            if (b == 0) {
                bfjs.toggleClass(f, "deactivated")
            } else {
                if (b == 1) {
                    if (!bfjs.universal_compare_els($(c.response), $(f))) {
                        bfjs.toggleClass(f, "selected");
                        bfjs.toggleClass(f, "def_answer");
                        if ((c.type == "text" || c.type == "image") && c.correct != null) {
                            bfjs.toggleClass(f, "deactivated", true)
                        } else {
                            bfjs.toggleClass(f, "deactivated")
                        }
                    }
                } else {
                    if (b == 2) {
                        $(f)[bfjs.add_class]("selected");
                        bfjs.toggleClass(f, "deactivated")
                    } else {
                        if (b == 4) {
                            $(f)[bfjs.add_class]("correct_answer");
                            bfjs.toggleClass(f, "deactivated")
                        } else {
                            if (b == 5) {
                                $(f)[bfjs.add_class]("wrong_answer");
                                bfjs.toggleClass(f, "deactivated", true)
                            }
                        }
                    }
                }
            }
        };
        this.toggleSelection = function (l, e, j) {
            var d = bf_quiz.quizes[l];
            var g = d.questions[e];
            var h = g.answers;
            var k = g.answers[j];
            var c = $(h[j])[bfjs.read_attr]("rel:id");
            var f = g.id;
            var b = $(k)[bfjs.has_class]("selected") ? 1 : 2;
            bf_quiz.style(b, g, k);
            if (b == 2) {
                bf_quiz.gaTrack("[ttp]:content", "quiz-answer", [f, c].join("="))
            }
        };
        this.answered = function (k, e, j) {
            var d = bf_quiz.quizes[k];
            var g = d.questions[e];
            var h = g.answers;
            var c = $(h[j])[bfjs.read_attr]("rel:id");
            var f = g.id;
            var b = 1;
            d.answer_positions[e] = j;
            g.response = $(h[j]);
            g.correct = $(g.response)[bfjs.read_attr]("rel:correct") == "1" ? true : false;
            g.personality_index = $(g.response)[bfjs.read_attr]("rel:personality_index");
            bfjs.universal_each(h, function (l) {
                b = l === bfjs.getFirstEl(g.response) ? 2 : 1;
                bf_quiz.style(b, g, l)
            });
            if (d.type == "single question") {
                bf_quiz.show_answers(g, d);
                bf_quiz.show_results(d)
            } else {
                if (d.type == "standard") {
                    bf_quiz.show_answers(g, d)
                }
            }
            bf_quiz.gaTrack("[ttp]:content", "quiz-answer", [f, c].join("="))
        };
        this.submit_quiz = function (d) {
            if (bf_quiz.quiz_complete(d) && !d.completed) {
                if (d.type != "single question") {
                    bf_quiz.quiz_shares(d)
                }
                bf_quiz.show_results(d);
                d.completed = true;
                var b = bf_quiz.get_completed_quiz_result(d);
                if (d.answer_positions.length == d.question_count) {
                    var e = d.answer_positions
                }
                if (bfjs.isMobile()) {
                    var c = $.Event("quiz_complete");
                    c.answer_data = d.answer_positions;
                    c.el = b.el;
                    $(document).trigger(c)
                } else {
                    EventManager.fire("quiz_complete", e, b.el)
                }
            }
        };
        this.show_answers = function (b, d) {
            var e = b.answers;
            var c = d ? d.type : null;
            bf_quiz.disable_question(b);
            bfjs.universal_each(e, function (f) {
                if (d.type == "single question" && e.length <= 1) {
                    return
                }
                if (c != "personality") {
                    if ($(f)[bfjs.read_attr]("rel:correct") == "1") {
                        bf_quiz.style(4, b, f)
                    } else {
                        if (f === bfjs.getFirstEl(b.response)) {
                            bf_quiz.style(5, b, f)
                        }
                    }
                }
            });
            if (c == "single question" || c == "standard") {
                bf_quiz.reveal(b, d)
            }
        };
        this.save = function (d) {
            if (typeof BF_Pixel == "undefined") {
                return false
            }
            var g = {};
            g.quiz = d.id;
            if (bf_quiz.isChecklist(d.type)) {
                var f = new Array;
                for (x in d.questions) {
                    var b = d.questions[x];
                    for (y in b.answers) {
                        var e = b.answers[y];
                        if (typeof e == "object") {
                            var c = $(e)[bfjs.has_class]("selected"),
                                h = $(e)[bfjs.read_attr]("rel:id");
                            if (c) {
                                f.push(h)
                            }
                        }
                    }
                }
                g.answers = f.join()
            } else {
                for (x in d.questions) {
                    var b = d.questions[x];
                    g[b.id] = $(b.response)[bfjs.read_attr]("rel:id")
                }
            }
            BF_Pixel.save({
                dir: "quiz",
                params: g
            })
        };
        this.show_results = function (d) {
            var e = d.swap;
            var g = d.questions;
            var h = d.results;
            var n = bf_quiz.get_completed_quiz_result(d);
            var c = n ? $(n.el)[bfjs.selector](".answer_response").first() : null;
            for (q in g) {
                bf_quiz.disable_question(g[q])
            }
            if ($(d.quiz_result_area_el)) {
                $(d.quiz_result_area_el).show()
            }
            if (d.type == "personality") {
                if (n) {
                    $(d.el)[bfjs.selector](".quiz_tally_results").first().show();
                    $(d.el)[bfjs.selector](".quiz_tally").first().hide();
                    $(n.el).show();
                    if (typeof window.BF_Effect != "undefined") {
                        BF_Effect.ScrollIntoView($(n.el))
                    }
                    if (n) {
                        c.hide()
                    }
                }
            } else {
                if (d.type == "single question") {
                    if (d.questions[0].answers.length > 1) {
                        var f = d.questions[0];
                        var l = $(f.el)[bfjs.selector](".answer_response");
                        var m = bf_quiz.correct_answer(f);
                        var b = f.correct ? "Correct! " : "Wrong! ";
                        if (l.size() > 0) {
                            $(l[0])[bfjs.add_class](f.correct ? "correct" : "wrong")[bfjs.selector](".message_text").first()[bfjs.update_html](b)
                        } else {
                            if (n) {
                                c.hide()
                            }
                        }
                    }
                } else {
                    if (bf_quiz.isChecklist(d.type)) {
                        var k = bf_quiz.get_message("checklist", "tally", {
                            "#{result_verb}": d.result_verb,
                            "#{result_subject}": d.result_subject
                        });
                        k = local.t(k, {
                            variables: {
                                total: d.questions[0].answers.length,
                                checked: bf_quiz.number_selected(d)
                            }
                        });
                        var j = $(d.el)[bfjs.selector](".quiz_tally").first();
                        $(j)[bfjs.update_html](k);
                        $(d.el)[bfjs.selector](".quiz_tally_results").first().show();
                        if (n) {
                            $(n.el).show();
                            if (typeof window.BF_Effect != "undefined") {
                                BF_Effect.ScrollIntoView($(n.el))
                            }
                            c.hide()
                        }
                    } else {
                        var k = bf_quiz.get_message("generic", "tally", {
                            "#{x}": bf_quiz.number_correct(d),
                            "#{y}": d.question_count
                        });
                        var j = $(d.el)[bfjs.selector](".quiz_tally").first();
                        $(j)[bfjs.update_html](k);
                        $(d.el)[bfjs.selector](".quiz_tally_results").first().show();
                        if (d.type == "percentage") {
                            for (q in d.questions) {
                                bf_quiz.show_answers(d.questions[q], d)
                            }
                        }
                        if (n) {
                            c.hide();
                            $(n.el).show()
                        }
                    }
                }
            }
        };
        this.disable_question = function (b) {
            var c = b.answers;
            for (a in c) {
                if (typeof c[a] != "object" || !$(c[a])) {
                    continue
                }
                $(c[a])[bfjs.stop_observing]("mouseover");
                $(c[a])[bfjs.stop_observing]("mouseout");
                $(c[a])[bfjs.stop_observing]("click");
                bfjs.setStyle($(c[a]), {
                    cursor: "default"
                })
            }
        };
        this.get_message = function (e, b, f) {
            var d = bf_quiz.messages.generic[b];
            if (bf_quiz.messages.hasOwnProperty(e) && bf_quiz.messages[e].hasOwnProperty(b)) {
                d = bf_quiz.messages[e][b]
            }
            d = local.t(d);
            for (var c in f) {
                if (!f.hasOwnProperty(c)) {
                    continue
                }
                f[c] = typeof (f[c]) == "string" ? f[c].replace("$", "$/") : f[c];
                d = d.replace(c, f[c])
            }
            d = d.replace("$/", "$");
            return d
        };
        this.get_completed_quiz_result = function (f) {
            var e = f.results;
            if (f.type == "personality") {
                var g = bf_quiz.personality(f);
                return e[g[0]]
            } else {
                if (f.type == "single question") {
                    return e[0]
                } else {
                    if (bf_quiz.isChecklist(f.type)) {
                        var d = bf_quiz.percent_checked(f);
                        for (var c in e) {
                            var b = e[c];
                            if (d >= b.range_start && d <= b.range_end) {
                                return b
                            }
                        }
                    } else {
                        var d = bf_quiz.percent_correct(f);
                        for (c in e) {
                            var b = e[c];
                            if (d >= b.range_start && d <= b.range_end) {
                                return b
                            }
                        }
                    }
                }
            }
            return false
        };
        this.reveal = function (b, g) {
            var h, e, d;
            if (b.reveal) {
                if (b.image && b.image[bfjs.read_attr]("rel:reveal_src")) {
                    b.image[bfjs.write_attr]("rel:question_src", b.image[bfjs.read_attr]("src"));
                    b.image[bfjs.write_attr]("src", b.image[bfjs.read_attr]("rel:reveal_src"));
                    d = b.image[bfjs.read_attr]("rel:reveal_attr");
                    if (d) {
                        h = b.image[bfjs.up]()[bfjs.selector](".buzz_attribution").first();
                        if (h) {
                            e = bfjs.getFirstEl(h).innerText || bfjs.getFirstEl(h).textContent;
                            if (e) {
                                b.image[bfjs.write_attr]("rel:attr", e.replace('"', "&quot;"))
                            }
                            h[bfjs.update_html](d)
                        }
                    }
                }
                if ($(b.el)[bfjs.selector](".reveal_embed").length > 0) {
                    $(b.el)[bfjs.selector](".reveal_embed").first().show();
                    $(b.el)[bfjs.selector](".question_embed").first().hide()
                }
                bfjs.universal_each(b.reveal, function (k) {
                    $(k).show()
                })
            }
            if (g.type != "single question" || (g.type == "single question" && b.answers.length > 1)) {
                var j = $(b.el)[bfjs.selector](".answer_response");
                var c = bf_quiz.correct_answer(b);
                var f = b.correct ? local.t("Correct!") : local.t("Wrong!");
                if (j.size() > 0) {
                    $(j[0])[bfjs.add_class](b.correct ? "correct" : "wrong")[bfjs.selector](".message_text").first()[bfjs.update_html](f)
                }
            }
        };
        this.correct_answer = function (b) {
            bfjs.universal_each(b.answers, function (c) {
                if ($(c)[bfjs.read_attr]("rel:correct") == "1") {
                    return $(c)
                }
            });
            return null
        };
        this.personality = function (g) {
            var c = 0;
            var e = [];
            for (f in g.results) {
                e[f] = 0
            }
            for (f in g.questions) {
                var d = g.questions[f];
                e[d.personality_index]++;
                c++
            }
            var b = 0;
            for (var f = e.length - 1; f >= 0; f--) {
                if (e[f] > b) {
                    b = e[f]
                }
            }
            var h = [];
            for (var f = e.length - 1; f >= 0; f--) {
                if (e[f] == b) {
                    h.push(f)
                }
            }
            return h
        };
        this.percent_checked = function (d) {
            var c = bf_quiz.number_selected(d);
            var b = d.questions[0].answers.length;
            return Math.round((c / b) * 100)
        };
        this.percent_correct = function (d) {
            var b = 0;
            var e = 0;
            for (i in d.questions) {
                var c = d.questions[i];
                b++;
                if (c.correct == true) {
                    e++
                }
            }
            return Math.round((e / b) * 100)
        };
        this.number_selected = function (b) {
            return b.el[bfjs.selector](".quiz_answer.selected").length
        };
        this.number_correct = function (c) {
            var d = 0;
            for (i in c.questions) {
                var b = c.questions[i];
                if (b.correct == true) {
                    d++
                }
            }
            return d
        };
        this.quiz_complete = function (e) {
            var d = bf_quiz.GALabel(e),
                c = "quiz-complete";
            if (!bf_quiz.isChecklist(e.type)) {
                for (i in e.questions) {
                    var b = e.questions[i];
                    if (b.correct == null) {
                        return false
                    }
                }
            }
            if (e.type == "personality") {
                if (bf_quiz.personality(e).length > 1) {
                    c = "quiz-complete-ties"
                }
            }
            if (bfjs.isMobile()) {
                $(".answer_shares_buttons a").each(function () {
                    $(this).attr("data-label", d)
                })
            }
            bf_quiz.gaTrack("[ttp]:content", c, d);
            bf_quiz.save(e);
            return true
        };
        this.GALabel = function (d) {
            var b = "";
            if (d.type == "personality") {
                var f = bf_quiz.personality(d),
                    e = [];
                for (var c = 0; c < f.length; c++) {
                    e.push(d.results[f[c]]["id"])
                }
                b = d.id + "=" + e.join(",")
            } else {
                if (bf_quiz.isChecklist(d.type)) {
                    b = bf_quiz.number_selected(d) + " out " + d.questions[0].answers.length
                } else {
                    b = bf_quiz.number_correct(d) + " out " + d.question_count
                }
            }
            return b
        };
        this.isChecklist = function (b) {
            var c = ["checklist", "image checklist"];
            return c.indexOf(b) > -1
        };
        this.quiz_shares = function (b) {
            try {
                var k = bf_quiz.get_completed_quiz_result(b),
                    j, e = k && k.el ? $(k.el)[bfjs.read_attr]("rel:description") : "";
                var g = {
                    el: $(b.el)[bfjs.selector](".answer_shares .answer_shares_buttons").first(),
                    buzz_uri: window.location,
                    buzz_name: (bfjs.isMobile() ? $("<div/>").html(BF_STATIC.buzz_name).text() : BF_UI.renderEntities(BF_STATIC.buzz_name)),
                    buzz_blurb: (bfjs.isMobile() ? $("<div/>").html(BF_STATIC.buzz_blurb).text() : BF_UI.renderEntities(BF_STATIC.buzz_blurb)),
                    picture: k && $(k.el)[bfjs.selector](".result_img").size() > 0 ? $(k.el)[bfjs.selector](".result_img")[0].src : "",
                    result_description: (bfjs.isMobile() ? $("<div/>").html(e).text() : BF_UI.renderEntities(e)),
                    fb_title: "",
                    fb_blurb: "",
                    tw_blurb: "",
                    tw_hashtags: typeof ad_tw_hashtags != "undefined" ? ad_tw_hashtags : "",
                    tw_via: $(b.el)[bfjs.selector](".quiz_tally_results").first()[bfjs.read_attr]("rel:tweet_via") || "BuzzFeed",
                    email_subject: "",
                    email_body: ""
                };
                if (typeof pound != "undefined" && !BF_STATIC.mobile_app) {
                    g.buzz_uri = {
                        href: pound.urls.unescaped.queryStringOnly(),
                        toString: pound.urls.unescaped.queryStringOnly
                    }
                }
                var f = {
                    "#{title}": g.buzz_name,
                    "#{link}": g.buzz_uri,
                    "#{result_verb}": b.result_verb,
                    "#{result_subject}": b.result_subject
                };
                if (b.type == "personality" && !bf_quiz.post_rec) {
                    f["#{result}"] = $(k.el)[bfjs.read_attr]("rel:name");
                    g.fb_title = bf_quiz.get_message("personality", "fb", f);
                    g.fb_blurb = g.result_description ? g.result_description : g.buzz_blurb;
                    g.tw_blurb = bf_quiz.get_message("personality", "tw", f);
                    g.email_subject = bf_quiz.get_message("personality", "email_subject", f);
                    if (!unescape(g.email_subject).match("Quiz:")) {
                        g.email_subject = "Quiz: " + g.email_subject
                    }
                    g.email_body = bf_quiz.get_message("personality", "email_body", f)
                } else {
                    if (b.type == "personality" && bf_quiz.post_rec) {
                        f["#{result}"] = $(k.el)[bfjs.read_attr]("rel:name");
                        g.fb_title = g.buzz_name;
                        g.fb_blurb = g.buzz_blurb;
                        g.tw_blurb = g.buzz_name;
                        g.email_subject = g.buzz_name;
                        if (!unescape(g.email_subject).match("Quiz:")) {
                            g.email_subject = "Quiz: " + g.email_subject
                        }
                        g.email_body = g.buzz_name + "  " + g.buzz_uri.href
                    } else {
                        if (bf_quiz.isChecklist(b.type)) {
                            f["#{checked}"] = bf_quiz.number_selected(b);
                            f["#{total}"] = b.questions[0].answers.length;
                            g.fb_title = bf_quiz.get_message("checklist", "fb", f);
                            g.fb_blurb = g.result_description || g.buzz_blurb;
                            g.tw_blurb = bf_quiz.get_message("checklist", "tw", f);
                            g.email_subject = bf_quiz.get_message("checklist", "email_subject", f);
                            if (!unescape(g.email_subject).match("Quiz:")) {
                                g.email_subject = "Quiz: " + g.email_subject
                            }
                            g.email_body = bf_quiz.get_message("checklist", "email_body", f)
                        } else {
                            f["#{score}"] = bf_quiz.number_correct(b);
                            f["#{total}"] = b.question_count;
                            g.fb_title = g.buzz_name;
                            g.fb_blurb = bf_quiz.get_message("generic", "fb", f);
                            g.tw_blurb = bf_quiz.get_message("generic", "tw", f);
                            g.email_subject = bf_quiz.get_message("generic", "email_subject", f);
                            if (!unescape(g.email_subject).match("Quiz:")) {
                                g.email_subject = "Quiz: " + g.email_subject
                            }
                            g.email_body = bf_quiz.get_message("generic", "email_body", f)
                        }
                    }
                }
                if (BF_STATIC.campaignid == "1931201") {
                    var h = "Remember to eat your cereal, not your serial killers.";
                    g.fb_blurb = h;
                    g.tw_blurb = g.buzz_name + " " + h;
                    g.tw_hashtags = "ripperstreet";
                    g.email_subject = bf_quiz.get_message("generic", "email_subject", {
                        "#{title}": g.buzz_name
                    });
                    g.email_body = h + " " + escape(g.buzz_uri)
                }
                if (BF_STATIC.campaignid == "3397410") {
                    var c = {
                        "Constant Commentator": "I’m an over-sharer and proud",
                        "Too Proud Parent": "I’m all about my brilliant brood",
                        Failosopher: "I love getting deep and meaningful",
                        Animaniac: "I admit it, I’m all about the cute animals",
                        "Smug Couple": "I’m loved up and you’re tired of seeing it",
                        "Score Bore": "I’ve been boring you with my gym brags",
                        "Social Show-Off": "I’ve been flaunting the high life on here too long",
                        "Foodie Fanatic": "I’ve been over-sharing my food snaps",
                        Lurker: "Okay, I spend too much time looking at other peoples’ updates"
                    };
                    f["#{outcome}"] = c[f["#{result}"]];
                    g.fb_title = bf_quiz.get_message("3397410", "fb_title", f);
                    g.fb_blurb = bf_quiz.get_message("3397410", "fb_description", f);
                    g.email_subject = bf_quiz.get_message("3397410", "email_subject", f);
                    g.email_body = bf_quiz.get_message("3397410", "email_body", f);
                    f["#{title}"] = "What's Your Social Media Sin?";
                    f["#{link}"] = escape(g.buzz_uri);
                    g.tw_blurb = bf_quiz.get_message("3397410", "tw", f)
                }
                $(g.el).show();
                if (bfjs.isMobile()) {
                    $(document.body)[bfjs.selector](".share-buttons.position-lower")[bfjs.add_class]("hidden");
                    if (BF_STATIC.mobile_app == false) {
                        $(document.body)[bfjs.selector](".share-buttons.position-quiz .fb-share-dialog a")[bfjs.observer]("click", function (m) {
                            m.preventDefault();
                            var l = {
                                name: unescape(g.fb_title),
                                description: unescape(g.fb_blurb),
                                link: g.buzz_uri.toString(),
                                picture: g.picture,
                                parent_id: "share-buttons-quiz"
                            };
                            l.parent_id = "subbuzz-share";
                            l.category = "MobileBuzz:content";
                            l.action = $(m).data("action");
                            l.legacy_url = l.link.replace(/^http\:\/\/[a-z\.]*\//, "/");
                            Share.facebook(l)
                        });
                        $(document.body)[bfjs.selector](".share-buttons.position-quiz .tweet_btn a")[bfjs.observer]("click", function (m) {
                            m.preventDefault();
                            var l = {
                                text: g.tw_blurb,
                                url: g.buzz_uri,
                                via: g.tw_via,
                                parent_id: "share-buttons-quiz",
                                legacy_url: document.URL.replace(/[?#].*$/g, "")
                            };
                            l.category = "MobileBuzz:content";
                            l.action = $(m).data("action");
                            Share.twitter(l)
                        });
                        $(document.body)[bfjs.selector](".share-buttons.position-quiz .pin a")[bfjs.observer]("click", function (m) {
                            m.preventDefault();
                            var l = {
                                media: g.picture,
                                description: g.tw_blurb,
                                url: g.buzz_uri,
                                parent_id: "share-buttons-quiz",
                                legacy_url: document.URL.replace(/[?#].*$/g, "")
                            };
                            l.category = "MobileBuzz:content";
                            l.action = $(m).data("action");
                            Share.pinterest(l)
                        });
                        $(document.body)[bfjs.selector](".share-buttons.position-quiz .email a")[bfjs.observer]("click", function (m) {
                            m.preventDefault();
                            var l = {
                                subject: g.email_subject,
                                body: g.email_body,
                                parent_id: "share-buttons-quiz"
                            };
                            Share.email(l)
                        })
                    }
                }
            } catch (d) {
            }
        };
        this.gaTrack = function (b, c, d) {
            if (typeof gtrack != "undefined") {
                gtrack.track_events(b, c, d)
            }
        }
    };
var bf_quiz = new BF_Quiz();
bfjs.onPageLoad(bf_quiz.init);
BF_Related = function () {
    this.related_links_controller = "/buzzfeed/_related_links";
    this.init = function () {
        if (!acl.user_can("general_admin")) {
            return
        }
        related.assign_handlers()
    };
    this.assign_handlers = function () {
        universal_dom.assign_handler({
            bucket: "update-related",
            handler: related.update_related,
            event: "click"
        });
        universal_dom.assign_handler({
            bucket: "related-cancel",
            handler: related.related_cancel,
            event: "click"
        });
        universal_dom.assign_handler({
            bucket: "related-save",
            handler: related.save_related,
            event: "click"
        })
    };
    this.update_related = function (args) {
        if (args.buzz_id) {
            var dialog = $$(".update_related")[0];
            var dialogWidth = dialog.getWidth();
            var dialogHeight = dialog.getHeight();
            var topPos = args.clientY;
            related.show_body_overlay();
            dialog.show();
            if ((topPos + dialogHeight) > BF_UTIL.browser.dimensions.height()) {
                topPos = BF_UTIL.browser.dimensions.height() - dialogHeight
            }
            dialog.setStyle({
                left: args.clientX + "px",
                top: topPos + "px",
                position: "fixed"
            })
        } else {
            console.log("update_related: Invalid buzz id")
        }
    };
    this.related_cancel = function () {
        if ($("bodyOverlay")) {
            document.body.removeChild($("bodyOverlay"))
        }
        $("save_spinner").hide();
        var dialog = $$(".update_related")[0];
        dialog.hide()
    };
    this.show_body_overlay = function () {
        var bodyHeight = document.body.getHeight();
        var bodyWidth = document.body.getWidth();
        if (!$("bodyOverlay")) {
            var overlay = document.createElement("div");
            overlay.setAttribute("id", "bodyOverlay");
            overlay.setStyle({
                width: bodyWidth + "px",
                height: bodyHeight + "px"
            });
            document.body.appendChild(overlay)
        }
    };
    this.save_related = function (args) {
        if (args.buzz_id) {
            $("save_spinner").show();
            var newRelated = new Array();
            var related_input = $$(".related_input");
            for (var i = related_input.length; i >= 1; i--) {
                if ($("related" + i) != undefined && $("related" + i).value !== undefined && $("related" + i).value != "") {
                    newRelated.push($("related" + i).value)
                }
            }
            var params = {
                action: "validate_and_save",
                campaignid: args.buzz_id,
                related_urls: JSON.stringify(newRelated)
            };
            (new BF_Request()).request("/buzzfeed/_related_links", {
                method: "get",
                parameters: params,
                onSuccess: function (r) {
                    var obj = eval("(" + r.responseText + ")");
                    console.log(obj.number);
                    if (obj.success == 0) {
                        related.error(obj.message)
                    } else {
                        if (obj.number == 0) {
                            related.error("No urls could be validated. Must be # links.")
                        } else {
                            if (newRelated.length > obj.number) {
                                related.error("Only " + obj.number + " out of " + newRelated.length + " urls could be validated.")
                            }
                        }
                    }
                    related.related_cancel()
                },
                onFailure: function (r) {
                    var obj = eval("(" + r.responseText + ")");
                    related.error(obj.message || "save_related: validate and save failure")
                }
            })
        } else {
            console.log("save_related: Invalid buzz id")
        }
    };
    this.error = function (message) {
        console.log("related.error");
        (new BF_Request()).alert(message)
    }
};
document.observe("dom:loaded", function () {
    if ($("buzz_sub_buzz") && ($("buzz_sub_buzz").hasClassName("suplist_long") || $("buzz_sub_buzz").hasClassName("suplist_article"))) {
        var b = new BF_InlineSharing();
        b.init();
        var c = new BF_ReadLater();
        c.init()
    }
});

Array.isArray || (Array.isArray = function (b) {
    return "object" === typeof b && "[object Array]" === Object.prototype.toString.call(b)
});
var CountView = function () {
        this._elems_arr = [];
        this._time_interval = 250;
        this._callback = null;
        this._interval_id = null
    };
BuzzLoader.register(function () {
    flagComment.init()
}, 1);