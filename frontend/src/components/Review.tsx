import React, { useState } from "react";
import { AddAddress } from "./AddAddress";
import { CheckoutList } from "./CheckoutList";
import { PaymentMode } from "./PaymentMode";
import { StepProgressBar } from "./StepProgressBar";
import { Breadcrumb } from "./Breadcrumb";

interface IReview {
    currentStep: number;
    handleBack: () => void;
    orderInfo: any;
    updateOrderInfo: (key: string, data: any) => void;
}

export const Review: React.FC<IReview> = ({ currentStep, handleBack, orderInfo, updateOrderInfo }) => {

    return (
        <div className="w-7/12 mt-6">
            <Breadcrumb />
            <StepProgressBar currentStep={currentStep} handleBack={handleBack} />
            {currentStep === 1 ?
                <CheckoutList /> :
                (currentStep === 2 ?
                    <AddAddress deliveryAddress={orderInfo.deliveryAddress} updateOrderInfo={updateOrderInfo} /> :
                    <PaymentMode paymentMode={orderInfo.paymentMode} updateOrderInfo={updateOrderInfo} />
                )

            }
        </div>
    )
}