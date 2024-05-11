import React, { PropsWithChildren, useMemo, useState } from 'react';
import { EventType } from 'reactjs-popup/dist/types';

import { Tooltip } from '@src/components';

import * as ST from './styled';

type Props = {
  className?: string;
  tooltip?: boolean;
  tooltipId?: string;
  clickEvent?: boolean;
};

const TT_EVENTS: EventType[] = ['focus', 'hover'];

const TextShorter: React.FC<PropsWithChildren<Props>> = ({ tooltip, className, children, clickEvent, tooltipId }) => {
  const tooltipContent = <>{children}</>;

  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const tooltipEvents = useMemo(() => {
    const newEvents = TT_EVENTS;
    if (clickEvent) {
      newEvents.push('click');
    }

    return newEvents;
  }, [TT_EVENTS, clickEvent]);

  const onMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    setShowTooltip(event.currentTarget.scrollWidth > event.currentTarget.clientWidth);
  };

  if (tooltip && showTooltip) {
    return (
      <ST.Wrapper
        className={className}
      >
        <Tooltip
          id={tooltipId}
          place="bottom"
          events={tooltipEvents}
          text={tooltipContent}
        >
          <ST.Content
            onMouseEnter={tooltip ? onMouseEnter : undefined}
          >
            {children}
          </ST.Content>
        </Tooltip>
      </ST.Wrapper>
    );
  }

  return (
    <ST.Wrapper
      className={`${className}`}
      data-testid="wrapper-test"
      onMouseEnter={tooltip ? onMouseEnter : undefined}
    >
      {children}
    </ST.Wrapper>
  );
};

export { TextShorter };
