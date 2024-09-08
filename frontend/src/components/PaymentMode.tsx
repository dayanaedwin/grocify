import { useState } from "react";
import { paymentModes } from "../constants";

interface IPaymentMode {
    paymentMode: string;
    updateOrderInfo: (key: string, data: any) => void;
}

export const PaymentMode: React.FC<IPaymentMode> = ({paymentMode, updateOrderInfo}) => {
    
    const handlePaymentModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		updateOrderInfo('paymentMode', event.target.value);
	};

    return (
        <div className="space-y-4">
            <h6 className="text-lg font-semibold">Select Payment Mode</h6>
            <div className="flex flex-col space-y-3">
                {paymentModes.map((mode) => (
                    <label key={mode.value} className="flex items-center">
                        <input
                            type="radio"
                            name="paymentMode"
                            value={mode.value}
                            checked={paymentMode === mode.value}
                            disabled={mode.value !== 'Cash on Delivery'}
                            onChange={handlePaymentModeChange}
                            className='mr-2 text-primary'
                        />
                        <span className={`text-sm ${mode.value !== 'Cash on Delivery' ? 'text-gray-500' : ''}`}>{mode.label}</span>
                    </label>
                ))}
            </div>
        </div>
    )
}