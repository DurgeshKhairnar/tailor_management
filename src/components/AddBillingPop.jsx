
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

    const formatCurrency = (amount) =>
        Number(amount).toLocaleString("en-IN");

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

        if (form.items.some(item =>
            !item.itemName.trim() ||
            Number(item.quantity) <= 0 ||
            Number(item.price) < 0 ||
            item.price === ""
        )) {
            alert("Please enter valid item details");
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
        "w-full min-w-0 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-black focus:ring-2 focus:ring-gray-200 transition";

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 sm:p-5">

            <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl max-h-[95vh] overflow-y-auto">

                {/* Header */}
                <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">

                    <div>
                        <h2 className="text-lg sm:text-xl font-bold text-black">
                            Add New Bill
                        </h2>

                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            Create a new customer billing invoice
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-black transition"
                    >
                        <i className="ri-close-line text-xl"></i>
                    </button>

                </div>

                <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-7">

                    {/* Invoice Details */}
                    <div>

                        <div className="flex items-center gap-2 mb-4">
                            <i className="ri-file-list-3-line text-xl text-black"></i>

                            <h3 className="font-bold text-gray-800">
                                Invoice Details
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-600">
                                    Invoice Number
                                </label>

                                <input
                                    value={form.invoiceNo}
                                    onChange={e => updateField("invoiceNo", e.target.value)}
                                    className={inputClass}
                                    placeholder="Enter invoice number"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-600">
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

                                <label className="block text-sm font-medium mb-2 text-gray-600">
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

                                {customers.length === 0 && (
                                    <p className="text-xs text-gray-500 mt-2">
                                        No customers available. Please add a customer first.
                                    </p>
                                )}

                            </div>

                        </div>

                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100"></div>

                    {/* Bill Items */}
                    <div>

                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">

                            <div className="flex items-center gap-2">
                                <i className="ri-shopping-bag-3-line text-xl text-black"></i>

                                <h3 className="font-bold text-gray-800">
                                    Bill Items
                                </h3>

                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                                    {form.items.length} Items
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={addItem}
                                className="w-full sm:w-auto bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition"
                            >
                                <i className="ri-add-line mr-1"></i>
                                Add Item
                            </button>

                        </div>

                        <div className="space-y-3">

                            {form.items.map((item, index) => (

                                <div
                                    key={index}
                                    className="bg-gray-50 border border-gray-200 rounded-xl p-3 sm:p-4"
                                >

                                    <div className="flex justify-between items-center mb-3">

                                        <p className="text-sm font-semibold text-gray-700">
                                            Item #{index + 1}
                                        </p>

                                        <button
                                            type="button"
                                            onClick={() => removeItem(index)}
                                            disabled={form.items.length === 1}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition"
                                            title="Remove item"
                                        >
                                            <i className="ri-delete-bin-line text-lg"></i>
                                        </button>

                                    </div>

                                    <div className="grid grid-cols-12 gap-3">

                                        <div className="col-span-12 sm:col-span-6">
                                            <label className="block text-xs font-medium text-gray-500 mb-2">
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

                                        <div className="col-span-5 sm:col-span-2">
                                            <label className="block text-xs font-medium text-gray-500 mb-2">
                                                Quantity
                                            </label>

                                            <input
                                                type="number"
                                                min="1"
                                                step="1"
                                                value={item.quantity}
                                                onChange={e =>
                                                    updateItem(index, "quantity", e.target.value)
                                                }
                                                className={inputClass}
                                                required
                                            />
                                        </div>

                                        <div className="col-span-7 sm:col-span-4">
                                            <label className="block text-xs font-medium text-gray-500 mb-2">
                                                Price (₹)
                                            </label>

                                            <input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                placeholder="Enter price"
                                                value={item.price}
                                                onChange={e =>
                                                    updateItem(index, "price", e.target.value)
                                                }
                                                className={inputClass}
                                                required
                                            />
                                        </div>

                                    </div>

                                    <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">

                                        <span className="text-xs text-gray-500">
                                            Item Amount
                                        </span>

                                        <span className="font-bold text-black text-sm">
                                            ₹{formatCurrency(
                                                Number(item.quantity || 0) *
                                                Number(item.price || 0)
                                            )}
                                        </span>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100"></div>

                    {/* Payment Details */}
                    <div>

                        <div className="flex items-center gap-2 mb-4">
                            <i className="ri-wallet-3-line text-xl text-black"></i>

                            <h3 className="font-bold text-gray-800">
                                Payment Details
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-600">
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
                                <label className="block text-sm font-medium mb-2 text-gray-600">
                                    Received Amount (₹)
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    max={totalAmount}
                                    step="0.01"
                                    placeholder="Enter received amount"
                                    value={form.received}
                                    onChange={e => updateField("received", e.target.value)}
                                    className={inputClass}
                                />
                            </div>

                        </div>

                    </div>

                    {/* Bill Summary */}
                    <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 sm:p-5 space-y-4">

                        <div className="flex justify-between items-center text-gray-600 text-sm">
                            <span>Total Bill</span>

                            <span className="font-semibold text-black">
                                ₹{formatCurrency(totalAmount)}
                            </span>
                        </div>

                        <div className="flex justify-between items-center text-gray-600 text-sm">
                            <span>Received Amount</span>

                            <span className="font-semibold text-black">
                                ₹{formatCurrency(received)}
                            </span>
                        </div>

                        <div className="border-t border-gray-300 pt-4 flex justify-between items-center gap-3">

                            <span className="font-bold text-black">
                                Pending Amount
                            </span>

                            <span className="font-bold text-black text-xl">
                                ₹{formatCurrency(pending)}
                            </span>

                        </div>

                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">

                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="w-full sm:w-auto px-6 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 font-semibold transition flex items-center justify-center gap-2"
                        >
                            <i className="ri-save-line"></i>
                            Save Bill
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddBillingPop;
