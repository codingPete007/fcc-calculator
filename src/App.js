import React from 'react';
import { connect } from 'react-redux';
import './App.scss';
import Keyboard from './components/keyboard';

const operatorRegex = /[*/+=-]/g;

function App({ formulaInput, currentInput }) {
  console.log('In App:', currentInput);
  return (
    <div className='vw-100 vh-100 d-flex align-items-center justify-content-center' style={{backgroundColor: "lightgray"}}>
      <div className='calc-container bg-black p-1' style={{width: "400px", height: "550px", border: "3px solid navy"}}>
        <div className='display text-white d-flex flex-column pe-2 justify-content-end align-items-end' style={{height: "15%", fontFamily: "digital"}}>
          <div className='fs-3' style={{color: "orange", height: "35%"}} id="display">
            {typeof formulaInput === 'string' 
              ? formulaInput.replace(operatorRegex, (match) => ' ' + match + ' ').replace('*', '᛫')
              : formulaInput
            }
          </div>
          <div className='fs-1' style={{height: "64%"}}>
            {typeof currentInput === 'string' 
              ? currentInput.replace('*', '᛫')
              : currentInput
            }
          </div>
        </div>
        <Keyboard />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  formulaInput: state.formulaInput.formulaInput,
  currentInput: state.formulaInput.currentInput
})
 
export default connect(mapStateToProps)(App);
