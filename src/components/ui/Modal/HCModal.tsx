import { Modal } from 'antd';
import { ReactElement, ReactNode } from 'react';

interface IModal {
  isOpen: boolean;
  closeModal: () => void;
  title?: string | ReactNode;
  children: ReactElement;
  handleOk?: () => void;
  showCancelButton?: boolean;
  confirmLoading?: boolean;
  showOkButton?: boolean;
  handleChange?: () => void;
  okText?: string;
}

const HCModal = ({
  isOpen,
  closeModal,
  title,
  children,
  handleOk,
  confirmLoading,
  showCancelButton = true,
  showOkButton = true,
  okText,
}: IModal) => {
  return (
    <Modal
      title={title}
      open={isOpen}
      okText={okText}
      onOk={handleOk}
      centered
      onCancel={closeModal}
      confirmLoading={confirmLoading}
      cancelButtonProps={{
        style: {
          display: showCancelButton ? 'inline' : 'none',
          backgroundColor: '#0f766e',
          color: 'white',
        },
      }}
      okButtonProps={{
        style: {
          display: showOkButton ? 'inline' : 'none',
          backgroundColor: '#dc2626',
        },
      }}
    >
      {children}
    </Modal>
  );
};

export default HCModal;
