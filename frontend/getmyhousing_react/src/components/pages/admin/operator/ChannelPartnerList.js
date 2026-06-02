import React, { useEffect, useState } from 'react'
import OperatorTabs from './OperatorTabs'
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { apiList, invokeApi } from '../../../../apis/apiServices';
import { config } from '../../../../config/config';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import { useCookies } from 'react-cookie';

const ChannelPartnerList = () => {
    const [cookies] = useCookies();
    const navigate = useNavigate();
    const [usersList, setUsersList] = useState([]);
    const [userId, setUserId] = useState(null);
    const [isUserFetching, setIsUserFetching] = useState(true);



    useEffect(() => {
        const getUsers = async () => {
            let params = {
                role: "Channel Partner",
            };
            try {
                const response = await invokeApi(
                    config.apiDomains + apiList.getUserByPincodeForOperator,
                    params,
                    cookies
                );
                if (
                    response.status === 200 &&
                    response.data.responseMessage === "Successful"
                ) {
                    setUsersList(response.data.users);
                } else if (response.status === 401) {
                    navigate("/logout");
                } else {
                    toast.error("No data in the response!", {
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
                }
            } catch (error) {
                toast.error("An error occurred while fetching data!", {
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
            }
        };
        if (isUserFetching) {
            getUsers();
            setIsUserFetching(false);
        }
    }, [cookies, isUserFetching]);
    return (
        <OperatorTabs tabActive={2}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Sl No.</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usersList.map((item, index) => (
                            <TableRow>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{item.fullName}</TableCell>
                                <TableCell>{item.mobileNumber}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            setUserId(item.id);
                                        }}
                                    >
                                        Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </OperatorTabs>
    )
}

export default ChannelPartnerList