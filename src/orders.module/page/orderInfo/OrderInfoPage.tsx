import React, { useEffect } from 'react';
import { OrdersRepository } from '../../repositories/OrdersRepository';
import { useHistory } from 'react-router-dom';
import { OrderView } from '../../models/OrderView';
import { Container, Row, Col, Breadcrumb, BreadcrumbItem, Table, Progress } from 'reactstrap';
import InfoSideMenu from '../../componets/infoSideMenu/InfoSideMenu';
import { OrderState } from '../../types/Order';
import { AppState } from '../../reducers';
import { useSelector } from 'react-redux';

const OrderInfoPage = () =>{
    const state: OrderState = useSelector((state: AppState) => state.orderState);
    const [order, setOrder] = React.useState<OrderView>();
    const repository = new OrdersRepository();
    const history = useHistory();
    useEffect(()=>{
        repository.GetOrder(history.location.state.id)
        .then(p=>{
            setOrder(p);
        })
    },[]);
    useEffect(()=>{
      if(state.fetchNeeded === true){
      repository.GetOrder(history.location.state.id)
      .then(p=>{
          setOrder(p);
        })
      }
      },[state.fetchNeeded]);
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
          <Row>
            <Col><b>Opis:</b></Col>
          </Row>
          <Row>
            <Col>{order?.description}</Col>
          </Row>
          </Container>
          <Breadcrumb>
            <BreadcrumbItem>Paczki w zamówieniu</BreadcrumbItem>
        </Breadcrumb>
        <Table>
                    <thead>
                        <tr>
                            <th>Numer paczki</th>
                            <th>Nazwa Procesu</th>
                            <th>Postęp</th>
                            <th>Wysokosć [m]</th>
                            <th>Szerokosć [m]</th>
                            <th>Waga [kg]</th>
                        </tr>
                    </thead>
                    {order?.packages.map(p =>(
                        <tr key={p.packageId} >
                            <td scope="row">
                                {p.number}
                            </td>
                            <td scope="row">
                                {p.flowName}
                            </td>
                            <td>
                              <Progress value={p.progress}> {`${p.progress}%`} </Progress>
                            </td>
                            <td>
                              {p.height}
                            </td>
                            <td>
                              {p.width}
                            </td>
                            <td>
                              {p.height}
                            </td>
                        </tr>
                        
                    ))}
                </Table>
        </div>
      </div>
);
}
export default OrderInfoPage;