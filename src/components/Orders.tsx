import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { Product } from '../types';
import { deleteOrder } from '../store/ordersSlice';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { BsTrash3 } from "react-icons/bs";




const Orders: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [orderIdToDelete, setOrderIdToDelete] = React.useState<number | null>(null);
  const [selectedOrderId, setSelectedOrderId] = React.useState<number | null>(null);
  const [isProductListOpen, setIsProductListOpen] = React.useState(false);
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.orders);
  const products = useSelector((state: RootState) => state.products);

  const handleDeleteOrder = (orderId: number) => {
    setOrderIdToDelete(orderId);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (orderIdToDelete) {
      dispatch(deleteOrder(orderIdToDelete));
    }
    setIsModalOpen(false);
    setOrderIdToDelete(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setOrderIdToDelete(null);
  };

  const handleOrderTitleClick = (orderId: number) => {
    if (selectedOrderId === orderId) {
      setSelectedOrderId(null);
      setIsProductListOpen(false);
    } else {
      setSelectedOrderId(orderId);
      setIsProductListOpen(true);
    }
  };

  const getOrderById = (orderId: number) => {
    return orders.find((order) => order.id === orderId);
  };

  const getProductsByOrderId = (orderId: number) => {
    return products.filter((product) => product.order === orderId);
  };

  const calculateTotalPrice = (products: Product[]) => {
    let totalSumUSD = 0;
    let totalSumUAH = 0;

    products.forEach((product) => {
      product.price.forEach((price) => {
        if (price.symbol === 'USD') {
          totalSumUSD += price.value;
        } else if (price.symbol === 'UAH') {
          totalSumUAH += price.value;
        }
      });
    });

    return {
      totalSumUSD,
      totalSumUAH,
    };
  };

  return (
    <div className="container">
      <h2 className="my-5 ">Приходы</h2>
      <div className="row">
        <div className={`col-sm-${isProductListOpen ? '8' : '12'}`}>
          <div className="order-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card " >
                <div className="card mb-3 bg-white">
                  <div className="card-body d-flex justify-content-between gap-1 align-items-center">
                   

                    <h5
                      className="card-title "
                      onClick={() => handleOrderTitleClick(order.id)}
                      style={{ cursor: 'pointer' }} 
                    >
                      {order.title}
                    </h5>

                      <span className="text-secondary ">Статус: {order.status}</span> 
                      <span className="text-secondary ">Дата: {order.date}</span> 
                      <span className="text-secondary  d-flex align-items-center gap-3">Сумарно:   
                      <div >
                        <div>
                          {calculateTotalPrice(getProductsByOrderId(order.id)).totalSumUSD}$
                        </div>
                        <div>
                          {calculateTotalPrice(getProductsByOrderId(order.id)).totalSumUAH} UAH
                        </div>
                      </div>
                      </span>
                      

                    <button
                      className="btn"
                      onClick={() => handleDeleteOrder(order.id)}
                    >
                      <BsTrash3/>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {isProductListOpen && (
          <div className="col-md-4">
            {selectedOrderId && (
              <div className="card bg-white">
                <div className="card-body">
                  <h5 className='mb-3'>{getOrderById(selectedOrderId)?.title}</h5>
                  {getProductsByOrderId(selectedOrderId).map((product) => (
                    <div key={product.id} >
                      <h6>{product.title}</h6>
                      
                        <div className=" ">Тип: {product.type}  </div> 
                        <div className=" ">Спецификация:  {product.specification}</div>
                      
                      <div className='d-flex gap-3 my-2'>
                        <h6>Цена: </h6>
                        {product.price.map((price) => (
                          <p key={price.symbol}>
                            {price.value} / {price.symbol}
                          </p>
                        ))}
                      </div>
                      
                      
                    </div>
                  ))}
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleOrderTitleClick(selectedOrderId)}
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <Modal show={isModalOpen} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fs-6">Вы уверены, что хотите удалить этот приход?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {orderIdToDelete && (
            <div  className='text-center'>
              <h5>{getOrderById(orderIdToDelete)?.title}</h5>
              <p>
                 Вы уверены, что хотите удалить этот заказ? <br /> Это действие не может быть отменено.
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className='bg-success'>
          <Button variant="success" onClick={handleModalClose} className='text-light'>
            Отменить
          </Button>
          <Button variant="light" onClick={handleDeleteConfirm} className='d-flex gap-1 text-danger align-items-center'>
           <BsTrash3/>  Удалить
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Orders;
