import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { EventType, PopupPosition } from 'reactjs-popup/dist/types';

import * as ST from './styled';

type TooltipContentItem = JSX.Element | string | number;

type Classes = {
  trigger?: string;
  tooltip?: string;
  tooltipTextItem?: string;
};

type Positions = 'top' | 'bottom' | 'right' | 'left';

type Props = {
  id?: string;
  color?: 'dark' | 'light';
  text: TooltipContentItem | TooltipContentItem[];
  children: React.ReactNode;
  position?: PopupPosition[];
  disabled?: boolean;
  place?: Positions;
  events?: EventType[];
  classes?: Partial<Classes>;
  tooltipItemsLimit?: number;
  moreItemsRender?: (count: number) => TooltipContentItem;
};

const POSITIONS: Record<Positions, PopupPosition[]> = {
  top: ['top center', 'bottom center'],
  bottom: ['bottom center', 'top center'],
  left: ['left center', 'right center'],
  right: ['right center', 'left center'],
};

const EVENTS: EventType[] = ['hover'];

const CONTENT_CLASS = '[role="tooltip"].popup-content svg';

const Tooltip: React.FC<Props> = ({
  id = 'tooltip',
  color = 'dark',
  children,
  place = 'bottom',
  classes,
  events,
  text,
  disabled,
  position,
  tooltipItemsLimit = Infinity,
  moreItemsRender = (count) => `+${count}...`,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => setOpen(false);

  useEffect(() => {
    if (disabled) {
      onClose();
      return;
    }

    window.addEventListener('wheel', onClose);

    return () => {
      window.removeEventListener('wheel', onClose);
    };
  }, [disabled]);

  const updateArrowPosition = () => {
    const arrowSvg = document.querySelector(CONTENT_CLASS);

    if (!arrowSvg) {
      return;
    }

    (arrowSvg as SVGElement).style.transform = 'translateY(25%)';
  };

  useLayoutEffect(() => {
    if (!open) {
      return;
    }

    updateArrowPosition();
  }, [open]);

  const arrowStyle = useMemo(
    () => ({
      color: color === 'dark' ? '#303940' : '#ffffff',
    }),
    [color],
  );

  const tooltipContent = useMemo(() => {
    if (!Array.isArray(text)) {
      return text;
    }

    const hiddenItemsCount = text.length - tooltipItemsLimit;
    const newText =
      hiddenItemsCount > 0
        ? text.slice(0, tooltipItemsLimit).concat(moreItemsRender(hiddenItemsCount))
        : text;

    return newText.map((item, i) => (
      <ST.TooltipText
        key={i}
        className={classes?.tooltipTextItem}
      >
        {item}
      </ST.TooltipText>
    ));
  }, [text, tooltipItemsLimit, moreItemsRender]);

  return (
    <ST.Tooltip
      arrow
      mouseEnterDelay={150}
      disabled={disabled}
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      trigger={<div className={classes?.trigger}>{children}</div>}
      position={position || POSITIONS[place]}
      on={events || EVENTS}
      arrowStyle={arrowStyle}
      className="tooltip"
    >
      <ST.TooltipContent
        id={id}
        className={`${color} ${classes?.tooltip}`}
        data-testid="tooltip"
      >
        {tooltipContent}
      </ST.TooltipContent>
    </ST.Tooltip>
  );
};

export { Tooltip };
export type {
  Props as TooltipProps,
  Classes as TooltipClasses,
  TooltipContentItem,
  Positions as TooltipPositions,
};
