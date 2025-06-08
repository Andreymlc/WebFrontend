import React, { useState } from "react";
import {ProductStatus} from "../constants/productConstants.js";

const ProductForm = ({ onCreate }) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(null);

    const validate = () => {
        const errs = {};

        if (!name) {
            errs.name = "Введите название";
        } else if (name[0] !== name[0].toUpperCase()) {
                errs.name = "Название должно начинаться с заглавной буквы";
        }

        const priceNum = parseFloat(price);
        if (isNaN(priceNum)) {
            errs.price = "Введите цену";
        } else if (priceNum <= 0) {
            errs.price = "Цена должна быть больше 0";
        }

        const stockNum = parseInt(stock);
        if (isNaN(stockNum)) {
            errs.stock = "Введите количество";
        } else if (stockNum < 0) {
            errs.stock = "Количество не может быть отрицательным";
        }

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const result = await onCreate({
            name,
            price: parseFloat(price),
            stock: parseInt(stock),
            status: ProductStatus.ACTIVE,
        });

        if (!result.success) {
            setErrors({[result.field]: result.message});
            setSuccess(null);
            return;
        }

        setName("");
        setPrice("");
        setStock("");
        setErrors({});
        setSuccess("Товар добавлен успешно");

        setTimeout(() => setSuccess(null), 3000);
    };

    return (
        <form className="section" onSubmit={handleSubmit}>
            <h2>Добавить товар</h2>

            {success && <p className="success-text">{success}</p>}

            <input
                placeholder="Название"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={errors.name ? "error" : ""}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}

            <input
                placeholder="Цена"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={errors.price ? "error" : ""}
            />
            {errors.price && <p className="error-text">{errors.price}</p>}

            <input
                placeholder="Количество"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className={errors.stock ? "error" : ""}
            />
            {errors.stock && <p className="error-text">{errors.stock}</p>}

            <button type="submit" className="create-btn">Создать</button>
        </form>
    );
};

export default ProductForm;
