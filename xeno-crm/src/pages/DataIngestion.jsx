import { useState, useEffect } from "react";
import axios from "axios";

const DataIngestion = () => {
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "", address: "" });
  const [order, setOrder] = useState({ customerId: "", orderDetails: "", amount: "" });
  const [customers, setCustomers] = useState([]);  // To store customers
  const [isLoading, setIsLoading] = useState(false);  // Loading state
  const [error, setError] = useState("");  // Error message

  // Fetch customers from the backend on component mount
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/customers`, {
          withCredentials: true, // To include session-based auth cookies if needed
        });
        setCustomers(response.data); // Set the customers in state
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    };
    fetchCustomers();
  }, []);

  // Customer Handlers
  const handleCustomerChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  // Submit Customer
  const submitCustomer = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");  // Reset error
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/customers`,
        customer,
        { withCredentials: true }
      );
      alert("Customer Added Successfully!");
      setCustomer({ name: "", email: "", phone: "", address: "" });  // Reset customer form
    } catch (error) {
      setError(error.response?.data || error.message);  // Set error
    } finally {
      setIsLoading(false);
    }
  };

  // Order Handlers
  const handleOrderChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  // Submit Order
  const submitOrder = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");  // Reset error
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders`,
        order,
        { withCredentials: true }
      );
      alert("Order Added Successfully!");
      setOrder({ customerId: "", orderDetails: "", amount: "" });  // Reset order form
    } catch (error) {
      setError(error.response?.data || error.message);  // Set error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Data Ingestion</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Customer Form */}
        <form
          onSubmit={submitCustomer}
          className="bg-white p-8 rounded-2xl shadow-lg transition hover:shadow-xl"
        >
          <h2 className="text-2xl font-semibold text-blue-700 mb-6">Add Customer</h2>
          {error && <p className="text-red-600 mb-4">{error}</p>}  {/* Display error message */}
          <div className="space-y-4">
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="name"
              placeholder="Name"
              value={customer.name}
              onChange={handleCustomerChange}
            />
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="email"
              placeholder="Email"
              value={customer.email}
              onChange={handleCustomerChange}
            />
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="phone"
              placeholder="Phone"
              value={customer.phone}
              onChange={handleCustomerChange}
            />
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="address"
              placeholder="Address"
              value={customer.address}
              onChange={handleCustomerChange}
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Customer"}
          </button>
        </form>

        {/* Order Form */}
        <form
          onSubmit={submitOrder}
          className="bg-white p-8 rounded-2xl shadow-lg transition hover:shadow-xl"
        >
          <h2 className="text-2xl font-semibold text-green-700 mb-6">Add Order</h2>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <div className="space-y-4">
            {/* Customer Dropdown */}
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              name="customerId"
              value={order.customerId}
              onChange={handleOrderChange}
            >
              <option value="">Select Customer</option>
              {customers.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              name="orderDetails"
              placeholder="Order Details"
              value={order.orderDetails}
              onChange={handleOrderChange}
            />
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              name="amount"
              placeholder="Amount"
              type="number"
              value={order.amount}
              onChange={handleOrderChange}
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition shadow-md hover:shadow-lg"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DataIngestion;
