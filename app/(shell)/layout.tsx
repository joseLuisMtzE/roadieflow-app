import { BottomNav } from "@/components/bottom-nav";

export default function ShellLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col overflow-x-hidden bg-background pb-[calc(4.5rem+env(safe-area-inset-bottom))]">
        {children}
      </div>
      <BottomNav />
    </>
  );
}
