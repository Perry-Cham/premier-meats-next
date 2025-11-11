'use client'
import { useState } from 'react';

export default function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert('Message sent successfully!');
        e.target.reset();
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="max-w-4xl mx-auto ">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Contact Us</h1>

          {/* Bank Details */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Bank Details</h2>
            <div className="">
              <div className="space-y-2">
                <div className="grid grid-cols-2">
                  <p className="font-semibold text-gray-700">Account Holder:</p>
                  <p className="text-gray-600">Premier Meats</p>
                </div>
                <div className="grid grid-cols-2">
                  <p className="font-semibold text-gray-700">Bank:</p>
                  <p className="text-gray-600">Ecobank Zambia</p>
                </div>
                <div className="grid grid-cols-2">
                  <p className="font-semibold text-gray-700">Branch:</p>
                  <p className="text-gray-600">EZM industrial Branch- Lumumba rd</p>
                </div>
                <div className="grid grid-cols-2">
                  <p className="font-semibold text-gray-700">Account Number:</p>
                  <p className="text-gray-600">5652500004779</p>
                </div>
                <div className="grid grid-cols-2">
                  <p className="font-semibold text-gray-700">Swift Code:</p>
                  <p className="text-gray-600">ECOMZMLU</p>
                </div>
                <div className="grid grid-cols-2">
                  <p className="font-semibold text-gray-700">Branch Code:</p>
                  <p className="text-gray-600">36007</p>
                </div>
              </div>
            </div>
          </div>

          {/* Z.R.A Registration */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded">
            <h2 className="text-xl font-bold mb-2 text-gray-800">Z.R.A REGISTRATION</h2>
            <p className="text-gray-700">
              We are registered with the Zambia Public Procurement Authority (ZPPA) and our registration Number is 40670.
              We are in possession of a valid ZPPA certificate.
            </p>
          </div>

          {/* Contact Details */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Contact Details:</h2>
            <div className="space-y-2 mb-4">
              <p className="text-gray-700 font-semibold">PREMIER MEATS,</p>
              <p className="text-gray-600">No. 5 Nyemba Close,</p>
              <p className="text-gray-600">Woodlands</p>
              <p className="text-gray-600">Lusaka</p>
            </div>

            <div className="mb-4">
              <p className="font-semibold text-gray-700 mb-2">Tel:</p>
              <ul className="space-y-1 text-gray-600">
                <li>+260-977-345462</li>
                <li>+260-977-833658</li>
                <li>+260 97 7196140</li>
                <li>+260-968-270439</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-2">Email us:</p>
              <ul className="space-y-1 text-gray-600 break-words">
                <li>premiermeatsinfo@gmail.com</li>
                <li>lubinda.chamileke@gmail.com (Chief Sales Officer)</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">OR GET IN TOUCH VIA THIS FORM</h2>
            <p className="text-gray-600 mb-6">
              Our sales representatives will get back to you by email within an hour.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="access_key" value="c6acabb9-e056-4793-a3e6-b63c3cfda25a" />

              <div>
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="first-name">First Name</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  name="first-name"
                  type="text"
                  placeholder="John"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="Last Name">Last Name</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  name="Last Name"
                  type="text"
                  placeholder="Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="Phone Number">Phone Number</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  name="Phone Number"
                  type="text"
                  placeholder="095/096/097"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  name="email"
                  type="email"
                  placeholder="Example@gmail.com"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="subject">Subject</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  name="subject"
                  type="text"
                  placeholder="Inquiry Into Supply Prices"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="query">Message</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent h-32 resize-none"
                  name="query"
                  placeholder="Could you please supply the following..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md transition duration-200"
              >
                Send
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}