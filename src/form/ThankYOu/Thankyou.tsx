import { Typography } from "@material-tailwind/react";

export default function Thankyou() {
  return (
    <div className="flex flex-col items-center gap-3">
        <div>
            <img src="/images/icon-thank-you.svg" className="h-20"/>
        </div>
        <div>
            <Typography className="font-bold text-MSF-Marine-blue text-3xl">Thank you</Typography>
        </div>
        <div>
            <Typography className="text-sm text-MSF-Cool-gray text-center">
                Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com .
            </Typography>
        </div>
        
    </div>
  )
}
