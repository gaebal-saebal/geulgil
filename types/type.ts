export type ModalProps = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  onClose: () => void;
  modalContent?: string;
  upperMsg?: string;
  lowerMsg?: string;
};
