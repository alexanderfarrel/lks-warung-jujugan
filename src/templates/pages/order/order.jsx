import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import useWindowWidth from "../../../services/hooks/windowWidth";
import DefaultLayout from "../../layout/defaultLayout";
import { db } from "../../../services/database/firebase";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Order() {
  const windowWidth = useWindowWidth();
  const Navigate = useNavigate();
  const [data, setData] = useState([]);
  const [priceTotal, setPriceTotal] = useState(0);
  const [isFocus, setIsFocus] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    try {
      const ordersRef = collection(db, "orders");
      const querySnapshot = await getDocs(ordersRef);

      const orders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const total = orders.reduce(
        (total, item) => total + (item.price || 0) * (item.qty || 0),
        0
      );

      setData(orders);
      setPriceTotal(total);
    } catch (error) {
      console.error("Error getting orders: ", error);
      toast.error("Gagal mengambil data pesanan");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleInputChange = (i) => {
    setIsFocus({ [i]: true });
  };

  const handleChangeData = async (data, newQty) => {
    if (isLoading) return;

    setIsFocus({});

    if (newQty <= 0) {
      toast.error("Jumlah tidak boleh kurang dari 1");
      setTimeout(() => window.location.reload(), 1000);

      return;
    }

    setIsLoading(true);
    try {
      toast.promise(
        async () => {
          const q = query(
            collection(db, "orders"),
            where("title", "==", data.title)
          );

          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            querySnapshot.forEach(async (docSnap) => {
              const orderData = docSnap.data();

              if (orderData.qty === newQty) {
                console.log("Qty sama, tidak perlu update.");
                setIsLoading(false);
                return;
              }

              const orderRef = doc(db, "orders", docSnap.id);
              await updateDoc(orderRef, { qty: newQty });
              getData();
              setIsLoading(false);
            });
          } else {
            console.log("Data tidak ditemukan.");
            setIsLoading(false);
          }
        },
        {
          loading: "Mengubah Jumlah Pesanan...",
          success: "Jumlah Pesanan Berhasil Diperbarui",
          error: "upss terjadi kesalahan",
        }
      );
    } catch (error) {
      console.error("Terjadi kesalahan saat memperbarui data:", error);
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setIsFocus({});
    setIsLoading(true);
    try {
      toast.promise(
        async () => {
          const orderRef = doc(db, "orders", id);
          await deleteDoc(orderRef);
          toast.success("Pesanan berhasil dihapus");
          getData();
          setIsLoading(false);
        },
        {
          loading: "Menghapus Pesanan...",
          success: "Pesanan Berhasil Dihapus",
          error: "upss terjadi kesalahan",
        }
      );
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const handleSubmitOrder = async () => {
    setIsFocus({});
    setIsLoading(true);
    try {
      toast.promise(
        async () => {
          const ordersRef = collection(db, "orders");
          const querySnapshot = await getDocs(ordersRef);

          const orders = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          if (orders.length === 0) {
            console.log("Tidak ada data untuk dipindahkan.");
            return;
          }

          const notificationsRef = collection(db, "notifications");
          await addDoc(notificationsRef, {
            orders: orders,
            status: "sedang dibuat",
            priceTotal,
            timestamp: new Date(),
          });

          for (const order of orders) {
            const orderDocRef = doc(db, "orders", order.id);
            await deleteDoc(orderDocRef);
          }
          Navigate("/notification");
        },
        {
          loading: "Membuat Pesanan...",
          success: "Pesanan Berhasil Dihapus",
          error: "upss terjadi kesalahan",
        }
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <DefaultLayout>
      <section className="max-w-4xl mx-auto mt-20 w-full px-4">
        <main className={`flex gap-4 ${windowWidth < 750 && "pb-28"}`}>
          {/* Data left */}
          <div className="flex-4/5 flex flex-col gap-1 blackShadow rounded-xl p-2">
            {data.length > 0 ? (
              data.map((order, i) => (
                <div
                  key={order.id}
                  className={`w-full flex gap-3 ${
                    i % 2 === 0 ? "bg-gray-200" : ""
                  } p-3 rounded-xl`}
                >
                  <img
                    src={`/assets/images/menu/${order.url}.png`}
                    alt=""
                    className="w-full h-full max-w-[8rem] max-h-[8rem]"
                  />
                  <div className="flex flex-col my-auto gap-7 w-full h-full">
                    <div className="flex justify-between">
                      <h1 className="font-bold text-md capitalize">
                        {order.title}
                      </h1>
                      <p>Rp {Intl.NumberFormat("id-ID").format(order.price)}</p>
                    </div>
                    <div className="flex justify-end gap-3">
                      <button
                        disabled={isLoading}
                        onClick={() => handleDelete(order.id)}
                        className="bg-red-500 p-2 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 cursor-pointer"
                      >
                        <img
                          src="/assets/images/trash.png"
                          alt="icon sampah"
                          className="w-[1.5rem] h-[1.5rem]"
                        />
                      </button>
                      <span className="flex gap-2 items-center rounded-lg">
                        <input
                          id={order.id}
                          type="number"
                          defaultValue={order.qty}
                          onClick={() => handleInputChange(i)}
                          className="border rounded-lg w-[2rem] h-full text-center"
                        />
                        {isFocus[i] && (
                          <button
                            disabled={isLoading}
                            onClick={() => {
                              const inputElement = document.getElementById(
                                order.id
                              );
                              if (inputElement) {
                                handleChangeData(order, inputElement.value);
                              } else {
                                console.error(
                                  "Input element tidak ditemukan untuk ID:",
                                  order.id
                                );
                              }
                            }}
                            className="bg-blue-500 p-2 px-3 rounded-lg text-white cursor-pointer hover:bg-blue-600 transition-colors duration-200"
                          >
                            ✓
                          </button>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <h1>Tidak Ada Pesanan</h1>
              </div>
            )}
          </div>
          {/* Total Right */}
          {windowWidth >= 750 ? (
            <div className="flex-1/5 blackShadow p-2 rounded-xl flex flex-col self-start">
              <h1 className="font-bold text-md">Total Pesanan</h1>
              <div className="flex justify-between border-b py-2">
                <p>Total</p>
                <p>Rp {Intl.NumberFormat("id-ID").format(priceTotal)}</p>
              </div>
              <button
                disabled={isLoading}
                className="bg-green-500 text-white w-full mt-3 py-2 rounded-xl hover:bg-green-600 cursor-pointer transition-colors duration-200"
                onClick={handleSubmitOrder}
              >
                Pesan Sekarang
              </button>
            </div>
          ) : (
            <div className="fixed bottom-0 left-0 right-0 flex justify-between px-4 py-4 blackShadow rounded-t-xl bg-white">
              <div className="flex flex-col">
                <h1 className="font-bold text-md">Total Pesanan</h1>
                <p>Rp {Intl.NumberFormat("id-ID").format(priceTotal)}</p>
              </div>
              <button
                disabled={isLoading}
                className="bg-green-500 text-white px-3 rounded-xl hover:bg-green-600 cursor-pointer transition-colors duration-200 font-semibold"
                onClick={handleSubmitOrder}
              >
                Pesan Sekarang
              </button>
            </div>
          )}
        </main>
      </section>
    </DefaultLayout>
  );
}
