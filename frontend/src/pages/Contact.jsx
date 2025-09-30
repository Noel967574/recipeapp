import Header from "../components/reusables/Header";

function Contact() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        {/* Page Heading */}
        <h1 className="text-4xl font-extrabold text-blue-700 text-center mb-4">
          Contact Us
        </h1>
        <p className="text-center text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
          Have questions or feedback? We’d love to hear from you.  
          You can reach us through our office address, email, or phone.  
          And yes, you can even visit us in person!
        </p>

        {/* Contact Info Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Our Office</h2>
          <p className="text-gray-700 mb-2">📍 123 CookBookPro Street, Lagos, Nigeria</p>
          <p className="text-gray-700 mb-2">📧 contact@cookbookpro.com</p>
          <p className="text-gray-700">📞 +234 800 123 4567</p>
        </div>

        {/* Map Section */}
        <div className="max-w-5xl mx-auto">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.3074897608!2d3.3792058749924193!3d6.602442993392385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b92fbbfc93a0d%3A0x2d4fbcbe8df17d70!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-2xl shadow-lg"
          ></iframe>
        </div>
      </main>
    </div>
  );
}

export default Contact;
