import { Button, Input } from "@portal/ui";

export function App() {
    return (
        <main style={{ padding: 24, maxWidth: 360, display: "grid", gap: 16 }}>
            <Input label="Email" placeholder="you@example.com" />
            <Input label="Имя" error="Обязательное поле" />
            <Input label="Телефон" disabled value="+994..." readOnly />
            <Button>Отправить</Button>
        </main>
    );
}