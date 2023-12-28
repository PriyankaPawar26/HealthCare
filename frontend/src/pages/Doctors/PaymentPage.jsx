import React from 'react'

const PaymentPage = () => {
  return (
   <div class="max-w-xl mx-auto bg-gray-100 shadow-md rounded-md overflow-hidden mt-16">
    <div class="bg-blue-600 text-white p-4 flex justify-between">
        <div class="font-bold text-lg">Credit Card</div>
        <div class="text-lg"><i class="fab fa-cc-visa"></i></div>
    </div>
    <div class="p-6">
        <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="card_number">
                Card Number
            </label>
            <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="card_number" type="text" placeholder="xxxx xxxx xxxx xxxx"/>
        </div>
        <div class="mb-4 flex justify-between">
            <div>
                <label class="block text-gray-700 font-bold mb-2" for="expiration_date">
                    Expiration Date
                </label>
                <input
                    class="shadow appearance-none border rounded w-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="expiration_date" type="text" placeholder="MM/YY"/>
            </div>
            <div>
                <label class="block text-gray-700 font-bold mb-2" for="cvv">
                    CVV
                </label>
                <input
                    class="shadow appearance-none border rounded w-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="cvv" type="text" placeholder="XXX"/>
            </div>
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="name_on_card">
                Name on Card
            </label>
            <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name_on_card" type="text" placeholder="John Doe"/>
        </div>
        <button
            class="bg-blue-600 text-white py-2 px-4 rounded font-bold hover:bg-blue-700 focus:outline-none focus:shadow-outline">Book Appointment
        </button>
    </div>
</div>
  )
}

export default PaymentPage