import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCreditcard]'
})
export class CreditcardDirective implements OnInit {

  constructor(
    private _eleRef : ElementRef,
    private _rendrer :Renderer2
  ) { }

  ngOnInit(): void {
      this.createcontainererror()
  }


  @HostListener('keyup',['$event'])
  validatecreditcard(eve:Event){
  //  console.log(eve.target)

  let inputcontrol = (eve.target as HTMLInputElement)

  let val = inputcontrol.value.replace(/\s+/g,"")

  console.log(val,val.length)
  // this.createcontainererror(inputcontrol)
  if(val.length > 16){
    val = val.substring(0,16)
  }

  //for speciacl character
  console.log(/[^\d]/.test(val));

  if(/[^\d]/.test(val)){
    inputcontrol.nextElementSibling?.classList.remove('d-none')
  }else{
    inputcontrol.nextElementSibling?.classList.add('d-none')
  }

  let formatedvalue = this.formatcreditcardval(val)

  inputcontrol.value = formatedvalue;
  }

   formatcreditcardval(data:string):string{
    let chunkArr = [];
    for(let i=0; i < data.length; i+=4){
      chunkArr.push(data.slice(i,i+4))
    }
    return chunkArr.join(" ")

  }

  createcontainererror(){
    // we create html element for error msg

    let para = document.createElement("strong")
    para.className = "text-danger d-none"

    para.innerHTML='<strong>please enter valid card details</strong>'

    // control.parentElement?.append(para)

    // this._eleRef.nativeElement.parentElement.append(para)

    this._rendrer.appendChild(this._eleRef.nativeElement.parentElement, para)

  }

}
