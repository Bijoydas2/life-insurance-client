import React from "react";
import PolicyRow from "./PolicyRow";
import Loading from "../../../../Components/Loading";

const PolicyTable = ({ policies, isLoading, onEdit }) => {
  if (isLoading) return <Loading/>;

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr className="bg-primary text-white">
            <td>#</td>
            <th>Title</th>
            <th>Category</th>
            <th>Min Age</th>
            <th>Max Age</th>
            <th>Premium</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((policy, index) => (
            <PolicyRow
              key={policy._id}
              policy={policy}
              index={index}
              onEdit={onEdit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PolicyTable;
