export const checkForGoldenMove = (FBOisThree: boolean, SBOisThree: boolean, FPTisThree: boolean) => {

    if (FBOisThree && SBOisThree && !FPTisThree) {
        return true
    } else {
        false
    }

}



