import React from 'react';
import { connect } from 'react-redux';

const Keyboard = ({ addNumber, evaluate, clear }) => {
  return(
    <div className="d-flex align-items-center justify-content-center" style={{height: "85%", padding: "2px" , fontFamily: "Orbitron, sans-serif"}}>
      <div className="left h-100 w-75 p-0 m-0 d-flex flex-column">
        <div className="d-flex" style={{height: "20%"}}>
          <div className="btn btn-danger rounded-0 two-third d-flex justify-content-center align-items-center font" onClick={clear} id="clear">AC</div>
          <div className="btn btn-secondary rounded-0 square one-third d-flex justify-content-center align-items-center font" onClick={(event) => {addNumber(event.target.innerText); console.log(event.target.innerText)}} id="divide">/</div>
        </div>
        <div className="d-flex" style={{height: "20%"}}>
          <div className="btn btn-secondary rounded-0 square one-third d-flex justify-content-center align-items-center font number" onClick={(event) => {addNumber(event.target.innerText); console.log(event.target.innerText)}} id="seven">7</div>
          <div className="btn btn-secondary rounded-0 square one-third d-flex justify-content-center align-items-center font number" onClick={(event) => {addNumber(event.target.innerText); console.log(event.target.innerText)}} id="eight">8</div>
          <div className="btn btn-secondary rounded-0 square one-third d-flex justify-content-center align-items-center font number" onClick={(event) => {addNumber(event.target.innerText); console.log(event.target.innerText)}} id="nine">9</div>
        </div>
        <div className="d-flex" style={{height: "20%"}}>
          <div className="btn btn-secondary rounded-0 square one-third d-flex justify-content-center align-items-center font number" onClick={(event) => {addNumber(event.target.innerText); console.log(event.target.innerText)}} id="four">4</div>
          <div className="btn btn-secondary rounded-0 square one-third d-flex justify-content-center align-items-center font number" onClick={(event) => {addNumber(event.target.innerText); console.log(event.target.innerText)}} id="five">5</div>
          <div className="btn btn-secondary rounded-0 square one-third d-flex justify-content-center align-items-center font number" onClick={(event) => {addNumber(event.target.innerText); console.log(event.target.innerText)}} id="six">6</div>
        </div>
        <div className="d-flex" style={{height: "20%"}}>
          <div className="btn btn-secondary rounded-0 square one-third d-flex justify-content-center align-items-center font number" onClick={(event) => {addNumber(event.target.innerText); console.log(event.target.innerText)}} id="one">1</div>
          <div className="btn btn-secondary rounded-0 square one-third d-flex justify-content-center align-items-center font number" onClick={(event) => {addNumber(event.target.innerText); console.log(event.target.innerText)}} id="two">2</div>
          <div className="btn btn-secondary rounded-0 square one-third d-flex justify-content-center align-items-center font number" onClick={(event) => {addNumber(event.target.innerText); console.log(event.target.innerText)}} id="three">3</div>
        </div>
        <div className="d-flex" style={{height: "20%"}}>
          <div className="btn btn-secondary rounded-0 two-third d-flex justify-content-center align-items-center font number" onClick={(event) => {addNumber(event.target.innerText); console.log(event.target.innerText)}} id="zero">0</div>
          <div className="btn btn-secondary rounded-0 square one-third d-flex justify-content-center align-items-center font number" onClick={(event) => {addNumber(event.target.innerText); console.log(event.target.innerText)}} id="decimal">.</div>
        </div>
      </div>
      <div className="right d-flex flex-column h-100 w-25 p-0 m-0">
        <div className="btn btn-secondary rounded-0 square d-flex justify-content-center align-items-center font" onClick={(event) => {addNumber('*'); console.log(event.target.innerText)}} id="multiply">x</div>
        <div className="btn btn-secondary rounded-0 square d-flex justify-content-center align-items-center font" onClick={(event) => {addNumber(event.target.innerText); console.log(event.target.innerText)}} id="subtract">-</div>
        <div className="btn btn-secondary rounded-0 square d-flex justify-content-center align-items-center font" onClick={(event) => {addNumber(event.target.innerText); console.log(event.target.innerText)}} id="add">+</div>
        <div className="btn btn-info rounded-0 d-flex justify-content-center align-items-center font border-0" style={{height: "192px", backgroundColor: "#133791", color: "white"}} onClick={evaluate} id="equals">=</div>
      </div>
    </div>
  );
}

const regex = /[0-9.]/;

const mapStateToProps = (state) => ({
  currentInput: state.formulaInput.currentInput
});

const mapDispatchToProps = (dispatch) => ({
  addNumber: (input) => regex.test(input) 
    ? dispatch({ type: "ADD_NUMBER", input: input }) 
    : dispatch({ type: "ADD_OPERATOR", input: input }),
  evaluate: () => dispatch({ type: "EVALUATE" }),
  clear: () => dispatch({ type: "CLEAR" })
});

export default connect(mapStateToProps, mapDispatchToProps)(Keyboard);