import { progressSteps } from "../constants";
import { getCurrentStep } from "../helpers";

export const StaticStepProgressBar = ({ orderStatus }: { orderStatus: string }) => {
    const currentStep = getCurrentStep(orderStatus);

    return (
        <div className="flex items-center justify-between pb-4">
            {progressSteps.map((step, index) => (
                <div className={`flex flex-col items-center ${index !== progressSteps.length - 1 ? 'w-full' : ''}`}>
                    <div key={step.key} className='flex items-center w-full'>
                        <button className={`rounded-full w-8 h-8 text-center text-white font-semibold ${currentStep >= index ? 'bg-primary' : 'bg-gray-300'} transition duration-300 ease-in-out`}>
                            {index + 1}
                        </button>
                        {index !== progressSteps.length - 1 && <div className={`flex-1 border-t-4 ${currentStep >= index + 1 ? 'border-primary' : 'border-gray-300'} transition duration-300 ease-in-out`}></div>}
                    </div>
                    <p className={`mt-2 w-full text-start text-xs ${index <= currentStep ? 'text-primary font-semibold' : 'text-gray-500'}`}>{step.label}</p>
                </div>
            ))}
        </div>
    )
}