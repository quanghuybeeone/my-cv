import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

interface InputModalProps {
  titleModal: string;
  isOpen: boolean;
  onClose: () => void;
  url: string;
  inputFields: string[];
  onUpdate: () => void; // Thêm prop `onUpdate` để truyền hàm cập nhật danh sách từ component cha xuống
}

const InputModal: React.FC<InputModalProps> = ({ titleModal, isOpen, onClose, url, inputFields, onUpdate }) => {
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

    const request = axios.post(url, inputValues)

    if (request) {
      request.then(response => {
        console.log('Dữ liệu đã được gửi lên server thành công');
        setIsSubmitting(false);
        setIsConfirmed(true);
        setInputValues({})

        onUpdate(); // Gọi hàm `onUpdate` để cập nhật danh sách mục tiêu và render lại ListTarget
      })
        .catch(error => {
          console.error('Lỗi khi gửi dữ liệu lên server:', error);
          setIsSubmitting(false);
          onClose();
        });
    }
  };

  useEffect(() => {
    if (isConfirmed) {
      onClose();
    }
  }, [isConfirmed, onClose]);

  return (
    <>
      <Modal show={isOpen} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{titleModal}</Modal.Title>
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

interface ModalAddComponentProps {
  titleModal: string;
  inputFields: string[];
  url: string;
  onUpdate: () => void;
}

const ModalAddComponent: React.FC<ModalAddComponentProps> = ({ titleModal, inputFields, url, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <span className='mx-3'>
        <div style={{ border: '1px solid' }}
          className="btn p-1 px-2 mx-2" onClick={handleOpenModal}><i className="fas fa-plus"></i></div>
        <InputModal isOpen={isModalOpen} onClose={handleCloseModal} url={url} inputFields={inputFields} titleModal={titleModal} onUpdate={onUpdate} /> {/* Truyền prop `onUpdate` xuống InputModal */}
      </span>
    </>
  );
};

export default ModalAddComponent;