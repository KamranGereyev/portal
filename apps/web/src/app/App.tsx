import { Button } from "@portal/ui";

export function App() {
    return (
        <main style={{ padding: 24, display: "flex", gap: 12 }}>
            <Button>Отправить</Button>
            <Button variant="secondary">Отмена</Button>
            <Button variant="danger" size="sm">
                Удалить
            </Button>
            <Button disabled>Недоступно</Button>
        </main>
    );
}