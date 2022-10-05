import { AnyComponent } from '@/AnyComponent';
import { envConfig } from './config';

export function App() {
  return (
    <div>
      <h1>Port: {envConfig.PORT}</h1>
      <h1>App</h1>
      <AnyComponent />
    </div>
  );
}
