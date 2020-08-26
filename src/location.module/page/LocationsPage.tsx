import React, { useEffect } from 'react';
import { PaginationList } from '../../shared/model/Pagination';
import { LocationView } from '../models/LocationView';
import { isNullOrUndefined } from 'util';
import './LocationPage.css';
import { connect } from 'react-redux';
import { AppState } from '../reducers';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { fetchLocationList } from '../repositories/thunk-actions/LocationThunk-Action';
import LocationList from '../components/locationList/LocationList';
import LoadingSpinner from '../../shared/components/Spinner';
import SideMenu from '../components/sideMenu/SideMenu';

interface StateProps{
    fetchNeeded: boolean;
}
interface DispatchProps{
    getLocations(pageNumber : number, pageSize : number) : Promise<PaginationList<LocationView>>
}
  
type Props = DispatchProps & StateProps;

const AddLocationPage : React.FC<Props>  = (props) =>{
    const [locations, setLocations] = React.useState<PaginationList<LocationView>>();
    const [currentPage, setPage] = React.useState<number>(1);
    const [pagination, setPagination] = React.useState<number[]>();

    useEffect(() =>{
        props.getLocations(1,10)
        .then(result =>{
            setLocations(result);
            setPage(1);
            generatePagination(result);
        });
    },[]);

   const generatePagination = (result : PaginationList<LocationView>) => {
       let pagginationElements = [];
       if(!isNullOrUndefined(result)){
       for(let i = 0;i<result!.totalPages;i++){
               pagginationElements.push(i+1);
           }
           setPagination(pagginationElements);
       }
   }
   useEffect(()=>{
    if(props.fetchNeeded === true){
        props.getLocations(1,10)
        .then(result =>{
            setLocations(result);
            setPage(1);
            generatePagination(result);
        });
    }
   },[props.fetchNeeded])
   const loadPage = (page: number) =>{
       if(page >= 1 && page <= locations!.totalPages) 
       {
       props.getLocations(page, 10)
       .then(result => {
           setLocations(result);
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
    return (
        <div className="flex-container">
        <div className="menu-left">
            <SideMenu/>
        </div>
        <div className="content-container">
            { locations !== undefined ?
            <LocationList list={locations as PaginationList<LocationView>}
            pagination = {pagination as number[]}
            loadNext = {loadNext}
            loadPrevious = {loadPrevious}
            loadPage = {loadPage} /> : <LoadingSpinner message="Trwa ładowanie listy lokalizacji..."/> 
            }
        </div>
    </div>
    );
}
const mapDispatch = (
    dispatch: ThunkDispatch<any, any, AnyAction>
  )=> {
    return{
        getLocations : (pageNumber : number, pageSize : number)  => (
            dispatch(fetchLocationList(pageSize, pageNumber))
        ),
    }
  }
  
  const mapStateToProps = (store: AppState) => {
    return {
        fetchNeeded: store.Location.fetchNedeed
    };
  };
  export default connect(
    mapStateToProps,
    mapDispatch
  )(AddLocationPage);
