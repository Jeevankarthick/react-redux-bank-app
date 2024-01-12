import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

function reducerAccount(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };

    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.loan > 0) return;
      return {
        ...state,
        loan: action.payload.amount,
        balance: state.balance + action.payload.amount,
        loanPurpose: action.payload.purpose,
      };

    case "account/payLoan":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanPurpose: "",
      };

    default:
      return state;
  }
}

function reducerCustomer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: action.payload.createdAt,
      };

    case "customer/updateCustName":
      return { ...state, fullName: action.payload };

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: reducerAccount,
  customer: reducerCustomer,
});

const store = createStore(rootReducer);

// store.dispatch({ type: "account/deposit", payload: 200 });
// store.dispatch({ type: "account/withdraw", payload: 50 });
// console.log(store.getState());

// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, purpose: "to buy a car" },
// });
// console.log(store.getState());

// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}

function payLoan() {
  return { type: "account/payLoan" };
}

store.dispatch(deposit(300));
store.dispatch(withdraw(50));
console.log(store.getState());

store.dispatch(requestLoan(1000, "to buy a phone"));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());

function createCustomer(fullName, nationalId) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalId, createdAt: new Date().toISOString() },
  };
}

function updateCustName(updatedName) {
  return { type: "customer/updateCustName", payload: updatedName };
}

store.dispatch(createCustomer("Jeevankarthick", "999876"));
console.log(store.getState());

store.dispatch(updateCustName("Jeevankarthick B"));
console.log(store.getState());

store.dispatch(deposit(500));
console.log(store.getState());
