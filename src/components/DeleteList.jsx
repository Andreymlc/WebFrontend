import React, { useState } from "react";

const DeleteList = ({ products, isMobile }) => {
    const [show, setShow] = useState(false);

    const renderList = () => {
        if (products.length === 0) {
            return <p>Удалённые продукты отсутствуют</p>;
        }

        return (
            <ul>
                {products.map((p) => (
                    <li key={p.id}>{p.name}</li>
                ))}
            </ul>
        );
    };

    if (isMobile) {
        return (
            <section className="section">
                <h2>Удалённые продукты</h2>
                {products.length > 0 && (
                    <button onClick={() => setShow(!show)} className="create-btn">
                        {show ? "Скрыть удалённые" : "Показать удалённые"}
                    </button>
                )}
                {show && renderList()}
                {!show && products.length === 0 && <p>Удалённые продукты отсутствуют</p>}
            </section>
        );
    }

    return (
        <section className="section">
            <h2>Удалённые продукты</h2>
            {renderList()}
        </section>
    );
};

export default DeleteList;
