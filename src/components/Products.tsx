import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { deleteProduct } from '../store/productsSlice';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { BsTrash3 } from 'react-icons/bs';

const Products: React.FC = () => {
  const [filterType, setFilterType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null);
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(event.target.value);
  };

  const handleDeleteProduct = (productId: number) => {
    setProductIdToDelete(productId);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (productIdToDelete) {
      dispatch(deleteProduct(productIdToDelete));
    }
    setIsModalOpen(false);
    setProductIdToDelete(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setProductIdToDelete(null);
  };

  const getProductById = (productId: number) => {
    return products.find((product) => product.id === productId);
  };

  const filteredProducts = filterType
    ? products.filter((product) => product.type === filterType)
    : products;

  return (
    <div className="container">
      <h2 className="mt-5 mb-4 ">Продукты</h2>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center">
          <select
            id="filterType"
            className="form-select"
            value={filterType}
            onChange={handleFilterChange}
          >
            <option value="">Все</option>
            <option value="Monitors">Мониторы</option>
            <option value="Laptops">Ноутбуки</option>
            <option value="Printers">Принтеры</option>
          </select>
        </div>
      </div>
      <div className="row">
        {filteredProducts.map((product) => (
          <div key={product.id} className=" mb-3">
            <div className="card bg-light">
              <div className="card-body d-flex justify-content-between gap-1 align-items-center ">

                  <h5 className="card-title text-dark ">{product.title}</h5>
                  <div className="card-text d-flex gap-4 align-items-center">
                    <span className="text-secondary">Тип:</span> {product.type}{' '}
                    <div className='gap-1'>
                      <div className="text-secondary">С: <span className='text-dark'>{product.guarantee.start} </span> </div> {' '}
                      <div className="text-secondary">По: <span className='text-dark'>{product.guarantee.end} </span>  </div> {' '}
                    </div>
                    <span className="text-secondary">Цена:</span>{' '}
                    <div className="d-flex flex-column">
                      {product.price.map((price) => (
                        <div
                          key={price.symbol}
                          className={`text-secondary `}
                        >
                          <span>{price.value}</span> {' '}
                          <span>{price.symbol}</span>
                        </div>
                      ))}
                    </div>
                    <span className="text-secondary"></span> {product.date}
                  </div>

                     <button
                      className="btn"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <BsTrash3/>
                    </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal show={isModalOpen} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fs-6">Вы уверены, что хотите удалить этот приход?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productIdToDelete && (
            <div className="fs-6">
              <h5>{getProductById(productIdToDelete)?.title}</h5>

              <p>Серийный номер: {getProductById(productIdToDelete)?.serialNumber}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="bg-success">
          <Button variant="success" onClick={handleModalClose} className="text-light">
            Отменить
          </Button>
          <Button
            variant="light"
            onClick={handleDeleteConfirm}
            className="d-flex gap-1 text-danger align-items-center"
          >
            <BsTrash3 /> Удалить
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Products;
