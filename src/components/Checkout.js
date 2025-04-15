import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from './CartContext';
import './styles/Checkout.css';

const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [delivery, setDelivery] = useState({
    address: '',
    building_type: '',
    apt_unit_: '',
    building_name: '',
    drop_off_option: '',
    custom_drop_off: '',
    instructions: ''
  });

  const checkoutItems = menuItems.filter(item => cartItems[item.id] > 0);
  const total = checkoutItems.reduce(
    (acc, item) => acc + item.price * cartItems[item.id],
    0
  );

  useEffect(() => {
    fetch('http://localhost:3002/deliveries')
      .then(res => res.json())
      .then(data => {
        setMenuItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch deliveries", err);
        setLoading(false);
      });
  }, []);

  const resetForm = () => {
    setPhone('');
    setCustomerName('');
    setAddress('');
    setNotes('');
    setDelivery({
      address: '',
      building_type: '',
      apt_unit_: '',
      building_name: '',
      drop_off_option: '',
      custom_drop_off: '',
      instructions: ''
    });
  };

  const submitDeliveryAndPayment = async () => {
    const deliveryData = {
      customer_name: customerName,
      address: address,
      ...delivery,
      notes,
      payment: {
        payment_method: 'Mpesa',
        account_number: phone,
        payment_status: 'Completed',
        timestamp: new Date().toISOString(),
        transaction_code: 'MPESA' + Math.random().toString(36).substring(2, 10).toUpperCase(),
        confirmation_message: 'Payment confirmed via Mpesa.'
      }
    };

try {
  const res = await fetch("http://localhost:3002/deliveries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(deliveryData)
  });

  if (!res.ok) throw new Error("Failed to save delivery and payment");

  const result = await res.json();
  console.log("Saved to db2.json:", result);

  alert(`Payment successful! ${result.payment.confirmation_message}. wait for mpesa message`);
  resetForm();
} catch (err) {
  console.error("Error posting to db2.json:", err);
  alert("Something went wrong. Try again.");
}
  };

  const handleMpesaPayment = async (e) => {
    e.preventDefault();

if (!phone || !/^07\d{8}$/.test(phone)) {
  alert("Please enter a valid Safaricom number (e.g., 07XXXXXXXX)");
  return;
}

if (!customerName || !address) {
  alert("Please fill in your name and delivery address.");
  return;
}

const mpesaPassword = window.prompt("Enter your M-Pesa PIN:");

if (!mpesaPassword || mpesaPassword.length < 4) {
  alert("Invalid PIN. Payment cancelled.");
  return;
}

await submitDeliveryAndPayment();

alert(`Simulating M-Pesa payment request to ${phone} for KES ${total.toFixed(2)}.\n
Delivery to: ${customerName}, ${address}\nNotes: ${notes || 'N/A'}`);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <ul>
        {checkoutItems.map(item => (
          <li key={item.id}>
            {item.name} — $ {item.price} x {cartItems[item.id]}
          </li>
        ))}
      </ul>
      
      <h3>Total: $ 29.99</h3>

  <div className="delivery-form">
    <h3>Delivery Details</h3>
    <input
      type="text"
      placeholder="Name"
      value={customerName}
      onChange={(e) => setCustomerName(e.target.value)}
      required
    />
    <input
      type="text"
      placeholder="Address"
      value={delivery.address}
      onChange={(e) => {
        setDelivery({ ...delivery, address: e.target.value });
        setAddress(e.target.value);
      }}
      required
    />
    <input
      type="text"
      placeholder="Building Type"
      value={delivery.building_type}
      onChange={(e) => setDelivery({ ...delivery, building_type: e.target.value })}
    />
    <input
      type="text"
      placeholder="Apartment / Unit"
      value={delivery.apt_unit_}
      onChange={(e) => setDelivery({ ...delivery, apt_unit_: e.target.value })}
    />
    <input
      type="text"
      placeholder="Building Name"
      value={delivery.building_name}
      onChange={(e) => setDelivery({ ...delivery, building_name: e.target.value })}
    />
    <select
      value={delivery.drop_off_option}
      onChange={(e) => setDelivery({ ...delivery, drop_off_option: e.target.value })}
    >
      <option value="">Select Drop-off Option</option>
      <option value="Leave at door">Leave at door</option>
      <option value="Hand it to me">Hand it to me</option>
      <option value="Other">Other</option>
    </select>
    {delivery.drop_off_option === "Other" && (
      <input
        type="text"
        placeholder="Custom Drop-off Option"
        value={delivery.custom_drop_off}
        onChange={(e) => setDelivery({ ...delivery, custom_drop_off: e.target.value })}
      />
    )}
    <textarea
      placeholder="Delivery Instructions"
      value={delivery.instructions}
      onChange={(e) => setDelivery({ ...delivery, instructions: e.target.value })}
    />
    <textarea
      placeholder="Notes (optional)"
      value={notes}
      onChange={(e) => setNotes(e.target.value)}
    />
  </div>

  <form onSubmit={handleMpesaPayment} className="mpesa-form">
    <h3>M-Pesa Payment</h3>
    <input
      type="text"
      placeholder="Safaricom Phone Number"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
    />
    <button type="submit">Pay with M-Pesa</button>
  </form>

  <div className="paybill-section">
    <h3>Or Pay via M-Pesa Paybill</h3>
    <ol>
      <li>Go to <strong>M-Pesa</strong> on your phone</li>
      <li>Select <strong>Lipa na M-Pesa</strong></li>
      <li>Select <strong>Paybill</strong></li>
      <li>Enter <strong>Business Number:</strong> <code>123456</code></li>
      <li>Enter <strong>Account Number:</strong> <code>654321</code></li>
      <li>Enter the amount</li>
      <li>Enter your M-Pesa PIN and press OK</li>
    </ol>

    <p>After paying, enter your M-Pesa transaction code here:</p>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const code = document.getElementById("transactionCode").value.trim();

        if (!code || !/^([A-Za-z0-9]{10,})$/.test(code)) {
          alert("Please enter a valid transaction code");
          return;
        }

        if (!customerName || !address) {
          alert("Please fill in your name and delivery address.");
          return;
        }

        alert(`Transaction ${code} received. We'll verify and process your order shortly.
          Delivery to: ${customerName}, ${address}\nNotes: ${notes || 'N/A'}`);
                      resetForm();
                    }}
        >
          <input
            type="text"
            id="transactionCode"
            placeholder="Transaction Code (e.g., QES1XYZ234)"
          />
          <button type="submit">Confirm Paybill Payment</button>
        </form>
      </div>
    </div>
  );
};


export default Checkout;