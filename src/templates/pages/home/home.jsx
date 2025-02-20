import { useRef, useState } from "react";
import useWindowWidth from "../../../services/hooks/windowWidth";
import Card from "../../components/card/card";
import Navbar from "../../components/navbar/navbar";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../services/database/firebase";
import { toast } from "sonner";

export default function Home() {
  const windowWidth = useWindowWidth();
  const menu = useRef(null);
  const about = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const addOrderToCart = (data) => {
    setIsLoading(true);
    try {
      toast.promise(
        async () => {
          const ordersRef = collection(db, "orders");
          const q = query(ordersRef, where("title", "==", data.title));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const orderDoc = querySnapshot.docs[0];
            const existingData = orderDoc.data();
            await updateDoc(doc(db, "orders", orderDoc.id), {
              qty: existingData.qty + 1,
            });
            return;
          }
          await addDoc(ordersRef, data);
        },
        {
          loading: "Menambahkan Pesanan...",
          success: "Pesanan Berhasil Ditambahkan",
          error: "Ups Terjadi Kesalahan",
        }
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };
  return (
    <>
      <Navbar refMenu={menu} refAbout={about}></Navbar>
      <div className="w-full h-full flex justify-center">
        <section className="mt-20 w-full max-w-4xl mx-4">
          {windowWidth >= 510 ? (
            <div className="flex justify-around items-center">
              <div className="w-1/2">
                <h1 className="font-bold text-3xl">{`Everything Feels Better After You're Full`}</h1>
                <p className="text-lg">
                  Manjakan perutmu dengan aneka makanan dan minuman di Warung
                  Jujugan
                </p>
              </div>
              <div className="text-green-500 font-bold text-5xl">
                <h1>Warung</h1>
                <h1>Jujugan</h1>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex justify-around items-center gap-3">
                <div className="w-1/2">
                  <h1 className="font-bold text-3xl">{`Everything Feels Better After You're Full`}</h1>
                </div>
                <div className="text-green-500 font-bold text-5xl">
                  <h1>Warung</h1>
                  <h1>Jujugan</h1>
                </div>
              </div>
              <p className="text-lg">
                Manjakan perutmu dengan aneka makanan dan minuman di Warung
                Jujugan
              </p>
            </div>
          )}

          <div className="flex flex-col items-center justify-center relative mt-10">
            <div className="flex flex-col items-center" ref={menu}>
              <h1 className="font-bold text-2xl">Check Out</h1>
              <h1 className="font-bold text-4xl -mt-2 italic text-green-500">
                Menu
              </h1>
            </div>
          </div>
          {/* line makanan */}
          <div className="flex flex-col items-center justify-center mt-10">
            <div className="flex w-full items-center justify-center gap-3">
              <span className="w-full h-[6px] bg-green-500 rounded-full"></span>
              <h1 className="font-semibold text-xl">Makanan</h1>
              <span className="w-full h-[6px] bg-green-500 rounded-full"></span>
            </div>
          </div>
          {/* makanan */}
          <div
            className={`grid ${
              windowWidth <= 700 ? "grid-cols-2 " : "grid-cols-3 "
            } gap-5 justify-center mt-4`}
          >
            <Card
              img={"mieAyam.png"}
              title={"mie ayam"}
              desc={"Dibuat dengan Mie yang berkualitas"}
              price={15000}
              addOrderToCart={addOrderToCart}
              isLoading={isLoading}
            />
            <Card
              img={"soto.png"}
              title={"soto"}
              desc={"Dibuat dengan Kuah yang berkualitas"}
              price={10000}
              addOrderToCart={addOrderToCart}
              isLoading={isLoading}
            />
            <Card
              img={"ayamBakar.png"}
              title={"ayam bakar"}
              desc={"Dibuat dengan Ayam yang berkualitas"}
              price={12000}
              addOrderToCart={addOrderToCart}
              isLoading={isLoading}
            />
          </div>
          {/* line minuman */}
          <div className="flex flex-col items-center justify-center mt-10">
            <div className="flex w-full items-center justify-center gap-3">
              <span className="w-full h-[6px] bg-green-500 rounded-full"></span>
              <h1 className="font-semibold text-xl">Minuman</h1>
              <span className="w-full h-[6px] bg-green-500 rounded-full"></span>
            </div>
          </div>
          {/* minuman */}
          <div
            className={`grid ${
              windowWidth <= 700 ? "grid-cols-2 " : "grid-cols-3 "
            } gap-5 justify-center mt-4`}
          >
            <Card
              img={"teh.png"}
              title={"teh"}
              desc={"menggunakan teh yang berkualitas"}
              price={4000}
              addOrderToCart={addOrderToCart}
              isLoading={isLoading}
            />
            <Card
              img={"jeruk.png"}
              title={"jeruk"}
              desc={"menggunakan jeruk yang berkualitas"}
              price={5000}
              addOrderToCart={addOrderToCart}
              isLoading={isLoading}
            />
            <Card
              img={"kopi.png"}
              title={"kopi"}
              desc={"menggunakan kopi yang berkualitas"}
              price={5000}
              addOrderToCart={addOrderToCart}
              isLoading={isLoading}
            />
          </div>
          {/* About Us */}
          <div
            ref={about}
            className="flex flex-col items-center justify-center relative mt-10"
          >
            <div className="flex flex-col items-center">
              <h1 className="font-bold text-2xl">About Us</h1>
              <h1 className="font-bold text-4xl -mt-2 italic text-green-500">
                Our Story
              </h1>
              <div className="flex flex-col gap-3 mt-5 w-full max-w-3xl">
                <p className="text-center">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed
                  nostrum molestias facere impedit ipsum, voluptatem at delectus
                  eos blanditiis laborum, ea reiciendis alias nisi vel
                  temporibus cum facilis ipsa harum! Lorem ipsum dolor, sit amet
                  consectetur adipisicing elit. Illo voluptates totam corporis
                  aut
                </p>
                <p className="text-center">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed
                  nostrum molestias facere impedit ipsum, voluptatem at delectus
                  eos blanditiis laborum, ea reiciendis alias nisi vel
                  temporibus cum facilis ipsa harum!
                </p>
              </div>
            </div>
          </div>
          {/* footer */}
          <div className="w-full flex flex-col items-center justify-center mt-10 py-5 text-center">
            <h1>
              Dibuat Dengan Sepenuh Hati ❤️ Oleh{" "}
              <a
                href="https://alexanderfarrel.vercel.app"
                className="text-blue-500 font-bold"
              >
                Alexander Chiko
              </a>
            </h1>
          </div>
        </section>
      </div>
    </>
  );
}
