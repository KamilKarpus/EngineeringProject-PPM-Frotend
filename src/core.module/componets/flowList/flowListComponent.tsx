import React, { useEffect } from 'react';
import { MENU_CHANGE } from '../../actions/moduleActions';
import { PaginationList } from '../../../shared/model/Pagination';
import { FlowShortView } from '../../models/FlowShortView';
import { Table } from 'reactstrap';
import './flowListComponent.css';
import { isNullOrUndefined } from 'util';
import PagePagination from '../../../shared/components/paginations/Pagination';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { StatusSelector } from './StatusSelector';
import { useHistory } from 'react-router-dom';
import { fetchFlows, subscribeToResource } from '../../repositories/Thunk-Actions/FlowListThunk-Actions';
import { AppState } from '../../reducers';
import LoadingSpinner from '../../../shared/components/Spinner';


interface StateProps{
    flows: PaginationList<FlowShortView>;
    isLoading: boolean;
}

interface DispatchProps{
    menuChange() : void;
    getFlows(pageNumber : number, pageSize : number) : void;
    subscribe() : void;
  
  }

type Props = DispatchProps & StateProps;

const FlowList : React.FC<Props> = (props) =>{
    const statusSelector = new StatusSelector();
    const history = useHistory();
    const [pagination, setPagination] = React.useState<number[]>();
    const [currentPage, setPage] = React.useState<number>(1);
     useEffect(()=>{
        props.subscribe();
        props.menuChange();
        props.getFlows(1, 12);
    },[]);
    useEffect(()=>{
        generatePagination(props.flows);
    }, [props.flows])
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
        if(page >= 1 && page <= props.flows.totalPages) 
        {
        props.getFlows(page, 12)
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
             {props.isLoading &&
                <LoadingSpinner message="Trwa ładowanie listy przepływów.."/>}
            <Table>
                <thead>
                <tr>
                    <th>Nazwa przepływu</th>
                    <th>Prawidłowość budowy</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {props.flows.items.map(flow =>(
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
            <PagePagination loadPage={loadPage} loadPrevious={loadPrevious} loadNext={loadNext} totalPage={props.flows.totalCount}
            activePage = {props.flows.currentPage} paginations={pagination as number[]} />
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
        subscribe: () =>(
            dispatch(subscribeToResource())
        )
    }
  }
  const mapStateToProps = (store: AppState) => {
    return {
        
        isLoading: store.flowsList.isLoading,
        flows: store.flowsList.flows
        

    };
  };

  export default connect(
    mapStateToProps,
    mapDispatch
  )(FlowList)

