import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {SellerService} from '../seller.service';
import {Router} from '@angular/router';
import {AppComponent} from '../../../app.component';
import {OverlayService} from '../../../overlay.service';
import {LocalStorageService} from '../../../Auth/localStorageLogin/local-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [
    MessageService
  ]
})

export class ProfileComponent implements OnInit {
  dateObject = '';
  appComponent: AppComponent;
  business: any[] = [];
  shop: any[] = [];
  contact: any[] = [];
  personal: any[] = [];
  public constractUrl:string="http://194.5.175.25:3005/public/uploads/contractSeller/4189900125.docx";
  public shopForm: FormGroup;
  public contactForm: FormGroup;
  public businessForm: FormGroup;
  public personalForm: FormGroup;
  states: any[] = [];
  selectedState: any;
  cities: any[] = [];
  selectedCity: any;
  categories: any[] = [];
  selectedCategory: any;
  typesCompany: any[] = [];
  isCompany = false;

  persoanlErrorMessages = {
    firstName: [
      {type: 'required', message: 'نام را وارد کنید.'},
      {type: 'maxlength', message: 'نام نمی تواند از 100 کاراکتر بیشتر باشد.'}
    ],
    lastName: [
      {type: 'required', message: 'نام خانوادگی را وارد کنید.'},
      {type: 'maxlength', message: 'نام خانوادگی نمی تواند از 150 کاراکتر بیشتر باشد.'}
    ],
    password: [
      {type: 'required', message: 'کلمه عبور را وارد کنید.'},
      {type: 'minlength', message: 'کلمه عبور نمی تواند از 5 کاراکتر کمتر باشد.'}
    ],
    gender: [
      {type: 'required', message: 'جنسیت را انتخاب کنید.'}
    ],
    idNumber: [
      {type: 'required', message: 'شماره شناسنامه را وارد کنید.'},
      {type: 'maxlength', message: 'شماره شناسنامه نمی تواند از 10 رقم بیشتر باشد.'}
    ],
    nationalCode: [
      {type: 'required', message: 'کدملی را وارد کنید.'},
      {type: 'minlength', message: 'کدملی باید 10 رقم باشد.'},
      {type: 'maxlength', message: 'کدملی باید 10 رقم باشد.'}
    ],
    birthDay: [
      {type: 'required', message: 'تاریخ تولد را انتخاب کنید.'}
    ],
    imageNationalcard: [
      {type: 'required', message: 'تصویر کارت ملی را بارگذاری کنید.'}
    ]
  };
  contactErrorMessages = {
    phone: [
      {type: 'required', message: 'تلفن را وارد کنید.'},
      {type: 'minlength', message: 'تلفن باید 11 رقم باشد.'},
      {type: 'maxlength', message: 'تلفن باید 11 رقم باشد.'}
    ],
    state: [
      {type: 'required', message: 'استان را انتخاب کنید.'}
    ],
    city: [
      {type: 'required', message: 'شهر را انتخاب کنید.'}
    ],
    address: [
      {type: 'required', message: 'آدرس را وارد کنید.'},
      {type: 'maxlength', message: 'آدرس نمی تواند از 1000 کاراکتر بیشتر باشد.'}
    ]
  };
  shopErrorMessages = {
    shopName: [
      {type: 'required', message: 'نام فروشگاه را وارد کنید.'}
    ],
    category: [
      {type: 'required', message: 'دسته بندی فروشگاه را انتخاب کنید.'}
    ],
    shabaNumber: [
      {type: 'required', message: 'شماره شبا را وارد کنید.'}
    ],
    logo: [
      {type: 'required', message: 'لوگو را وارد کنید.'}
    ]
  };
  businessErrorMessages = {
    companyName: [
      {type: 'required', message: 'نام فروشگاه را وارد کنید.'}
    ],
    regNumCompany: [
      {type: 'required', message: 'شماره ثبت را انتخاب کنید.'}
    ],
    economicCompany: [
      {type: 'required', message: 'کد اقتصادی را وارد کنید.'}
    ],
    typeCompany: [
      {type: 'required', message: 'نوع فروشگاه را انتخاب کنید.'}
    ],
    signCompany: [
      {type: 'required', message: 'حق امضا را وارد کنید.'}
    ],
    imageSeller: [
      {type: 'required', message: 'تصویر فروشنده را بارگذاری کنید.'}
    ],
    imageCertificate: [
      {type: 'required', message: 'فایل تصویر فروشگاه را بارگذاری کنید.'}
    ],
    imageCompany: [
      {type: 'required', message: 'فایل تصویر فروشگاه را بارگذاری کنید.'}
    ],
    resume: [
      {type: 'required', message: 'فایل رزومه را بارگذاری کنید.'}
    ]
  };

