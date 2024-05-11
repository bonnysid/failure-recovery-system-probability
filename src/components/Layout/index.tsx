import * as ST from './styled';
import { Navbar } from '@src/components';
import { FC, PropsWithChildren} from 'react';

export const Layout: FC<PropsWithChildren> = ({children}) => {
  return (
    <ST.Wrapper>
      <Navbar/>

      <ST.Content>
        {children}
      </ST.Content>
    </ST.Wrapper>
  )
}
