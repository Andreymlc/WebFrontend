import React from "react";

const ProductCard = ({ product, onArchive, onDelete }) => {
    return (
        <div className="card">
            <h3>{product.name}</h3>
            <p>Цена: {product.price} руб.</p>
            <p>В наличии: {product.stock}</p>
            <p>Создан: {new Date(product.createdAt).toLocaleString("ru-RU")}</p>
            <div className="btns">
                <button className="archive-btn" onClick={() => onArchive(product.id)}>Архив</button>
                <button className="delete-btn" onClick={() => onDelete(product.id)}>Удалить</button>
            </div>
        </div>
    );
};

export default ProductCard;
