import {Button, Input, Select} from "@portal/ui";

export function App() {
    return (
        <main style={{ padding: 24, maxWidth: 360, display: "grid", gap: 16 }}>
            <Input label="Email" placeholder="you@example.com" />
            <Input label="Имя" error="Обязательное поле" />
            <Input label="Телефон" disabled value="+994..." readOnly />
            <Button>Отправить</Button>

            <Select
                label="Тип заявки"
                placeholder="Выберите тип"
                defaultValue=""
                options={[
                    { value: "leave", label: "Отпуск" },
                    { value: "equipment", label: "Оборудование" },
                    { value: "access", label: "Доступ" },
                ]}
            />
            <Select label="Статус" error="Выберите статус" defaultValue="" options={[]} />
        </main>
    );
}