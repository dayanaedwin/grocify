interface ModalProps {
    onClose: () => void;
    isCloseBtn?: boolean
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ onClose, isCloseBtn, children }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" style={{ margin: 0 }}>
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full relative">
                {isCloseBtn && <button onClick={onClose} className="absolute top-4 right-4 text-gray-700">
                    X
                </button>}
                {children}
            </div>
        </div>
    )
}