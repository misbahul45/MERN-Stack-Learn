import { forwardRef } from "react"

interface Props{
    options:string[],
    tags:string,
}

const Select = forwardRef<HTMLSelectElement,Props>(({options,tags, ...res},ref) => {
  return (
    <>
        <select {...res} ref={ref} id={tags} className="text-lg bg-gray-50 border border-gray-300 text-gray-500 block w-full py-1 pl-2">
            {options.map((option)=>(
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    </>
  )
})

export default Select;
