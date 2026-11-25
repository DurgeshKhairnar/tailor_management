
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        username: "",
        password: "",
        rememberMe: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleLogin = (e) => {
        e.preventDefault();

        if (!form.username || !form.password) {
            alert("Please enter username and password");
            return;
        }

        // Connect your authentication API here.
        console.log("Login Data:", form);

        // Temporary navigation for UI testing only.
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6">

            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

                {/* Left Section */}
                <div className="hidden md:flex flex-col justify-between bg-black p-8 lg:p-12 text-white relative overflow-hidden">

                    <div className="relative z-10">

                        {/* Logo */}
                        <div className="flex items-center gap-3">

                            <div className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center">
                                <i className="ri-scissors-2-line text-3xl"></i>
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold">
                                    TailorWale
                                </h1>

                                <p className="text-gray-400 text-xs tracking-widest">
                                    INDIA KA APNA SYSTEM
                                </p>
                            </div>

                        </div>

                        {/* Main Content */}
                        <div className="mt-20 lg:mt-24">

                            <span className="inline-block px-3 py-1 border border-gray-700 rounded-full text-xs text-gray-300 mb-5">
                                TAILOR SHOP MANAGEMENT
                            </span>

                            <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                                Manage Your
                                <br />
                                Tailoring Business
                                <br />
                                Smarter.
                            </h2>

                            <p className="text-gray-400 mt-5 leading-7 text-sm lg:text-base max-w-sm">
                                Manage customers, orders, measurements,
                                billing and payments from one simple dashboard.
                            </p>

                            {/* Features */}
                            <div className="mt-8 space-y-4">

                                <div className="flex items-center gap-3 text-sm text-gray-300">
                                    <i className="ri-user-line text-xl"></i>
                                    Customer Management
                                </div>

                                <div className="flex items-center gap-3 text-sm text-gray-300">
                                    <i className="ri-ruler-line text-xl"></i>
                                    Measurement Tracking
                                </div>

                                <div className="flex items-center gap-3 text-sm text-gray-300">
                                    <i className="ri-file-list-3-line text-xl"></i>
                                    Orders & Billing
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Footer */}
                    <div className="relative z-10 border-t border-gray-800 pt-5 mt-10">
                        <p className="text-sm text-gray-500">
                            © 2026 TailorWale. All rights reserved.
                        </p>
                    </div>

                    {/* Background Decorations */}
                    <div className="absolute -bottom-28 -right-24 w-80 h-80 rounded-full border-[40px] border-gray-800 opacity-60"></div>

                    <div className="absolute top-40 -right-20 w-48 h-48 rounded-full border border-gray-700 opacity-40"></div>

                </div>

                {/* Right Section */}
                <div className="p-6 sm:p-10 md:p-10 lg:p-14 flex flex-col justify-center">

                    {/* Mobile Logo */}
                    <div className="flex md:hidden items-center justify-center gap-3 mb-10">

                        <div className="w-11 h-11 bg-black text-white rounded-xl flex items-center justify-center">
                            <i className="ri-scissors-2-line text-2xl"></i>
                        </div>

                        <div>
                            <h1 className="text-xl font-bold text-black">
                                TailorWale
                            </h1>

                            <p className="text-xs text-gray-500 tracking-wider">
                                INDIA KA APNA SYSTEM
                            </p>
                        </div>

                    </div>

                    {/* Heading */}
                    <div className="mb-8">

                        <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-3">
                            Welcome Back
                        </p>

                        <h2 className="text-3xl font-bold text-black">
                            Login to your account
                        </h2>

                        <p className="text-gray-500 mt-2 text-sm">
                            Please enter your credentials to continue.
                        </p>

                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-5">

                        {/* Username */}
                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Username / Email
                            </label>

                            <div className="relative">

                                <i className="ri-user-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>

                                <input
                                    type="text"
                                    name="username"
                                    value={form.username}
                                    onChange={handleChange}
                                    placeholder="Enter your username"
                                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-black focus:ring-2 focus:ring-gray-200 transition"
                                />

                            </div>

                        </div>

                        {/* Password */}
                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>

                            <div className="relative">

                                <i className="ri-lock-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>

                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className="w-full pl-11 pr-12 py-3 border border-gray-200 rounded-xl outline-none focus:border-black focus:ring-2 focus:ring-gray-200 transition"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition"
                                >
                                    <i className={`text-lg ${showPassword ? "ri-eye-off-line" : "ri-eye-line"}`}></i>
                                </button>

                            </div>

                        </div>

                        {/* Remember and Forgot */}
                        <div className="flex flex-wrap justify-between items-center gap-3">

                            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">

                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={form.rememberMe}
                                    onChange={handleChange}
                                    className="accent-black w-4 h-4 cursor-pointer"
                                />

                                Remember me

                            </label>

                            <button
                                type="button"
                                onClick={() => navigate("/forgot-password")}
                                className="text-sm font-semibold text-black hover:text-gray-500 transition"
                            >
                                Forgot Password?
                            </button>

                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-black hover:bg-gray-800 text-white py-3.5 rounded-xl font-semibold transition-all duration-200 flex justify-center items-center gap-2"
                        >
                            Login

                            <i className="ri-arrow-right-line"></i>
                        </button>

                    </form>

                    {/* Footer */}
                    <div className="mt-8 pt-5 border-t border-gray-100 text-center">

                        <p className="text-xs text-gray-400">
                            <i className="ri-shield-check-line mr-1"></i>
                            Secure Login • TailorWale Management System
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;
