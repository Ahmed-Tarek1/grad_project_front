import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get location object
  const { title, price, location: tourLocation } = location.state || {}; // Destructure state

  useEffect(() => {
    // عند تحميل الصفحة، قم بإرسال طلب الدفع تلقائيًا
    handlePayment();
  }, []);

  const handlePayment = async () => {
    setLoading(true);

    try {
      // أرسل طلبًا إلى الباك إند لإنشاء رابط دفع
      const response = await fetch("https://your-backend-api.com/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: price, // المبلغ
          currency: "EGP", // العملة
          userId: "1234", // أي بيانات إضافية
        }),
      });

      const data = await response.json();

      if (data.payment_url) {
        // توجيه المستخدم مباشرة إلى صفحة الدفع الجاهزة
        window.location.href = data.payment_url;
      } else {
        navigate("/payment-failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      navigate("/payment-failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Processing Payment...</h2>
        <p className="text-gray-600 mb-6">
          You are booking: <span className="font-bold">{title}</span>
        </p>
        <p className="text-gray-600 mb-6">
          Location: <span className="font-bold">{tourLocation}</span>
        </p>
        <p className="text-gray-600 mb-6">
          Total Amount: <span className="font-bold">${price}</span>
        </p>

        {loading && <p className="text-gray-600">Please wait while we process your payment...</p>}
      </div>
    </div>
  );
};

export default PaymentPage;