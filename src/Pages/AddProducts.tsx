// import { getStorage, ref } from "firebase/storage";
import { Button, ButtonGroup, FileInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Label, TextInput, Textarea, Select } from "flowbite-react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import useStoreProducts from "../App/ProductsSet";
import React, { ChangeEvent } from "react";

import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";
import { NavLink } from "react-router-dom";

const AddProducts = () => {
  let [torf, setTorf] = useState(false);

  let { allProducts, waites, setProducts, getProducts }: any =
    useStoreProducts();

  let [val, setVal] = useState<{
    name: string;
    price: string;
    image: string;
    description: string;
    category: string;
  }>({
    name: "The Dandy Chair",
    price: "250",
    image: "",
    description:
      "A timeless design, with premium materials features as one of our most popular and iconic pieces. The dandy chair is perfect for any stylish living space with beech legs and lambskin leather upholstery.",
    category: "Homeware",
  });

  let [err, setErr] = useState(true);

  const [image, setImage] = useState(null);

  const [product, setProduct] = useState<{ image: string | null }>({
    image: "",
  });

  const handleUploadImage = async (e: any) => {
    const image = e.target.files[0];
    setImage(e.target.files[0]);
    try {
      //   if (!image) {
      //     setImageUploadError("Please select an image");
      //     return;
      //   }
      //   setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + image.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //   setImageUploadProgess(progress.toFixed(0));
        },
        () => {
          //   setImageUploadError("Image upload failed");
          //   setImageUploadProgess(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // setImageUploadProgess(null);
            // setImageUploadError(null);
            setProduct({ ...product, image: downloadURL });
            setVal({ ...val, image: downloadURL });
          });
        }
      );
    } catch (error) {
      //   setImageUploadError("Image upload failed");
      //   setImageUploadProgess(null);
      console.log(error);
    }
  };

  let submitValues = async () => {
    if (
      val.category !== "" &&
      val.description !== "" &&
      val.image !== "" &&
      val.name !== "" &&
      val.image !== ""
    ) {
      setProducts(val);
      setErr(true);
      setVal({ name: "", price: "", image: "", description: "", category: "" });
      product.image = null;
    } else {
      setErr(false);
    }
  };
  return (
    <>
      <form>
        <div className="container mx-auto px-5">
          <div className="">
            <h1 className="text-3xl text-center text-gray-700">Add product</h1>
            <div className="max-w-2xl p-6 mx-auto">
              <label htmlFor="" className="mb-3 block text-xl">
                Product photo
              </label>
              <FileInput onChange={handleUploadImage} />
              <div className="relative">
                {product.image && (
                  <div className="absolute right-[-40px] top-[-40px] flex items-center">
                    <i className="bx bxs-file-png text-[40px] text-yellow-200"></i>
                    <i
                      cl
                      assName="bx bxs-check-circle absolute top-0 right-0 text-green-400"
                    ></i>
                    {/* <p>your img</p>
             <img src={product.image} alt="" className=" w-[100px] h-[60px] rounded-full" /> */}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex max-w-[620px] mx-auto flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="small" value="Product Name" />
              </div>
              <TextInput
                value={val.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setVal({
                    name: e.target.value,
                    price: val.price,
                    image: val.image,
                    description: val.description,
                    category: val.category,
                  })
                }
                id="small"
                type="text"
                sizing="sm"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="base" value="Product Price" />
              </div>
              <TextInput
                value={val.price}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setVal({
                    name: val.name,
                    price: e.target.value,
                    image: val.image,
                    description: val.description,
                    category: val.category,
                  })
                }
                id="base"
                type="number"
                sizing="md"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="comment" value="Description" />
              </div>
              <Textarea
                value={val.description}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setVal({
                    name: val.name,
                    price: val.price,
                    image: val.image,
                    description: e.target.value,
                    category: val.category,
                  })
                }
                id="comment"
                placeholder="Оставить комментарий..."
                required
                rows={4}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="countries" value="Select product category" />
              </div>
              <Select
                value={val.category}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setVal({
                    name: val.name,
                    price: val.price,
                    image: val.image,
                    description: val.description,
                    category: e.target.value,
                  })
                }
                id="countries"
                required
              >
                <option></option>
                {/* <option>all products</option> */}
                <option>Furniture</option>
                <option>Homeware</option>
                <option>Sofas</option>
                <option>Light fittings</option>
                <option>Accessories</option>
              </Select>
            </div>
            <Button onClick={() => submitValues()} label="2">
              Submit
            </Button>
          </div>
        </div>
      </form>
      <div className="fixed top-8 right-0">
        <div className={waites ? "block" : "hidden"}>
          <Toast className="bg-green-300 max-h-[40px]">
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
              <HiCheck className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">data added</div>
            <Toast.Toggle />
          </Toast>
        </div>
        <div className={err ? "hidden" : "block"}>
          <Toast className="bg-red-500 max-h-[40px]">
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
              <HiExclamation className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal text-white">
              The form is not valid
            </div>
            <Toast.Toggle />
          </Toast>
        </div>
      </div>
      <NavLink
        className="fixed top-[20px] left-[10px]"
        to={"/"}
        onMouseOver={() => setTorf(true)}
        onMouseOut={() => setTorf(false)}
      >
        <div
          className={
            torf
              ? " absolute bg-slate-500 top-[50px] left-0 w-[100px] text-white flex justify-center items-center rounded-md"
              : "hidden"
          }
        >
          <p>Go Home</p>
          <i className="bx bxs-up-arrow absolute top-[-10px] left-[30px] text-slate-500"></i>
          <i className="bx bx-run text-yellow-200"></i>
        </div>
        <Button className="">
          <i className="bx bx-log-out-circle"></i>
        </Button>
      </NavLink>
    </>
  );
};

export default AddProducts;
