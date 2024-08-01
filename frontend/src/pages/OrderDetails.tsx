import { useParams } from "react-router-dom";


export const OrderDetails = () => {
  const { id } = useParams(); 
  
  return (
    <div className='flex flex-grow overflow-y-auto' >
    </div>
  );
};