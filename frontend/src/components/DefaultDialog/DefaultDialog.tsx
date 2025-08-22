import * as Dialog from '@radix-ui/react-dialog';
import * as S from './DefaultDialog.styles';
import { X } from '@phosphor-icons/react';

export function DefaultDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog.Portal>
      <S.DialogOverlay />
      <S.DialogContent>
        <Dialog.Close asChild>
          <S.DialogClose>
            <X size={24} />
          </S.DialogClose>
        </Dialog.Close>
        {children}
      </S.DialogContent>
    </Dialog.Portal>
  );
}
