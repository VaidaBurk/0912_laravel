import { useEffect, useState } from "react";

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

    return (
        <div className="container">
            {products.map((product) => {
                return (
                    <div className="row" kwy={product.id}>
                        <div className="col">
                            {product.name}
                        </div>
                        <div className="col">
                            {product.quantity}
                        </div>
                    </div>)
            })
            }
            <button className="btn btn-outline-secondary btn-sm mr-2 my-2" onClick={onBuy}>Buy</button>
            <button className="btn btn-outline-warning btn-sm my-2" onClick={clearBasket}>Clear</button>

        </div>
    )
}