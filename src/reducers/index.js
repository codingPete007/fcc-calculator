// src/reducers/index.js
import { combineReducers } from 'redux';
import { evaluate } from 'mathjs';

// Reducers
const initialState = {
  // counter: 0,
  formulaInput: '0',
  currentInput: '0',
  isEvaluated: false
};

// null darf nicht am anfang der zahl sein, ohne dass ein Punkt folgt
// null darf nicht am ende der zahl sein, wenn sie nach dem punkt kommt

const startRegex = /^0(?![.*/+=-])/;
const multipleRegex = /([*/+=-])0+(?!\.)([1-9])/;
const zeroDecimalRegex = /([*/+=-])0+\./g;
const zeroRegex = /\.0+[*/+=-]$|\.[*/+=-]$/;
const testRegex = /\.(\d*[1-9])0+([*/+=-])$/;
const operatorRegex = /^[*/+=-]/;
const multipleOperatorRegex = /[*/+=-]+([*/+=])|([*/+=-]-)-/;
const decimalRegex = /(\.\d*)\./;

const formulaInputReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NUMBER':
      return state.isEvaluated
      ? { ...state,
        formulaInput: action.input,
        currentInput: action.input,
        isEvaluated: false
      }
      : { ...state, 
        formulaInput: (state.formulaInput + action.input)
          .replace(startRegex, '')
          .replace(multipleRegex, '$1$2')
          .replace(decimalRegex, '$1')
          .replace(zeroDecimalRegex, '$10.'), 
        currentInput: (state.currentInput + action.input)
          .replace(startRegex, '')
          .replace(multipleRegex, match => match.replace('0', ''))
          .replace(operatorRegex, '')
          .replace(decimalRegex, '$1')
      };
    
    case 'ADD_OPERATOR':
      return state.isEvaluated
      ? { ...state,
        formulaInput: state.currentInput + action.input,
        currentInput: action.input,
        isEvaluated: false
      }
      : { ...state, 
        formulaInput: testRegex.test(state.formulaInput)
          ? (state.formulaInput + action.input)
          : (state.formulaInput + action.input).replace(testRegex, ".$1$2").replace(zeroRegex, match => match.slice(match.length - 1)).replace(multipleOperatorRegex, '$1$2'),
        currentInput: action.input
      };

    case 'EVALUATE':
      return { ...state, 
        formulaInput: evaluate(state.formulaInput),
        currentInput: evaluate(state.formulaInput),
        isEvaluated: true
      };

    case 'CLEAR':
      return { ...state,
        formulaInput: '0',
        currentInput: '0'
      };

    default:
      return state;
  }
}
// 3 + 5 * 6 - 2 / 4 = 32.5 || 11.5
// Combine Reducers
const rootReducer = combineReducers({
  // counter: counterReducer,
  formulaInput: formulaInputReducer
});

export default rootReducer;