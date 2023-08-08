import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

interface UpdateModalProps {
  titleModal: string;
  isOpen: boolean;
  onClose: () => void;
  url: string;
  inputFields: string[];
  targetId: number;
  onUpdate: () => void;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ titleModal, isOpen, onClose, url, inputFields, targetId, onUpdate }) => {
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    axios.get(`${url}/${targetId}`)
      .then(response => {
        setInputValues(response.data);
      })
      .catch(error => {
        console.error('Lỗi khi lấy dữ liệu từ server:', error);
        onClose();
      });
  }, [url, targetId, onClose]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    const request = axios.put(`${url}/${targetId}`, inputValues)

    if (request) {
      request.then(response => {
        console.log('Dữ liệu đã được gửi lên server thành công');
        setIsSubmitting(false);
        setIsConfirmed(true);
        setInputValues({})

        onUpdate();
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
              <Form.Group controlId={`formUpdateInput-${index}`} key={field}>
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
            {isSubmitting ? 'Đang gửi...' : 'Cập nhật'}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={isConfirmed} onHide={() => setIsConfirmed(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Dữ liệu đã được cập nhật thành công.
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

interface ModalUpdateComponentProps {
  titleModal: string;
  inputFields: string[];
  url: string;
  targetId: number;
  onUpdate: () => void;
}

const ModalUpdateComponent: React.FC<ModalUpdateComponentProps> = ({ titleModal, inputFields, url, targetId, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        style={{ border: '1px solid' }}
        className="btn p-1 px-2"
        onClick={handleOpenModal}>
        <i className="fas fa-edit"></i>
      </div>
      <UpdateModal isOpen={isModalOpen} onClose={handleCloseModal} url={url} inputFields={inputFields} titleModal={titleModal} targetId={targetId} onUpdate={onUpdate} />
    </>
  );
};

export default ModalUpdateComponent;