import { MouseEventHandler } from 'react';
import { BasicModal } from '@/container';

interface ModalForDeveloperProps {
  isOpen: boolean;
  onClose: MouseEventHandler;
}

// const DEVELOP

export const ModalForDeveloper = ({
  isOpen,
  onClose,
}: ModalForDeveloperProps) => {
  return (
    <BasicModal
      title={'JTBG는 개발중!'}
      isOpen={isOpen}
      onClose={onClose}
      dimmed
      bottomContents={<div>testestest</div>}
    >
      <div
        style={{
          width: 50,
          height: '1200px',
          background: '#ff0000',
        }}
      >
        <div style={{}}>contents</div>
      </div>
    </BasicModal>
  );
};
