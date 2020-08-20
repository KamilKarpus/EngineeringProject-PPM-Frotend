import React from 'react';
import { Breadcrumb, BreadcrumbItem, Container, Row, Col, Table, Progress } from 'reactstrap';
import { OrderView } from '../../models/OrderView';
import OrderInfoPage from '../../page/orderInfo/OrderInfoPage';
import StatusSelector from './StatusSelector';
type Props = {
    order: OrderView
}

const OrderInfo = (props : Props) =>{
    const { order } = props;  
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const status = new StatusSelector(order.statusId);
    return(
    <div className="w-100">
    <Breadcrumb>
        <BreadcrumbItem>Zamówienie numer {`${order.orderNumber}/${order.orderYear}`}</BreadcrumbItem>
    </Breadcrumb>
      <Container fluid="sm"> 
      <Row xs="2">
        <Col><b>Nazwa firmy zamawiającej:</b></Col>
        <Col><b>Data dostarczenia</b></Col>
        <Col>{order.companyName}</Col>
        <Col>{new Date(order.deliveryDate).toLocaleDateString('pl-PL',options)}</Col>
      </Row>
      <Row xs="2">
        <Col><b>Status:</b></Col>
        <Col><b>Data Rozpoczęcia:</b></Col>
        <Col>{status.getStatus()}</Col>
        <Col>{new Date(order.orderedDate).toLocaleDateString('pl-PL',options)}</Col>
      </Row>
      <Row>
        <Col><b>Opis:</b></Col>
      </Row>
      <Row>
        <Col>{order.description}</Col>
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
    );
}

export default OrderInfo;