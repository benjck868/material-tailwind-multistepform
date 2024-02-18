import { Input, Typography } from "@material-tailwind/react";
import FormWrapper from "../FormWrapper";
import { ReactNode } from "react";
import {FormikProps} from 'formik'
import { formDataSchema } from "../../pages/MultiStepForm/MultiStepForm";
import * as Yup from 'yup'

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
type PersonalInfo = Yup.InferType<typeof formDataSchema>
type PersonalInfoProps = {
    formName: string
    context: FormikProps<PersonalInfo>
}

export default function PersonalInfo({formName, context}: PersonalInfoProps) {
  return (
    <>
        <FormWrapper  title={formName} discription="Please provide your name, email address and phone number.">
            <InputWrapper>
                <Input type="text" id="name" {...context.getFieldProps('name')} variant="static" size="lg" name="name" label="Name: " placeholder="e.g. Stephen King" error={context.touched.name&&context.errors.name?true:false}/>
                <Typography className="text-xs text-red-300 mt-2">{context.errors.name?context.errors.name:''}</Typography>
            </InputWrapper>

            <InputWrapper>
                <Input type="email" id="email" {...context.getFieldProps('email')} label="Email: " variant="static" size="lg" name="email" placeholder="e.g. stephenking@lorem.com" error={context.touched.email&&context.errors.email?true:false}/>
                <Typography className="text-xs text-red-300 mt-2">{context.errors.email?context.errors.email:''}</Typography>
            </InputWrapper>    
            <InputWrapper>
                <Input type="tel" id="phone" {...context.getFieldProps('phone')}label="Phone number: " variant="static" name="phone" placeholder="e.g. +1 234 567 890" error={context.touched.phone&&context.errors.phone?true:false}/>
                <Typography className="text-xs text-red-300 mt-2">{context.errors.phone?context.errors.phone:''}</Typography>
            </InputWrapper> 
        </FormWrapper>
    </>
  )
}
