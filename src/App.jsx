import React, { useEffect, useState } from "react";
import "./App.css";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import ArchiveList from "./components/ArchiveList";
import {ProductStatus} from "./constants/productConstants.js";
import DeleteList from "./components/DeleteList.jsx";

const App = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const createProduct = async (product) => {
        const response = await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
        });

        if (!response.ok) {
            const data = await response.json();

            return {
                success: false,
                field: data.field,
                message: data.message,
            };
        }

        await fetchProducts();
        return { success: true };
    };

    const archiveProduct = async (id) => {
        await fetch(`/api/products/${id}/${ProductStatus.ARCHIVE}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" }
        });

        await fetchProducts();
    };

    const restoreProduct = async (id) => {
        await fetch(`/api/products/${id}/${ProductStatus.ACTIVE}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" }
        });

        await fetchProducts();
    };

    const deleteProduct = async (id) => {
        await fetch(`/api/products/${id}`, { method: "DELETE" });

        await fetchProducts();
    };

    const activeProducts = products.filter((p) => p.status === ProductStatus.ACTIVE);
    console.log("some log")
    const archivedProducts = products.filter((p) => p.status === ProductStatus.ARCHIVE);
    const deletedProducts = products.filter((p) => p.status === ProductStatus.DELETED);

    return (
        <div className="container">
            <h1 className="title">Склад товаров</h1>
            <div className="layout">
                <div className="main">
                    <ProductList
                        products={activeProducts}
                        onArchive={archiveProduct}
                        onDelete={deleteProduct}
                    />
                </div>
                <div className="sidebar">
                    <ProductForm onCreate={createProduct} />
                    <ArchiveList products={archivedProducts} onRestore={restoreProduct} />
                    <DeleteList products={deletedProducts} />
                </div>
            </div>
        </div>
    );
};

export default App;
