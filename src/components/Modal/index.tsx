import React, { AnimationEventHandler, useEffect, useMemo, useRef, useState } from 'react';

import * as ST from './styled';
import { PortalContainer } from '@components/Modal/Portal';
import { useBodyOverflow } from '@src/hooks/useBodyOverflow';
import { InputStub } from '@components/Modal/InputStub';

type PopupProps = {
  trigger?: JSX.Element | ((isOpen: boolean) => JSX.Element);
  open?: boolean;
  disabled?: boolean;
  nested?: boolean;
  defaultOpen?: boolean;
  children: React.ReactNode;
  offsetX?: number;
  offsetY?: number;
  arrow?: boolean;
  modal?: boolean;
  lockScroll?: boolean;
  closeOnDocumentClick?: boolean;
  closeOnEscape?: boolean;
  repositionOnResize?: boolean;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  onOpen?: (event?: React.SyntheticEvent) => void;
  onClose?: (event?: React.SyntheticEvent | KeyboardEvent | TouchEvent | MouseEvent) => void;
  contentStyle?: React.CSSProperties;
  overlayStyle?: React.CSSProperties;
  arrowStyle?: React.CSSProperties;
  className?: string;
  keepTooltipInside?: boolean | string;
}

type ModalProps = PopupProps & {
  id?: string;
  classNamePrefix?: string;
  onAnimationEnd?: AnimationEventHandler<HTMLDivElement>;
  lockBodyScroll?: boolean;
  hiddenOverlay?: boolean;
};

const Modal: React.FC<ModalProps> = ({
  id,
  children,
  className,
  onAnimationEnd,
  lockBodyScroll = true,
  contentStyle,
  open,
  closeOnDocumentClick = true,
  overlayStyle,
  trigger,
  closeOnEscape = true,
  hiddenOverlay,
  onClose,
  onOpen,
}) => {
  const [isOpen, setIsOpen] = useState(open);
  const triggerRef = useRef<HTMLElement>(null);
  const refContainer = useRef<HTMLDivElement | null>(null);

  const isOpened = useMemo(() => {
    if (trigger) {
      return isOpen && open;
    }

    return open;
  }, [open, trigger, isOpen]);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useBodyOverflow(Boolean(isOpened), lockBodyScroll);

  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
    if (isOpen) {
      onClose?.();
    } else {
      onOpen?.();
    }
  };

  const handleClickOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!refContainer.current?.contains(e.target as Node) && closeOnDocumentClick) {
      if (trigger) {
        setIsOpen(false);
      }
      onClose?.();
    }
  };

  useEffect(() => {
    if (closeOnDocumentClick) {
      const listener = (e: MouseEvent | TouchEvent) => {
        if (refContainer.current && !refContainer.current.contains(e.target as Node)) {
          if (isOpen) {
            e.stopPropagation();
          }
          if (trigger) {
            setIsOpen(false);
          }
          onClose?.();
        }
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    }
  }, [closeOnDocumentClick, onClose, isOpen]);

  useEffect(() => {
    if (closeOnEscape) {
      const onKeyUp = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          if (trigger) {
            setIsOpen(false);
          }
          onClose?.();
        }
      };
      window.addEventListener('keyup', onKeyUp);

      return () => {
        window.removeEventListener('keyup', onKeyUp);
      };
    }
  }, []);

  const renderTrigger = () => {
    if (!trigger) {
      return null;
    }

    const triggerProps = {
      key: 'T',
      ref: triggerRef,
      onMouseDown: toggleIsOpen,
      onTouchStart: toggleIsOpen,
    };

    if (typeof trigger === 'function') {
      const comp = trigger(isOpened || false);
      return React.cloneElement(comp, triggerProps);
    }

    return React.cloneElement(trigger, triggerProps);
  };

  return (
    <>
      {renderTrigger()}
      {isOpened && (
        <PortalContainer id={id}>
          <ST.Overlay
            hidden={hiddenOverlay}
            onClick={handleClickOverlay}
            style={overlayStyle}
            data-testid="overlay"
          >
            <InputStub />
            <ST.Wrapper
              className={className}
              onAnimationEnd={onAnimationEnd}
              ref={refContainer}
              style={contentStyle}
            >
              {children}
            </ST.Wrapper>
          </ST.Overlay>
        </PortalContainer>
      )}
    </>
  );
};

export { Modal };
export type { ModalProps };
