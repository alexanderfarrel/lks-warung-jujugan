/* eslint-disable react/prop-types */
import Navbar from "../components/navbar/navbar";

export default function DefaultLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
