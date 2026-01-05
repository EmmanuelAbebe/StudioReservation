import { FaMapMarkerAlt } from "react-icons/fa";
import EmailSignUp from "./EmailSignUp";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="container mx-auto text-center my-4 py-5 border-b border-gray-700">
        <EmailSignUp />
      </div>
      <div className="flex my-6">
        <div className="container mx-auto text-center mb-2 flex justify-around">
          <div className="flex flex-col items-start space-y-3">
            <p className="font-bold">Location</p>
            <iframe
              className="mt-2"
              src="https://www.google.com/maps/place/1-23+Main+St,+Queens,+NY+10001/@40.762367,-73.8339715,1078m/data=!3m2!1e3!4b1!4m6!3m5!1s0x89c2600feab8eaf3:0xf2c8bcc288c78f3!8m2!3d40.762363!4d-73.8313912!16s%2Fg%2F11rrqnwm5t?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D"
              width="200"
              height="150"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
            ></iframe>
            <span className="flex flex-col items-start gap-2">
              <a href="/address" className="hover:underline text-xs">
                Get Directions
              </a>
              <p className="inline-flex gap-2 items-center">
                <FaMapMarkerAlt /> 123 Main St, City, Country
              </p>
            </span>
          </div>
          <div className="flex flex-col items-start space-y-3">
            <p className="font-bold text-md">Open hours</p>

            <div className="flex flex-col items-start space-y-1">
              <span className="text-sm flex justify-between gap-5">
                <p>Monday - Friday</p> <p className="font-bold">9am - 6pm</p>
              </span>
              <span className="text-sm flex justify-between gap-5">
                <p>Saturday - Sunday</p> <p className="font-bold">10am - 4pm</p>
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start space-y-3">
            <p className="font-bold">Quick Links</p>
            <div className="flex flex-col items-start space-y-1">
              <a href="/reservation" className="mx-2 hover:underline text-sm">
                Make a Reservation
              </a>
              <a href="/contact" className="mx-2 hover:underline text-sm">
                Contact Us
              </a>
              <a href="/contact" className="mx-2 hover:underline text-sm">
                Our Team
              </a>
              <a href="/contact" className="mx-2 hover:underline text-sm">
                About Us
              </a>
              <a href="/privacy" className="mx-2 hover:underline text-sm">
                Privacy Policy
              </a>
              <a href="/terms" className="mx-2 hover:underline text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto text-start text-xs">
        <p>
          &copy; {new Date().getFullYear()} My Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
