import React, { useEffect } from 'react';
import { MENU_CHANGE } from '../../actions/moduleActions';
import { PaginationList } from '../../../shared/model/Pagination';
import { FlowShortView } from '../../models/FlowShortView';
import { Table } from 'reactstrap';
import './flowListComponent.css';
import { isNullOrUndefined } from 'util';
import PagePagination from '../../../shared/components/paginations/Pagination';
import { connect } from 'react-redux';
import { fetchFlows } from '../../repositories/Thunk-Actions/StepsThunk-Actions';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { StatusSelector } from './StatusSelector';
import { useHistory } from 'react-router-dom';


interface DispatchProps{
    menuChange() : void;
    getFlows(pageNumber : number, pageSize : number) : Promise<PaginationList<FlowShortView>>
  
  }

const initial : PaginationList<FlowShortView> ={
    currentPage: 0,
    totalPages: 0,
    pageSize: 0,
    totalCount: 0,
    items: [],
    hasPrevious: false,
    hasNext: false,
}
type Props = DispatchProps;

const FlowList : React.FC<Props> = (props) =>{
    const statusSelector = new StatusSelector();
    const history = useHistory();
    const [flows, setFlows] = React.useState<PaginationList<FlowShortView>>(initial);
    const [pagination, setPagination] = React.useState<number[]>();
    const [currentPage, setPage] = React.useState<number>(1);
     useEffect(()=>{
        props.menuChange();
        props.getFlows(1, 12)
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
        props.getFlows(page, 12)
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
                <tr>
                    <th>Nazwa przepływu</th>
                    <th>Prawidłowość budowy</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {flows?.items.map(flow =>(
                    <tr key={flow.name} onClick={()=>{
                        history.push(`/flowadd/${flow.id}/steps`, {id: flow.id});
                    }}>
                        <td scope="row">
                            {flow.name}
                        </td>
                        <td>
                            {flow.isValid ? <p className="text-success">Prawidłowy</p> : <p className="text-danger">Nieprawidłowy</p>}
                        </td>
                        <td>
                            {statusSelector.getMessage(flow.status)}
                        </td>
                    </tr>
                ))}
            </tbody>
            </Table>
            <PagePagination loadPage={loadPage} loadPrevious={loadPrevious} loadNext={loadNext} totalPage={flows.totalCount}
            activePage = {flows.currentPage} paginations={pagination as number[]} />
        </div>
    );
}
const mapDispatch = (
    dispatch: ThunkDispatch<any, any, AnyAction>
  )=> {
    return{
        getFlows:(pageNumber : number, pageSize : number) =>(
            dispatch(fetchFlows(pageNumber, pageSize))
        ),
        menuChange:()=>(
          dispatch({
            type: MENU_CHANGE,
            payload: 2
        })
        ),
    }
  }
  

  export default connect(
    null,
    mapDispatch
  )(FlowList)

