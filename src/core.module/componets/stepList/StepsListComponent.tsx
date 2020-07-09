import React from 'react';
import { Component } from 'react';
import './style.css';
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
      {number: 2, name: "Utworzenie etapów"}    
  ]
}
export class StepList extends Component<{}, StepListState>{
    public readonly state = initialState;
    
    render() {
        return (
          <div className="container">
            <ul>
            {this.state.steps.map(step =>(
              <li>
              <div>
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
}