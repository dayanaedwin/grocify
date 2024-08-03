
interface AddressCardProps {
    address: {
        street: string;
        city: string;
        state: string;
        pincode: number;
        country: string;
    }
}

export const AddressCard: React.FC<AddressCardProps> = ({ address }) => {
    return (
        <div className="text-xs space-y-1 border border-gray-300 rounded-md p-4">
            <p>{address.street}</p>
            <p>{address.state}, {address.state}, {address.country}</p>
            <p>{address.pincode}</p>
        </div>
    )
}