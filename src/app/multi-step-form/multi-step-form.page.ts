/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable object-shorthand */
/* eslint-disable new-parens */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, IonContent, IonSlides, NavController } from '@ionic/angular';
import { AbstractControl, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
const { Camera } = Plugins;

@Component({
  selector: 'app-multi-step-form',
  templateUrl: './multi-step-form.page.html',
  styleUrls: ['./multi-step-form.page.scss'],
})
export class MultiStepFormPage implements OnInit {

  @ViewChild(IonContent, { static: true }) ionContent: IonContent;
  @ViewChild(IonSlides, { static: false }) ionSlides: IonSlides;
  @ViewChild('waitersFormRef', { static: false }) waitersFormRef: NgForm;
  @ViewChild('dateFormRef', { static: false }) dateFormRef: NgForm;
  @ViewChild('tipsFormRef', { static: false }) tipsFormRef: NgForm;

  public points: any = {
    // id: 1,
    points: [
      {
        id: 1,
        name: 'Serve Wine',
        amount: 0.5,
      },
      {
        id: 2,
        name: 'Answer Phone',
        amount: 0.5,
      },
    ],
    // subtotal: 25.00,
    // shippingFee: 5.00,
    // total: 30.00,
  };

  public waitersListForm: FormGroup;
  public tipsForm: FormGroup;
  public dateForm: FormGroup;

  // public imagePath: SafeResourceUrl;

  public times = [];

  public slidesOpts = {
    allowTouchMove: false,
    autoHeight: true,
  };

  public slides: string[];
  public currentSlide: string;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  public isBeginning: boolean = true;
  public isEnd: boolean = false;

  get nameControl(): AbstractControl {
    return this.waitersListForm.get('name');
  }

  get pointsControl(): AbstractControl {
    return this.waitersListForm.get('points');
  }

  get hoursControl(): AbstractControl {
    return this.waitersListForm.get('hours');
  }

  // get billingAddress(): AbstractControl {
  //   return this.waitersListForm.get('address');
  // }

  // get billingCity(): AbstractControl {
  //   return this.waitersListForm.get('city');
  // }

  // get billingState(): AbstractControl {
  //   return this.waitersListForm.get('state');
  // }

  // get billingZip(): AbstractControl {
  //   return this.waitersListForm.get('zip');
  // }

  // get billingCountryCode(): AbstractControl {
  //   return this.waitersListForm.get('country_code');
  // }

  // get shippingAddress(): AbstractControl {
  //   return this.dateForm.get('date');
  // }
  get dateControl(): AbstractControl {
    return this.dateForm.get('date');
  }

  // get shippingPhone(): AbstractControl {
  //   return this.shippingForm.get('phone');
  // }

  // get shippingDeliveryTime(): AbstractControl {
  //   return this.shippingForm.get('delivery_time');
  // }

  get paymentNumber(): AbstractControl {
    return this.tipsForm.get('tips');
  }

  // get paymentExpiration(): AbstractControl {
  //   return this.tipsForm.get('expiration');
  // }

  // get paymentCvv(): AbstractControl {
  //   return this.tipsForm.get('cvv');
  // }

  constructor(
    // private actionSheetCtrl: ActionSheetController,
    private navCtrl: NavController,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    this.setupForm();
    this.buildSlides();
    this.times = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
  }

  ionViewDidEnter() {
    this.ionSlides.updateAutoHeight();
  }

  buildSlides() {
    const slides = ['Waites List', 'Date', 'Tips', 'Summary'];
    // const slides = ['Billing', 'Shipping', 'Summary', 'Payment'];
    this.currentSlide = slides[0];
    this.slides = slides;
  }

  setupForm() {
    // this.billingForm = new FormGroup({
    this.waitersListForm = new FormGroup({
      name: new FormControl('John', Validators.required),
      points: new FormControl([0.5, 0.5, 0.5], Validators.required),
      hours: new FormControl(4.15, Validators.required),
      // address: new FormControl('Main Street 123', Validators.required),
      // city: new FormControl('Boca Raton', Validators.required),
      // state: new FormControl('Florida', Validators.required),
      // zip: new FormControl('34799', Validators.required),
      // country_code: new FormControl('US', Validators.required),
    });

    this.dateForm = new FormGroup({
      date: new FormControl('12/12/2021', Validators.required),
      // phone: new FormControl('+1546372922', Validators.required),
      // delivery_time: new FormControl(null, Validators.required),
      // message: new FormControl(''),
    });

    this.tipsForm = new FormGroup({
      tips: new FormControl(100, Validators.required),

      // number: new FormControl('', Validators.required),
      // expiration: new FormControl('', Validators.required),
      // cvv: new FormControl('', Validators.required),
    });
  }

  async onSlidesChanged() {
    const index = await this.ionSlides.getActiveIndex();
    this.currentSlide = this.slides[index];
    this.isBeginning = await this.ionSlides.isBeginning();
    this.isEnd = await this.ionSlides.isEnd();
  }

  onSlidesDidChange() {
    this.ionContent.scrollToTop();
  }

  onBackButtonTouched() {
    this.ionSlides.slidePrev();
    this.ionContent.scrollToTop();
  }

  onNextButtonTouched() {

    if (this.currentSlide === 'Waites List') {
      this.waitersFormRef.onSubmit(undefined);
      if (this.waitersListForm.valid) {
        this.ionSlides.slideNext();
        this.ionContent.scrollToTop();
      }
    }
    else if (this.currentSlide === 'Date') {
      this.dateFormRef.onSubmit(undefined);
      if (this.dateForm.valid) {
        this.ionSlides.slideNext();
        this.ionContent.scrollToTop();
      }

    }
    else if (this.currentSlide === 'Tips') {

      this.tipsFormRef.onSubmit(undefined);
      if (this.tipsForm.valid) {
        this.ionSlides.slideNext();
        this.ionContent.scrollToTop();
        // this.navCtrl.navigateRoot('/thanks', {
        //   animated: true,
        //   animationDirection: 'forward',
        // });
      }

    }
    else {
      // console.log('waitersList', this.waitersListForm.value);
      // console.log('date', this.dateForm.value);
      // console.log('tipsMade', this.tipsForm.value);
      const waitersList = this.waitersListForm;
      const date = this.dateForm;
      const tips = this.tipsForm;
      this.buildWaiterEntryObject(waitersList, date, tips);
      // this.navCtrl.navigateRoot('/thanks', {
      //   animated: true,
      //   animationDirection: 'forward',
      // });
    }
  }
  buildWaiterEntryObject(waitersList, date, tips) {
    console.log('waitersList', waitersList);
    console.log('date', date);
    console.log('tipsMade', tips);
    this.navCtrl.navigateRoot('/thanks', {
      animated: true,
      animationDirection: 'forward',
    });
  }
  // convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
  //   const reader = new FileReader;
  //   reader.onerror = reject;
  //   reader.onload = () => resolve(reader.result);
  //   reader.readAsDataURL(blob);
  // });

  // async chooseImage(source: CameraSource) {

  //   try {

  //     const image = await Camera.getPhoto({
  //       quality: 70,
  //       width: 600,
  //       height: 600,
  //       preserveAspectRatio: true,
  //       allowEditing: true,
  //       correctOrientation: true,
  //       source: source,
  //       resultType: CameraResultType.Uri,
  //     });

  //     const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(image.webPath);
  //     this.imagePath = safeUrl;

  //     const response = await fetch(image.webPath);
  //     const blob = await response.blob();

  //     const base64 = await this.convertBlobToBase64(blob) as string;

  //     // Send encoded string to server...

  //   } catch (error) {
  //     console.warn(error);
  //   }

  // }

  // async presentActionSheet() {

  //   const actionSheet = await this.actionSheetCtrl.create({
  //     header: 'Choose an option',
  //     buttons: [{
  //       text: 'Photo Library',
  //       handler: () => {
  //         this.chooseImage(CameraSource.Photos);
  //       }
  //     },
  //     {
  //       text: 'Camera',
  //       handler: () => {
  //         this.chooseImage(CameraSource.Camera);
  //       }
  //     },
  //     {
  //       text: 'Cancel',
  //       role: 'cancel'
  //     }]
  //   });

  //   return await actionSheet.present();
  // }

  originalOrder = (): number => 0;

}
