import DefaultLayout from "../../layout/defaultLayout";

export default function NotFound() {
  return (
    <DefaultLayout>
      <section className="w-full h-screen flex justify-center items-center">
        <h1 className="font-bold text-3xl text-center">
          404 Halaman Tidak Ditemukan 😢
        </h1>
      </section>
    </DefaultLayout>
  );
}
