import ProductButton from "@/Components/ProductButton";
import Authenticated from "@/Layouts/AuthenticatedLayout"
import { useEffect, useState } from "react";

export default function Products(props) {

    const [products, setProducts] = useState(null);

    useEffect(() => {
        if (products !== null){
            return;
        }

        let productsL = JSON.parse(sessionStorage.getItem("products"));
        if (productsL === null) {
            productsL = props.products;
        }

        setProducts(productsL);
    }, [])

    const addProduct = (id) => {
        let basket = JSON.parse(sessionStorage.getItem("basket"));

        if(basket === null){
            basket = [];
        }

        let productInBasket = basket.find((product) => {
            return product.id == id;
        })

        const productsUpdated = [...products];
        const product = productsUpdated.find((product) => {
            return product.id === id;
        })

        product.stock_quantity--;
        if (productInBasket === undefined){
            const name = products.find((product) => {
                return product.id === id;
            }).name;
            productInBasket = {id: id, name: name, quantity: 1, stockquantity: product.stock_quantity }
            basket.push(productInBasket);
        }
        else {
            productInBasket.quantity++;
            productInBasket.stockquantity--;
        }

        setProducts(productsUpdated);

        sessionStorage.setItem("products", JSON.stringify(productsUpdated));
        sessionStorage.setItem("basket", JSON.stringify(basket));
    }

    return (
        <div>
            <Authenticated auth={props.auth} errors={props.errors} header={""} csrf_token={props.csrf_token}>
                <div className="row m-5">
                    {(products !== null) && products.map((product) => {
                        return (
                            <>
                            <div className="col" key={product.id}>
                                <div className="card">
                                    <img src="..." className="card-img-top" alt="..."></img>
                                        <div className="card-body">
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                            <h6 className="my-3">On stock: {product.stock_quantity}</h6>
                                            <ProductButton productId={product.id} addProduct={addProduct}></ProductButton>
                                        </div>
                                </div>
                            </div>
                            </>
                        )
                    })}
                </div>
            </Authenticated>
        </div>
    )
}