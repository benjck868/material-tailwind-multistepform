import { List, ListItem, ListItemSuffix, Typography } from "@material-tailwind/react";
import FormWrapper from "../FormWrapper";
import { FormikProps } from "formik"
import * as Yup from 'yup'
import { formDataSchema } from "../../pages/MultiStepForm/MultiStepForm";
import { PlanData } from "../Plan/Plan";
import { addOnsData } from "../AddOns/AddOns"

type FinishingUp = Yup.InferType<typeof formDataSchema>
type FinishingUpProps = {
  formName : string
  context: FormikProps<FinishingUp>
  goTo: (step: number)=>void
}
export default function FinishingUp({formName, context, goTo}: FinishingUpProps) {
  const planIndex = PlanData.findIndex((x)=>x.plan === context.values.plan)
  const {addOns, isYearly} = context.values
  const planTotal = isYearly?PlanData[planIndex].price*10:PlanData[planIndex].price
  const addObj:Partial<typeof addOnsData> = []
  let totalPayment = planTotal

  addOns?.map((data)=>{
   addObj.push(addOnsData.find(({id})=>id===data))
  })
  if(addObj){
    addObj.map((data)=>{
      if(data?.price != undefined){
        totalPayment += isYearly?data.price*10:data.price
      }
    })
  }
  
  
  return (
    <FormWrapper title={formName} discription="Double-check everything looks OK before confirming">
        <div>
          <List className="bg-MSF-Light-gray">
            <ListItem ripple={false} className="cursor-default">
              <div>
                <Typography className="text-sm font-bold text-MSF-Marine-blue">{PlanData[planIndex].plan}({isYearly?'Yearly':'Monthly'})</Typography>
                <a href="#" onClick={()=>goTo(2)} className="underline text-xs text-MSF-Cool-gray hover:text-MSF-Purplish-blue">Change</a>
              </div>
              <ListItemSuffix>
                <Typography className="text-sm font-bold text-MSF-Marine-blue">${planTotal}{isYearly?' /yr':' /mo'}</Typography>
              </ListItemSuffix>
            </ListItem>
            <hr />
            {
              addObj.map((data,i)=>{
                if(data != undefined){
                  return(
                    <ListItem key={i}>
                      <Typography className="text-xs text-MSF-Cool-gray">{data?.name}</Typography>
                      <ListItemSuffix>
                        <Typography className="text-xs text-MSF-Marine-blue">+ {isYearly? data.price*10+'/yr': data.price+'/mo'}</Typography>
                      </ListItemSuffix>
                    </ListItem>
                  )
                }
              })
            }
          </List>
          <List>
            <ListItem>
              <Typography className="text-sm text-MSF-Cool-gray">Total (per {isYearly?'year':'month'})</Typography>
              <ListItemSuffix>
              <Typography className="text-lg font-bold text-MSF-Purplish-blue">
                $ {totalPayment} {isYearly?' /yr': ' /mo'}
              </Typography>
              </ListItemSuffix>
            </ListItem>
          </List>
        </div>
    </FormWrapper>
  )
}
