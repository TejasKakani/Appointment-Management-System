export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">About Us</h3>
                        <p className="text-gray-400">Providing smart solutions for appointment scheduling and management in the healthcare sector.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                            <li><a href="/create-appointment" className="text-gray-400 hover:text-white transition-colors">Book Appointment</a></li>
                            <li><a href="/list-appointments" className="text-gray-400 hover:text-white transition-colors">My Appointments</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>Email: support@appointmentsystem.com</li>
                            <li>Phone: (123) 456-7890</li>
                            <li>Address: 123 Healthcare St, Medical City</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-gray-400">&copy; 2024 Appointment Management System. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}