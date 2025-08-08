"use client";
import { productsDummyData, userDummyData } from "@/assets/assets";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = (props) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY;
  const { getToken } = useAuth();
  const router = useRouter();
  const { user } = useUser();

  const [products, setProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(false);
  const [userData, setUserData] = useState(false);
  const [isSeller, setIsSeller] = useState(true);
  const [cartItems, setCartItems] = useState({});

  const fetchProductData = async () => {
    const token = await getToken();
    setProductLoading(true);
    try {
      const res = await fetch("/api/product/list", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("error in fetching products");
      }
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Error in Fetching Products");
    } finally {
      setProductLoading(false);
    }
    // setProducts(productsDummyData);
  };

  const fetchUserData = async () => {
    try {
      if (user.publicMetadata.role === "seller") {
        setIsSeller(true);
      }
      const token = await getToken();
      const response = await fetch("/api/user/data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      if (!data.success) {
        toast.error(data.message || "Failed to fetch user data");
        throw new Error(data.message);
      } else {
        setUserData(data.user);
        setCartItems(data.user.cartItems || {});
      }
      //   setUserData(userDummyData);
    } catch (err) {
      console.error("Error fetching product data:", err);
    }
  };

  const addToCart = async (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    const token = await getToken();
    try {
      const res = await fetch("/api/cart/update", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ correct
        },
        body: JSON.stringify({ cartData }),
      });
      if (!res.ok) {
        throw new Error("Failed to update cart");
      }
      const data = await res.json();
      if (data.success) {
        toast.success("item added to cart successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCartQuantity = async (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    if (quantity === 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity;
    }
        setCartItems(cartData);
    const token = await getToken();
    try {
      const res = await fetch("/api/cart/update", {
        method: "POST",
        headers: {
          Autherization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cartData }),
      });
      if (!res.ok) {
        throw new Error("Failed to update cart");
      }
      const data = await res.json();
      if (data.success) {
        toast.success("cart updated successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      if (cartItems[items] > 0) {
        totalCount += cartItems[items];
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (cartItems[items] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[items];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  useEffect(() => {
    if (user) fetchUserData();
  }, [user]);

  const value = {
    currency,
    router,
    isSeller,
    setIsSeller,
    userData,
    fetchUserData,
    products,
    fetchProductData,
    cartItems,
    setCartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    getCartAmount,
    user,
    getToken,
    productLoading,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
