export default function Footer() {
  return (
    <>
      <footer className="bg-gray-800 text-white py-8 mt-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-96 text-center md:text-left">
            {/* About Us */}
            <div className="ml-14">
              <h3 className="text-lg font-semibold ml mb-4">About Us</h3>
              <p className="text-gray-400">We bring flavors from around the world to your plate. Explore our diverse menu and experience culinary excellence.</p>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-400">kampung durian runtuh</p>
              <p className="text-gray-400">Konohagakure, st.12</p>
              <p className="text-gray-400">Email: info@flavoroftheworld.com</p>
              <p className="text-gray-400">Phone: (123) 456-7890</p>
            </div>
          </div>

          {/* Garis Bawah dan Copyright */}
          <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500">© 2024 Flavor of the World. All rights reserved.</div>
        </div>
      </footer>
    </>
  );
}
