import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import Accordion from '../components/Accordion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SmartHome from '../assets/SmartHome.png'; // Import the SmartHome image

const Homepage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with a default animation duration
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col min-h-screen">
      {/* Main Content */}
      <div className="flex-grow">
        {/* Hero Section - Full Screen with visual separation */}
        <section
          id="home"
          className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-blue-700 dark:from-blue-800 dark:to-blue-900 text-white px-4 relative"
          data-aos="fade-up"
        >
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            
            The All-in-One Solution for Cross-Border Finance
            </h1>
            <p className="text-lg md:text-xl mb-10 text-white dark:text-gray-200">
            Whether you're managing your personal international finances or running a global 
            business, Zenya simplifies currency tracking, remittance comparison, and multi-currency budgeting in one unified platform.
            </p>
            <div className="space-x-6">
              <button className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-gray-100 transition duration-300 text-lg shadow-lg">
                Get Started
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-700 transition duration-300 text-lg">
                Learn More
              </button>
            </div>
          </div>
          
          {/* Scroll down indicator */}
          <div>
            <div className="absolute bottom-10 animate-bounce">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="py-16 bg-gray-100 dark:bg-gray-800"
          data-aos="fade-right"
        >
          <div className="max-w-screen-lg mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">About Us</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Zenya is designed to simplify cross-border financial management for both individuals and businesses. From real-time currency tracking to automated expense management and remittance comparisons, Zenya integrates these functions into one system, empowering you to make smarter financial decisions, no matter your scale.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="w-full md:w-2/3"> {/* Image container */}
                <img
                  src={SmartHome} // Use the SmartHome image
                  alt="Smart Home"
                  className="rounded-lg shadow-lg w-full h-auto" // Ensure the image scales properly
                />
              </div>
              <div className="w-full md:w-1/2 text-left">
                <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                To provide smart, sustainable, and intuitive tools for managing cross-border finance—whether you're a business optimizing international payments or an individual looking to better control your multi-currency expenses.
                </p>
                <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
                <p className="text-gray-700 dark:text-gray-300">
                To revolutionize how the world manages multi-currency transactions and cross-border finance, making it seamless and accessible for everyone—individuals and businesses alike.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section
  className="py-16 bg-gray-100 dark:bg-gray-800"
  data-aos="fade-up"
>
  <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>

  {/* B2C Section */}
  <div className="mb-10">
    <h3 className="text-2xl font-semibold text-center mb-6 text-blue-700">For Individuals (B2C)</h3>
    <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="text-center hover:scale-105 transition-transform duration-300">
        <div className="text-blue-600 text-4xl mb-4">📈</div>
        <h4 className="text-xl font-semibold mb-2">Live Currency Rate Tracking</h4>
        <p>Monitor real-time exchange rates across providers to get the best value for your personal transactions.</p>
      </div>
      <div className="text-center hover:scale-105 transition-transform duration-300">
        <div className="text-blue-600 text-4xl mb-4">💸</div>
        <h4 className="text-xl font-semibold mb-2">Multi-Currency Budgeting</h4>
        <p>Track and manage your expenses in multiple currencies with automated insights and controls.</p>
      </div>
      <div className="text-center hover:scale-105 transition-transform duration-300">
        <div className="text-blue-600 text-4xl mb-4">🔔</div>
        <h4 className="text-xl font-semibold mb-2">Smart Alerts</h4>
        <p>Get notified when favorable exchange rates or better remittance options are available.</p>
      </div>
      <div className="text-center hover:scale-105 transition-transform duration-300">
        <div className="text-blue-600 text-4xl mb-4">📊</div>
        <h4 className="text-xl font-semibold mb-2">Personal Finance Insights</h4>
        <p>Understand your global spending habits with easy-to-read breakdowns and insights.</p>
      </div>
    </div>
  </div>

  {/* B2B Section */}
  <div>
    <h3 className="text-2xl font-semibold text-center mb-6 text-green-700">For Businesses (B2B)</h3>
    <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="text-center hover:scale-105 transition-transform duration-300">
        <div className="text-green-600 text-4xl mb-4">💼</div>
        <h4 className="text-xl font-semibold mb-2">Expense Management</h4>
        <p>Handle multi-currency transactions and global expenses with real-time oversight and automation.</p>
      </div>
      <div className="text-center hover:scale-105 transition-transform duration-300">
        <div className="text-green-600 text-4xl mb-4">🌍</div>
        <h4 className="text-xl font-semibold mb-2">Cross-Border Payment Comparison</h4>
        <p>Find the best remittance options to save money on supplier or payroll transactions.</p>
      </div>
      <div className="text-center hover:scale-105 transition-transform duration-300">
        <div className="text-green-600 text-4xl mb-4">📄</div>
        <h4 className="text-xl font-semibold mb-2">Automated Reporting</h4>
        <p>Generate detailed reports on international spending, invoices, and conversion trends.</p>
      </div>
      <div className="text-center hover:scale-105 transition-transform duration-300">
        <div className="text-green-600 text-4xl mb-4">⚙️</div>
        <h4 className="text-xl font-semibold mb-2">Customizable Budgeting Tools</h4>
        <p>Create and adjust multi-currency budgets that align with your business’s unique financial structure.</p>
      </div>
    </div>
  </div>
