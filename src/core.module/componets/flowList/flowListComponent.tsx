import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MENU_CHANGE } from '../../actions/moduleActions';
import { ProductionFlowRepository } from '../../repositories/productionFlowRepository';
import { PaginationList } from '../../../shared/model/Pagination';
import { FlowShortView } from '../../models/FlowShortView';
import { Table } from 'reactstrap';
import './flowListComponent.css';
import { isNullOrUndefined } from 'util';
import PagePagination from '../../../shared/components/paginations/Pagination';

const initial : PaginationList<FlowShortView> ={
    currentPage: 0,
    totalPages: 0,
    pageSize: 0,
    totalCount: 0,
    items: [],
    hasPrevious: false,
    hasNext: false,
}

const FlowList = () =>{
    const dispatch = useDispatch();
    const repository = new ProductionFlowRepository();
    const [flows, setFlows] = React.useState<PaginationList<FlowShortView>>(initial);
    const [pagination, setPagination] = React.useState<number[]>();
    const [currentPage, setPage] = React.useState<number>(1);
     useEffect(()=>{
        dispatch({
            type: MENU_CHANGE,
            payload: 2
        })
        repository.GetFlows(1, 12)
        .then(result => {
            setFlows(result);
            setPage(1);
            generatePagination(result);
        });
    }, []);
    const generatePagination = (result : PaginationList<FlowShortView>) => {
        let pagginationElements = [];
        if(!isNullOrUndefined(result)){
        for(let i = 0;i<result!.totalPages;i++){
                pagginationElements.push(i+1);
            }
            setPagination(pagginationElements);
        }

    }
    const loadPage = (page: number) =>{
        if(page >= 1 && page <= flows!.totalPages) 
        {
        repository.GetFlows(page, 12)
        .then(result => {
            setFlows(result);
            setPage(page);
            generatePagination(result);
        });
        }
    }
    const loadNext = ()=>{
        loadPage(currentPage + 1)
    }
    const loadPrevious = ()=>{
        loadPage(currentPage - 1);
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
            <PagePagination loadPage={loadPage} loadPrevious={loadPrevious} loadNext={loadNext} totalPage={flows.totalCount}
            activePage = {flows.currentPage} paginations={pagination as number[]} />
        </div>
    );
}

export default FlowList;

