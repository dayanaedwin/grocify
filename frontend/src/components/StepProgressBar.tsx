export const StepProgressBar = ({ currentStep }: { currentStep: number }) => {
    const steps = ['Product Review', 'Select Address', 'Payment'];

    return (
        <div className="flex justify-between items-center mb-6 mt-10">
            {steps.map((step, index) => (
                <div key={index} className="flex items-center w-full">
                    {index > 0 && <div className={`flex-1 border-t-4 ${currentStep >= index + 1 ? 'border-primary' : 'border-gray-300'} transition duration-300 ease-in-out`}></div>}
                    <button className={`rounded-full w-8 h-8 text-center text-white font-semibold ${currentStep >= index + 1 ? 'bg-primary' : 'bg-gray-300'} transition duration-300 ease-in-out`}>
                        {index + 1}
                    </button>
                    {index !== steps.length - 1 && <div className={`flex-1 border-t-4 ${currentStep - 1 >= index + 1 ? 'border-primary' : 'border-gray-300'} transition duration-300 ease-in-out`}></div>}
                </div>
            ))}
        </div>
    );
};