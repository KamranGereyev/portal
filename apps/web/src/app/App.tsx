import { useState } from "react";
import { Button, Input, Modal, Select } from "@portal/ui";

export function App() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <main style={{ padding: 24, maxWidth: 360, display: "grid", gap: 16 }}>
            <Input label="Email" placeholder="you@example.com" />
            <Button onClick={() => setModalOpen(true)}>Открыть модалку</Button>

            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Новая заявка">
                <div style={{ display: "grid", gap: 16 }}>
                    <Input label="Название" placeholder="Кратко о заявке" />
                    <Select
                        label="Тип"
                        placeholder="Выберите тип"
                        defaultValue=""
                        options={[
                            { value: "leave", label: "Отпуск" },
                            { value: "equipment", label: "Оборудование" },
                        ]}
                    />
                    <Button onClick={() => setModalOpen(false)}>Сохранить</Button>
                </div>
            </Modal>
        </main>
    );
}