import { Input } from "@material-tailwind/react";
import FormWrapper from "../FormWrapper";
import { ReactNode } from "react";

type InputWrapperProps = {
    children : ReactNode
}

function InputWrapper({children}: InputWrapperProps){
    return(
        <div className="mt-10">
            {children}
        </div>
    )
}
type PersonalInfo = {
    name: string
    email: string
    phone: string
}
type PersonalInfoProps = PersonalInfo & {
    updateFields: (fields: Partial<PersonalInfo>)=>void
}

export default function PersonalInfo({name, email, phone, updateFields}: PersonalInfoProps) {
  return (
    <>
        <FormWrapper  title="Personal Information" discription="Please provide your name, email address and phone number.">
            <InputWrapper>
                <Input type="text" value={name} onChange={e=>updateFields({name:e.target.value})} variant="static" size="lg" name="name" label="Name: " placeholder="e.g. Stephen King"/>
            </InputWrapper>

            <InputWrapper>
                <Input type="email" value={email} onChange={e=>updateFields({email:e.target.value})} label="Email: " variant="static" size="lg" name="email-address" placeholder="e.g. stephenking@lorem.com"/>
            </InputWrapper>    
            <InputWrapper>
                <Input type="tel" value={phone} onChange={e=>updateFields({phone:e.target.value})} label="Phone number: " variant="static" name="phone-number" placeholder="e.g. +1 234 567 890" />
            </InputWrapper>        
        </FormWrapper>
    </>
  )
}
