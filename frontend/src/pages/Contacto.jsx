import React from "react";

const Contacto = ({ isLoggedIn }) => {
  return (
    <div>
      <h2>Contacto</h2>
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

export default Contacto;
