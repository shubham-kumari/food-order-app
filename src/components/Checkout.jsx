import { useContext } from "react"
import CartContext from "../store/CartContext"
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import Modal from "./UI/Modal";

export default function Checkout(){
    const { items} = useContext(CartContext)
    const { progress, hideCheckout} = useContext(UserProgressContext)
    const cartTotal = items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
        0
      );
    function handleClose(){
        hideCheckout();
    }

    function handleSubmit(event){
        event.preventDefault();
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());
        // console.log(customerData);

        fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                order: {
                    items: items,
                    customer: customerData
                }
            })
        })
    }
    return <Modal onClose={handleClose} open={progress === 'checkout'}>
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
            <Input label="Full Name" type="text" id="name"/>
            <Input label="E-Mail Address" id="email" type="email" />
            <Input label="Street" type="text" id="street"/>
            <div className="control-row">
                <Input label="Postel Code" type="text" id="postal-code"/>
                <Input label="City" type="text" id='city'/>
            </div>

            <p className="modal-actions">
                <Button type="button" textOnly onClick={handleClose}>Close</Button>
                <Button>Submit Order</Button>
            </p>
        </form>
    </Modal>
}