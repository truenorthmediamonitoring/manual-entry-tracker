import Script from "next/script";
import DashboardFooter from "../ui/dashboardfooter";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SideNavigation from "../ui/sidenav";
import userAccess from "../lib/getUserAccess";
import userCountry from "../lib/getUserCountry";

export default async function Layout({ children }) {
    const session = await getServerSession();
    !session || !session.user ? redirect("/") : null

    const useraccess = await userAccess(session.user.email);
    const usercountry = await userCountry(session.user.email);

    console.log(usercountry);
    console.log(useraccess);
    

    return (
        <>
            <div className="h-screen flex flex-col md:flex-row md:overflow-scroll bg-[url(/backgroundimages/Abstract-White.png)] bg-cover bg-center bg-no-repeat bg-fixed">
                <div className="w-full flex-none md:w-72">
                    <SideNavigation
                        UserAccess={useraccess}
                        UserCountry={usercountry}
                    />
                </div>
                <div className="flex-grow p-1 overflow-y-auto md:p-2">
                    {children}
                    <DashboardFooter />
                </div>
            </div>
            <Script src="https://kit.fontawesome.com/dcd356c426.js" />
        </>
    )
}