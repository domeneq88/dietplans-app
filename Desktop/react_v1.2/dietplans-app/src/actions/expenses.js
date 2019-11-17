import uuid from 'uuid';
import database from '../firebase/firebase';

// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
    //const uid = getState().auth.uid;
    const {
      description = '',
      meal = '',
      note = '',
      makroB = 0,
      makroW = 0,
      makroT= 0,
      amount = 0,
      createdAt = 0,
      userId = ''
    } = expenseData;
    const expense = { description, meal, note, makroB, makroW, makroT, amount, createdAt, userId };

    return database.ref(`users/${userId}/expenses`).push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }));
    });
  };
};


// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

export const startRemoveExpense = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
      dispatch(removeExpense({ id }));
    });
  };
};

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

export const startEditExpense = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {
      dispatch(editExpense(id, updates));
    });
  };
};

// SET_EXPENSES
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

export const startSetExpenses = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    
    if (uid === "t2b5rW2XO6a1a3SjMsokxQ9c4xg1") {
      return database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {
        const expenses = [];
  
        snapshot.forEach((childSnapshot) => {
          expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
  
        dispatch(setExpenses(expenses));
      });
    } else {
      return database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {
        const expenses = [];
  
        snapshot.forEach((childSnapshot) => {
          expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
  
        dispatch(setExpenses(expenses));
      });
    }
  };
};

//ACCOUNT
// EDIT_ACCOUNT
export const editAccount = ( updates) => ({
  type: 'EDIT_ACCOUNT',
  updates
});

export const startEditAccount = ( updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`usersAccounts/${uid}`).update(updates).then(() => {
      dispatch(editAccount( updates));
    });
  };
};


