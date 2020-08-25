import React from 'react';
import { Component } from 'react';
import {FaRegCircle } from 'react-icons/fa';
import './stepList.css';
import { AiFillCheckCircle } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { AppState } from '../../reducers';

export interface StepListElement{
    number: number;
    name: string;
}
export interface StepListState{
    steps: StepListElement[];
}
const initialState = {
  steps:[
      {number: 1, name: "Utworzenie definicji"},
      {number: 2, name: "Utworzenie etapów"},
      {number: 3, name: "Podsumowanie"}    
  ]
}
const StepList = () =>{
        const state = initialState;
        const currentNumber: number = useSelector((state: AppState) => state.currentStep);
        return (
          <div className="container">
            <ul>
            {state.steps.map(step =>(
              <li key={step.number} className={step.number ===  currentNumber ? "active-step" : "" }>
              <div className="element">
                {step.number >= currentNumber ? <FaRegCircle/> : <AiFillCheckCircle/>}
                <span>
                  Krok {step.number} 
                </span>
                <span>
                  {step.name}
                </span>
              </div> 
              </li>
              ))}
            </ul>
          </div>
        );
}
export default StepList;