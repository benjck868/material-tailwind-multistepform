import { twMerge } from "tailwind-merge"
import AddOns from "../../form/AddOns/AddOns"
import FinishingUp from "../../form/FinishingUp/FinishingUp"
import PersonalInfo from "../../form/PersonalInfo/PersonalInfo"
import Plan from "../../form/Plan/Plan"
import useMultiStep from "../../hooks/useMultiStep"
import { useState } from "react"

const InitialData = {
  name : '',
  email: '',
  phone: '',
  plan: '',
  isYearly: false,
  addOns: [""]
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

export default function MultiStepForm() {
  const [data, setData] = useState(InitialData)
  function updateFields(fields: Partial<typeof InitialData>){
    setData(prev=>{
      return{...prev, ...fields}
    })
  }
  const {step, stepForm, form, back, next, goTo,} = useMultiStep([<PersonalInfo {...data} updateFields={updateFields} />, <Plan {...data} updateFields={updateFields}/>, <AddOns />, <FinishingUp />])
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
        <form onSubmit={e=>e.preventDefault()}>
          {form}
          {step}
          <div className={twMerge(step===1?"justify-end": "justify-between", ["flex"])}>
            <button onClick={back} className={twMerge(step === 1?"hidden":"block",["border-2 border-gray-400 text-MSF-Cool-gray font-semibold text-xs w-32 rounded-lg"])}> Go Back</button>
            
            <button onClick={next} className="h-12 bg-MSF-Marine-blue text-white font-semibold text-xs w-32 rounded-lg">{step === 4 ?"Confirm" : "Next Step"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
