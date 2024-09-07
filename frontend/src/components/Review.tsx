import React, { useState } from "react";
import { AddAddress } from "./AddAddress";
import { CheckoutList } from "./CheckoutList";
import { PaymentMode } from "./PaymentMode";
import { StepProgressBar } from "./StepProgressBar";

interface IReview {
    selectedPaymentMode: string;
    handlePaymentModeChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    currentStep: number;
    handleBack: () => void;
    deliveryAddress: any;
    setDeliveryAddress: React.Dispatch<any>;
}

export const Review: React.FC<IReview> = ({ selectedPaymentMode, handlePaymentModeChange, currentStep, handleBack, deliveryAddress, setDeliveryAddress }) => {

    return (
        <div className="w-7/12">
            <StepProgressBar currentStep={currentStep} />
            {currentStep === 1 ?
                <CheckoutList /> :
                (currentStep === 2 ?
                    <AddAddress deliveryAddress={deliveryAddress} setDeliveryAddress={setDeliveryAddress} /> :
                    <PaymentMode selectedPaymentMode={selectedPaymentMode} handlePaymentModeChange={handlePaymentModeChange} />
                )

            }
        </div>
    )
}