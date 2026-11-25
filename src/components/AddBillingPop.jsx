
import { useState } from "react";

function AddBillingPop({ onClose, onSave, customers = [] }) {
    
  const [form, setForm] = useState({
    invoiceNo: "0003",
    date: new Date().toISOString().split("T")[0],
    customerId: "",
    paymentMethod: "Cash",
    received: "",
    items: [
      { itemName: "", quantity: 1, price: "" }
    ]
  });

  const updateField = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const updateItem = (index, name, value) => {
    const updatedItems = [...form.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [name]: value
    };

    setForm(prev => ({ ...prev, items: updatedItems }));
  };

  const addItem = () => {
    setForm(prev => ({
      ...prev,
      items: [
        ...prev.items,
        { itemName: "", quantity: 1, price: "" }
      ]
    }));
  };

  const removeItem = (index) => {
    setForm(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const totalAmount = form.items.reduce(
    (total, item) =>
      total + Number(item.quantity || 0) * Number(item.price || 0),
    0
  );

  const received = Number(form.received || 0);
  const pending = totalAmount - received;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.customerId) {
      alert("Please select a customer");
      return;
    }

    if (totalAmount <= 0) {
      alert("Please add at least one valid item");
      return;
    }

    if (received < 0 || received > totalAmount) {
      alert("Received amount must be between 0 and total amount");
      return;
    }

    const selectedCustomer = customers.find(
      customer => String(customer._id) === form.customerId
    );

    const billData = {
      ...form,
      customer: selectedCustomer,
      totalAmount,
      received,
      pending,
      status: pending === 0 ? "PAID" : "PENDING"
    };

    onSave?.(billData);
  };

  const inputClass =
    "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100";

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Add New Bill
            </h2>
            <p className="text-sm text-gray-500">
              Create a new customer billing invoice
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 text-2xl"
          >
            <i className="ri-close-line"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">

          {/* Invoice Details */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">
              Invoice Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm mb-1 text-gray-600">
                  Invoice Number
                </label>
                <input
                  value={form.invoiceNo}
                  onChange={e => updateField("invoiceNo", e.target.value)}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-600">
                  Bill Date
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={e => updateField("date", e.target.value)}
                  className={inputClass}
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm mb-1 text-gray-600">
                  Select Customer
                </label>
                <select
                  value={form.customerId}
                  onChange={e => updateField("customerId", e.target.value)}
                  className={inputClass}
                  required
                >
                  <option value="">Choose Customer</option>

                  {customers.map(customer => (
                    <option key={customer._id} value={customer._id}>
                      {customer.customerName} - {customer.mobileNumber}
                    </option>
                  ))}
                </select>
              </div>

            </div>
          </div>

          {/* Items */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-700">
                Bill Items
              </h3>

              <button
                type="button"
                onClick={addItem}
                className="text-purple-700 text-sm font-semibold hover:text-purple-900"
              >
                <i className="ri-add-line"></i> Add Item
              </button>
            </div>

            <div className="space-y-3">

              {form.items.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-2 items-end bg-gray-50 p-3 rounded-xl"
                >

                  <div className="col-span-12 sm:col-span-5">
                    <label className="text-xs text-gray-500">
                      Item Name
                    </label>
                    <input
                      placeholder="e.g. Shirt"
                      value={item.itemName}
                      onChange={e =>
                        updateItem(index, "itemName", e.target.value)
                      }
                      className={inputClass}
                      required
                    />
                  </div>

                  <div className="col-span-4 sm:col-span-2">
                    <label className="text-xs text-gray-500">
                      Qty
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={e =>
                        updateItem(index, "quantity", e.target.value)
                      }
                      className={inputClass}
                      required
                    />
                  </div>

                  <div className="col-span-5 sm:col-span-3">
                    <label className="text-xs text-gray-500">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      placeholder="Price"
                      value={item.price}
                      onChange={e =>
                        updateItem(index, "price", e.target.value)
                      }
                      className={inputClass}
                      required
                    />
                  </div>

                  <div className="col-span-3 sm:col-span-2 flex justify-center pb-2">
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      disabled={form.items.length === 1}
                      className="text-red-500 hover:text-red-700 disabled:opacity-30"
                      title="Remove item"
                    >
                      <i className="ri-delete-bin-line text-xl"></i>
                    </button>
                  </div>

                  <div className="col-span-12 text-right text-sm font-semibold text-gray-700">
                    Amount: ₹{(
                      Number(item.quantity || 0) *
                      Number(item.price || 0)
                    ).toLocaleString("en-IN")}
                  </div>

                </div>
              ))}

            </div>
          </div>

          {/* Payment Details */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">
              Payment Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm mb-1 text-gray-600">
                  Payment Method
                </label>
                <select
                  value={form.paymentMethod}
                  onChange={e => updateField("paymentMethod", e.target.value)}
                  className={inputClass}
                >
                  <option>Cash</option>
                  <option>UPI</option>
                  <option>Card</option>
                  <option>Bank Transfer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-600">
                  Received Amount (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  max={totalAmount}
                  placeholder="Enter received amount"
                  value={form.received}
                  onChange={e => updateField("received", e.target.value)}
                  className={inputClass}
                />
              </div>

            </div>
          </div>

          {/* Bill Summary */}
          <div className="bg-purple-50 rounded-xl p-5 space-y-3">

            <div className="flex justify-between text-gray-600">
              <span>Total Bill</span>
              <span className="font-semibold">
                ₹{totalAmount.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex justify-between text-green-600">
              <span>Received Amount</span>
              <span className="font-semibold">
                ₹{received.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="border-t border-purple-200 pt-3 flex justify-between">
              <span className="font-bold text-gray-800">
                Pending Amount
              </span>
              <span className="font-bold text-red-500 text-lg">
                ₹{pending.toLocaleString("en-IN")}
              </span>
            </div>

          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-purple-700 text-white rounded-lg hover:bg-purple-800 font-semibold"
            >
              <i className="ri-save-line mr-1"></i>
              Save Bill
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default AddBillingPop;
