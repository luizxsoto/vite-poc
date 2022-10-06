import { i18n } from '@/common/i18n';

export function NotFound() {
  return (
    <div>
      <h1>{i18n().common.pages.notFound.message}</h1>
    </div>
  );
}
