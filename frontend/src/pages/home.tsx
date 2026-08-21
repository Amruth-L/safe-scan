import { Link } from "react-router-dom"
export default function Home() {
    return (
        <div>
            <h1>SafeScan</h1>

            <p>
                Scan a product barcode to analyze the product.
            </p>

            <Link to="/scanner">
                Scan Product
            </Link>
        </div>
    )
}