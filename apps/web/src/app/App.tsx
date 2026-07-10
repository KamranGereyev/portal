import { Table, type TableColumn } from "@portal/ui";

interface DemoRow {
    id: number;
    name: string;
    type: string;
    amount: number;
    createdAt: string;
}

const TYPES = ["Отпуск", "Оборудование", "Доступ", "Командировка"];

const ROWS: DemoRow[] = Array.from({ length: 5000 }, (_, i) => ({
    id: i + 1,
    name: `Заявка №${i + 1}`,
    type: TYPES[i % TYPES.length] ?? "",
    amount: ((i * 7919) % 100000) / 100,
    createdAt: new Date(2026, 0, 1 + (i % 180)).toLocaleDateString("ru"),
}));

const COLUMNS: TableColumn<DemoRow>[] = [
    { id: "id", header: "ID", cell: (r) => r.id, sortValue: (r) => r.id },
    { id: "name", header: "Название", cell: (r) => r.name, sortValue: (r) => r.name },
    { id: "type", header: "Тип", cell: (r) => r.type, sortValue: (r) => r.type },
    {
        id: "amount",
        header: "Сумма",
        cell: (r) => r.amount.toFixed(2),
        sortValue: (r) => r.amount,
    },
    { id: "createdAt", header: "Создана", cell: (r) => r.createdAt },
];

export function App() {
    return (
        <main style={{ padding: 24 }}>
            <Table columns={COLUMNS} rows={ROWS} getRowKey={(r) => r.id} />
        </main>
    );
}