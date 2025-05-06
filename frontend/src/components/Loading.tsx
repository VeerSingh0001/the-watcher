export default function Loading() {
  return (
    <div className="text-4xl text-center flex-col w-fit m-auto mt-11">
      <div className="animate-spin [animation-duration:2s] w-14 h-14 rounded-full flex justify-center items-center">
        <i className="ri-loader-2-line "></i>
      </div>

      <p className="text-sm">Loading</p>
    </div>
  );
}
