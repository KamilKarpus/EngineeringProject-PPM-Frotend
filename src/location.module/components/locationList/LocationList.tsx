import React from 'react';
import { Table } from 'reactstrap';
import PagePagination from '../../../shared/components/paginations/Pagination';
import { PaginationList } from '../../../shared/model/Pagination';
import { LocationView } from '../../models/LocationView';
type Props = {
    list : PaginationList<LocationView>,
    loadPage(number : number) : void,
    loadPrevious() : void,
    loadNext() : void,
    pagination : number[],
}
const LocationList : React.FC<Props> = (props) =>{
    return(
        <div className="w-100">
                    <Table>
                        <thead>
                        {props.list.items.map(location =>(
                            <tr key={location.name}>
                                <td scope="row">
                                    {location.name}
                                </td>
                            </tr>
                        ))}
                        </thead>
                    </Table>
                    <div className="d-flex justify-content-center">
                        <PagePagination loadPage={props.loadPage} loadPrevious={props.loadPrevious} loadNext={props.loadNext} totalPage={props.list.totalCount}
                        activePage = {props.list.currentPage} paginations={props.pagination as number[]} />
                    </div>
                </div>
    );
}

export default LocationList;