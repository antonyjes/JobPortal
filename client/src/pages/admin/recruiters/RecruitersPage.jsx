import { setRecruiters } from "@/state";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

const RecruitersPage = () => {
    const dispatch = useDispatch();
    const recruiters = useSelector((state) => state.recruiters);
    const token = useSelector((state) => state.token);
    
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
            
        </>
    )
}

export default RecruitersPage