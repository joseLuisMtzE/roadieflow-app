import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col gap-6 p-4">
      <header className="space-y-1 pt-4">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          RoadieFlow
        </h1>
        <p className="text-sm text-muted-foreground">
          Shell M0 — design system base
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Bienvenido</CardTitle>
          <CardDescription>
            Preview del tema mobile-first con shadcn/ui.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Buscar evento o ciudad…" />
          <Button className="min-h-11 w-full" size="lg">
            Explorar
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
