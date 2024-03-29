import React from "react";

const Contact = ({ isLoggedIn }) => {
  return (
    <div>
      <h2>Contact</h2>
      <p>Contact us for any inquiries.</p>

      {isLoggedIn && (
        <>
          <h3>Additional Information for Logged-In Users</h3>
          <p>This information is only visible to logged-in users.</p>
        </>
      )}
    </div>
  );
};

export default Contact;
