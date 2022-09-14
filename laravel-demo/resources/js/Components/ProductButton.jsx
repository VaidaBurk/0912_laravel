export default function ProductButton({productId, addProduct}) {

    return (
        <button onClick={() => {addProduct(productId)}} className="btn btn-outline-info btn-sm">
            Add to basket
        </button>
    )
}