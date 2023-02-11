import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/reusable/Loading";
import {
  useDeleteJobByIdMutation,
  useGetPostedJobQuery,
  useToggleStatusMutation,
} from "../../features/job/jobApi";

const PostedJob = () => {
  const navigate = useNavigate();
  const {
    user: { email },
  } = useSelector((state) => state.auth);
  const { data, isLoading2 } = useGetPostedJobQuery(email, {
    pollingInterval: 3000,
  });
  const [deleteJob, { isLoading1, isSuccess }] = useDeleteJobByIdMutation();
  const [toggleStatus] = useToggleStatusMutation();

  useEffect(() => {
    if (isLoading1) {
      toast.loading("deleting your job", { id: "deleted1" });
    }
    if (!isLoading1 && isSuccess) {
      toast.success("successfully deleted your job", {
        id: "deleted",
        duration: 4000,
      });
    }
  });

  const handleToggleStatus = (id, status) => {
    const tStatus = status === "active" ? "closed" : "active";
    const toggleData = {
      jobId: id,
      status: tStatus,
    };

    toggleStatus(toggleData);
  };

  if (isLoading2) {
    return <Loading />;
  }

  const handleDelete = (id) => {
    deleteJob(id);
  };
  return (
    <div>
      <h1 className="text-primary text-xl text-center mt-5 ">
        Your posted job is here.
      </h1>
      <div className="flex justify-center items-center overflow-auto p-10">
        <div className="bg-secondary/20 shadow-lg p-10 rounded-2xl">
          <div class="overflow-x-auto p-3">
            <table class="table-auto w-full">
              <thead>
                <tr>
                  <th className="p-2">
                    <h1 class="font-semibold text-left">No</h1>
                  </th>
                  <th className="p-2">
                    <h1 class="font-semibold text-left">Job Name</h1>
                  </th>
                  <th className="p-2">
                    <h1 class="font-semibold text-left">Total Applicants</h1>
                  </th>
                  <th className="p-2">
                    <h1 class="font-semibold text-left">See Candidates</h1>
                  </th>
                  <th className="p-2">
                    <h1 class="font-semibold text-left">Status</h1>
                  </th>
                  <th className="p-2">
                    <h1 class="font-semibold text-center">
                      Close / Open <br /> A Job{" "}
                    </h1>
                  </th>
                  <th className="p-2">
                    <h1 class="font-semibold text-center ml-7">Actions</h1>
                  </th>
                </tr>
              </thead>
              <tbody class="text-sm divide-y divide-gray-300">
                {data?.data.map(
                  ({ position, _id, status, applicants }, index) => (
                    <tr>
                      <td className="p-2">
                        <div>{index + 1} .</div>
                      </td>
                      <td className="p-2">
                        <div className="mr-7">{position}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">{applicants.length}</div>
                      </td>
                      <td className="p-2">
                        <button
                          className="border border-green-500 px-2 py-1 rounded-full  "
                          onClick={() =>
                            navigate(`/dashboard/candidate-details/${_id}`)
                          }
                        >
                          All Candidates
                        </button>
                      </td>
                      <td className="p-2">
                        <div>
                          {status === "active" ? (
                            <span className=" px-2 text-green-500 py-1 ">
                              Active
                            </span>
                          ) : (
                            <span className="px-2 py-1  text-red-500 ">
                              Closed
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="flex justify-center">
                          <button
                            onClick={() => handleToggleStatus(_id, status)}
                          >
                            {status === "active" ? (
                              <span className="border border-red-500 px-2 py-1 rounded-full hover:border-red-500 hover:text-white hover:bg-red-500 transition-all">
                                close
                              </span>
                            ) : (
                              <span className="border border-green-500 px-2 text-green-500 py-1 rounded-full hover:border-green-500 hover:text-white hover:bg-green-500 transition-all">
                                Open
                              </span>
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="ml-7 text-center justify-center gap-2 flex items-center">
                          <button
                            onClick={() => handleDelete(_id)}
                            className="border border-red-500 px-2 py-1 text-red-500 rounded-full hover:border-red-500 hover:text-white hover:bg-red-500 transition-all"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostedJob;
