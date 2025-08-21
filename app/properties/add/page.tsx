import PropertyAddForm from "@/components/PropertyAddForm";
export const metadata = {
  title: "LeaseEase | Add property ",
};

const PropertyAddPage = () => {
  return (
    <section className="">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <PropertyAddForm />
        </div>
      </div>
    </section>
  );
};
export default PropertyAddPage;
