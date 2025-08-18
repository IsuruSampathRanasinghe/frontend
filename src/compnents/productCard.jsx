
export default function ProductCard(props){
    console.log(props.name);
    return(
        <div className="productCard">
            <h1>{props.name}</h1>
            <p>{props.price}</p>
            <img 
                className="productImage" 
                src={props.image}/>
            <button>Add to cart</button>
        </div>
    )
}