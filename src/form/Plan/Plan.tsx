import {List, ListItem, ListItemPrefix, Avatar, Typography, Switch } from "@material-tailwind/react"
import { twMerge } from "tailwind-merge"
import FormWrapper from "../FormWrapper"
import {FormikProps} from 'formik'
import * as Yup from 'yup'
import { formDataSchema } from "../../pages/MultiStepForm/MultiStepForm"
import { ReactNode } from "react"

export const PlanData = [{
  plan : 'Arcade',
  price: 9,
  icon: 'icon-arcade.svg'
},
{
  plan : 'Advanced',
  price: 12,
  icon: 'icon-advanced.svg'
},
{
  plan : 'Pro',
  price: 15,
  icon: 'icon-pro.svg'
}]

type PlanRadioComponentProps = {
  plan : typeof PlanData[0]
  selectedPlan : string
  isYearly: boolean
  children:ReactNode
}

function PlanRadioComponent({plan, selectedPlan, isYearly, children}:PlanRadioComponentProps){
  return(
    <div className="">
        <ListItem className={twMerge(selectedPlan===plan.plan?"border-MSF-Purplish-blue border bg-MSF-Pastel-blue":"",["hover:bg-MSF-Pastel-blue focus:bg-MSF-Pastel-blue flex md:flex-col md:w-40"])}>
            <ListItemPrefix>
                <Avatar variant="circular" alt="candice" src={`/images/${plan.icon}`} />
            </ListItemPrefix>
            <div>
                {children}
                <Typography variant="h6" className="text-MSF-Marine-blue">
                    {plan.plan}
                </Typography>
                <Typography className="text-sm text-MSF-Cool-gray">
                    ${isYearly?`${plan.price*10}/yr`:`${plan.price}/mo`}
                </Typography>
                <Typography className={twMerge(isYearly?'visible':'invisible',["text-xs text-MSF-Marine-blue "])}>
                    2 months free
                </Typography>
            </div>
        </ListItem>
    </div>
  )
}

type Plan = Yup.InferType<typeof formDataSchema>

type PlanProps = {
    formName : string
    context: FormikProps<Plan>
}

export default function Plan({formName, context}: PlanProps) {
  return (
    <FormWrapper title={formName} discription="You have an option of monthly or yearly billing.">
        <div>
            <List className="flex flex-col md:flex-row">
                {PlanData.map((e,i)=>{

                    return(
                      <div key={i}>
                        <label htmlFor={e.plan}>
                          <PlanRadioComponent plan={e} isYearly={context.values.isYearly} selectedPlan={context.values.plan}>
                            <input type="radio" name="plan" hidden value={e.plan} id={e.plan} onChange={context.handleChange}/>
                          </PlanRadioComponent>
                        </label>
                      </div>
                      
                    )
                })}
            </List>
            <Typography className="text-xs text-red-400 mt-2">{context.errors.plan?context.errors.plan:''}</Typography>
            <div className="flex justify-center mt-5 bg-MSF-Magnolia py-2 rounded-lg">
                <Switch color="indigo" id="isYearly" defaultChecked={context.values.isYearly} {...context.getFieldProps('isYearly')} label="Subscribe plan for a year?"/>
            </div>
            <div>
             
            </div>
        </div>
    </FormWrapper>
  )
}
