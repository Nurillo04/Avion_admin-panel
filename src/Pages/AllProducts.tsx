import useStoreProducts from "../App/ProductsSet";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { Modal } from "flowbite-react";
import axios from "axios";
import SaidBar from "../components/SaidBar";

const AllProducts = () => {
  let {
    allProducts,
    getProducts,
    loading,
    v,
    DaleteProduct,
    GetIdProduct,
    idsProduct,
    EdidProduct,
  } = useStoreProducts();
  let [a, setA] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  let [val, setval] = useState<{
    id: string;
    name: string;
    price: string;
    image: string;
    description: string;
    category: string;
  }>({ id: "", name: "", price: "", image: "", description: "", category: "" });

  const [searchProduct, setSearchProduct] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<string>("all");

  let daletid = (ii: number): void => {
    if (confirm("Are you sure you want to delete this product?")) {
      DaleteProduct(ii);
      setA(a + 100);
      getProducts();
    }
  };

  let func = async () => {
    getProducts();
  };

  let EditedValue = async (id: number) => {
    let a = await axios.get(
      `https://65f8832ddf151452460f92d3.mockapi.io/products/${id}`
    );
    let b = await a.data;
    setval(b);
    setOpenModal(true);
  };

  let SavedPruduct = (id: any) => {
    EdidProduct(id);
    getProducts();
    setA(a + 1000);
    setOpenModal(false);
  };

  useEffect(() => {
    getProducts();
    func();
  }, [a]);

  return (
    <div>
      <Navbar />
      <SaidBar />

      <div className="flex mt-24 m-8 justify-between dark:bg-[#252e45]">
        <p className="text-3xl dark:text-slate-200 ">Products</p>
        <input
          className="w-96 p-2 outline-none rounded-lg"
          type="search"
          placeholder="Search product..."
          value={searchProduct}
          onChange={(e) => setSearchProduct(e.target.value)}
        />
        <select
          className="rounded-lg outline-none p-2 "
          name="select"
          id="select"
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
        >
          <option value="all">All</option>
          <option value="Furniture">Furniture</option>
          <option value="Homeware">Homeware</option>
          <option value="Sofas">Sofas</option>
          <option value="Light fittings">Light fittings</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>

      {loading ? (
        <div className="w-[1000px] pl-5 h-dvh flex flex-col justify-center items-center">
          <div className="hourglassBackground ">
            <div className="hourglassContainer">
              <div className="hourglassCurves"></div>
              <div className="hourglassCapTop"></div>
              <div className="hourglassGlassTop"></div>
              <div className="hourglassSand"></div>
              <div className="hourglassSandStream"></div>
              <div className="hourglassCapBottom"></div>
              <div className="hourglassGlass"></div>
            </div>
          </div>
        </div>
      ) : (
        <section className=" pl-20 w-full  mt-[70px]">
          <div className="container">
            <div className="w-full flex flex-col items-center gap-y-[50px]">
              {allProducts
                .filter((product) => {
                  if (
                    (selectedGroup === "all" ||
                      product.category === selectedGroup) &&
                    (searchProduct === "" ||
                      product.name
                        .toLowerCase()
                        .includes(searchProduct.toLowerCase()))
                  ) {
                    return true;
                  }
                  return false;
                })
                .map(
                  (
                    e: {
                      image: string;
                      name: string;
                      price: number;
                      category: string;
                      description: string;
                      id: number;
                    },
                    i
                  ) => (
                    <div
                      className="flex gap-y-[10px] border-b flex-col md:flex-row md:justify-between w-full lg:items-center  cursor-pointer hover:bg-slate-200 rounded-md p-1"
                      key={i}
                    >
                      <img
                        className="w-[30px] h-[30px] rounded-full lg:w-[50px] lg:h-[50px]"
                        src={e.image}
                        alt="alt"
                      />
                      <p className="text-[12px] md:text-[15px]">
                        <span className="text-blue-600">ProductName-</span>{" "}
                        {e.name}
                      </p>
                      <p className="text-[12px] md:text-[15px]">
                        <span className="text-blue-600">ProductPice-</span> £
                        {e.price}
                      </p>
                      <p className="text-[12px] md:text-[15px]">
                        <span className="text-blue-600">ProductCategory-</span>{" "}
                        {e.category}
                      </p>
                      <Button.Group>
                        <Button onClick={() => EditedValue(e.id)} color="gray">
                          <i className="bx bxs-message-square-edit text-green-500"></i>
                        </Button>
                        <Button onClick={() => daletid(e.id)} color="gray">
                          <i className="bx bxs-trash text-red-600"></i>
                        </Button>
                      </Button.Group>
                    </div>
                  )
                )}
            </div>
          </div>
        </section>
      )}

      {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Edit product</Modal.Header>
        <Modal.Body>
          <form className="space-y-6">
            <div className="flex items-center gap-5">
              <p>previous img</p>
              <img
                className="w-[100px] h-[100px] rounded-lg"
                src={val.image}
                alt="alt"
              />
            </div>
            <input
              className="rounded-sm"
              type="text"
              value={val.name}
              onChange={(e) =>
                setval({
                  name: e.target.value,
                  price: val.price,
                  image: val.image,
                  description: val.description,
                  category: val.category,
                  id: val.id,
                })
              }
            />
            <input
              className="rounded-sm"
              type="text"
              value={val.price}
              onChange={(e) =>
                setval({
                  name: val.name,
                  price: e.target.value,
                  image: val.image,
                  description: val.description,
                  category: val.category,
                  id: val.id,
                })
              }
            />
            <input
              className="rounded-sm"
              type="text"
              value={val.description}
              onChange={(e) =>
                setval({
                  name: val.name,
                  price: val.price,
                  image: val.image,
                  description: e.target.value,
                  category: val.category,
                  id: val.id,
                })
              }
            />
            <input
              className="rounded-sm"
              type="text"
              value={val.category}
              onChange={(e) =>
                setval({
                  name: val.name,
                  price: val.price,
                  image: val.image,
                  description: val.description,
                  category: e.target.value,
                  id: val.id,
                })
              }
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => SavedPruduct(val)}>Save</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AllProducts;
