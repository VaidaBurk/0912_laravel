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
    }

    const onBuy = () => {
        let self = this;
        const headers = new Headers();
        headers.append("Content-type", "application/json");
        headers.append("X-CSRF-TOKEN", props.csrf_token)

        fetch("http://127.0.0.1:8000/buy", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ "basket": products })
        }).then((response) => {
            response.json().then((body) => {
                alert(body);
                clearBasket();
            })
        })
    }

    return (
        <div className="container">
            {products.map((product) => {
                return (
                    <div className="row">
                        <div className="col">
                            {product.name}
                        </div>
                        <div className="col">
                            {product.quantity}
                        </div>
                    </div>)
            })
            }
            <button className="btn btn-secondary" onClick={onBuy}>Buy</button>
        </div>
    )
}