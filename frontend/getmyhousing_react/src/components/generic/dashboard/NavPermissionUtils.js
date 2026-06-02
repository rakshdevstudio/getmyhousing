import HomeWorkIcon from "@mui/icons-material/HomeWork";
import { useSelector } from "react-redux";
import PersonIcon from '@mui/icons-material/Person';

export function useMenuItems() {
    const { userData } = useSelector(
        (state) => state.user
    );

    const currentPath = window.location.pathname;
    const userRole = userData?.user?.roles || [];

    const getMenuItemsBasedOnRole = (role) => {
        return [
            // {
            //   text: "Dashboard",
            //   icon:
            //     currentPath === "/dashboard" ? (
            //       <img
            //         src="/media/svg/active-dashboard.svg"
            //         width="18.508px"
            //         height="18.508px"
            //         alt="active"
            //       />
            //     ) : (
            //       <DashboardIcon />
            //     ),
            //   path: "/dashboard",
            // },
            // eg
            {
                text: "Property Listing",
                icon:
                    currentPath === "/post-property" ? (
                        <HomeWorkIcon sx={{ color: "#405189" }} />
                    ) : (
                        <HomeWorkIcon />
                    ),
                path: "/post-property",
            },
            {
                text: "Property Owners",
                icon:
                    currentPath === "/post-property" ? (
                        <PersonIcon sx={{ color: "#405189" }} />
                    ) : (
                        <PersonIcon />
                    ),
                path: "/property-owner",
            },
            {
                text: "Lead Manager",
                icon:
                    currentPath === "/leads-list" ? (
                        <img
                            src="/media/svg/active-lead-manager.svg"
                            width="20.045px"
                            height="18.508px"
                            alt="active"
                        />
                    ) : (
                        <img
                            src="/media/svg/lead-manager.svg"
                            width="20.045px"
                            height="18.508px"
                            alt="lead Manager"
                        />
                    ),
                path: "/leads-list",
            },
            {
                text: "Employee Manager",
                icon:
                    currentPath === "/user-add" ? (
                        <img
                            src="/media/svg/active-employee-manager.svg"
                            width="24.165px"
                            height="24.736px"
                            alt="active"
                        />
                    ) : (
                        <img
                            src="/media/svg/employee-manager.svg"
                            width="24.165px"
                            height="24.736px"
                            alt="employee manager"
                        />
                    ),
                path: "/user-add",
            },
            // {
            //   text: "Package Manager",
            //   icon:
            //     currentPath === "/add-package" ? (
            //       <img
            //         src="/media/svg/package1.svg"
            //         width="20.583px"
            //         height="20.583px"
            //         alt="active"
            //       />
            //     ) : (
            //       <img
            //         src="/media/svg/package1.svg"
            //         width="20.583px"
            //         height="20.583px"
            //         alt="Blog"
            //       />
            //     ),
            //   path: "/add-package",
            // },
            // {
            //   text: "Buy Package",
            //   icon:
            //     currentPath === "/my-packages" ? (
            //       <img
            //         src="/media/svg/package1.svg"
            //         width="17.583px"
            //         height="17.583px"
            //         alt="active"
            //       />
            //     ) : (
            //       <img
            //         src="/media/svg/package1.svg"
            //         width="17.583px"
            //         height="17.583px"
            //         alt="Blog"
            //       />
            //     ),
            //   path: "/my-packages",
            // },
            {
                text: "Blog Manager",
                icon:
                    currentPath === "/add-blog" ? (
                        <img
                            src="/media/svg/active-blog.svg"
                            width="17.583px"
                            height="17.583px"
                            alt="active"
                        />
                    ) : (
                        <img
                            src="/media/svg/blog.svg"
                            width="17.583px"
                            height="17.583px"
                            alt="Blog"
                        />
                    ),
                path: "/add-blog",
            },
            {
                text: "Create Lead",
                icon:
                    currentPath === "/create-lead" ? (
                        <img
                            src="/media/svg/active-add-circle-svgrepo-com.svg"
                            width="22.583px"
                            height="22.583px"
                            alt="active"
                        />
                    ) : (
                        <img
                            src="/media/svg/add-circle-svgrepo-com.svg"
                            width="22.583px"
                            height="22.583px"
                            alt="Create Lead"
                        />
                    ),
                path: "/create-lead",
            },
            {
                text: "Operator",
                icon:
                    currentPath === "/operator-associate-list" ? (
                        <img
                            src="/media/svg/operator.svg"
                            width="22.583px"
                            height="22.583px"
                            alt="active"
                        />
                    ) : (
                        <img
                            src="/media/svg/operator.svg"
                            width="22.583px"
                            height="22.583px"
                            alt="Operator"
                        />
                    ),
                path: "/operator-associate-list",
            },
            {
                text: "Contact Us Data",
                icon:
                    currentPath === "/contact-us-data" ? (
                        <img
                            src="/media/svg/call-icon.svg"
                            width="22.583px"
                            height="22.583px"
                            alt="active"
                        />
                    ) : (
                        <img
                            src="/media/svg/call-icon.svg"
                            width="22.583px"
                            height="22.583px"
                            alt="Contact Us"
                        />
                    ),
                path: "/contact-us-data",
            },
            {
                text: "Blog Verifier",
                icon:
                    currentPath === "/blog-verifier" ? (
                        <img
                            src="/media/svg/active-blog.svg"
                            width="22.583px"
                            height="22.583px"
                            alt="active"
                        />
                    ) : (
                        <img
                            src="/media/svg/blog.svg"
                            width="22.583px"
                            height="22.583px"
                            alt="Blog Verifier"
                        />
                    ),
                path: "/blog-verifier",
            },
            {
                text: "Address Manager",
                icon:
                    currentPath === "/address-manager" ? (
                        <img
                            src="/media/svg/address.svg"
                            width="35.583px"
                            height="35.583px"
                            alt="active"
                        />
                    ) : (
                        <img
                            src="/media/svg/address.svg"
                            width="35.583px"
                            height="35.583px"
                            alt="Address Manager"
                        />
                    ),
                path: "/address-manager",
            },
            // Add more items as needed
        ].filter((item) => {
            switch (true) {
                case role.includes("Admin"):
                    return item.text !== "Operator";
                case role.includes("Associate"):
                    return [
                        "Lead Manager",
                        "Blog Manager",
                        "Property Listing",
                        "Create Lead",
                        "Address Manager",
                        "Property Owners"
                    ].includes(item.text);
                case role.includes("Agent"):
                    return ["Lead Manager", "Property Listing", "Property Owners"].includes(
                        item.text
                    );
                case role.includes("Telecaller"):
                    return [
                        "Lead Manager",
                        "Property Listing",
                        "Contact Us Data",
                        "Create Lead",
                    ].includes(item.text);
                case role.includes("Team Leader"):
                    return ["Lead Manager", "Property Listing", "Create Lead"].includes(
                        item.text
                    );
                case role.includes("Operator"):
                    return ["Operator", "Employee Manager"].includes(item.text);
                case role.includes('Blog Moderator'):
                    return ["Blog Verifier"].includes(item.text);
                case role.includes('Blog Author'):
                    return ["Blog Manager"].includes(item.text);
                case role.includes('Channel Partner'):
                    return ["Create Lead"].includes(item.text);
                default:
                    return false;
            }
        });
    };

    return getMenuItemsBasedOnRole(userRole);

}