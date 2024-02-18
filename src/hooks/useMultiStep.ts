import {useState} from 'react'
export default function useMultiStep(step: number){
    const [currentStepIndex, setCurrentStepIndex] = useState(step);

    function next(){
        setCurrentStepIndex(i=>{
            if(i < 5){
                return i + 1
            }
            return i
        })
    }
    function back(){
        setCurrentStepIndex(i => {
            return i - 1
        })
    }
    function goTo(step:number){
        setCurrentStepIndex(step)
    }
    return{
        step: currentStepIndex,
        stepForm: [1,2,3,4],
        next,
        back,
        goTo
    }
}