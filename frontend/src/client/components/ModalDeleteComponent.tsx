import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

interface DeleteModalProps {
  titleModal: string;
  isOpen: boolean;
  onClose: () => void;
  url: string;
  targetId: number;
  onUpdate: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, titleModal, url, targetId, onUpdate }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleDelete = () => {
    setIsSubmitting(true);

    const request = axios.delete(`${url}/${targetId}`);

    if (request) {
      request.then(response => {
        console.log('Dữ liệu đã được xóa thành công trên server');
        setIsSubmitting(false);
        setIsConfirmed(true);
        onUpdate();
      })
        .catch(error => {
          console.error('Lỗi khi gửi yêu cầu xóa dữ liệu lên server:', error);
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
          Bạn có muốn chắc muốn xóa không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Hủy bỏ
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={isSubmitting}>
            {isSubmitting ? 'Đang xóa...' : 'Xóa'}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={isConfirmed} onHide={() => setIsConfirmed(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Dữ liệu đã được xóa thành công.
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

interface ModalDeleteComponentProps {
  titleModal: string;
  url: string;
  targetId: number;
  onUpdate: () => void;
}

const ModalDeleteComponent: React.FC<ModalDeleteComponentProps> = ({ titleModal, url, targetId, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div style={{ border: '1px solid' }}
        className="btn p-1 px-2 mx-2" onClick={handleOpenModal}>
        <i className="fas fa-trash-alt"></i>
      </div>
      <DeleteModal isOpen={isModalOpen} onClose={handleCloseModal} titleModal={titleModal} url={url} targetId={targetId} onUpdate={onUpdate} />
    </>
  );
};

export default ModalDeleteComponent;