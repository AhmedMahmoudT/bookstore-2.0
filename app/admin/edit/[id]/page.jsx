import React from "react";

const Edit = ({ params }) => {
  const id = params.id;

  return (
    <main className="flex flex-col h-screen">
      <div className="m-auto">
        <h1 className="text-6xl">Edit {id}</h1>
      </div>
    </main>
  );
};

export default Edit;
