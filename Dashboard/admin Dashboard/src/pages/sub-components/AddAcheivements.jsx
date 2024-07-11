import {
    addNewAcheivement,
    clearAllAcheivementErrors,
    getAllAcheivements,
    resetAcheivementSlice
  } from "@/store/slices/acheivementslice";
  import React, { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { toast } from "react-toastify";
  import { Button } from "@/components/ui/button";
  import SpecialLoadingButton from "./SpecialLoadingButton";
  
  const AddAcheivements = () => {
    const [title, setTitle] = useState("");

    const { loading, message, error } = useSelector((state) => state.acheivement);
    const dispatch = useDispatch();
    const handleAddNewSkill = (e) => {
      const formData = new FormData();
      formData.append("title", title);
      
      dispatch(addNewAcheivement(formData));
    };
  
    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch(clearAllAcheivementErrors());
      }
      if (message) {
        toast.success(message);
        dispatch(resetAcheivementSlice());
        dispatch(getAllAcheivements());
      }
    }, [dispatch, loading, error]);
  
    return (
      <>
        <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
          <form
            className="w-[100%] px-5 md:w-[650px]"
            onSubmit={handleAddNewSkill}
          >
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="font-semibold leading-7 text-gray-900 text-3xl text-center">
                  ADD A NEW ACHEIVEMENT
                </h2>
                <div className="mt-10 flex flex-col gap-5">
                  <div className="w-full sm:col-span-4">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Title
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                        <input
                          type="text"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
  
                </div>
              </div>
            </div>
  
            <div className="mt-6 flex items-center justify-end gap-x-6">
              {!loading ? (
                <Button
                  type="submit"
                  onClick={() => handleAddNewSkill()}
                  className="w-full"
                >
                  Add Acheivement
                </Button>
              ) : (
                 <SpecialLoadingButton content={"Adding New Acheivement"} />
              )}
            </div>
          </form>
        </div>
      </>
    );
  };
  
  export default AddAcheivements;