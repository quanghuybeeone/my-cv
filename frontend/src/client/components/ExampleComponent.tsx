import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

interface InputModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  inputFields: string[];
  method: 'post' | 'put' | 'delete';
  id?: string;
}

const InputModal: React.FC<InputModalProps> = ({ isOpen, onClose, url, inputFields, method, id }) => {
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    const request = method === 'post' ? axios.post(url, inputValues) :
                    method === 'put' ? axios.put(`${url}/${id}`, inputValues) :
                    method === 'delete' ? axios.delete(`${url}/${id}`, { data: inputValues }) :
                    null;

    if (request) {
      request.then(response => {
        console.log('Dữ liệu đã được gửi lên server thành công');
        setIsSubmitting(false);
        setIsConfirmed(true);
      })
      .catch(error => {
        console.error('Lỗi khi gửi dữ liệu lên server:', error);
        setIsSubmitting(false);
        onClose();
      });
    }
    else {
      console.error('Phương thức HTTP không hợp lệ');
      setIsSubmitting(false);
      onClose();
    }
  };

  return (
    <>
      <Modal show={isOpen} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nhập dữ liệu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {inputFields.map((field, index) => (
              <Form.Group controlId={`formInput-${index}`} key={field}>
                <Form.Label>{field}:</Form.Label>
                <Form.Control type="text" placeholder={`Nhập ${field} vào đây`} name={field} value={inputValues[field] || ''} onChange={handleInputChange} />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Hủy bỏ
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Đang gửi...' : 'Gửi dữ liệu'}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={isConfirmed} onHide={() => setIsConfirmed(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Dữ liệu đã được gửi thành công.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setIsConfirmed(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

interface ExampleComponentProps {
  inputFields: string[];
  url: string;
  method: 'post' | 'put' | 'delete';
}

const ExampleComponent: React.FC<ExampleComponentProps> = ({ inputFields, url, method }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpenModal}>Mở modal nhập liệu</Button>
      <InputModal isOpen={isModalOpen} onClose={handleCloseModal} url={url} inputFields={inputFields} method={method} />
    </>
  );
};


export default ExampleComponent;