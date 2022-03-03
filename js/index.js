(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "react", "./engine.js"], function (
      exports,
      React,
      Engine
    ) {
      factory((root.jsgdbridge = exports), React, Engine.Engine);
    });
  } else if (
    typeof exports === "object" &&
    typeof exports.nodeName !== "string"
  ) {
    factory(exports, require("react"), require("./engine.js").Engine);
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
    const { createElement: h } = React;

    /** @typedef {{ playerName: string, prefix: string, canvasResizePolicy?:0|1|2, reportScore(score:number):void, playerPowerup?:number }} JSGDHostProps */
    /** @type{ import('react').FC<JSGDHostProps> } */
    const JSGDHost = function JSGDHost(props) {
      const {
        prefix,
        executable = "game",
        canvasResizePolicy = 0,
        reportScore,
        playerName,
        playerPowerup = 1,
      } = props;

      const containerRef = React.useRef(null);

      const godotSrc = React.useMemo(() => `${prefix}/${executable}.js`, []);

      const godotRef = React.useRef(null);
      const engineRef = React.useRef(null);
      const [notice, setNotice] = React.useState(null);

      const startEngine = React.useCallback((Godot) => {
        console.log("Starting JSGDHost", props);
        const GODOT_CONFIG = {
          args: [],
          canvasResizePolicy,
          experimentalVK: false,
          fileSizes: {},
          focusCanvas: true,
          gdnativeLibs: [],
          executable,
          prefix,
          Godot,
        };

        window.jsgdhost = {
          playerName,
          reportScore,
          playerPowerup,
        };

        const engine = new Engine(GODOT_CONFIG);
        engineRef.current = engine;

        if (!Engine.isWebGLAvailable()) {
          setNotice("WebGL not available");
        } else {
          engine
            .startGame({
              onProgress: function (current, total) {
                setNotice(`loading: ${current}/${total}`);
              },
            })
            .then(() => {
              //setNotice("Completed load");
              setNotice();
            })
            .catch((err) => {
              console.log(err);
              setNotice(err);
            });
        }
      }, []);

      const registerGodot = React.useCallback((Godot) => {
        console.log("register godot");
        console.log(Godot);
        godotRef.current = Godot;
        window.registerGodot = undefined;
        startEngine(Godot);
      }, []);

      const fetchEngine = React.useCallback(() => {
        console.log("fetching engine");
        fetch(godotSrc)
          .then((r) => r.text())
          .then((godotScript) => {
            const withoutEngine = godotScript.replace(
              /^if \(typeof exports === 'object'.*/ms,
              ""
            );
            const withSetter = `
              ${withoutEngine}
              registerGodot(Godot);
            `;
            window.registerGodot = registerGodot;

            const script = document.createElement("script");
            script.innerHTML = withSetter;
            containerRef.current.appendChild(script);
          });
      }, []);

      React.useEffect(() => {
        fetchEngine();
      }, []);

      return h(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          },
          ref: containerRef,
        },
        h(
          "canvas",
          {
            id: "canvas",
            height: 320,
            width: 480,
            style: {},
          },
          "HTML5 canvas appears to be unsupported in the current browser. Please try updating or use a different browser."
        ),
        notice ? h("p", {}, notice) : null
      );
    };

    //
    /** @module jsgdbridge */
    exports.default = JSGDHost;
    exports.JSGDHost = JSGDHost;
  }
);
