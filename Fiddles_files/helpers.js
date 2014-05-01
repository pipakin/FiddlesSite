// Generated by CoffeeScript 1.6.3
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.log = function() {
    var _ref;
    if (((_ref = window.console) != null ? _ref.log : void 0) != null) {
      return console.log(arguments.length <= 1 ? arguments[0] : arguments);
    }
  };

  String.implement({
    substitute: function(object, regexp) {
      return String(this).replace(regexp || /\\?\{([^{}]+)\}/g, function(match, name) {
        var i, length, path, retStr, sub;
        if (match.charAt(0) === "\\") {
          return match.slice(1);
        }
        if (object[name] != null) {
          return object[name];
        }
        retStr = "";
        path = name.split(".");
        length = path.length;
        sub = object;
        if (length <= 1) {
          return retStr;
        }
        i = 0;
        while (i < length) {
          if ((sub = sub[path[i]]) === null) {
            return retStr;
          }
          i++;
        }
        return sub;
      });
    }
  });

  this.Helpers = (function() {
    function Helpers() {
      this.fireEvent = __bind(this.fireEvent, this);
      this.setOptions = __bind(this.setOptions, this);
      this.autosubmit = __bind(this.autosubmit, this);
    }

    Helpers.prototype.autosubmit = function(dropdowns) {
      return Array.each(dropdowns, function(dropdown) {
        return dropdown.addEvents({
          change: function(event) {
            var form, value;
            value = this.get("value");
            form = this.getParent("form");
            if (value !== "") {
              return form.submit();
            }
          }
        });
      });
    };

    Helpers.prototype.setOptions = function(options) {
      if (this.options) {
        return this.options = Object.merge(this.options, options);
      } else {
        return this.options = options;
      }
    };

    Helpers.prototype.fireEvent = function(event, options) {
      if (this.options[event]) {
        return this.options[event].call(this, options);
      }
    };

    Helpers.prototype.setupEvents = function(elements, events) {
      var _this = this;
      return Object.each(elements, function(element, key) {
        if (element) {
          return element.addEvents(events[key]);
        }
      });
    };

    Helpers.prototype.isUrl = function(value) {
      var pattern;
      pattern = /^(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
      return pattern.test(value);
    };

    Helpers.prototype.isEmail = function(value) {
      var pattern;
      pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
      return pattern.test(value);
    };

    Helpers.prototype.permalink = function(key) {
      var permalink;
      permalink = key.toLowerCase();
      return permalink.replace(/(?: )/ig, "-");
    };

    Helpers.prototype.template = {
      get: function(templateFor) {
        var template;
        template = document.getElement("script[data-template-for=" + templateFor + "]");
        if (template) {
          return template = template.get("text");
        }
      },
      parse: function(template, subs) {
        if (subs == null) {
          subs = {};
        }
        return template = Elements.from(template.substitute(subs));
      }
    };

    return Helpers;

  })();

}).call(this);
