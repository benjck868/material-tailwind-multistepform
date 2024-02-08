import { ReactNode } from "react"

type FormWrapperProps = {
    title : string
    discription: string
    children : ReactNode
}

export default function FormWrapper({title, children, discription}: FormWrapperProps) {
  return (
    <div>
        <p className="font-ubuntu font-bold text-MSF-Marine-blue text-xl">{title}</p>
        <p className="text-MSF-Cool-gray text-sm">{discription}</p>
        <div className="mt-3">
            {children}
        </div>
    </div>
  )
}