import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div
      style={{
        backgroundColor: "#17151F",
        textAlign: "center",
        padding: "20px",
      }}
      className='p-0 m-0'
    >
      <Image
        src='https://www.panteon.games/wp-content/uploads/2022/06/1661xlogo.png'
        alt='Arkus Nexus Logo'
        style={{
          width: "200px",
          height: "auto",
        }}
        className='py-4'
      />
    </div>
  );
};

export default Header;