</section>

       

        {/* Why Choose Us Section */}
        <section
          className="py-16 bg-white dark:bg-gray-800"
          data-aos="fade-right"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
          <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">🌟 Trusted by Thousands</h3>
              <p>Join a growing community of satisfied users worldwide.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">🔒 Secure & Reliable</h3>
              <p>Your data is protected with industry-leading security measures.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">📞 24/7 Support</h3>
              <p>Our team is always here to help you with any issues.</p>
            </div>
          </div>
        </section>

       {/* How It Works Section */}
<section
  className="py-16 bg-gray-100 dark:bg-gray-800"
  data-aos="fade-left"
>
  <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
  <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
    <div>
      <div className="text-blue-600 text-4xl mb-4">1️⃣</div>
      <h3 className="text-xl font-semibold mb-2">Sign Up & Connect Accounts</h3>
      <p>
        Whether you're an individual or a business, start by signing up and connecting your accounts to manage multi-currency finances.
      </p>
    </div>
    <div>
      <div className="text-blue-600 text-4xl mb-4">2️⃣</div>
      <h3 className="text-xl font-semibold mb-2">Track, Compare & Automate</h3>
      <p>
        Use Zenya to monitor real-time exchange rates, compare remittance providers, and automate expense tracking.
      </p>
    </div>
    <div>
      <div className="text-blue-600 text-4xl mb-4">3️⃣</div>
      <h3 className="text-xl font-semibold mb-2">Optimize & Save</h3>
      <p>
        Gain insights, save on fees, and make smarter financial decisions with our unified dashboard for individuals and businesses.
      </p>
    </div>
  </div>
</section>


        {/* FAQ Section */}
        <section
          className="py-16 bg-white dark:bg-gray-800"
          data-aos="fade-up"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <Accordion />
        </section>

        {/* Our Team Section */}
        <section
          className="py-16 bg-gray-100 dark:bg-gray-800"
          data-aos="fade-up"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
          <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            {[
              { name: 'Emmanuella Uwudia', role: 'CEO & Founder', img: 'https://via.placeholder.com/150' },
              { name: 'Jesse Murah', role: 'CTO', img: 'https://via.placeholder.com/150' },
            ].map((member, index) => (
              <div
                key={index}
                className="hover:scale-105 transition-transform duration-300"
                data-aos="fade-up"
                data-aos-delay={`${index * 100}`}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-32 h-32 mx-auto rounded-full mb-4 shadow-lg"
                />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Plans Section */}
        <section
          id="pricing"
          className="py-16 bg-gray-100 dark:bg-gray-800"
          data-aos="fade-up"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Pricing Plans</h2>
          <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold mb-4">Basic</h3>
              <p className="text-lg mb-4">Free</p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Subscribe
              </button>
            </div>
            <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold mb-4">Pro</h3>
              <p className="text-lg mb-4">$9.99/month</p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Subscribe
              </button>
            </div>
            <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold mb-4">Enterprise</h3>
              <p className="text-lg mb-4">Custom Pricing</p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Contact Us
              </button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
<section
  className="py-16 bg-white dark:bg-gray-800"
  data-aos="fade-up"
>
  <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
  <div className="max-w-screen-lg mx-auto">
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {[
        {
          text: "Zenya helped us centralize all our multi-currency expenses. The dashboard is powerful and super intuitive.",
          name: "Kwame Boateng (Startup Founder)",
        },
        {
          text: "As a freelancer, I love how easy it is to receive payments and track rates. I finally feel in control of my money.",
          name: "Fatima Bello (Freelancer)",
        },
        {
          text: "Our accounting has never been smoother. Zenya lets us automate reconciliations and avoid costly FX mistakes.",
          name: "Samuel Mensah (Finance Lead, SME)",
        },
        {
          text: "I used to jump between apps just to check exchange rates. Zenya brings everything together in one place.",
          name: "Lilian Obeng (Remote Worker)",
        },
        {
          text: "Their analytics and automation tools saved us hours every month. Highly recommend for small business owners!",
          name: "Joseph Ndlovu (Retail Manager)",
        },
        {
          text: "No more late-night rate comparisons. Zenya alerts me when rates are best. I’ve saved so much since switching.",
          name: "Amaka Eze (International Student)",
        },
        {
          text: "Zenya simplified our cross-border payments. Our global team is now paid faster and cheaper.",
          name: "Tunde Alabi (HR at TechHub Africa)",
        },
        {
          text: "Beautiful interface, real-time tracking, and incredible customer support. I’m impressed.",
          name: "Nana Yaa Osei (E-commerce Seller)",
        },
      ].map((testimonial, index) => (
        <SwiperSlide key={index}>
          <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md text-center">
            <p className="mb-4">{`"${testimonial.text}"`}</p>
            <h3 className="text-lg font-semibold">{`- ${testimonial.name}`}</h3>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</section>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-16 bg-white dark:bg-gray-800"
          data-aos="fade-up"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
          <form className="max-w-screen-md mx-auto">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </section>

        {/* Call-to-Action Section */}
        <section
          className="py-16 bg-gray-100 dark:bg-gray-800 text-center"
          data-aos="fade-up"
        >
          <div>
            <h2 className="text-3xl font-bold mb-4">Start Saving Money Today!</h2>
            <div className="space-x-4">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                Sign Up for Free
              </button>
              <button className="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300">
                View Dashboard
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Homepage;
