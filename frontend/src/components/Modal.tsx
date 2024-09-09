interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" style={{margin: 0}}>
            <div className="bg-white rounded-lg shadow-lg p-4 max-w-md w-full">
                {/* <button onClick={onClose} className="absolute top-2 right-2 text-gray-700">
                    X
                </button> */}
                {children}
            </div>
        </div>
    )
}