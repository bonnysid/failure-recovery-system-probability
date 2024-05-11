import { GridLoader } from 'react-spinners';
import { COLORS } from '@src/utils/colors';
import React from 'react';

import * as ST from './styled';


export const AppLoader = () => (
  <ST.LoaderWrapper>
    <GridLoader color={COLORS.blue60} />
  </ST.LoaderWrapper>
)
