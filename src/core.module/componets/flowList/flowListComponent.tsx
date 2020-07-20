import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MENU_CHANGE } from '../../actions/moduleActions';
import { ProductionFlowRepository } from '../../repositories/productionFlowRepository';
import { Paggination } from '../../../shared/model/Paggination';
import { FlowShortView } from '../../models/FlowShortView';
import { Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import './flowListComponent.css';
import { isNullOrUndefined } from 'util';

const FlowList = () =>{
    const dispatch = useDispatch();
    const repository = new ProductionFlowRepository();
    const [flows, setFlows] = React.useState<Paggination<FlowShortView>>();
    const [paggination, setPaggination] = React.useState<number[]>();
    useEffect(()=>{
        dispatch({
            type: MENU_CHANGE,
            payload: 2
        })
        repository.GetFlows(1, 10)
        .then(result => {
            setFlows(result);
            generatePaggination(result);
        });
    }, []);
    const generatePaggination = (result : Paggination<FlowShortView>) => {
        let pagginationElements = [];
        if(!isNullOrUndefined(result)){
        for(let i = 0;i<result!.totalPages;i++){
                pagginationElements.push(i+1);
            }
            setPaggination(pagginationElements);
        }

    }
    return(
        <div className="wrapper">
            <Table>
                <thead>
                {flows?.items.map(flow =>(
                    <tr key={flow.name}>
                        <td scope="row">
                            {flow.name}
                        </td>
                    </tr>
                ))}
                </thead>
            </Table>
            <Pagination aria-label="Page navigation example">
            <PaginationItem>
                <PaginationLink first href="#" />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink previous href="#" />
            </PaginationItem>
            {paggination?.map(p=>(
                <PaginationItem>
                    <PaginationLink href="#">
                               {p}
                    </PaginationLink>
                </PaginationItem>
            ))}
            <PaginationItem>
                <PaginationLink next href="#" />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink last href="#" />
            </PaginationItem>
            </Pagination>
        </div>
    );
}

export default FlowList;

