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
  };

  public waitersListForm: FormGroup;
  public tipsForm: FormGroup;
  public dateForm: FormGroup;

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

  get dateControl(): AbstractControl {
    return this.dateForm.get('date');
  }

  get paymentNumber(): AbstractControl {
    return this.tipsForm.get('tips');
  }

  constructor(
    private navCtrl: NavController,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    this.setupForm();
    this.buildSlides();
  }

  ionViewDidEnter() {
    this.ionSlides.updateAutoHeight();
  }

  buildSlides() {
    const slides = ['Waites List', 'Date', 'Tips', 'Summary'];
    this.currentSlide = slides[0];
    this.slides = slides;
  }

  setupForm() {
    this.waitersListForm = new FormGroup({
      name: new FormControl('John', Validators.required),
      points: new FormControl([0.5, 0.5, 0.5], Validators.required),
      hours: new FormControl(4.15, Validators.required),
    });

    this.dateForm = new FormGroup({
      date: new FormControl('12/12/2021', Validators.required),
    });

    this.tipsForm = new FormGroup({
      tips: new FormControl(100, Validators.required),
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
      }
    }
    else {
      const waitersList = this.waitersListForm;
      const date = this.dateForm;
      const tips = this.tipsForm;
      this.buildWaiterEntryObject(waitersList, date, tips);
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

  originalOrder = (): number => 0;

}
