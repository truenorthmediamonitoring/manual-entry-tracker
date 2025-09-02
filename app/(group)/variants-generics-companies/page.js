import { getServerSession } from "next-auth"
import userAccess from "@/app/lib/getUserAccess"
import UnauthorizedAccess from "@/app/ui/unauthorizedaccess";
import AddCompanyModal from "@/app/ui/addcompanymodal";
import CompaniesTable from "@/app/ui/companiestable";
import AddBrandModal from "@/app/ui/addbrandmodal";
import getCompanies from "@/app/lib/getCompanies";
import getAllVariants from "@/app/lib/getVariants";
import getAllBrands from "@/app/lib/getBrands";
import BrandsTable from "@/app/ui/brandstable";
import AddBrandVariantModal from "@/app/ui/addvariantmodal";
import VariantsTable from "@/app/ui/variantstable";


export default async function Company() {
    const session = await getServerSession()
    const useraccess = await userAccess(session.user.email);

    const variants = await getAllVariants();
    const companies = await getCompanies();
    const brands = await getAllBrands();

    // Convert data to a plain object
    const Variants = JSON.parse(JSON.stringify(variants));
    const Companies = JSON.parse(JSON.stringify(companies));
    const Brands = JSON.parse(JSON.stringify(brands));

    return (
        <>
            <div className="py-6 md:pt-24 px-4 md:px-10 h-screen rounded-lg bg-white shadow-sm overflow-scroll">
                {useraccess !== "Admin" && (
                    <UnauthorizedAccess />
                )}

                {useraccess === "Admin" && (
                    <>
                        <div className="mb-10">
                            <div className="flex flex-col md:flex-row gap-2 justify-between items-start">
                                <div className=" max-w-lg">
                                    <h1 className=" text-3xl text-cyan-950 font-notosans font-bold">Variants, Brands & Companies</h1>
                                    <span className="label-text text-cyan-950 text-sm">Add <span className=" font-medium text-cyan-950">Variants, Brands or Companies. View all Variants, Brands or Companies.</span> or <span className="font-medium text-red-700">Delete Variants, Brands or Companies. </span>here.</span>
                                </div>
                                <div className="flex flex-wrap justify-end items-start gap-2">
                                    <AddBrandVariantModal  />
                                    <AddBrandModal Variants={Variants} />
                                    <AddCompanyModal Variants={Variants}/>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-5 flex-wrap">
                            <VariantsTable Variants={Variants} />
                            <BrandsTable Variants={Variants} Brands={Brands} />
                            <CompaniesTable Variants={Variants} Companies={Companies} />
                        </div>
                    </>
                )}
            </div>
        </>
    )

}