(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(["exports", "react"], function (exports, react) {
      factory((root.jsgdbridge = exports), react);
    });
  } else if (
    typeof exports === "object" &&
    typeof exports.nodeName !== "string"
  ) {
    // CommonJS
    factory(exports, require("react"));
  } else {
    // Browser globals
    factory((root.jsgdbridge = {}), root.React);
  }
})(
  typeof self !== "undefined" ? self : this,
  function (exports, /** @type{ import('react') */ React) {
    const { createElement, Component } = React;
    const h = createElement;

    /** @typedef {{playerName: string}} JSGDHostProps */
    /** @type{ import('react').FC<JSGDHostProps> } */
    const JSGDHost = function JSGDHost(props) {
      React.useEffect(() => {
        console.log(props.playerName);
      }, []);
      return h("p", {}, "welcome");
    };

    // attach properties to the exports object to define
    // the exported module properties.
    /** @module jsgdbridge */
    exports.default = JSGDHost;
    exports.JSGDHost = JSGDHost;
  }
);
