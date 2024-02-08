import {useState, ReactElement} from 'react'
export default function useMultiStep(stepForm: ReactElement[]){
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    function next(){
        setCurrentStepIndex(i=>{
            if(i >= stepForm.length-1){
                return i
            }
            return i + 1
        })
    }
    function back(){
        setCurrentStepIndex(i => {
            if(i <= 0){
                return i
            }
            return i - 1
        })
    }
    function goTo(step: number){
        setCurrentStepIndex(step)
    }
    return{
        form: stepForm[currentStepIndex],
        step: currentStepIndex+1,
        stepForm: [1,2,3,4],
        next,
        back,
        goTo
    }
}