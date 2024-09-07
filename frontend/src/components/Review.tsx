import React, { useState } from "react";
import { AddAddress } from "./AddAddress";
import { CheckoutList } from "./CheckoutList";
import { PaymentMode } from "./PaymentMode";

interface IReview {
    currentStep: number;
    handleNext: () => void;
    handleBack: () => void;
    deliveryAddress: any;
    setDeliveryAddress: React.Dispatch<any>;
}

export const Review: React.FC<IReview> = ({ currentStep, handleNext, handleBack, deliveryAddress, setDeliveryAddress }) => {

    return (
        <div className="w-7/12">
            {currentStep === 1 ?
                <CheckoutList handleNext={handleNext} /> :
                (currentStep === 2 ?
                    <AddAddress handleNext={handleNext}  deliveryAddress={deliveryAddress} setDeliveryAddress={setDeliveryAddress} /> :
                    <PaymentMode />
                )

            }
        </div>
    )
}