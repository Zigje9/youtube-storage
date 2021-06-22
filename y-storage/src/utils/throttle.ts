const throttle = (apiCall: any, time: number) => {
  let check = true;
  return {
    clojureThrottle(){
      if(check){
        apiCall()
        check = false
        setTimeout(() => {
          check = true;
        }, time)
      }
    }
  }
}

export default throttle;