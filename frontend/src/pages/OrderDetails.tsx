import { useParams } from "react-router-dom";


export const OrderDetails = () => {
  const { id } = useParams(); 
  
  return (
    <div>
      {`Order details - ${id}`}
    </div>
  );
};