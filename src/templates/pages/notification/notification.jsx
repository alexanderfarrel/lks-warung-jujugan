import { useEffect, useState } from "react";
import DefaultLayout from "../../layout/defaultLayout";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../../services/database/firebase";
import { toast } from "sonner";

export default function Notification() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const ordersRef = collection(db, "notifications");

      // Ambil data dengan urutan timestamp terbaru -> terlama
      const q = query(ordersRef, orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);

      const orders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setData(orders);
    } catch (error) {
      console.error("Error getting orders: ", error);
      toast.error("Gagal mengambil data pesanan");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <DefaultLayout>
      <section className="w-full max-w-4xl mx-auto mt-20 px-4">
        <h1 className="font-bold text-2xl">Status Pesanan</h1>
        <main className="flex flex-col gap-5 mt-5">
          {/* perulangan pesanan*/}
          {data.length > 0 ? (
            data.map((item, i) => {
              const timestamp = item.timestamp;
              const date = new Date(timestamp.seconds * 1000);

              const formattedDate = date
                .toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
                .replace(".", "");

              const formattedTime = date.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              });
              return (
                <div
                  key={item.id}
                  className="w-full h-full bg-gray-200 rounded-xl p-3 px-4 flex flex-col gap-1"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                      <h1 className="font-semibold text-md">Pesanan {i + 1}</h1>
                      <div className="flex gap-2">
                        <p className="text-slate-800 bg-slate-300 rounded-lg px-2 text-sm">
                          {formattedDate}
                        </p>
                        <p className="text-zinc-800 bg-zinc-300 rounded-lg px-2 text-sm">
                          {formattedTime}
                        </p>
                      </div>
                    </div>
                    <h1
                      className={`${
                        item.status == "sedang dibuat"
                          ? "bg-orange-500 text-orange-100"
                          : "bg-green-500 text-green-200"
                      } capitalize px-3 py-[3px] rounded-lg font-semibold text-[12px]`}
                    >
                      {item.status}
                    </h1>
                  </div>
                  <div className="flex w-full">
                    <div className="flex flex-col flex-3/4">
                      {/* perulangan orders */}
                      {item.orders.map((order) => (
                        <div key={order.id} className="flex gap-3">
                          <h1 className="capitalize">
                            {order.qty} {order.title}
                          </h1>
                          <p>
                            Rp {Intl.NumberFormat("id-ID").format(order.price)}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col flex-1/4 border-l-2 pl-4">
                      <h1>Total Belanja</h1>
                      <p className="whitespace-nowrap">
                        Rp {Intl.NumberFormat("id-ID").format(item.priceTotal)}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <>
              <h1 className="text-center text-xl font-bold">
                Tidak Ada Pesanan
              </h1>
            </>
          )}
        </main>
      </section>
    </DefaultLayout>
  );
}
