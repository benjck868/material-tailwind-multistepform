import { twMerge } from "tailwind-merge"
import AddOns from "../../form/AddOns/AddOns"
import FinishingUp from "../../form/FinishingUp/FinishingUp"
import PersonalInfo from "../../form/PersonalInfo/PersonalInfo"
import Plan from "../../form/Plan/Plan"
import useMultiStep from "../../hooks/useMultiStep"
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { Button } from "@material-tailwind/react"
import Thankyou from "../../form/ThankYOu/Thankyou"

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/ 
export const formDataSchema = Yup.object({
  name : Yup.string().min(4).max(30).required('Name field is required.'),
  email: Yup.string().email().min(4).max(50).required('Email field is required.'),
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required(),
  plan: Yup.string().min(1).required('You must select atleast 1 plan.'),
  isYearly: Yup.boolean().default(false),
  addOns: Yup.array().of(Yup.string()).optional().nullable()
})
type formDataType = Yup.InferType <typeof formDataSchema>
const InitialData:formDataType = {
  name : '',
  email: '',
  phone: '',
  plan: '',
  isYearly: false,
  addOns: []
}
type StepIndicatorProps = {
  isCurrentStep: boolean
  currentStep: number
}

function StepIndicator({isCurrentStep, currentStep}: StepIndicatorProps){
  const steps = ['YOUR INFO','SELECT PLAN','ADD ONS','SUMMARY']
  return(
    <div className="font-ubuntu md:flex md:gap-2 text-white">
      <div className={twMerge(isCurrentStep?"bg-MSF-Pastel-blue":"bg-none",["ml-7 border-2 border-white h-10 w-10 rounded-full flex justify-center items-center"])}>{currentStep}</div>
      <div className="hidden md:flex md:flex-col text-white">
        <span className="text-xs">
          {'STEP '+currentStep}
        </span>
        <span className="text-sm font-semibold">
          {steps[currentStep-1]}
        </span>
      </div>
    </div>
  )
}

type ButtonFormProps = {
  step : number
  back : ()=>void
  next : ()=>void
  validateBeforeNext: ()=>boolean
}

function ButtonForm({step, back, next, validateBeforeNext}: ButtonFormProps){
  return(
    <div className={twMerge(step===1?"justify-end": "justify-between", ["flex"])}>
      <Button variant="text" type="button" onClick={back} className={twMerge(step === 1?"hidden":"block",[""])}> Go Back</Button>
      <Button type="submit" color="blue" className={step===4?'block':'hidden'}>submit</Button>
      <Button type="button" disabled={validateBeforeNext()} onClick={next} color="blue" className={step===4?'hidden':'block'}>Next Step</Button>
    </div>
  )
}

export default function MultiStepForm() {
  const formik = useFormik<typeof InitialData>({
    initialValues : InitialData,
    validationSchema:formDataSchema,
    onSubmit: (values,{setSubmitting}) => {
      console.log(values)
      setSubmitting(true)
    }
  })
  const {step, stepForm, back, next, goTo} = useMultiStep(1)
  const forms = [<PersonalInfo formName="Personal Information"  context={formik}/>, <Plan formName="Select Plan" context={formik}/>,<AddOns formName="Pick Add-ons" context={formik}/>, <FinishingUp formName="Finishing up" context={formik} goTo={goTo}/>]
  console.log('isSubmitting value: '+ formik.isSubmitting)
  function  validateBeforNext(){
    const errors = formik.errors
    const touched = formik.touched
    if(step === 1){
      if((errors.name || errors.email || errors.phone) || (!touched.name || !touched.email || !touched.phone)){
        return true
      }
    }
    else if(errors.plan || !touched.phone){
      return true
    }
    return false
  }
  return (
    <div className="flex flex-col md:flex-row md:p-5 lg:p-20 md:justify-center md:h-screen md:w-screen md:content-center">
      <div className="flex justify-center md:justify-start md:flex-col md:gap-4 md:pt-5 md:w-96 lg:w-60 md:content-start py-24 md:py-0 bg-[url('/images/bg-sidebar-mobile.svg')] md:bg-[url('/images/bg-sidebar-desktop.svg')] md:rounded-lg bg-no-repeat bg-cover">
        {
          stepForm.map((e,i)=>{
            if(step === i+1){
              return <StepIndicator key={i} isCurrentStep={true} currentStep={e} />
            }
            return <StepIndicator key={i} isCurrentStep={false} currentStep={e} />
          })
        }
      </div>
      <div className="-mt-10 mx-10 md:mt-0 bg-white p-5 rounded-t-lg md:w-screen lg:w-2/5">
        <form onSubmit={formik.handleSubmit} className="md:h-full flex flex-col md:justify-between">
          <div>
            {
              !formik.isSubmitting?forms[step-1]:<Thankyou/>              
            }
          </div>
          {
            !formik.isSubmitting?<ButtonForm step={step} next={next} back={back} validateBeforeNext={validateBeforNext}/> : null
          }
        </form>
      </div>
    </div>
  )
}
