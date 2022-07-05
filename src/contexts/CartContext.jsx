import React, { useContext, useCallback } from 'react';
import useLocalStorage from '../core/helper/useLocalStorage';
import { toast } from 'react-toastify';

const cartContext = React.createContext();
export const useCart = () => useContext(cartContext);

const CartContext = ({ children }) => {
    const [cartItems, setCartItems] = useLocalStorage('cart', []);

    const addToCart = useCallback((product) => {
        if (cartItems.some((cartItem) => cartItem._id === product._id)) {
            setCartItems((prev) => {
                const previousCartitems = [...prev];
                const index = previousCartitems.findIndex((cartItem) => cartItem._id === product._id);
                if (previousCartitems[index].count < product.stock) {
                    previousCartitems[index].count += 1;
                }
                else{
                    toast.error(`Cannot Add More than ${product.stock} Items`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                }
                return previousCartitems;
            })
        }
        else {
            setCartItems((prev) => [...prev, { ...product, count: 1 }])
        }
    }, [cartItems, setCartItems])
    const removeFromCart = useCallback((product) => {
        setCartItems((prev) => {
            const previousCartitems = [...prev]
            const index = previousCartitems.findIndex((cartItem) => cartItem._id === product._id);
            if (index !== -1) {
                if (previousCartitems[index].count === 1) {
                    previousCartitems.splice(index, 1)
                }
                else if (previousCartitems[index].count > 1) {
                    previousCartitems[index].count = previousCartitems[index].count - 1
                }
            }
            return previousCartitems;
        })
    }, [setCartItems])
    return (
        <cartContext.Provider value={{ cartItems, setCartItems, addToCart, removeFromCart }}>
            {children}
        </cartContext.Provider>
    )
}

export default CartContext;