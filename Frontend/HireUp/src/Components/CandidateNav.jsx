import React from "react";
import { Link } from "react-router-dom";
import dash from "../Images/RecruiterNav/dash4.png";
import calender from "../Images/RecruiterNav/calender.png";
import jobs from "../Images/RecruiterNav/jobs.png";
import community from "../Images/RecruiterNav/community.png";
import tests from "../Images/RecruiterNav/tests.png";
import Settings from "../Images/RecruiterNav/settings.png";
import { User } from "lucide-react";

function CandidateNav() {
  return (
    <div className="">
      <nav className="flex flex-col justify-evenly  bg-[#3A175C] rounded-3xl px-3 py-10 h-[95vh]">
        <div className="flex flex-col justify-center items-center gap-7 min-h-[70vh]">
          <Link>
            <img className="w-10" src={dash} alt="" />
          </Link>
          <Link>
            <img className="w-10" src={calender} alt="" />
          </Link>
          <Link>
            <img className="w-10" src={community} alt="" />
          </Link>
          <Link to={"/candidate/course"}>
            <img className="w-10" src={jobs} alt="" />
          </Link>
          <Link to={"/candidate/test"}>
            <img className="w-8" src={tests} alt="" />
          </Link>
          
        </div>
        <Link to={"/candidate/profile"}>
            <User size={35} className=" text-white" />
          </Link>
      </nav>
    </div>
  );
}

export default CandidateNav;
