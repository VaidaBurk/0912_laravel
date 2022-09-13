import Authenticated from "@/Layouts/AuthenticatedLayout"

export default function Products(props) {

    const products = props.products;

    return (
        <div>
            <Authenticated auth={props.auth} errors={props.errors} header={""}>
                <div className="row m-5">
                    {products.map((product) => {
                        return (
                            <>
                            <div className="col">
                                <div className="card">
                                    <img src="..." className="card-img-top" alt="..."></img>
                                        <div className="card-body">
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                            <h6>On stock: {product.stock_quantity}</h6>
                                            <a href="#" className="btn btn-primary">Go somewhere</a>
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