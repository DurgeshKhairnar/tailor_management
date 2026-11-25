
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Demo payment data
const demoPayments = {
    1: [
        { id: 1, amount: 2000, date: "20 Nov 2026", method: "Cash" },
        { id: 2, amount: 1000, date: "22 Nov 2026", method: "UPI" }
    ],
    2: [
        { id: 1, amount: 3000, date: "18 Nov 2026", method: "UPI" },
        { id: 2, amount: 2000, date: "21 Nov 2026", method: "Cash" }
    ],
    3: [
        { id: 1, amount: 1000, date: "22 Nov 2026", method: "Cash" }
    ]
};

// Demo payment summary
const demoPaymentSummary = {
    1: { totalAmount: 5000, paidMoney: 3000 },
    2: { totalAmount: 8000, paidMoney: 5000 },
    3: { totalAmount: 2500, paidMoney: 1000 }
};

function CustomerDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const customerList = useSelector(
        state => state.customers.customerList
    );

    const selectedCustomer = customerList.find(
        customer => String(customer._id) === id
    );

    if (!selectedCustomer) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
                <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <i className="ri-user-search-line text-xl text-gray-600"></i>
                    </div>

                    <h2 className="text-xl font-bold text-black">
                        Customer not found
                    </h2>

                    <p className="text-sm text-gray-500 mt-2">
                        This customer may have been deleted or the ID is incorrect.
                    </p>

                    <button
                        onClick={() => navigate('/customer')}
                        className="mt-5 bg-black text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition"
                    >
                        Back to Customers
                    </button>
                </div>
            </div>
        );
    }

    const summary = demoPaymentSummary[id] || {
        totalAmount: 0,
        paidMoney: 0
    };

    const payments = demoPayments[id] || [];

    const remainingMoney = summary.totalAmount - summary.paidMoney;

    const formatCurrency = (amount) =>
        new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">

                    <button
                        onClick={() => navigate('/customer')}
                        className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white hover:bg-gray-100 transition"
                    >
                        <i className="ri-arrow-left-line text-xl text-black"></i>
                    </button>

                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-black">
                            Customer Details
                        </h1>

                        <p className="text-gray-500 text-sm mt-1">
                            View customer information and payment history
                        </p>
                    </div>

                </div>

                {/* Personal Information */}
                <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 mb-6">

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">

                        <div className="flex items-center gap-3">

                            <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center">
                                <i className="ri-user-line text-xl"></i>
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-black">
                                    Personal Information
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Customer profile
                                </p>
                            </div>

                        </div>

                        <span className="w-fit px-3 py-1.5 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 text-sm font-medium">
                            {selectedCustomer.customerType || 'Regular'}
                        </span>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <p className="text-xs text-gray-500 mb-2">
                                Customer Name
                            </p>

                            <p className="font-semibold text-black break-words">
                                {selectedCustomer.customerName || '-'}
                            </p>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <p className="text-xs text-gray-500 mb-2">
                                Mobile Number
                            </p>

                            <p className="font-semibold text-black break-words">
                                {selectedCustomer.mobileNumber || '-'}
                            </p>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <p className="text-xs text-gray-500 mb-2">
                                Gender
                            </p>

                            <p className="font-semibold text-black">
                                {selectedCustomer.gender || '-'}
                            </p>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <p className="text-xs text-gray-500 mb-2">
                                Address
                            </p>

                            <p className="font-semibold text-black break-words">
                                {selectedCustomer.address || '-'}
                            </p>
                        </div>

                    </div>

                </div>

                {/* Payment Summary */}
                <div className="mb-6">

                    <div className="mb-4">
                        <h2 className="text-lg font-bold text-black">
                            Payment Summary
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Overview of customer billing
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

                        {/* Total Amount */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-5">
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-gray-500">
                                    Total Amount
                                </p>

                                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                                    <i className="ri-wallet-3-line text-black"></i>
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-black mt-3">
                                {formatCurrency(summary.totalAmount)}
                            </h2>

                            <p className="text-xs text-gray-400 mt-2">
                                Total billed amount
                            </p>
                        </div>

                        {/* Paid Money */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-5">
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-gray-500">
                                    Paid Money
                                </p>

                                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                                    <i className="ri-check-double-line text-black"></i>
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-black mt-3">
                                {formatCurrency(summary.paidMoney)}
                            </h2>

                            <p className="text-xs text-gray-400 mt-2">
                                Amount received
                            </p>
                        </div>

                        {/* Remaining Money */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:col-span-2 xl:col-span-1">
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-gray-500">
                                    Remaining Money
                                </p>

                                <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center">
                                    <i className="ri-money-rupee-circle-line"></i>
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-black mt-3">
                                {formatCurrency(remainingMoney)}
                            </h2>

                            <p className="text-xs text-gray-400 mt-2">
                                Pending payment
                            </p>
                        </div>

                    </div>

                </div>

                {/* Payment History */}
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

                    <div className="p-4 sm:p-6 border-b border-gray-200">

                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

                            <div>
                                <h2 className="text-lg font-bold text-black">
                                    Payment History
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    All recorded payments
                                </p>
                            </div>

                            <span className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium w-fit">
                                {payments.length} Payments
                            </span>

                        </div>

                    </div>

                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[600px] text-left">

                            <thead className="bg-black">
                                <tr>
                                    <th className="p-4 text-xs font-semibold text-white uppercase tracking-wider">
                                        ID
                                    </th>

                                    <th className="p-4 text-xs font-semibold text-white uppercase tracking-wider">
                                        Date
                                    </th>

                                    <th className="p-4 text-xs font-semibold text-white uppercase tracking-wider">
                                        Amount
                                    </th>

                                    <th className="p-4 text-xs font-semibold text-white uppercase tracking-wider">
                                        Payment Method
                                    </th>
                                </tr>
                            </thead>

                            <tbody>

                                {payments.length > 0 ? (

                                    payments.map((payment) => (

                                        <tr
                                            key={payment.id}
                                            className="border-b border-gray-100 hover:bg-gray-50 transition"
                                        >

                                            <td className="p-4 text-gray-600">
                                                #{payment.id}
                                            </td>

                                            <td className="p-4 text-gray-600 whitespace-nowrap">
                                                {payment.date}
                                            </td>

                                            <td className="p-4 font-semibold text-black whitespace-nowrap">
                                                {formatCurrency(payment.amount)}
                                            </td>

                                            <td className="p-4">
                                                <span className="px-3 py-1 rounded-lg bg-gray-100 border border-gray-200 text-gray-700 text-sm">
                                                    {payment.method}
                                                </span>
                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="p-10 text-center"
                                        >
                                            <div className="flex flex-col items-center">

                                                <i className="ri-wallet-line text-3xl text-gray-300 mb-3"></i>

                                                <p className="text-gray-500 font-medium">
                                                    No payment history found
                                                </p>

                                                <p className="text-gray-400 text-sm mt-1">
                                                    Payments will appear here
                                                </p>

                                            </div>
                                        </td>
                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                    {/* Footer */}
                    {payments.length > 0 && (
                        <div className="p-4 border-t border-gray-200 bg-gray-50">
                            <p className="text-sm text-gray-500">
                                Showing {payments.length} payment{payments.length !== 1 ? 's' : ''}
                            </p>
                        </div>
                    )}

                </div>

            </div>

        </div>
    );
}

export default CustomerDetails;
