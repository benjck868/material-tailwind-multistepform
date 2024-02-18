import { Checkbox, List, ListItem, ListItemPrefix, ListItemSuffix, Typography } from "@material-tailwind/react"
import FormWrapper from "../FormWrapper"
import { twMerge } from "tailwind-merge"
import { FormikProps } from "formik"
import * as Yup from 'yup'
import { formDataSchema } from "../../pages/MultiStepForm/MultiStepForm"

export const addOnsData = [
    {
        id:'addons1',
        name: 'Online service',
        description: 'Access to multiplayer games',
        price: 1
    },
    {
        id:'addons2',
        name: 'Larger storage',
        description: 'Extra 1TB of cloud save',
        price: 2
    },
    {
        id:'addons3',
        name: 'Customizable profile',
        description: 'Custom them on your profile.',
        price: 2
    }
]

type AddOns = Yup.InferType<typeof formDataSchema>
type AddOnProps = {
    formName: string
    context: FormikProps<AddOns>
}
export default function AddOns({formName, context}: AddOnProps) {
    function isChecked(addOns: (string | undefined)[] | null | undefined, index: string){
        if(addOns){
            if(addOns.indexOf(index) !== -1){
                return true
            }
        }
        return false
    }
  return (
    <FormWrapper title={formName} discription="Add-ons help enhance your gaming experience.">
        <div className="py-5">
            <List>
                {
                    addOnsData.map((data,i)=>{
                        return(
                            <label htmlFor={data.id} key={i}>
                                <ListItem className={twMerge(isChecked(context.values.addOns, data.id)?"border-MSF-Marine-blue" :" border-MSF-Light-gray",["border mb-2"])}>
                                    <ListItemPrefix>
                                        <Checkbox color="blue" checked={isChecked(context.values.addOns, data.id)} type="checkbox" id={data.id} name="addOns" value={data.id} onChange={context.handleChange} /> 
                                    </ListItemPrefix>
                                    <div>
                                        <Typography className="text-sm font-bold text-MSF-Marine-blue">{data.name}</Typography>
                                        <Typography className="text-xs text-MSF-Cool-gray">{data.description}</Typography>
                                    </div>
                                    <ListItemSuffix>
                                        <Typography className="text-sm text-MSF-Purplish-blue">+${context.values.isYearly?data.price*10+' /yr':data.price+' /mo'}</Typography>
                                    </ListItemSuffix>
                                </ListItem>
                            </label>
                        )
                    })
                }
            </List>
        </div>
    </FormWrapper>
  )
}
