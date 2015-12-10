/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function ($) {

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var App = {
    // All pages
    'common': {
      init: function () {
        var usuario = Cookies.get('session');
        if (usuario) {
          var users = $.jStorage.get("users");
          if (users && users[usuario]) {
            var date = new Date();
            date.setTime(date.getTime() + (30 * 60 * 1000));
            Cookies.set('session', usuario, {expires: date});
            return;
          }
        }
        if (window.location.pathname !== '/index.html') {
          Cookies.remove('session');
          window.location.replace('/index.html');
        }
      },
      finalize: function () {
        // JavaScript to be fired on all pages, after page specific JS is fired
      }
    },
    'login': {
      init: function () {
        (function () {

          var users = $.jStorage.get("users");
          if (!users) {
            users = {};
            $.jStorage.set('users', users);
          }

          $('#login input[type=submit]').click(function (event) {
            event.preventDefault();
            var usuario = $('#login #username').val();
            var password = $('#login #password').val();

            if (users) {
              var redirect = false;

              if (users[usuario]) {
                var _usuario = users[usuario];
                if (_usuario.password && _usuario.password === password) {
                  redirect = true;
                } else {
                  $('.accesshide').css('position', 'static');
                }
              } else {
                users[usuario] = new Usuario(usuario, password);
                redirect = true;
              }

              $.jStorage.set('users', users);

              if (redirect) {
                var date = new Date();
                date.setTime(date.getTime() + (30 * 60 * 1000));
                Cookies.set('session', usuario, {expires: date});
                window.location.replace('/main.html');
              }
            }
          });
        })();
      }
    }
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function (func, funcname, args) {
      var fire;
      var namespace = App;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function () {
      // Fire common init JS
      UTIL.fire('common');
      console.log("Cargando eventos");
      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function (i, classnm) {
        console.log("Cargando eventos: " + classnm);
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });
      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    }
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
