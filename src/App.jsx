import React, { useEffect, useState } from "react";
import "./App.css";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import ArchiveList from "./components/ArchiveList";
import {ProductStatus} from "./constants/productConstants.js";
import DeleteList from "./components/DeleteList.jsx";

const App = () => {
    const [products, setProducts] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);

    const fetchProducts = async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
    };

    useEffect(() => {
        fetchProducts().catch((err) => {
            console.error("Ошибка при загрузке продуктов:", err);
        });

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
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
    const archivedProducts = products.filter((p) => p.status === ProductStatus.ARCHIVE);
    const deletedProducts = products.filter((p) => p.status === ProductStatus.DELETED);

    const mainContent = (
        <>
            {isMobile && <ProductForm onCreate={createProduct} />}
            <ProductList
                products={activeProducts}
                onArchive={archiveProduct}
                onDelete={deleteProduct}
            />
            {isTablet && <ArchiveList products={archivedProducts} onRestore={restoreProduct} isMobile={isMobile} />}
            {isTablet && <DeleteList products={deletedProducts} isMobile={isMobile} />}
        </>
    );

    const sidebarContent = (
        <>
            {!isMobile && <ProductForm onCreate={createProduct} />}
            {!isTablet && <ArchiveList products={archivedProducts} onRestore={restoreProduct} isMobile={isMobile} />}
            {!isTablet && <DeleteList products={deletedProducts} isMobile={isMobile} />}
        </>
    );

    return (
        <div className="container">
            <h1 className="title">Склад товаров</h1>
            <div className="layout">
                <div className="main">{mainContent}</div>
                <div className="sidebar">{sidebarContent}</div>
            </div>
        </div>
    );
};

export default App;
