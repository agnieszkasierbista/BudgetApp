import initModel from './Model';
import update from './Update';
import view from './View';
import app from './App';
import chart from "./Chart";

const node = document.getElementById('app');

app(initModel, update, view, chart, node);