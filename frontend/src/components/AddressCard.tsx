
interface AddressCardProps {
    address: {
        building: string;
        street: string;
        city: string;
        state: string;
        pincode: number;
        country: string;
        phone: string;
    }
}

export const AddressCard: React.FC<AddressCardProps> = ({ address }) => {
    return (
        <div className="text-xs space-y-1 border border-gray-300 rounded-md p-4">   
            <p>{address.building}</p>
            <p>{address.street}</p>
            <p>{address.state}, {address.state}, {address.country}</p>
            <p>{address.pincode}</p>
            <p>{address.phone}</p>
        </div>
    )
}