import { useLocation } from 'react-router-dom';
import * as ST from './styled';
import { PublicRouteNames } from '@src/router/routes';
import { Icon, IconTypes } from '@components/Icon/Icon';

type SidebarItem = {
  link: string;
  text: string;
  icon: IconTypes;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  { link: PublicRouteNames.MAIN, text: 'Main', icon: 'dashboard' },
]

export const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <ST.Wrapper>
      <ST.Content>
        <ST.Links>
          {SIDEBAR_ITEMS.map(it => (
            <ST.LinkItem key={it.link} to={it.link} isActive={pathname === it.link}>
              <Icon type={it.icon} />
              {it.text}
            </ST.LinkItem>
          ))}
        </ST.Links>
      </ST.Content>
    </ST.Wrapper>
  );
}
