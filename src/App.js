import {h, diff, patch} from 'virtual-dom';
import createElement from 'virtual-dom/create-element';


function app(initModel, update, view, chart, node) {
  let model = initModel;
  let currentView = view(dispatch, model);
  let rootNode = createElement(currentView);
  node.appendChild(rootNode);

  // node.appendChild(chart(model.expenses)); nie tedy droga, ale moze jeszcze da sie dos wymiyslic

  function dispatch(msg) {
    model = update(msg, model);
    window.model = model;
    const updatedView = view(dispatch, model);
    const patches = diff(currentView, updatedView);
    rootNode = patch(rootNode, patches);
    currentView = updatedView;
  };
};

export default app;