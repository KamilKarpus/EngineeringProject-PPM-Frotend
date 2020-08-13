import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

interface Props{
    loadPage(number : number) : void;
    loadPrevious() : void;
    loadNext() : void;
    paginations : Array<number>;
    activePage : number;
    totalPage : number;
}

const PagePagination : React.FC<Props> = (props : Props) =>{
    return(
            <Pagination>
            <PaginationItem>
                <PaginationLink first onClick={()=>{props.loadPage(1)}} />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink previous onClick={()=>{props.loadPrevious()}} />
            </PaginationItem>
            {props.paginations?.map(p=>(
                <PaginationItem active={p === props.activePage}>
                    <PaginationLink onClick={()=>{props.loadPage(p);}}>
                            {p}
                    </PaginationLink>
                </PaginationItem>
            ))}
            <PaginationItem>
                <PaginationLink next onClick={()=>{props.loadNext()}} />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink last onClick={()=>{props.loadPage(props.totalPage)}} />
            </PaginationItem>
            </Pagination>
    )
}

export default PagePagination;