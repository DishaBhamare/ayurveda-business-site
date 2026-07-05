function Contact() {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6">

        <h2 className="text-3xl font-bold text-center text-green-800 mb-4">
          Contact Us
        </h2>

        <p className="text-center text-gray-600 mb-10">
          We'd love to hear from you.
        </p>

        <form className="space-y-4">

          <input
            type="text"
            placeholder="Your Name"
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full border p-3 rounded-lg"
          />

          <button
            type="submit"
            className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800"
          >
            Send Message
          </button>

        </form>

      </div>
    </section>
  );
}

export default Contact;