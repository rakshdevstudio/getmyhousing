import { useState } from "react";
import { apiList, invokeApi } from "../../apis/apiServices";
import { config } from "../../config/config";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const UserStatusToggle = ({ userId, initialStatus }) => {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(initialStatus); // Track user status

  const handleChangeStatus = async (newStatus) => {
    let params = { id: userId, status: newStatus };

    try {
      const response = await invokeApi(
        config.apiDomains + apiList.changeUserStatus,
        params,
        cookies
      );

      if (response.data.responseCode === "200") {
        setIsActive(newStatus); // ✅ Update state AFTER successful API response

        toast.success(`User status changed successfully!`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else if (response.data.responseCode === "401") {
        navigate("/logout");
      } else {
        console.error("No data in the response");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = () => {
    const newStatus = isActive === "Active" ? "Inactive" : "Active"; // Toggle status
    handleChangeStatus(newStatus);
  };

  return (
    <button
      onClick={handleChange}
      style={{
        padding: "8px 16px",
        backgroundColor: isActive === "Active" ? "green" : "red",
        color: "white",
        border: "none",
        cursor: "pointer",
      }}
    >
      {isActive === "Active" ? "Active" : "Inactive"}
    </button>
  );
};

export default UserStatusToggle;