  constructor(private formBuilder: FormBuilder,
              private sellerService: SellerService,
              private messageService: MessageService,
              private router: Router,
              public overlayService: OverlayService,
              public localStorage: LocalStorageService) {

    this.states = [
      {
        code: '1',
        name: 'آذربایجان شرقی'
      },
      {
        code: '2',
        name: 'آذربایجان غربی'
      },
      {
        code: '3',
        name: 'اردبیل'
      },
      {
        code: '4',
        name: 'اصفهان'
      },
      {
        code: '5',
        name: 'ایلام'
      },
      {
        code: '6',
        name: 'بوشهر'
      },
      {
        code: '7',
        name: 'تهران'
      },
      {
        code: '8',
        name: 'چهارمحال و بختیاری'
      },
      {
        code: '9',
        name: 'خراسان جنوبی'
      },
      {
        code: '10',
        name: 'خراسان رضوی'
      },
      {
        code: '11',
        name: 'خراسان شمالی'
      },
      {
        code: '12',
        name: 'خوزستان'
      },
      {
        code: '13',
        name: 'زنجان'
      },
      {
        code: '14',
        name: 'سمنان'
      },
      {
        code: '15',
        name: 'سیستان و بلوچستان'
      },
      {
        code: '16',
        name: 'فارس'
      },
      {
        code: '17',
        name: 'قزوین'
      },
      {
        code: '18',
        name: 'قم'
      },
      {
        code: '19',
        name: 'گلستان'
      },
      {
        code: '20',
        name: 'گیلان'
      },
      {
        code: '21',
        name: 'لرستان'
      },
      {
        code: '22',
        name: 'مازندران'
      },
      {
        code: '23',
        name: 'مرکزی'
      },
      {
        code: '24',
        name: 'هرمزگان'
      },
      {
        code: '25',
        name: 'همدان'
      },
      {
        code: '26',
        name: 'کردستان'
      },
      {
        code: '27',
        name: 'کرمان'
      },
      {
        code: '28',
        name: 'کرمانشاه'
      },
      {
        code: '29',
        name: 'کهگیلویه و بویر احمد'
      },
      {
        code: '30',
        name: 'یزد'
      },
      {
        code: '31',
        name: 'البرز'
      }

    ];
    this.typesCompany = [
      {name: 'سهامی عام', code: 'سهامی عام'},
      {name: 'سهامی خاص', code: 'سهامی خاص'},
      {name: 'مسولیت محدود', code: 'مسولیت محدود'},
      {name: 'تعاونی', code: 'تعاونی'}
    ];
  }

  ngOnInit(): void {
    this.localStorage.getCurrentUser();

    this.getSeller(this.localStorage.userJson._id);

    this.getCategories();

    this.createShopForm();
    this.createContactForm();
    this.createBussinessForm();
    this.createPersonalForm();
    this.getSelectedState();
    this.getSelectedCity();
  }

  createShopForm(): void {
    this.shopForm = this.formBuilder.group({
      shopName: new FormControl(
        this.localStorage.userJson.shopName,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ),
      category: new FormControl(
        this.localStorage.userJson.category,
        [
          Validators.required
        ]
      ),
      shabaNumber: new FormControl(
        this.localStorage.userJson.shabaNumber,
        [
          Validators.required
        ]
      ),
      logo: new FormControl(
        this.localStorage.userJson.logo,
        [
          Validators.required
        ]
      ),
    });
  }

