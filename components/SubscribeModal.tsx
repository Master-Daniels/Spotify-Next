"use client";

import { Price, ProductWithPrice } from "@/types";
import { Button, Modal } from ".";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { toast } from "react-hot-toast";
import { postData } from "@/libs/helpers";
import { getStripe } from "@/libs/stripeClient";
import useSubscribeModal from "@/hooks/useSubscribeModal";

interface SubscribeModalProps {
    products: ProductWithPrice[];
}

const SubscribeModal: React.FC<SubscribeModalProps> = ({ products }) => {
    const [priceIdLoading, setPriceIdLoading] = useState<string | null>("");

    const { user, isLoading, subscription } = useUser();
    const subscribeModal = useSubscribeModal();

    const handleCheckoutPrice = async (price: Price) => {
        setPriceIdLoading(price.id);
        if (!user) {
            setPriceIdLoading(null);
            return toast.error("User must be logged in!");
        }
        if (subscription) {
            setPriceIdLoading(null);
            return toast("Already subscribed!");
        }
        try {
            const { sessionId } = await postData({
                url: "/api/create-checkout-session",
                data: { price },
            });
            const stripe = await getStripe();
            stripe?.redirectToCheckout({ sessionId });
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setPriceIdLoading(null);
        }
    };
    const onChange = (open: boolean) => {
        if (subscribeModal.isOpen) {
            return subscribeModal.onClose();
        }
    };
    const getPriceString = (price: Price) => {
        const priceString = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: price.currency,
            minimumFractionDigits: 0,
        }).format((price?.unit_amount || 0) / 100);

        return priceString;
    };
    let content = <div className="text-center">No Products Available</div>;

    if (products.length) {
        content = (
            <div>
                {products.map((product) => {
                    if (!product.prices?.length) {
                        return <div key={product.id}>{"No prices available"}</div>;
                    }

                    return product.prices.map((price) => (
                        <Button
                            onClick={() => handleCheckoutPrice(price)}
                            styles="my-10 py-2 rounded-none"
                            disabled={isLoading || price.id === priceIdLoading}
                            key={price.id}
                        >{`Subscribe for ${getPriceString(price)} a ${price.interval}`}</Button>
                    ));
                })}
            </div>
        );
    }
    if (subscription) {
        content = <div className="text-center">Already Subscribed...</div>;
    }
    return (
        <Modal
            title="Only for Premium Users"
            description="Upload and Listen to music with Spotify Premium"
            isOpen={subscribeModal.isOpen}
            onChange={onChange}
        >
            {content}
        </Modal>
    );
};

export default SubscribeModal;
