/* eslint-disable react/prop-types */
export default function Card({
  img,
  title,
  desc,
  price,
  addOrderToCart,
  isLoading,
}) {
  const handleSubmit = () => {
    let url = title;
    if (title === "mie ayam") {
      url = "mieAyam";
    } else if (title === "ayam bakar") {
      url = "ayamBakar";
    }

    addOrderToCart({ title, url, price, qty: 1 });
  };
  return (
    <div className="flex flex-col w-full blackShadow rounded-xl p-5 items-center gap-2 hover:scale-105 transition-all duration-200">
      <img
        src={`/assets/images/menu/${img}`}
        alt=""
        className="w-full h-full max-w-[12rem] max-h-[12rem]"
      />
      <h1 className="font-semibold text-2xl capitalize text-center">{title}</h1>
      <p className="text-center leading-[20px] text-gray-700 ">{desc}</p>
      <h1 className="font-bold text-xl text-center">
        Rp
        {Intl.NumberFormat("id-ID").format(price)}
      </h1>
      <button
        disabled={isLoading}
        onClick={handleSubmit}
        className="bg-green-500 text-white w-full py-2 rounded-xl hover:bg-green-600 cursor-pointer transition-colors duration-200"
      >
        Tambahkan
      </button>
    </div>
  );
}
