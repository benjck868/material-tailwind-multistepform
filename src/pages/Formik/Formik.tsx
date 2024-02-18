import { Input, Typography } from "@material-tailwind/react";
import {useFormik} from 'formik'
import * as Yup from 'yup'

type loginDetails = {
    username: string
}

const loginDetail: loginDetails = {
    username: ''
}

export default function Formik() {
    const formik = useFormik({
        initialValues: loginDetail,
        validationSchema: Yup.object({
            username: Yup.string().max(10).required('Username is required.').min(5)
        }),
    
        onSubmit: (values)=>{
            console.log(values)
        }
    })
  return (
    <div className="px-96 py-10 "> 
        <form onSubmit={formik.handleSubmit}>
            <Input type="text" id="username" {...formik.getFieldProps('username')} variant="static" label="Username: " error={formik.touched.username&&formik.errors.username?true:false} autoComplete="off"/>
            <Typography className="text-xs mt-2 text-red-400">{formik.errors.username?formik.errors.username:''}</Typography>
            <button type="submit">submit</button>
        </form>
    </div>
  )
}
