import React from "react";

export default function BoxPreview() {
  return (
    <div className="bg-gray-900 w-fit p-2">
      <div className="py-2 text-center">
        <h4 className="font-bold text-base">Title</h4>
        <p className="text-2xl p-2">35,33,838</p>
      </div>
      <div className="flex">
        <div className="py-2 w-18 h-18 bg-green-700 flex-row text-center ">
          <h4 className="font-bold text-xs">Title</h4>
          <p className="text-2xl p-2">838</p>
        </div>
        <div className="py-2 w-18 h-18 bg-red-700 flex-row text-center ">
          <h4 className="font-bold text-xs">Title</h4>
          <p className="text-2xl p-2">434</p>
        </div>
      </div>
    </div>
  );
}
