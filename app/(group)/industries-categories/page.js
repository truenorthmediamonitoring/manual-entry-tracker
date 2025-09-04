
import { getServerSession } from "next-auth"
import userAccess from "@/app/lib/getUserAccess"
import AddIndustryModal from "@/app/ui/addindustrymodal";
import AddCategoryModal from "@/app/ui/addcategorymodal";
import getAllIndustries from "@/app/lib/getIndustries";
import getAllCategories from "@/app/lib/getCategories";
import IndustriesTable from "@/app/ui/industriestable";
import CategoriesTable from "@/app/ui/categoriestable";
import UnauthorizedAccess from "@/app/ui/unauthorizedaccess";
import getAllVariants from "@/app/lib/getVariants";

export default async function IndustriesCategories() {
    const session = await getServerSession()
    const useraccess = await userAccess(session.user.email);
    console.log(useraccess);

    const industries = await getAllIndustries();
    const categories = await getAllCategories();
    const variants = await getAllVariants();


    // Convert data to a plain object
    const Industries = JSON.parse(JSON.stringify(industries));
    const Categories = JSON.parse(JSON.stringify(categories));
    const Variants = JSON.parse(JSON.stringify(variants));

    return (
        <>
            <div className="py-6 md:pt-24 px-4 md:px-10 h-screen rounded-lg bg-white/70 shadow-sm overflow-scroll">
                {useraccess !== "Admin" && (
                    <UnauthorizedAccess />
                )}
                {useraccess === "Admin" && (
                    <>
                        <div className="mb-10">
                            <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
                                <div>
                                    <h1 className=" text-3xl text-cyan-950 font-notosans font-bold ">Industries & Categories</h1>
                                    <span className="label-text text-cyan-950">Add<span className=" font-medium text-cyan-950">, View all </span> or <span className="font-medium text-red-900">Delete Industries or Categories </span>here.</span>
                                </div>
                                <div className="flex flex-wrap justify-end items-start gap-2">
                                    <AddIndustryModal Variants={Variants} />
                                    <AddCategoryModal Variants={Variants} />
                                </div>
                            </div>
                        </div>
                        <div className=" flex justify-between items-start gap-8 flex-wrap">
                            <IndustriesTable Variants={Variants} Industries={Industries} />
                            <CategoriesTable Variants={Variants} Categories={Categories} />
                        </div>
                    </>
                )}
            </div>

        </>
    )
}