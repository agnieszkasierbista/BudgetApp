import hh from 'hyperscript-helpers';
import {h} from 'virtual-dom';
import chartView from './Chart';
import * as R from 'ramda';
import {
  showFormMsg,
  dateInputMsg,
  expenseInputMsg,
  priceInputMsg,
  saveExpenseMsg,
  deleteExpenseMsg,
  editExpenseMsg,
} from './Update';

const {div, h1, button, form, label, input, td, th, tr, tbody, thead, table, i, canvas} = hh(h);

function fieldSet(labelText, inputValue, oninput) {
  return div([
    label({className: 'db mb1'}, labelText),
    input({
      className: 'pa2 input-reset ba w-100 mb2',
      type: 'text',
      value: inputValue,
      oninput
    }),
  ]);
}

function buttonSet(dispatch) {
  return div([
    button(
      {
        className: 'f3 pv2 ph3 bg-blue white bn mr2 dim',
        type: 'submit',
      },
      'Save',
    ),
    button(
      {
        className: 'f3 pv2 ph3 bn bg-light-gray dim',
        type: 'button',
        onclick: () => dispatch(showFormMsg(false)),
      },
      'Cancel',
    ),
  ]);
}

function formView(dispatch, model) {
  const {date, description, price, showForm} = model;
  if (showForm) {
    return form(
      {
        className: 'w-100 mv2',
        onsubmit: e => {
          e.preventDefault();
          dispatch(saveExpenseMsg);
        },
      },
      [
        fieldSet('Date', date,
          e => dispatch(dateInputMsg(e.target.value))
        ),
        fieldSet('Expense', description,
          e => dispatch(expenseInputMsg(e.target.value))
        ),
        fieldSet('Price', price || '',
          e => dispatch(priceInputMsg(e.target.value))
        ),
        buttonSet(dispatch),
      ],
    );
  }
  return button(
    {
      className: 'f3 pv2 ph3 bg-blue white bn',
      onclick: () => dispatch(showFormMsg(true)),
    },
    'Add Expense',
  );
}


function cell(tag, className, value) {
  return tag({className}, value);
}

const tableHeader = thead([
  tr([
    cell(th, 'pa2 tl', 'Date'),
    cell(th, 'pa2 tl', 'Expense'),
    cell(th, 'pa2 tr', 'Price'),
    cell(th, '', ''),
  ]),
]);

function expenseRow(dispatch, className, expense) {
  return tr({className}, [
    cell(td, 'pa2', expense.date),
    cell(td, 'pa2', expense.description),
    cell(td, 'pa2 tr', expense.price),
    cell(td, 'pa2 tr', [
      i({
        className: 'ph1 fa fa-trash-o pointer',
        onclick: () => dispatch(deleteExpenseMsg(expense.id)),
      }),
      i({
        className: 'ph1 fa fa-pencil-square-o pointer',
        onclick: () => dispatch(editExpenseMsg(expense.id)),
      }),
    ]),
  ]);
}

function totalRow(expenses) {
  const total = R.pipe(
    R.map(expense => expense.price),
    R.sum,
  )(expenses);
  return tr({className: 'bt b'}, [
    cell(td, 'pa2 tl', 'Total:'),
    cell(td, '', ''),
    cell(td, 'pa2 tr', total),
    cell(td, '', ''),
  ]);
}

function expensesBody(dispatch, className, expenses) {
  const rows = R.map(
    R.partial(expenseRow, [dispatch, 'stripe-dark']), expenses);
  const rowsWithTotal = [...rows, totalRow(expenses)];
  return tbody({className}, rowsWithTotal);
}

function tableView(dispatch, expenses) {
  if (expenses.length === 0) {
    return div({className: 'mv2 i black-50'}, 'No expenses to display...');
  }
  return table({className: 'mv2 w-100 collapse'}, [
    tableHeader,
    expensesBody(dispatch, '', expenses),
  ]);
}

function view(dispatch, model) {
  return div({className: 'mw6 center'}, [
    h1({className: 'f2 pv2 bb'}, 'Simple Family Budget'),
    formView(dispatch, model),
    tableView(dispatch, model.expenses),
  ]);
}

export default view;