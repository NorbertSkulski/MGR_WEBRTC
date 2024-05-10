import {useEffect, useRef} from "react";
export const usePortal =(id:string)=> {
    const rootElemRef = useRef(document.createElement('div'));

    useEffect(() => {
      // Look for existing target dom element to append to
      const parentElem:any = document.querySelector(`#${id}`);
      // Add the detached element to the parent
      parentElem.appendChild(rootElemRef.current);
      // This function is run on unmount
      return function removeElement() {
        rootElemRef.current.remove();
      };
    }, [id]);
  
    return rootElemRef.current;
}