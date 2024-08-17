import React from "react";

function Select({ options, label, className, ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label htmlFor="id" className=""></label>}
      <select>
        {...props}
        id={id}
        ref={ref}
        className=
        {`w-full rounded-lg bg-white text-black outline-none focus:bg-gray-100 duration-200 border
                     border-gray-200   ${className}`}
                     {options?.map((option) => (
                        <option key={option} value={option}>
                          {options}
                        </option>
                     ))}
      </select>
    </div>
  );
}
export default React.forwardRef(Select)
