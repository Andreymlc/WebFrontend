import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products, onArchive, onDelete }) => (
    <section className="section">
        <h2>Активные товары</h2>
        <div className="grid">
            {products.map((p) => (
                <ProductCard key={p.id} product={p} onArchive={onArchive} onDelete={onDelete} />
            ))}
        </div>
    </section>
);

export default ProductList;
