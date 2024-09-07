import { useState } from "react";
import { paymentModes } from "../constants";

export const PaymentMode = () => {
    const [selectedPaymentMode, setSelectedPaymentMode] = useState<string>('');

    const handlePaymentModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPaymentMode(event.target.value);
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
                            checked={selectedPaymentMode === mode.value}
                            disabled={mode.value !== 'Cash on Delivery'}
                            onChange={handlePaymentModeChange}
                            className='mr-2 text-primary'
                        />
                        <span className={`text-sm ${mode.value !== 'Cash on Delivery' ? 'text-gray-500' : ''}`}>{mode.label}</span>
                    </label>
                ))}
            </div>
            <div className="flex justify-center">
                <button className="text-primary font-semibold border border-primary px-20 py-2 rounded-md">{`${selectedPaymentMode === 'Cash on Delivery' ? 'Place Order' : 'Pay Now'}`}</button>
            </div>
        </div>
    )
}