  createContactForm(): void {
    this.contactForm = this.formBuilder.group({
      phone: new FormControl(
        this.localStorage.userJson.phone,
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(11)
        ]
      ),
      state: new FormControl(
        this.localStorage.userJson.state,
        [
          Validators.required
        ]
      ),
      city: new FormControl(
        this.localStorage.userJson.city,
        [
          Validators.required
        ]
      ),
      address: new FormControl(
        this.localStorage.userJson.address,
        [
          Validators.required,
          Validators.maxLength(1000)
        ]
      )
    });
  }

  getSelectedState(): void {
    this.selectedState = null;
    if (this.localStorage.userJson.state !== null) {
      this.selectedState = this.states.filter(x => x.label === this.localStorage.userJson.state)[0];
    }
    this.contactForm.controls.state.setValue(this.selectedState);
  }

  getSelectedCity(): void {
    this.selectedCity = null;

    if (this.localStorage.userJson.hasOwnProperty('city')) {
      if (this.localStorage.userJson.city !== null) {
        const selectedState = this.states.filter(x => x.label === this.localStorage.userJson.state)[0];
        this.stateOnChange(selectedState.value);
        this.selectedCity = this.cities.filter(x => x.label === this.localStorage.userJson.city)[0];
      }
    }
    this.contactForm.controls.city.setValue(this.selectedCity);
  }

  getSelectedCategory(): void {
    this.selectedCategory = null;

    if (this.localStorage.userJson.category !== null) {
      this.selectedCategory = this.categories.filter(x => x.title === this.localStorage.userJson.category)[0];
    }
    this.shopForm.controls.category.setValue(this.selectedCategory);
  }

  createBussinessForm(): void {
    this.businessForm = this.formBuilder.group({
      companyName: new FormControl(
        this.localStorage.userJson.companyName,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ),
      signCompany: new FormControl(
        this.localStorage.userJson.signCompany,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ),
      regNumCompany: new FormControl(
        this.localStorage.userJson.regNumCompany,
        [
          Validators.required
        ]
      ),
      economicCompany: new FormControl(
        this.localStorage.userJson.economicCompany,
        [
          Validators.required
        ]
      ),
      typeCompany: new FormControl(
        this.localStorage.userJson.typeCompany,
        [
          Validators.required
        ]
      ),
      imageSeller: new FormControl(
        this.localStorage.userJson.imageSeller,
        [
          Validators.required
        ]
      ),
      imageCertificate: new FormControl(
        this.localStorage.userJson.imageCertificate,
        [
          Validators.required
        ]
      ),
      imageCompany: new FormControl(
        this.localStorage.userJson.imageCompany,
        [
          Validators.required
        ]
      ),
      resume: new FormControl(
        this.localStorage.userJson.resume,
        [
          Validators.required
        ]
      ),
    });
  }

  createPersonalForm(): void {
    this.personalForm = this.formBuilder.group({
      firstName: new FormControl(
        this.localStorage.userJson.firstName,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ),
      lastName: new FormControl(
        this.localStorage.userJson.lastName,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ),
      gender: new FormControl(
        this.localStorage.userJson.gender,
        [
          Validators.required
        ]
      ),
      idNumber: new FormControl(
        this.localStorage.userJson.idNumber,
        [
          Validators.required,
          Validators.maxLength(10)
        ]
      ),
      nationalCode: new FormControl(
        this.localStorage.userJson.nationalCode,
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10)
        ]
      ),
      birthDay: new FormControl(
        this.localStorage.userJson.birthDay,
        [
          Validators.required
        ]
      ),
      imageNationalcard: new FormControl(
        this.localStorage.userJson.imageNationalcard,
        [
          Validators.required
        ]
      ),
    });
  }

  stateOnChange(code: any): void {
    this.cities = [];
    switch (code) {
      case '1': {
        this.cities = [{code: '1', name: 'آذرشهر'}, {code: '2', name: 'اسکو'}, {code: '3', name: 'اهر'}, {
          code: '4',
          name: 'بستان آباد'
        }, {code: '5', name: 'بناب'}, {code: '6', name: 'تبریز'}, {code: '7', name: 'جلفا'}, {
          code: '8',
          name: 'چار اویماق'
        }, {code: '9', name: 'سراب'}, {code: '10', name: 'شبستر'}, {code: '11', name: 'عجب شیر'}, {
          code: '12',
          name: 'مراغه'
        }, {code: '13', name: 'مرند'}, {code: '14', name: 'ملکان'}, {code: '15', name: 'میانه'}, {
          code: '16',
          name: 'هریس'
        }, {code: '17', name: 'هشترود'}, {code: '18', name: 'ورزقان'}, {code: '19', name: 'کلیبر'}, {
          code: '20',
          name: 'خدا آفرین'
        }];
        break;
      }
      case '2': {
        this.cities = [{code: '21', name: 'ارومیه'}, {code: '22', name: 'اشنویه'}, {code: '23', name: 'بوکان'}, {
          code: '24',
          name: 'پیرانشهر'
        }, {code: '25', name: 'تکاب'}, {code: '26', name: 'چالدران'}, {code: '27', name: 'خوی'}, {
          code: '28',
          name: 'سردشت'
        }, {code: '29', name: 'سلماس'}, {code: '30', name: 'شاهین دژ'}, {code: '31', name: 'ماکو'}, {
          code: '32',
          name: 'مهاباد'
        }, {code: '33', name: 'میاندوآب'}, {code: '34', name: 'نقده'}, {code: '35', name: 'شوط'}, {
          code: '36',
          name: 'پلدشت'
        }, {code: '37', name: 'چابیاره'}];
        break;
      }
      case '3': {
        this.cities = [{code: '38', name: 'اردبیل'}, {code: '39', name: 'پیله سوار'}, {code: '40', name: 'پارس آباد'}, {
          code: '41',
          name: 'خلخال'
        }, {code: '42', name: 'گرمی'}, {code: '43', name: 'مشکین شهر'}, {code: '44', name: 'نمین'}, {
          code: '45',
          name: 'نیر'
        }, {code: '46', name: 'کوثر'}, {code: '47', name: 'سرعین'}];
        break;
      }
      case '4': {
        this.cities = [{code: '48', name: 'آران و بیدگل'}, {code: '49', name: 'اردستان'}, {code: '50', name: 'اصفهان'}, {
          code: '51',
          name: 'برخوار'
        }, {code: '52', name: 'تیران و کرون'}, {code: '53', name: 'چادگان'}, {code: '54', name: 'خمینی شهر'}, {
          code: '55',
          name: 'خوانسار'
        }, {code: '56', name: 'سمیرم'}, {code: '57', name: 'دهاقان'}, {code: '58', name: 'شاهین شهر ومیمه'}, {
          code: '59',
          name: 'شهرضا'
        }, {code: '60', name: 'فریدن'}, {code: '61', name: 'فریدون شهر'}, {code: '62', name: 'فلاورجان'}, {
          code: '63',
          name: 'گلپایگان'
        }, {code: '64', name: 'لنجان'}, {code: '65', name: 'مبارکه'}, {code: '66', name: 'نائین'}, {
          code: '67',
          name: 'نجف آباد'
        }, {code: '68', name: 'نطنز'}, {code: '69', name: 'کاشان'}, {code: '70', name: 'خور و بیابانک'}, {
          code: '71',
          name: 'بویین میاندشت'
        }];
        break;
      }
      case '5': {
        this.cities = [{code: '72', name: 'آبدانان'}, {code: '73', name: 'ایلام'}, {code: '74', name: 'ایوان'}, {
          code: '75',
          name: 'دره شهر'
        }, {code: '76', name: 'دهلران'}, {code: '77', name: 'چرداول'}, {code: '78', name: 'مهران'}, {
          code: '79',
          name: 'ملکشاهی'
        }, {code: '80', name: 'بدره'}, {code: '81', name: 'سیروان'}];
        break;
      }
      case '6': {
        this.cities = [{code: '82', name: 'بوشهر'}, {code: '83', name: 'تنگستان'}, {code: '84', name: 'جم'}, {
          code: '85',
          name: 'دشتستان'
        }, {code: '86', name: 'دشتی'}, {code: '87', name: 'دیر'}, {code: '88', name: 'دیلم'}, {
          code: '89',
          name: 'گناوه'
        }, {code: '90', name: 'کنگان'}];
        break;
      }
      case '7': {
        this.cities = [{code: '91', name: 'اسلامشهر'}, {code: '92', name: 'پاکدشت'}, {code: '93', name: 'تهران'}, {
          code: '94',
          name: 'دماوند'
        }, {code: '95', name: 'رباط کریم'}, {code: '96', name: 'شمیرانات'}, {code: '97', name: 'ری'}, {
          code: '98',
          name: 'شهریار'
        }, {code: '99', name: 'فیروزکوه'}, {code: '100', name: 'ورامین'}, {code: '101', name: 'بهارستان'}, {
          code: '102',
          name: 'ملارد'
        }, {code: '103', name: 'قرچک'}, {code: '104', name: 'پیشوا'}, {code: '105', name: 'قدس'}, {code: '106', name: 'پردیس'}];
        break;
      }
      case '8': {
        this.cities = [{code: '107', name: 'اردل'}, {code: '108', name: 'بروجن'}, {code: '109', name: 'شهرکرد'}, {
          code: '110',
          name: 'فارسان'
        }, {code: '111', name: 'لردگان'}, {code: '112', name: 'کوهرنگ'}, {code: '113', name: 'کیار'}, {
          code: '114',
          name: 'سامان'
        }, {code: '116', name: 'فرخ شهر'}, {code: '117', name: 'یلداچی'}, {code: '118', name: 'بن'}];
        break;
      }
      case '9': {
        this.cities = [{code: '119', name: 'بیرجند'}, {code: '120', name: 'درمیان'}, {code: '121', name: 'سرایان'}, {
          code: '122',
          name: 'سرپیشه'
        }, {code: '123', name: 'طبس'}, {code: '124', name: 'فردوس'}, {code: '125', name: 'قائنات'}, {
          code: '126',
          name: 'نهبندان'
        }, {code: '127', name: 'بشرویه'}, {code: '128', name: 'خوسف'}, {code: '129', name: 'زیرکوه'}, {
          code: '430',
          name: 'سربیشه'
        }];
        break;
      }
      case '10': {
        this.cities =
          [{code: '130', name: 'بردسکن'}, {code: '131', name: 'تایباد'}, {code: '132', name: 'تربت جام'}, {
            code: '133',
            name: 'تربت حیدریه'
          }, {code: '134', name: 'چناران'}, {code: '135', name: 'خلیل آباد'}, {code: '136', name: 'خواف'}, {
            code: '137',
            name: 'درگز'
          }, {code: '138', name: 'رشتخوار'}, {code: '139', name: 'سبزوار'}, {code: '140', name: 'سرخس'}, {
            code: '141',
            name: 'فریمان'
          }, {code: '142', name: 'قوچان'}, {code: '143', name: 'گناباد'}, {code: '144', name: 'مشهد مقدس'}, {
            code: '145',
            name: 'مه ولات'
          }, {code: '146', name: 'نیشابور'}, {code: '147', name: 'کاشمر'}, {code: '148', name: 'کلات'}, {
            code: '149',
            name: 'طرقبه شاندیز'
          }, {code: '150', name: 'چغنای'}, {code: '151', name: 'جوین'}, {code: '152', name: 'بجستان'}, {
            code: '153',
            name: 'زاوه'
          }, {code: '154', name: 'فیروزه'}, {code: '155', name: 'باخزر'}, {code: '429', name: 'اشخانه'}];
        break;
      }
      case '11': {
        this.cities = [{code: '156', name: 'اسفراین'}, {code: '157', name: 'بجنورد'}, {code: '158', name: 'جاجرم'}, {
          code: '159',
          name: 'شیروان'
        }, {code: '160', name: 'فاروج'}, {code: '161', name: 'مانه و سملقان'}, {code: '162', name: 'گرمه'}, {
          code: '163',
          name: 'راز و جرگلان'
        }];
        break;
      }
      case '12': {
        this.cities = [{code: '164', name: 'آبادان'}, {code: '165', name: 'امیدیه'}, {code: '166', name: 'اندیمشک'}, {
          code: '167',
          name: 'اهواز'
        }, {code: '168', name: 'ایذه'}, {code: '169', name: 'باغ ملک'}, {code: '170', name: 'بندر ماهشهر'}, {
          code: '171',
          name: 'بهبهان'
        }, {code: '172', name: 'خرمشهر'}, {code: '173', name: 'دزفول'}, {code: '174', name: 'دشت آزادگان(سوسنگرد)'}, {
          code: '175',
          name: 'رامشیر'
        }, {code: '176', name: 'رامهرمز'}, {code: '177', name: 'شادگان'}, {code: '178', name: 'شوش'}, {
          code: '179',
          name: 'شوشتر'
        }, {code: '180', name: 'گتوند'}, {code: '181', name: 'لالی'}, {code: '182', name: 'مسجد سلیمان'}, {
          code: '183',
          name: 'هندیجان'
        }, {code: '184', name: 'بندر امام خمینی'}, {code: '185', name: 'هفتکل'}, {code: '186', name: 'هویزه'}, {
          code: '187',
          name: 'اندیکا'
        }, {code: '188', name: 'باوی'}, {code: '189', name: 'حمیدیه'}, {code: '190', name: 'کارون'}];
        break;
      }
      case '13': {
        this.cities = [{code: '191', name: 'ابهر'}, {code: '192', name: 'ایجرود'}, {
          code: '193',
          name: 'خدابنده(قیدار)'
        }, {code: '194', name: 'خرم دره'}, {code: '195', name: 'زنجان'}, {code: '196', name: 'طارم'}, {
          code: '197',
          name: 'ماهنشان'
        }, {code: '198', name: 'سلطانیه'}];
        break;
      }
      case '14': {
        this.cities = [{code: '199', name: 'دامغان'}, {code: '200', name: 'سمنان'}, {code: '201', name: 'شاهرود'}, {
          code: '202',
          name: 'گرمسار'
        }, {code: '203', name: 'مهدی شهر'}, {code: '204', name: 'میامی'}, {code: '205', name: 'آرادان'}];
        break;
      }
      case '15': {
        this.cities = [{code: '206', name: 'ایرانشهر'}, {code: '207', name: 'چابهار'}, {code: '208', name: 'خاش'}, {
          code: '209',
          name: 'زابل'
        }, {code: '210', name: 'زاهدان'}, {code: '211', name: 'زهک'}, {code: '212', name: 'سراوان'}, {
          code: '213',
          name: 'سرباز'
        }, {code: '214', name: 'نیکشهر'}, {code: '215', name: 'کنارک'}, {code: '216', name: 'هیرمند'}, {
          code: '217',
          name: 'قصرقند'
        }, {code: '218', name: 'مهرستان'}, {code: '219', name: 'سیب و سوران'}, {code: '220', name: 'فنوج'}, {
          code: '221',
          name: 'نیمروز'
        }, {code: '222', name: 'میرجاوه'}, {code: '223', name: 'هامون'}];
        break;
      }
      case '16': {
        this.cities = [{code: '224', name: 'آباده'}, {code: '225', name: 'ارسنجان'}, {code: '226', name: 'استهبان'}, {
          code: '227',
          name: 'اقلید'
        }, {code: '228', name: 'بوانات'}, {code: '229', name: 'پاسارگاد'}, {code: '230', name: 'جهرم'}, {
          code: '231',
          name: 'خرم بید'
        }, {code: '232', name: 'خنج'}, {code: '233', name: 'داراب'}, {code: '234', name: 'زرین دشت'}, {
          code: '235',
          name: 'سپیدان'
        }, {code: '236', name: 'شیراز'}, {code: '237', name: 'فراشبند'}, {code: '238', name: 'فسا'}, {
          code: '239',
          name: 'فیروزآیاد'
        }, {code: '240', name: 'قیر و کارزین'}, {code: '241', name: 'لارستان'}, {code: '242', name: 'لامرد'}, {
          code: '243',
          name: 'مرودشت'
        }, {code: '244', name: 'مهر'}, {code: '245', name: 'ممستی'}, {code: '246', name: 'نی ریز'}, {
          code: '247',
          name: 'کازرون'
        }, {code: '248', name: 'سروستان'}, {code: '249', name: 'رستم'}, {code: '250', name: 'گراش'}, {
          code: '251',
          name: 'خرامه'
        }, {code: '252', name: 'کوار'}];
        break;
      }
      case '17': {
        this.cities = [{code: '255', name: 'آبیک'}, {code: '256', name: 'البرز'}, {code: '257', name: 'بویین زهرا'}, {
          code: '258',
          name: 'تاکستان'
        }, {code: '259', name: 'قزوین'}, {code: '260', name: 'آوج'}];
        break;
      }
      case '18': {
        this.cities = [{code: '261', name: 'قم'}];
        break;
      }
      case '19': {
        this.cities = [{code: '262', name: 'آزادشهر'}, {code: '263', name: 'گلستان - آزادشهر'}, {
          code: '264',
          name: 'آق قلا'
        }, {code: '265', name: 'بندر ترکمن'}, {code: '266', name: 'بندر گز'}, {code: '267', name: 'رامیان'}, {
          code: '268',
          name: 'علی آباد'
        }, {code: '269', name: 'گرگان'}, {code: '270', name: 'گنبد کاووس'}, {code: '271', name: 'مینو دشت'}, {
          code: '272',
          name: 'کرد کوی'
        }, {code: '273', name: 'کلاله'}, {code: '274', name: 'گالیکش'}, {code: '275', name: 'گمیشان'}, {
          code: '276',
          name: 'مراوه تپه'
        }];
        break;
      }
      case '20': {
        this.cities = [{code: '277', name: 'آستارا'}, {code: '278', name: 'آستانه اشرفیه'}, {
          code: '279',
          name: 'املش'
        }, {code: '280', name: 'بندر انزلی'}, {code: '281', name: 'تالش'}, {code: '282', name: 'رشت'}, {
          code: '283',
          name: 'رضوان شهر'
        }, {code: '284', name: 'رودبار'}, {code: '285', name: 'رودسر'}, {code: '286', name: 'سیاهکل'}, {
          code: '287',
          name: 'شفت'
        }, {code: '288', name: 'صومعه سرا'}, {code: '289', name: 'فومن'}, {code: '290', name: 'لاهیجان'}, {
          code: '291',
          name: 'لنگرود'
        }, {code: '292', name: 'ماسال'}];
        break;
      }
      case '21': {
        this.cities = [{code: '293', name: 'ازنا'}, {code: '294', name: 'الیگودرز'}, {code: '295', name: 'بروجرد'}, {
          code: '296',
          name: 'پل دختر'
        }, {code: '297', name: 'خرم آباد'}, {code: '298', name: 'دلقان(نورآباد)'}, {code: '299', name: 'دورود'}, {
          code: '300',
          name: 'سلسله(الشتر)'
        }, {code: '301', name: 'کوهدشت'}];
        break;
      }
      case '22': {
        this.cities = [{code: '302', name: 'آمل'}, {code: '303', name: 'بابل'}, {code: '304', name: 'بابلسر'}, {
          code: '305',
          name: 'بهشهر'
        }, {code: '306', name: 'تنکابن'}, {code: '307', name: 'جویبار'}, {code: '308', name: 'چالوس'}, {
          code: '309',
          name: 'رامسر'
        }, {code: '310', name: 'ساری'}, {code: '311', name: 'سوادکوه'}, {code: '312', name: 'عباس آباد'}, {
          code: '313',
          name: 'قائم شهر'
        }, {code: '314', name: 'گلوگاه'}, {code: '315', name: 'محمود آباد'}, {code: '316', name: 'نور'}, {
          code: '317',
          name: 'نوشهر'
        }, {code: '318', name: 'نکا'}, {code: '319', name: 'فریدونکنار'}, {code: '320', name: 'زیراب'}, {
          code: '321',
          name: 'سوادکوه شمالی'
        }, {code: '322', name: 'میاندرود'}, {code: '323', name: 'کلاردشت'}, {code: '324', name: 'سیمرغ'}];
        break;
      }
      case '23': {
        this.cities = [{code: '325', name: 'آشتیان'}, {code: '326', name: 'اراک'}, {code: '327', name: 'تفرش'}, {
          code: '328',
          name: 'خمین'
        }, {code: '329', name: 'دلیجان'}, {code: '330', name: 'زرندیه'}, {code: '331', name: 'ساوه'}, {
          code: '332',
          name: 'شازند'
        }, {code: '333', name: 'محلات'}, {code: '334', name: 'کمیجان'}, {code: '335', name: 'خنداب'}, {
          code: '336',
          name: 'فراهان'
        }];
        break;
      }
      case '24': {
        this.cities = [{code: '337', name: 'بستک'}, {code: '338', name: 'بندرعباس'}, {code: '339', name: 'بندر لنگه'}, {
          code: '340',
          name: 'پارسیان'
        }, {code: '341', name: 'جاسک'}, {code: '342', name: 'حاجی آباد'}, {code: '343', name: 'خمیر'}, {
          code: '344',
          name: 'رودان(دهبارز)'
        }, {code: '345', name: 'میناب'}, {code: '346', name: 'سیربک'}, {code: '347', name: 'قشم'}, {
          code: '348',
          name: 'ابوموسی'
        }, {code: '349', name: 'بشاگرد'}, {code: '350', name: 'کیش'}];
        break;
      }
      case '25': {
        this.cities = [{code: '351', name: 'اسد آباد'}, {code: '352', name: 'بهار'}, {code: '353', name: 'تویسرکان'}, {
          code: '354',
          name: 'رزن'
        }, {code: '355', name: 'فامتین'}, {code: '356', name: 'ملایر'}, {code: '357', name: 'نهاوند'}, {
          code: '358',
          name: 'همدان'
        }, {code: '359', name: 'کیودرآهنگ'}];
        break;
      }
      case '26': {
        this.cities = [{code: '360', name: 'بانه'}, {code: '361', name: 'بیجار'}, {code: '362', name: 'دیواندره'}, {
          code: '363',
          name: 'سروآباد'
        }, {code: '364', name: 'سقز'}, {code: '365', name: 'سنندج'}, {code: '366', name: 'قروه'}, {
          code: '367',
          name: 'مریوان'
        }, {code: '368', name: 'کامیاران'}, {code: '369', name: 'دهگلان'}];
        break;
      }
      case '27': {
        this.cities = [{code: '370', name: 'بافت'}, {code: '371', name: 'بردسیر(مشیز)'}, {code: '372', name: 'بم'}, {
          code: '373',
          name: 'راور'
        }, {code: '374', name: 'رفسنجان'}, {code: '375', name: 'زرند'}, {code: '376', name: 'سیرجان'}, {
          code: '377',
          name: 'شهر بابک'
        }, {code: '378', name: 'قهرج'}, {code: '379', name: 'کرمان'}, {code: '380', name: 'کوهبنان'}, {
          code: '381',
          name: 'انار'
        }, {code: '382', name: 'ریگان'}, {code: '383', name: 'رابر'}, {code: '420', name: 'جیرفت'}, {
          code: '421',
          name: 'رودبار جنوبی'
        }, {code: '422', name: 'عنبر آباد'}, {code: '423', name: 'منوجان'}, {code: '424', name: 'کهنوج'}, {
          code: '425',
          name: 'قلعه گنج'
        }];
        break;
      }
      case '28': {
        this.cities = [{code: '384', name: 'اسلام آباد غرب'}, {code: '385', name: 'پاوه'}, {
          code: '386',
          name: 'ثلاث باباجانی'
        }, {code: '387', name: 'جوانرود'}, {code: '388', name: 'دالاهو'}, {code: '389', name: 'روانسر'}, {
          code: '390',
          name: 'سرپل ذهاب'
        }, {code: '391', name: 'سنقر'}, {code: '392', name: 'صحنه'}, {code: '393', name: 'قصر شیرین'}, {
          code: '394',
          name: 'گیلانغرب'
        }, {code: '395', name: 'هرسین'}, {code: '396', name: 'کرمانشاه'}, {code: '397', name: 'کنگاور'}];
        break;
      }
      case '29': {
        this.cities = [{code: '398', name: 'بهمئی'}, {code: '399', name: 'دنا'}, {code: '400', name: 'گچساران'}, {
          code: '401',
          name: 'کهگیلویه'
        }, {code: '402', name: 'بویر احمد'}, {code: '403', name: 'باشت'}, {code: '427', name: 'یاسوج'}];
        break;
      }
      case '30': {
        this.cities = [{code: '404', name: 'ابرکوه'}, {code: '405', name: 'اردکان'}, {code: '406', name: 'بافق'}, {
          code: '407',
          name: 'تفت'
        }, {code: '408', name: 'خاتم'}, {code: '409', name: 'اشکذر'}, {code: '410', name: 'مهریز'}, {
          code: '411',
          name: 'میبد'
        }, {code: '412', name: 'یزد'}, {code: '413', name: 'بهاباد'}];
        break;
      }
      case '31': {
        this.cities = [{code: '414', name: 'ساوجبلاغ'}, {code: '415', name: 'کرج'}, {code: '416', name: 'نظرآباد'}, {
          code: '417',
          name: 'فردیس'
        }, {code: '418', name: 'اشتهارد'}, {code: '419', name: 'طالقان'}, {code: '426', name: 'هشتگرد'}];
        break;
      }
      default: {
        this.cities = [];
        break;
      }
    }
  }

  submitShopForm(): void {
    const category = this.shopForm.controls.category.value;
    this.shopForm.controls.category.setValue(category.name);

    const state = this.contactForm.controls.state.value;
    if (state !== null) {
      this.contactForm.controls.state.setValue(state.value);
    }
    const city = this.contactForm.controls.city.value;
    if (city !== null) {
      this.contactForm.controls.city.setValue(city.value);
    }
    const shop = this.shopForm.value;
    const contact = this.contactForm.value;
    const personal = this.personalForm.value;
    const business = this.businessForm.value;

    const formData = {
      ...shop, ...contact, ...personal, ...business
    };

    this.sellerService.updateSeller(this.localStorage.userJson._id, formData).subscribe((response) => {
      if (response.success === true) {
        this.getSeller(this.localStorage.userJson._id);

        this.shopForm.controls.category.setValue(category);
        this.contactForm.controls.state.setValue(state);
        this.contactForm.controls.city.setValue(city);
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }

  submitContactForm(): void {
    const state = this.contactForm.controls.state.value;
    this.contactForm.controls.state.setValue(state.name);

    const city = this.contactForm.controls.city.value;
    this.contactForm.controls.city.setValue(city.name);

    const category = this.shopForm.controls.category.value;
    this.shopForm.controls.category.setValue(category.name);

    const shop = this.shopForm.value;
    const contact = this.contactForm.value;
    const personal = this.personalForm.value;
    const bussiness = this.businessForm.value;

    const formData = {
      ...shop, ...contact, ...personal, ...bussiness
    };

    this.sellerService.updateSeller(this.localStorage.userJson._id, formData).subscribe((response) => {
      if (response.success === true) {
        this.getSeller(this.localStorage.userJson._id);

        this.contactForm.controls.state.setValue(state);
        this.contactForm.controls.city.setValue(city);
        this.shopForm.controls.category.setValue(category);
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }

  submitPersonalForm(): void {
    const state = this.contactForm.controls.state.value;
    this.contactForm.controls.state.setValue(state.name);

    const city = this.contactForm.controls.city.value;
    this.contactForm.controls.city.setValue(city.name);

    const category = this.shopForm.controls.category.value;
    this.shopForm.controls.category.setValue(category.name);

    const shop = this.shopForm.value;
    const contact = this.contactForm.value;
    const personal = this.personalForm.value;

    const formData = {
      ...shop, ...contact, ...personal
    };

    this.sellerService.updateSeller(this.localStorage.userJson._id, formData).subscribe((response) => {
      if (response.success === true) {
        this.getSeller(this.localStorage.userJson._id);

        this.contactForm.controls.state.setValue(state);
        this.contactForm.controls.city.setValue(city);
        this.shopForm.controls.category.setValue(category);

        this.messageService.add({severity: 'success', summary: ' ثبت اطلاعات ', detail: response.data});

      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }

  submitBusinessForm(): void {
    const state = this.contactForm.controls.state.value;
    this.contactForm.controls.state.setValue(state.name);

    const city = this.contactForm.controls.city.value;
    this.contactForm.controls.city.setValue(city.name);

    const category = this.shopForm.controls.category.value;
    this.shopForm.controls.category.setValue(category.name);

    const shop = this.shopForm.value;
    const contact = this.contactForm.value;
    const business = this.businessForm.value;

    const formData = {
      ...shop, ...contact, ...business
    };

    this.sellerService.updateSeller(this.localStorage.userJson._id, formData).subscribe((response) => {
      if (response.success === true) {
        this.getSeller(this.localStorage.userJson._id);

        this.contactForm.controls.state.setValue(state);
        this.contactForm.controls.city.setValue(city);
        this.shopForm.controls.category.setValue(category);

        this.messageService.add({severity: 'success', summary: ' ثبت اطلاعات ', detail: response.data});

      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }

  getSeller(id: any): void {
    this.sellerService.getSeller(id).subscribe((response) => {
      if (response.success === true) {
        this.localStorage.saveCurrentUser(JSON.stringify(response.data[0]));
        this.localStorage.getCurrentUser();
      } else {
        this.messageService.add({severity: 'error', summary: ' دریافت اطلاعات فروشنده ', detail: response.data});
      }
    });
  }

  getCategories(): void {
    this.sellerService.getCategories().subscribe((response) => {
      if (response.success === true) {
        this.categories = response.data;

        this.getSelectedCategory();
      } else {
        this.messageService.add({severity: 'error', summary: ' دریافت دسته بندی ها ', detail: response.data});
      }
    });
  }

  logoUploader(event): void {
    this.overlayService.showOverlay = true;
    const formData = new FormData();
    formData.append('image', event.files[0], event.files[0].name);
    this.sellerService.uploadFile(formData).subscribe((response) => {
      if (response.success === true) {
        this.overlayService.showOverlay = false;
        this.shopForm.controls.logo.setValue(response.imagePath);
        this.messageService.add({severity: 'success', summary: ' آپلود لوگو ', detail: 'تصویر با موفقیت آپلود شد.'});
      } else {
        this.messageService.add({severity: 'error', summary: ' آپلود لوگو ', detail: response.data});
      }
    });
  }

  imageSellerUploader(event): void {
    this.overlayService.showOverlay = true;
    const formData = new FormData();
    formData.append('image', event.files[0], event.files[0].name);
    this.sellerService.uploadFile(formData).subscribe((response) => {
      if (response.success === true) {
        this.overlayService.showOverlay = false;
        this.businessForm.controls.imageSeller.setValue(response.imagePath);
        this.messageService.add({severity: 'success', summary: ' آپلود تصویر فروشنده ', detail: 'تصویر با موفقیت آپلود شد.'});

      } else {
        this.messageService.add({severity: 'error', summary: ' آپلود تصویر فروشنده ', detail: response.data});
      }
    });
  }

  imageNationalcardUploader(event): void {
    this.overlayService.showOverlay = true;
    const formData = new FormData();
    formData.append('image', event.files[0], event.files[0].name);
    this.sellerService.uploadFile(formData).subscribe((response) => {
      if (response.success === true) {
        this.overlayService.showOverlay = false;
        this.personalForm.controls.imageNationalcard.setValue(response.imagePath);
        this.messageService.add({severity: 'success', summary: ' آپلود تصویر کارت ملی ', detail: 'تصویر با موفقیت آپلود شد.'});

      } else {
        this.messageService.add({severity: 'error', summary: ' آپلود تصویر کارت ملی ', detail: response.data});
      }
    });
  }

  imageCertificateUploader(event): void {
    this.overlayService.showOverlay = true;
    const formData = new FormData();
    formData.append('image', event.files[0], event.files[0].name);
    this.sellerService.uploadFile(formData).subscribe((response) => {
      if (response.success === true) {
        this.overlayService.showOverlay = false;
        this.businessForm.controls.imageCertificate.setValue(response.imagePath);
        this.messageService.add({severity: 'success', summary: ' آپلود گواهی ', detail: 'تصویر با موفقیت آپلود شد.'});

      } else {
        this.messageService.add({severity: 'error', summary: ' آپلود گواهی ', detail: response.data});
      }
    });
  }

  imageCompanyUploader(event): void {
    this.overlayService.showOverlay = true;
    const formData = new FormData();
    formData.append('image', event.files[0], event.files[0].name);
    this.sellerService.uploadFile(formData).subscribe((response) => {
      if (response.success === true) {
        this.overlayService.showOverlay = false;
        this.businessForm.controls.imageCompany.setValue(response.imagePath);
        this.messageService.add({severity: 'success', summary: ' آپلود تصویر فروشگاه ', detail: 'تصویر با موفقیت آپلود شد.'});

      } else {
        this.messageService.add({severity: 'error', summary: ' آپلود تصویر فروشگاه ', detail: response.data});
      }
    });
  }

  resumeUploader(event): void {
    this.overlayService.showOverlay = true;
    const formData = new FormData();
    formData.append('image', event.files[0], event.files[0].name);
    this.sellerService.uploadFile(formData).subscribe((response) => {
      if (response.success === true) {
        this.overlayService.showOverlay = false;
        this.businessForm.controls.resume.setValue(response.imagePath);
        this.messageService.add({severity: 'success', summary: ' آپلود رزومه ', detail: 'فایل با موفقیت آپلود شد.'});

      } else {
        this.messageService.add({severity: 'error', summary: ' آپلود رزومه ', detail: response.data});
      }
    });
  }

  isCompanyOnChange(): void {
    this.isCompany = !this.isCompany;
  }
  generateContractSeller(){
    let data={
      startDate:'1399/10/28',
      endDate:'1400/10/27',
      firstName:'رسول',
      lastName:'صیدی',
      nationalCode: '4189900125',
      mobile:'09166996165',
      startYear:'1399',
      endYear:'1400',
      address:'لرستان-الشتر',
      postalCode:'6896143533'
    }
    this.sellerService.generateContractSeller(data).subscribe((response)=>{
      if(response['success']===true){
        console.log(response);
        this.constractUrl=response['ContractText']
      }

    })
  }
}
