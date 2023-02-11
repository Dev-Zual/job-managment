import React from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/reusable/Loading";
import { useGetJobByIdQuery } from "../../features/job/jobApi";

const CandidateDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetJobByIdQuery(id);
  const { applicants, position } = data?.data || {};

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="text-xl text-center mt-5 ">
        <span className="text-primary mr-2">All the applicants in</span>
        <span className="text-red-500">{position}</span>
      </div>
      <div className="flex justify-center items-center overflow-auto p-10">
        <div className="bg-secondary/20 shadow-lg p-10 rounded-2xl">
          <div class="overflow-x-auto p-3">
            <table class="table-auto w-full">
              <thead>
                <tr>
                  <th className="p-2">No .</th>
                  <th className="p-2">Applicants Email</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody class="text-sm divide-y divide-gray-300">
                {applicants?.map(({ email }, index) => (
                  <tr>
                    <td className="p-2">
                      <h1>{index + 1}</h1>
                    </td>
                    <td className="p-2">
                      <div>{email}</div>
                    </td>
                    <td className="p-2">
                      <div>
                        <button className="border border-green-500 px-2 text-green-500 py-1 rounded-full hover:border-green-500 hover:text-white hover:bg-green-500 transition-all">
                          Send Message
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetails;
