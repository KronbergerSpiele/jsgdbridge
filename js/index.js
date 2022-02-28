(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "react", "./engine.js"], function (
      exports,
      react,
      engine
    ) {
      factory((root.jsgdbridge = exports), react, engine);
    });
  } else if (
    typeof exports === "object" &&
    typeof exports.nodeName !== "string"
  ) {
    factory(exports, require("react"), require("./engine.js"));
  } else {
    factory((root.jsgdbridge = {}), root.React, root.Engine.Engine);
  }
})(
  typeof self !== "undefined" ? self : this,
  function (
    exports,
    /** @type{ import('react') */ React,
    /** @type{ import('./engine') */ Engine
  ) {
    const { createElement, Component } = React;
    const h = createElement;

    /** @typedef {{ playerName: string, prefix: string }} JSGDHostProps */
    /** @type{ import('react').FC<JSGDHostProps> } */
    const JSGDHost = function JSGDHost(props) {
      const engineRef = React.useRef(null);
      const [notice, setNotice] = React.useState(null);
      React.useEffect(() => {
        console.log("Starting JSGDHost", props);
        const GODOT_CONFIG = {
          args: [],
          canvasResizePolicy: 2,
          executable: "game",
          experimentalVK: false,
          fileSizes: {},
          focusCanvas: true,
          gdnativeLibs: [],
          prefix: props.prefix,
        };
        const engine = new Engine(GODOT_CONFIG);
        engineRef.current = engine;

        if (!Engine.isWebGLAvailable()) {
          setNotice("WebGL not available");
        } else {
          engine
            .startGame({
              onProgress: function (current, total) {
               setNotice(`loading: ${current}/${total}`)
              },
            })
            .then(() => {
              setNotice("Completed load");
            }).catch((err) => {
              console.log(err)
              setNotice(err);
            });
        }
      }, []);
      return h(
        React.Fragment,
        null,
        h(
          "canvas",
          { id: "canvas" },
          "HTML5 canvas appears to be unsupported in the current browser. Please try updating or use a different browser."
        ),
        h("p", {}, notice)
      );
    };

    //
    /** @module jsgdbridge */
    exports.default = JSGDHost;
    exports.JSGDHost = JSGDHost;
  }
);
