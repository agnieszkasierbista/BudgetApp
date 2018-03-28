import {diff, patch} from 'virtual-dom';
import createElement from 'virtual-dom/create-element';
import generateChart from './Chart';
import * as Update from './Update';

const {SAVE_EXPENSE, DELETE_EXPENSE, EDIT_EXPENSE, SHOW_FORM} = Update.MSGS;

function shouldUpdateChart({type}) {
  return [SAVE_EXPENSE, DELETE_EXPENSE, EDIT_EXPENSE, SHOW_FORM].find(item => type === item);
}

function app(initModel, update, view, node, chartNode) {
  let model = initModel;
  let currentView = view(dispatch, model);
  let rootNode = createElement(currentView);
  const ctx = chartNode.getContext('2d');
  node.appendChild(rootNode);
  generateChart(model, ctx);

  function dispatch(msg) {
    model = update(msg, model);
    const updatedView = view(dispatch, model);
    const patches = diff(currentView, updatedView);
    rootNode = patch(rootNode, patches);
    currentView = updatedView;
    if (shouldUpdateChart(msg)) {
      generateChart(model, ctx);
    }
  }
}

export default app;