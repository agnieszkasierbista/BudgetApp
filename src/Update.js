import * as R from 'ramda';

export const MSGS = {
  SHOW_FORM: 'SHOW_FORM',
  DATE_INPUT: 'DATE_INPUT',
  EXPENSE_INPUT: 'EXPENSE_INPUT',
  PRICE_INPUT: 'PRICE_INPUT',
  SAVE_EXPENSE: 'SAVE_EXPENSE',
  DELETE_EXPENSE: 'DELETE_EXPENSE',
  EDIT_EXPENSE: 'EDIT_EXPENSE',
};

export function showFormMsg(showForm) {
  return {
    type: MSGS.SHOW_FORM,
    showForm,
  };
}

export function expenseInputMsg(description) {
  return {
    type: MSGS.EXPENSE_INPUT,
    description,
  };
}

export function dateInputMsg(date) {
  return {
    type: MSGS.DATE_INPUT,
    date,
  };
}

export function priceInputMsg(price) {
  return {
    type: MSGS.PRICE_INPUT,
    price,
  };
}

export const saveExpenseMsg = {type: MSGS.SAVE_EXPENSE};

export function deleteExpenseMsg(id) {
  return {
    type: MSGS.DELETE_EXPENSE,
    id,
  };
}

export function editExpenseMsg(editId) {
  return {
    type: MSGS.EDIT_EXPENSE,
    editId,
  };
}

function update(msg, model) {
  switch (msg.type) {
    case MSGS.SHOW_FORM: {
      const {showForm} = msg;
      return {...model, showForm, date: '', description: '', price: 0};
    }
    case MSGS.DATE_INPUT: {
      const {date} = msg;
      return {...model, date};
    }
    case MSGS.EXPENSE_INPUT: {
      const {description} = msg;
      return {...model, description};
    }
    case MSGS.PRICE_INPUT: {
      const price = R.pipe(
        parseInt,
        R.defaultTo(0),
      )(msg.price);
      return {...model, price};
    }
    case MSGS.SAVE_EXPENSE: {
      const {editId} = model;
      const updatedModel = editId !== null ?
        edit(msg, model) :
        add(msg, model);
      return updatedModel;
    }
    case MSGS.DELETE_EXPENSE: {
      const {id} = msg;
      const expenses = R.filter(
        expense => expense.id !== id,
        model.expenses);
      return {...model, expenses};
    }
    case MSGS.EDIT_EXPENSE: {
      const {editId} = msg;
      const expense = R.find(
        expense => expense.id === editId,
        model.expenses);
      const {date, description, price} = expense;
      return {
        ...model,
        editId,
        date,
        description,
        price,
        showForm: true,
      };
    }
  }
  return model;
}

function add(msg, model) {
  const {nextId, date, description, price} = model;
  const expense = {id: nextId, date, description, price};
  const expenses = [...model.expenses, expense];
  return {
    ...model,
    expenses,
    nextId: nextId + 1,
    date: '',
    description: '',
    price: 0,
    showForm: false,
  };
}

function edit(msg, model) {
  const {date, description, price, editId} = model;
  const expenses = R.map(
    expense => {
      if (expense.id === editId) {
        return {...expense, date, description, price};
      }
      return expense;
    }, model.expenses);
  return {
    ...model,
    expenses,
    date: '',
    description: '',
    price: 0,
    showForm: false,
    editId: null,
  }
}

export default update;