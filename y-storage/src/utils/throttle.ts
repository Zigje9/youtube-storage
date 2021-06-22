interface Func {
  _clojureThrottle: () => void
}

const throttle = (handler: () => void, time: number): Func => {
  let check = true;
  return {
    _clojureThrottle(){
      if(check){
        handler()
        check = false
        setTimeout(() => {
          check = true;
        }, time)
      }
    }
  }
}

export default throttle;