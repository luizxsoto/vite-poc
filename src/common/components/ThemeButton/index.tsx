import { useTheme } from '@/common/contexts/theme';

import { Container, Brightness4Icon, Brightness7Icon } from './styles';

export function ThemeButton() {
  const { mode, setTheme } = useTheme();

  function handleSwitchTheme() {
    setTheme({ mode: mode === 'light' ? 'dark' : 'light' });
  }

  return (
    <Container onClick={handleSwitchTheme}>
      {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
    </Container>
  );
}
