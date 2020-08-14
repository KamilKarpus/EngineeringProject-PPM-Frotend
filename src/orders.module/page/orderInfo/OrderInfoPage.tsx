import React, { useEffect } from 'react';
import { OrdersRepository } from '../../repositories/OrdersRepository';
import { useHistory } from 'react-router-dom';
import { OrderView } from '../../models/OrderView';
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import InfoSideMenu from '../../componets/infoSideMenu/InfoSideMenu';

const OrderInfoPage = () =>{
    const [order, setOrder] = React.useState<OrderView>();
    const repository = new OrdersRepository();
    const history = useHistory();
    useEffect(()=>{
        repository.GetOrder(history.location.state.id)
        .then(p=>{
            setOrder(p);
        })
    },[]);
    return(
      <div className="flex-container">
        <div className="menu-left">
            <InfoSideMenu/>
        </div>
        <div className="w-100">
        <Breadcrumb>
            <BreadcrumbItem>Zamówienie numer {`${order?.orderNumber}/${order?.orderYear}`}</BreadcrumbItem>
        </Breadcrumb>
          <Container fluid="sm"> 
          <Row xs="2">
            <Col><b>Nazwa firmy zamawiającej:</b></Col>
            <Col><b>Data dostarczenia</b></Col>
            <Col>{order?.companyName}</Col>
            <Col>{order?.deliveryDate}</Col>
          </Row>
          <Row xs="2">
            <Col><b>Status:</b></Col>
            <Col><b>Data Rozpoczęcia:</b></Col>
            <Col>{order?.statusId == 1 ? 'W trakcie' : 'Zakończony'}</Col>
            <Col>{order?.orderedDate}</Col>
          </Row>
          </Container>
        </div>
      </div>
);
}
export default OrderInfoPage;