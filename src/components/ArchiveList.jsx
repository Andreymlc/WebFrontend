import React, { useState } from "react";

const ArchiveList = ({ products, onRestore, isMobile }) => {
    const [show, setShow] = useState(false);

    const renderList = () => {
        if (products.length === 0) {
            return <p>Архив пуст</p>;
        }

        return (
            <ul>
                {products.map((p) => (
                    <li key={p.id}>
                        {p.name}{" "}
                        <button className="archive-btn" onClick={() => onRestore(p.id)}>
                            Вернуть
                        </button>
                    </li>
                ))}
            </ul>
        );
    };

    if (isMobile) {
        return (
            <section className="section">
                <h2>Архив</h2>
                {products.length > 0 && (
                    <button onClick={() => setShow(!show)} className="create-btn">
                        {show ? "Скрыть архив" : "Показать архив"}
                    </button>
                )}
                {show && renderList()}
                {!show && products.length === 0 && <p>Архив пуст</p>}
            </section>
        );
    }

    return (
        <section className="section">
            <h2>Архив</h2>
            {renderList()}
        </section>
    );
};

export default ArchiveList;
