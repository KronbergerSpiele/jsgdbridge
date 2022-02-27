(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(["exports", "react", "./godot.js"], function (exports, react) {
      factory((root.jsgdbridge = exports), react);
    });
  } else if (
    typeof exports === "object" &&
    typeof exports.nodeName !== "string"
  ) {
    // CommonJS
    factory(exports, require("react"), require("./godot.js"));
  } else {
    // Browser globals
    factory((root.jsgdbridge = {}), root.React, root.Godot);
  }
})(
  typeof self !== "undefined" ? self : this,
  function (
    exports,
    /** @type{ import('react') */ React,
    /** @type{ import('./godot') */ Godot
  ) {
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

    /** @module jsgdbridge */
    exports.default = JSGDHost;
    exports.JSGDHost = JSGDHost;
  }
);
