import { setRecruiters } from "@/state";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import LayoutAdmin from "../LayoutAdmin";
import { RecruiterClient } from "./components/client";

const RecruitersPage = () => {
    const dispatch = useDispatch();
    const recruiters = useSelector((state) => state.recruiters);
    const token = useSelector((state) => state.token);
    const [showModal, setShowModal] = useState(false);
    
    const getRecruiters = async () => {
        const response = await fetch("http://localhost:3003/recruiters", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`},
        });

        const data = await response.json();
        dispatch(setRecruiters({ recruiters: data }));
    }

    useEffect(() => {
        getRecruiters()
    }, []);

    return(
        <>
            <LayoutAdmin>
                <div className="flex-col">
                    <div className="flex-1 space-y-4 p-8 pt-6">
                        <RecruiterClient data={recruiters} setShowModal={setShowModal} />
                    </div>
                </div>
            </LayoutAdmin>
        </>
    )
}

export default RecruitersPage