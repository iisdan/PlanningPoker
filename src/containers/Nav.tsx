import { Box } from '../components/Box';
import { MaxWidth } from '../components/MaxWidth';
import { NavBar } from '../components/NavBar';
import { useDeviceType } from '../hooks/useDeviceType';

export function Nav() {
  const device = useDeviceType();

  return (
    <NavBar>
      <MaxWidth full>
        <Box direction="horizontal" justifyContent="center" alignItems="flex-end">

          <Box direction="horizontal" alignItems="flex-end">
            <img alt='logo' src={require('../assets/logo.png').default} width={device === 'mobile' ? 250 : 350} />
          </Box>

        </Box>
      </MaxWidth>
    </NavBar>
  );
}

