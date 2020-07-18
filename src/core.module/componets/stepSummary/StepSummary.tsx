import React, { useEffect } from 'react';
import { STEP_CHANGE } from '../../actions/currentStepActions';
import { useDispatch, useSelector } from 'react-redux';
import { StepsState } from '../../types/Step';
import { AppState } from '../../reducers';
const StepSummary = () =>{
    const dispatch = useDispatch();
    const state: StepsState = useSelector((state: AppState) => state.stepsState);
    useEffect(()=>{
        dispatch({
            type: STEP_CHANGE,
            payload: 3
          })
    },[]);
    return(
        <div>
            <h1>Podsumowanie procesu produkcyjnego {state.flowView.name}</h1>
            <table>
                <tr>
                    <td>
                        Liczba dni potrzebnych na ukończenie:
                    </td>
                    <td>
                        {state.flowView.requiredDaysToFinish}
                    </td>
                </tr>
                <tr>
                    <td>
                        Status:
                    </td>
                    <td>
                        {state.flowView.statusId === 1 ? "W budowie" : "gotowe do użytku"}
                    </td>
                </tr>
                <tr>
                    <td>
                        Czy proces jest poprawny? 
                    </td>
                    <td>
                        {state.flowView.isValid === true ? "Tak" : "Nie"}
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default StepSummary;

