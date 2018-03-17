# Budget App Plan / Notes

## Data Model

Example Model/Shape: 

```javascript
expense = {
  id: 1,
  date: '17.03.2018',
  description: 'Food', 
  price: 250,
}
model = {
  expenses: [],
  showForm: false,
  date: '17.03.2018',
  description: 'Water',
  price: 25,
  editId: 3,
  nextId: 1,
}
```

## View Functions

view
  formView
    fieldSet
    buttonSet
  tableView
    tableHeader
    expensesBody
      expenseRow
        cell
      totalRow
  expensesChart 

## Update Functions

click add expense
expense input
price input
click save (add/update)
click edit
click delete

