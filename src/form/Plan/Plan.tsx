import {List, ListItem, ListItemPrefix, Avatar, Card, Typography, Switch, } from "@material-tailwind/react"
import { twMerge } from "tailwind-merge"
import FormWrapper from "../FormWrapper"
import { useState } from "react"

const PlanData = [{
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
  updateFields: (fields: Partial<Plan>)=>void
}

function PlanRadioComponent({plan, selectedPlan, updateFields,  isYearly}:PlanRadioComponentProps){
  return(
    <div onClick={()=>updateFields({plan:plan.plan})} className="">
        <ListItem className={twMerge(selectedPlan===plan.plan?"border-MSF-Purplish-blue border bg-MSF-Pastel-blue":"",["hover:bg-MSF-Pastel-blue focus:bg-MSF-Pastel-blue"])}>
            <ListItemPrefix>
                <Avatar variant="circular" alt="candice" src={`/images/${plan.icon}`} />
            </ListItemPrefix>
            <div>
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

type Plan = {
    plan : string
    isYearly: boolean
}

type PlanProps = Plan & {
    updateFields : (fields: Partial<Plan>)=>void
}

export default function Plan({plan, isYearly, updateFields}: PlanProps) {
  return (
    <FormWrapper title="Select your plan" discription="You have an option of monthly or yearly billing.">
        <div>
            <List>
                {PlanData.map((e,i)=>{

                    return(
                    <PlanRadioComponent  key={i} plan={e} updateFields={updateFields} selectedPlan={plan} isYearly={isYearly}/>
                    )
                })}
            </List>
            <div className="flex justify-center mt-5">
                <Switch color="indigo" defaultChecked={isYearly} onChange={()=>updateFields({isYearly: !isYearly})} label="Subscribe plan for a year?"/>
            </div>
        </div>
    </FormWrapper>
  )
}
