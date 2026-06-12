import { PageHeader } from "@/components/page-header";
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
    <main className="flex flex-1 flex-col gap-8 pb-8">
      <PageHeader
        title="RoadieFlow"
        description="Shell M0 — Tactical Elegance"
      />

      <Card className="editorial-offset mr-6 border-t-2 border-[var(--primary)] ambient-shadow">
        <CardHeader>
          <CardTitle>Bienvenido</CardTitle>
          <CardDescription>
            Preview del tema editorial con glass depth y tipografía táctica.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Buscar evento o ciudad…" />
          <Button className="w-full" size="lg">
            Explorar
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
