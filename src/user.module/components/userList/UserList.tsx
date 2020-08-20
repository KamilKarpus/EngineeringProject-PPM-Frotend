import React from 'react';
import UserShortModel from '../../models/UserShortModel';
import { PaginationList } from '../../../shared/model/Pagination';
import PagePagination from '../../../shared/components/paginations/Pagination';
import { Table } from 'reactstrap';

type Props = {
    list : PaginationList<UserShortModel>,
    loadPage(number : number) : void,
    loadPrevious() : void,
    loadNext() : void,
    pagination : number[],
}

const UserList = (props : Props) =>{
    const { list } = props;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    
    return(
        <div className="list">
            <Table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Imie i Nazwisko</th>
                        <th>Stanowisko</th>
                        <th>Data utworzenia konta</th>
                    </tr>
                </thead>
                {list?.items.map(user =>(
                    <tr key={user.id}>
                        <td scope="row">
                            {user.login}
                        </td>
                        <td scope="row">
                            {user.firstName} {user.lastName}
                        </td>
                        <td>
                            {user.jobPosition}
                        </td>
                        <td>
                            {new Date(user.registrationDate).toLocaleDateString('pl-PL',options)}
                        </td>
                    </tr>

                ))}
            </Table>
            <div className="d-flex justify-content-center">
                    <PagePagination loadPage={props.loadPage} loadPrevious={props.loadPrevious} loadNext={props.loadNext} totalPage={list.totalCount}
                    activePage = {list.currentPage} paginations={props.pagination}  />
                </div>
        </div>
    );
}
export default UserList;