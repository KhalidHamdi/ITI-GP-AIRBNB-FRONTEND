import React from "react";
import { useNavigate } from "react-router-dom";

const TermsPage = () => {
  const navigate = useNavigate(); 

  return (
    <main className="container py-4">
      <h1 className="mb-4">Terms and Conditions</h1>

      <section className="mb-5">
        <h2>Cancellation Policy</h2>
        <p>
          You may cancel your reservation up to <strong>24 hours before the start of your stay</strong> for a full refund. 
          Cancellations made within 24 hours of the start date will not be refunded, except in special circumstances.
        </p>
        <p>
          If your reservation is <strong>paid</strong> and the cancellation is requested less than 24 hours before the check-in 
          time, <strong>you will not be eligible for a refund</strong>.
        </p>
        <p>
          Please note that each property may have its own specific cancellation terms, so we encourage you to check the property 
          listing details before making a reservation.
        </p>
      </section>

      <section className="mb-5">
        <h2>Property Usage Guidelines</h2>
        <p>
          When staying at a property, you are expected to treat the space with respect and adhere to the house rules provided by 
          the host. Any damages or violations of house rules may result in additional fees or penalties.
        </p>
      </section>

      <section className="mb-5">
        <h2>Payment Terms</h2>
        <p>
          All payments for reservations are due upon booking. Payments can be made via credit card, debit card, or other 
          authorized payment methods. If you experience any issues with your payment, please contact us immediately.
        </p>
      </section>

      <section className="mb-5">
        <h2>Guest Responsibilities</h2>
        <p>
          As a guest, you are responsible for maintaining the cleanliness of the property during your stay. You should report 
          any damages or issues to the host immediately. Failure to do so may result in additional charges.
        </p>
      </section>

      <section className="mb-5">
        <h2>Host Responsibilities</h2>
        <p>
          Hosts are responsible for ensuring that the property is clean, safe, and as described in the listing. If a host fails 
          to meet these responsibilities, guests may be eligible for a refund or relocation, depending on the situation.
        </p>
      </section>

      <section className="mb-5">
        <h2>Contact Us</h2>
        <p>
          If you have any questions about these terms or need assistance with your reservation, feel free to <strong>contact 
          our support team</strong>. We are here to help you!
        </p>
        <button
            className="btn btn-primary w-100"
            onClick={() => navigate("/contact-support")} 
          >
            Contact Support
        </button>
      </section>
    </main>
  );
};

export default TermsPage;
