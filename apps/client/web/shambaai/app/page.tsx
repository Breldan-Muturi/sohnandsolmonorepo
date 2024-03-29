import { Button } from '@sohnandsol/ui/shadcn';

export default async function Index() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-3xl font-bold underline">Docs</h1>
      <Button variant="outline">Hello World!</Button>
    </div>
  );
}
