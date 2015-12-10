/**
 * Created by isaac on 25/10/15.
 */
(function () {
  $.fn.changeBgImage = function () {
    this.each(function () {
      var imgUrl = $(this).find("img").attr("src");
      if (imgUrl) {
        $(this).css("background-image", "url(" + imgUrl + ")");
      }
    });
  };
  $.fn.center = function () {
    this.css("margin-top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
    return this;
  };
  $(document).on("ready", function () {
    if ($("#page-login-index").length !== 0) {
      $(".region-content").center();
      $(window).on("resize", function () {
        $(".region-content").center();
      });
    }
    var usuario = Cookies.get('session');
    if (usuario) {
      $(".headermenu").append("<div id='identificacion'>Te has identificado como: <strong>" + usuario + "</strong></div>");
    }
    $(".coursebox").changeBgImage();
    if ($("#page-course-view-flexsections").length !== 0) {
      $("#page-course-view-flexsections .flexsections-level-1 > .section.main").each(function () {
        $(this).find(".content:first").each(function () {
          var imgSrc = $(this).find("img").attr("src");
          if (imgSrc) {
            $(this).find("h3:first").css({"background-image": "url('" + imgSrc + "')"});
          }
        });
      });
      $("#page-course-view-flexsections .flexsections-level-1 > .section.main .flexsections-level-2 > li.section.main").click(function () {
        $(this).find(".flexsections").slideToggle();
        $(this).siblings().find(".flexsections").slideUp();
      });
      $("#page-course-view-flexsections .flexsections-level-1 > li.section.main .flexsections-level-2 > li.section.main > .content > .flexsections-level-3").each(function () {
        $(this).append('<div class="close"></div>');
        $(".close").on("click", function () {
          $(this).siblings(".flexsections.flexsections-level-3").hide();
        });
      });
      var reference = $("#page-course-view-flexsections .flexsections-level-1 > .section.main .flexsections-level-2 li.section.main:last-child .activityinstance a").attr("href");
      $("#page-course-view-flexsections .flexsections-level-1 > .section.main .flexsections-level-2 li.section.main:last-child").wrap("<a class='lessonEval' href='" + reference + "'></a>");
      $("#page-course-view-flexsections .flexsections-level-1 > li.section.main .flexsections-level-2 > li.section.main > .content > .flexsections-level-3").each(function () {
        $(this).append("<div class='wrapperSesion'></div><div class='bgLesson'></div>");
      });
      $("#page-course-view-flexsections .flexsections-level-1 > .section.main .flexsections-level-2 li.section.main h3.sectionname:visible").each(function () {
        if ($("#page-course-view-flexsections .flexsections-level-1 > .section.main .flexsections-level-2 li.section.main h3.sectionname a"))$("#page-course-view-flexsections .flexsections-level-1 > .section.main .flexsections-level-2 li.section.main h3.sectionname a").each(function () {
          var lessonText = $(this).text(), replaceText = lessonText.replace("Lección", "Lesson");
          $(this).text(replaceText);
        });
        var lessonText = $(this).text(), replaceText = lessonText.replace("Lección", "Lesson");
        $(this).text(replaceText);
      });
      if ($(".separador")) {
        $("#page-course-view-flexsections .flexsections-level-0 > li.section.main > div.content > h3.sectionname:first").wrap("<div class='cont-tituloleccion'></div>");
        $("#page-course-view-flexsections .flexsections-level-0 > li.section.main > div.content > .summary img").appendTo('.cont-tituloleccion');
        $(".cont-tituloleccion").changeBgImage();
        $(".cont-imagen").changeBgImage();
        $(".header.backto").parent().append('<div class="record"></div>');
        $(".section.img-text .quiz a").each(function () {
          var attrQuiz = $(this).attr("href");
          $contenedor = $(this).parents('.section.img-text').siblings('.flexsections.flexsections-level-3');
          if ($contenedor) {
            $contenedor.append("<a class='evaluacion' href='" + attrQuiz + "'><li class='section main'><h3>Evaluation</h3></li></a>");
          }
        });
        var lessonTitleText = $("#page-course-view-flexsections .cont-tituloleccion h3.sectionname").text(), replaceTitleText = lessonTitleText.replace("Lección", "Lesson");
        $("#page-course-view-flexsections .cont-tituloleccion h3.sectionname").text(replaceTitleText);
        $(".separador h2").each(function () {
          var texto = $(this).text();
          if (texto == "Vocabulary")$(this).parent().addClass("vocabulary");
          if (texto == "Grammar")$(this).parent().addClass("grammar");
          if (texto == "Reading")$(this).parent().addClass("reading");
          if (texto == "Activities")$(this).parent().addClass("activity");
        });
        $(".cont-contgeneral audio").each(function () {
          $(this).wrap("<div class='btn-audio'></div>");
        });
        $(".btn-audio").each(function () {
          $(this).click(function (e) {
            e.preventDefault();
            var song = $(this).children('audio').get(0);
            if (song.paused) {
              song.play();
            } else song.pause();
          });
        });
        $("iframe").each(function () {
          var src = $(this).attr("src");
          $(this).parent().append("<a href='" + src + "' target='_blank'><div class='cont-btn-actividad'><div class='btn-actividad'></div><h2>Activity</h2></div></a>");
          $(this).remove();
        });
        var attrQuizSesion = $(".sitetopic .section li.activity, .course-content .section li.activity.quiz.modtype_quiz a").attr("href");
        $(".sitetopic .section li.activity, .course-content .section li.activity.quiz.modtype_quiz").wrap("<a class='SesionEval' href='" + attrQuizSesion + "'</a>");
        $(".SesionEval").append("<li class='evalImg'><h3>Evaluation</h3></li>");
      }
    }
  });
})();