import { useEffect, useState } from "react";
import axios from "axios";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
          withCredentials: true, // 🔥 Required to include session cookie
        });
        setOrders(response.data);
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    };

    fetchOrders();
  }, []);


  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Orders List</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Order Details</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="border p-2">{order.orderDetails}</td>
              <td className="border p-2">₹{order.amount}</td>
              <td className="border p-2">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
