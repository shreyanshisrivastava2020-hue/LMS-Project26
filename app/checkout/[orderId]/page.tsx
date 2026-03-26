"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function CheckoutPage() {
  const params = useParams();
  const orderId = params?.orderId as string;

  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (!orderId) return;

    async function fetchOrder() {
      const res = await fetch(`/api/orders/${orderId}`, {
        credentials: "include",
      });

      const data = await res.json();
      setOrder(data);
    }

    fetchOrder();
  }, [orderId]);

  if (!order) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl w-96 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>

        <p className="mb-2">
          Course: {order.courseId?.title}
        </p>

        <p className="mb-6">
          Amount: ₹{order.amount}
        </p>

        <button
          className="w-full bg-emerald-500 py-2 rounded-lg hover:bg-emerald-600"
          onClick={() => alert("Integrate Payment Gateway Here")}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}