import QueryProvider from '@/components/QueryProvider';
import MainApp from '@/components/MainApp';

export default function Page() {
  return (
    <QueryProvider>
      <MainApp />
    </QueryProvider>
  );
}
