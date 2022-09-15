import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export default function Basket(props) {
    const [products, changeProducts] = useState([])

    useEffect(() => {
        if (sessionStorage.getItem("basket") === null) {
            sessionStorage.setItem("basket", JSON.stringify([]));
        }
        else {
            const productBasket = JSON.parse(sessionStorage.getItem("basket"));
            changeProducts(productBasket);
        }
    }, [])

    const clearBasket = () => {
        sessionStorage.setItem("basket", JSON.stringify([]));
        changeProducts([]);
        sessionStorage.removeItem("products");
        window.location.reload();
    }

    const onBuy = () => {
        const headers = new Headers();
        headers.append("Content-type", "application/json");
        headers.append("X-CSRF-TOKEN", props.csrf_token)

        fetch("http://127.0.0.1:8000/buy", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ "basket": products })
        }).then((response) => {
            clearBasket();
        })
    }

    const removeProductFromBasket = (id) => {
        let basket = JSON.parse(sessionStorage.getItem("basket"));

        const productInBasket = basket.find((product) => {
            return product.id == id;
        })
        
        const productsUpdated = JSON.parse(sessionStorage.getItem("products"));
        const product = productsUpdated.find((product) => {
            return product.id === id;
        })

        product.stock_quantity += productInBasket.quantity;
        basket = basket.filter(function (product) {
            return product.id !== id;
        })

        sessionStorage.setItem("products", JSON.stringify(productsUpdated));
        sessionStorage.setItem("basket", JSON.stringify(basket));
        window.location.reload();
    }

    return (
        <div className="container">
            {products.map((product) => {
                return (
                    <div className="row" kwy={product.id}>
                        <div className="col">
                            {product.name}
                        </div>
                        <div className="col">
                                <FontAwesomeIcon icon={faMinus} />
                            {product.quantity}
                                <FontAwesomeIcon icon={faPlus} />
                        </div>
                        <div className="col">
                            <a onClick={() => { removeProductFromBasket(product.id) }}>
                                <FontAwesomeIcon icon={faTrash} />
                            </a>
                        </div>
                    </div>)
            })
            }
            <button className="btn btn-outline-secondary btn-sm mr-2 my-2" onClick={onBuy}>Buy</button>
            <button className="btn btn-outline-warning btn-sm my-2" onClick={clearBasket}>Clear</button>

        </div>
    )
}