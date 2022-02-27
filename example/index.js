const { createElement, Component } = /** @type{ import('react') */ React;
const { render } = /** @type{ import('react-dom') */ ReactDOM;
const h = createElement;
/** @type{ import('../js/index.js').default */
const JSGDHost = window.jsgdbridge.default;
const root = document.getElementById("root");

const ele = h(JSGDHost, {
  playerName: "Johnny",
  prefix: "https://kronbergerspiele.github.io/bloodfever/",
});

render(ele, root);
