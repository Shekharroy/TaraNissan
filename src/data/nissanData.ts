import { CarModel, HeroSlide, Dealer, NewsItem } from '../types';

export const NISSAN_LOGO_URL = 'https://www.nissan.in/etc/designs/nissan_next_v4/26.09.30.NISSAN-15/common-assets/img/logo/logo.png';

export const CAR_MODELS: CarModel[] = [
  {
    id: 'nissan-tekton',
    name: 'Tekton',
    badge: 'ALL-NEW PREMIERE',
    tagline: 'THE ALL-NEW NISSAN TEKTON',
    subTagline: 'Experience Bold Design & Unmatched Performance',
    category: 'compact-suv',
    priceDisplay: 'Starting from ₹ 10.50 Lakh*',
    priceRaw: 10.50,
    cardImage: 'https://www.nissan.in/content/dam/Nissan/in/vehicles/takton/images/Homepage-Desktop-&-Mobile-Banner-320x188.jpg.ximg.l_3_m.smart.jpg',
    heroBanner: 'https://www.nissan.in/content/dam/Nissan/in/vehicles/takton/100500_Nissan-Tekton-September-Pace-Banner-Desktop-3000-x-1300.jpg.ximg.full.hero.jpg',
    additionalImages: [
      'https://www.nissan.in/content/dam/Nissan/in/vehicles/takton/100500_Nissan-Tekton-September-Pace-Banner-Desktop-3000-x-1300.jpg.ximg.full.hero.jpg',
      'https://www.nissan.in/content/dam/Nissan/in/vehicles/takton/images/Homepage-Desktop-&-Mobile-Banner-320x188.jpg.ximg.l_3_m.smart.jpg'
    ],
    description: 'The all-new Nissan Tekton embodies commanding road presence with contemporary sculptured architecture, Level 2 ADAS active safety suite, dual high-definition displays, and dynamic turbocharged powertrain engineered for modern Indian terrains.',
    mileage: '19.4 kmpl*',
    engine: '1.0L Turbo / 1.5L Dual-VVT Petrol',
    power: '120 PS / 160 Nm Torque',
    safetyRating: 'Engineered for 5-Star NCAP',
    groundClearance: '208 mm',
    seatingCapacity: '5 Seater',
    transmission: ['6-Speed Manual', 'Advanced X-Tronic CVT'],
    fuelTypes: ['Petrol'],
    colors: [
      { name: 'Onyx Black', hex: '#111111', code: 'KH3' },
      { name: 'Flare Garnet Red', hex: '#b31b26', code: 'NAH' },
      { name: 'Blade Silver', hex: '#b5b7b9', code: 'K23' },
      { name: 'Storm White Dual Tone', hex: '#f0f0f0', code: 'QAC' }
    ],
    variants: [
      {
        name: 'Tekton Visia',
        price: '₹ 10.50 Lakh*',
        transmission: 'Manual',
        fuel: 'Petrol',
        keyFeatures: ['6 Airbags Standard', 'LED Signature DRLs', '8-inch Touchscreen', 'Electronic Stability Control']
      },
      {
        name: 'Tekton Acenta',
        price: '₹ 11.90 Lakh*',
        transmission: 'Manual / CVT',
        fuel: 'Petrol',
        keyFeatures: ['Wireless Smartphone Connectivity', 'Rear View Camera', '16-inch Diamond-Cut Alloys', 'Auto AC']
      },
      {
        name: 'Tekton Tekna Plus',
        price: '₹ 13.80 Lakh*',
        transmission: 'CVT',
        fuel: 'Petrol',
        keyFeatures: ['Level 2 ADAS Suite', 'Panoramic Sunroof', '10.25-inch Digital Cockpit', 'Around View 360° Monitor']
      }
    ],
    keyHighlights: [
      'Level 2 ADAS with 11 Autonomous Safety Functions',
      'Panoramic Skyview Sunroof with Electric Shade',
      'Twin 10.25-inch Connected Cockpit Displays',
      'NissanConnect with 60+ Telematics Features'
    ]
  },
  {
    id: 'nissan-gravite',
    name: 'Gravite',
    badge: 'NEW ARRIVAL & CNG',
    tagline: 'DRIVE HOME NEW NISSAN GRAVITE',
    subTagline: 'Urban Style Meets Intelligent Efficiency',
    category: 'cng',
    priceDisplay: 'Starting from ₹ 6.99 Lakh*',
    priceRaw: 6.99,
    cardImage: 'https://www.nissan.in/content/dam/Nissan/in/vehicles/gravite/overview/320x188-Dealer-Website-Vehicle-Image-25febv1.jpg.ximg.l_3_m.smart.jpg',
    heroBanner: 'https://www.nissan.in/content/dam/Nissan/in/Home/hpi/100497_Nissan-Gravite-Sep.-Desktop-Banner-3000-x-1300.KV.jpg.ximg.full.hero.jpg',
    additionalImages: [
      'https://www.nissan.in/content/dam/Nissan/in/Home/hpi/100497_Nissan-Gravite-Sep.-Desktop-Banner-3000-x-1300.KV.jpg.ximg.full.hero.jpg',
      'https://www.nissan.in/content/dam/Nissan/in/vehicles/gravite/overview/320x188-Dealer-Website-Vehicle-Image-25febv1.jpg.ximg.l_3_m.smart.jpg'
    ],
    description: 'Designed for versatility and unprecedented cost efficiency, Nissan Gravite features a factory-fitted dual-cylinder CNG setup providing class-leading luggage boot space along with exceptional 28.5 km/kg efficiency and refined suspension.',
    mileage: '28.5 km/kg (CNG) | 20.2 kmpl (Petrol)',
    engine: '1.0L Energy 3-Cylinder Bi-Fuel',
    power: '72 PS (Petrol) / 67 PS (CNG)',
    safetyRating: 'High Strength Steel Reinforced Body',
    groundClearance: '200 mm',
    seatingCapacity: '5 Seater',
    transmission: ['5-Speed Manual', 'EZ-Shift AMT'],
    fuelTypes: ['CNG + Petrol', 'Petrol'],
    colors: [
      { name: 'Olive Bronze', hex: '#635d46', code: 'EAA' },
      { name: 'Pure Pearl White', hex: '#eaeaea', code: 'QX1' },
      { name: 'Metallic Silver', hex: '#a6a8ab', code: 'K23' },
      { name: 'Deep Blue', hex: '#1d3557', code: 'BW9' }
    ],
    variants: [
      {
        name: 'Gravite Visia Petrol',
        price: '₹ 6.99 Lakh*',
        transmission: 'Manual',
        fuel: 'Petrol',
        keyFeatures: ['ABS with EBD', 'Dual Airbags', 'Power Steering & Windows', 'Rear Parking Sensors']
      },
      {
        name: 'Gravite Acenta CNG',
        price: '₹ 8.10 Lakh*',
        transmission: 'Manual',
        fuel: 'CNG',
        keyFeatures: ['Factory Twin Cylinder CNG', 'Uncompromised Boot Space', '8" Smart Touchscreen', 'Steering Controls']
      },
      {
        name: 'Gravite Tekna Dual Tone',
        price: '₹ 9.25 Lakh*',
        transmission: 'AMT',
        fuel: 'Petrol',
        keyFeatures: ['Dual Tone Body Color', 'Push Button Start/Stop', 'Projector Headlamps', 'Reverse Camera']
      }
    ],
    keyHighlights: [
      'Revolutionary Dual-Cylinder CNG with Generous Usable Boot Space',
      'Remarkable 28.5 km/kg Certified Fuel Economy',
      'Smart 8-inch Floating Infotainment with Smartphone Mirroring',
      '200 mm High Ground Clearance for Indian Roads'
    ]
  },
  {
    id: 'nissan-magnite',
    name: 'New Magnite',
    badge: '5-STAR SAFETY RATING',
    tagline: 'DRIVE HOME THE BOLD SUV',
    subTagline: 'India\'s 5-Star NCAP Compact SUV with 6 Airbags Standard',
    category: 'compact-suv',
    priceDisplay: 'Starting from ₹ 5.68 Lakh*',
    priceRaw: 5.68,
    cardImage: 'https://www.nissan.in/content/dam/Nissan/in/vehicles/new-magnite/Images/2-Nissan-MC-Image-300x159-v1.jpg.ximg.l_3_m.smart.jpg',
    heroBanner: 'https://www.nissan.in/content/dam/Nissan/in/Home/hpi/Magnite-Sep-Desktop-Banner-3000-x-1300.jpg.ximg.full.hero.jpg',
    additionalImages: [
      'https://www.nissan.in/content/dam/Nissan/in/vehicles/new-magnite/overview/100497_Nissan-Magnite-Sep.-VLP-Desktop-2880-x-2048.jpg',
      'https://www.nissan.in/content/dam/Nissan/in/vehicles/new-magnite/overview/section/25-Nissan-MC-INTERIOR-Desktop_764-x-1144_pix.jpg'
    ],
    description: 'The New Nissan Magnite combines muscular SUV styling with world-class safety. Awarded a prestigious 5-Star Global NCAP safety rating and featuring 6 airbags standard across every single variant, it delivers unstoppable confidence and turbo performance.',
    mileage: '20.0 kmpl*',
    engine: '1.0L HRA0 Turbocharged / 1.0L B4D Petrol',
    power: '100 PS (Turbo) / 72 PS (Naturally Aspirated)',
    safetyRating: '5-Star Global NCAP Certified (2025-2026)',
    groundClearance: '205 mm',
    seatingCapacity: '5 Seater',
    transmission: ['5-Speed Manual', 'EZ-Shift AMT', 'X-Tronic CVT'],
    fuelTypes: ['Petrol'],
    colors: [
      { name: 'Vivid Blue & Onyx Black', hex: '#0f52ba', code: 'XBE' },
      { name: 'Flare Garnet Red', hex: '#9d1421', code: 'NAH' },
      { name: 'Blade Silver', hex: '#bcbec0', code: 'K23' },
      { name: 'Sandstone Brown', hex: '#594a42', code: 'CAB' },
      { name: 'Storm White', hex: '#f7f7f7', code: 'QAC' }
    ],
    variants: [
      {
        name: 'Magnite Visia (Base)',
        price: '₹ 5.68 Lakh*',
        transmission: 'Manual',
        fuel: 'Petrol',
        keyFeatures: ['6 Airbags Standard', 'Electronic Stability Program (ESP)', 'Traction Control', 'Hill Start Assist']
      },
      {
        name: 'Magnite Visia Plus',
        price: '₹ 6.49 Lakh*',
        transmission: 'Manual / AMT',
        fuel: 'Petrol',
        keyFeatures: ['Rear AC Vents', 'Remote Keyless Entry', 'All 4 Power Windows', 'ISOFIX Child Anchors']
      },
      {
        name: 'Magnite Acenta',
        price: '₹ 7.14 Lakh*',
        transmission: 'Manual / AMT',
        fuel: 'Petrol',
        keyFeatures: ['8-inch Touchscreen Display', 'Wireless Apple CarPlay & Android Auto', 'Shark Fin Antenna']
      },
      {
        name: 'Magnite N-Connecta',
        price: '₹ 7.86 Lakh*',
        transmission: 'Manual / CVT',
        fuel: 'Petrol',
        keyFeatures: ['7-inch TFT Digital Instrument Cluster', '16-inch Diamond Cut Alloys', 'Rear Camera']
      },
      {
        name: 'Magnite Tekna Plus Turbo',
        price: '₹ 11.16 Lakh*',
        transmission: 'X-Tronic CVT',
        fuel: 'Petrol Turbo',
        keyFeatures: ['1.0L Turbo 100PS Engine', 'Around View Monitor (AVM)', 'Cruise Control', 'Ambient Lighting']
      }
    ],
    keyHighlights: [
      '5-Star Global NCAP Safety Rating with 6 Airbags Standard Across All Trims',
      'HRA0 1.0L Turbo Petrol Engine delivering 100 PS and 160 Nm',
      'First-in-Segment 360-Degree Around View Monitor',
      'Wireless Apple CarPlay & Wireless Android Auto with PM2.5 Air Filter'
    ]
  },
  {
    id: 'nissan-kuro',
    name: 'Magnite KURO Special Edition',
    badge: 'SPECIAL ALL-BLACK EDITION',
    tagline: 'THE DARKER SIDE OF BOLD',
    subTagline: 'Blacked-out aesthetics, crimson brake calipers, and commanding attitude',
    category: 'special-edition',
    priceDisplay: 'Starting from ₹ 8.27 Lakh*',
    priceRaw: 8.27,
    cardImage: 'https://www.nissan.in/content/dam/Nissan/in/vehicles/new-kuro/VLP-Banner-300x159.png.ximg.l_3_m.smart.png',
    heroBanner: 'https://www.nissan.in/content/dam/Nissan/in/vehicles/new-kuro/Nissan-Sep.-Kuro-VLP-Desktop-2880-x-2048.KV-v1.jpg',
    additionalImages: [
      'https://www.nissan.in/content/dam/Nissan/in/vehicles/new-kuro/Nissan-Sep.-Kuro-VLP-Desktop-2880-x-2048.KV-v1.jpg',
      'https://www.nissan.in/content/dam/Nissan/in/vehicles/new-kuro/gallery/214-Nissan-Kuro--Exterior_Desktop_764-x-1144_pix.jpg'
    ],
    description: 'Inspired by Japanese minimalism and the Japanese word "KURO" meaning black, this edition features Midnight Black front grille, gloss black alloy wheels, red calipers, darkened roof rails, all-black premium cockpit, and exclusive KURO emblem.',
    mileage: '19.7 kmpl*',
    engine: '1.0L Petrol / 1.0L Turbo Petrol',
    power: '72 PS to 100 PS',
    safetyRating: '5-Star Global NCAP Rating',
    groundClearance: '205 mm',
    seatingCapacity: '5 Seater',
    transmission: ['5-Speed Manual', 'EZ-Shift AMT', 'X-Tronic CVT'],
    fuelTypes: ['Petrol'],
    colors: [
      { name: 'Kuro Midnight Black', hex: '#0a0a0a', code: 'KH3' },
      { name: 'Kuro Dual Tone Black & White', hex: '#222222', code: 'XAB' }
    ],
    variants: [
      {
        name: 'KURO Edition XV MT',
        price: '₹ 8.27 Lakh*',
        transmission: 'Manual',
        fuel: 'Petrol',
        keyFeatures: ['Gloss Black Grille & Roof Rails', 'Red Front Brake Calipers', 'All-Black Interior Theme', 'KURO Badge']
      },
      {
        name: 'KURO Edition XV Turbo CVT',
        price: '₹ 10.45 Lakh*',
        transmission: 'CVT',
        fuel: 'Petrol Turbo',
        keyFeatures: ['1.0L Turbo 100PS', 'Wireless Charging Pad', '360 Around View Monitor', 'Automatic Climate Control']
      }
    ],
    keyHighlights: [
      'Stealth Midnight Black Treatment on Exterior Trim & Badging',
      'Race-Inspired Crimson Red Front Brake Calipers',
      'Piano Black Dash Finish & Charcoal Upholstery',
      'Equipped with 360-degree Around View Monitor'
    ]
  },
  {
    id: 'nissan-x-trail',
    name: 'X-TRAIL',
    badge: 'FLAGSHIP 7-SEATER LUXURY',
    tagline: 'THE ALL-NEW NISSAN X-TRAIL',
    subTagline: 'Uncompromising Presence. 1.5L VC-Turbo Mild Hybrid Engineering.',
    category: 'luxury-suv',
    priceDisplay: 'Starting from ₹ 48.20 Lakh*',
    priceRaw: 48.20,
    cardImage: 'https://www.nissan.in/content/dam/Nissan/in/vehicles/x-trail/overview/Nissan%20X-TRAIL%20Side%20Angle.png.ximg.l_3_m.smart.png',
    heroBanner: 'https://www.nissan.in/content/dam/Nissan/in/vehicles/x-trail/overview/Nissan-X-Trail-VLP-Desktop-2880-x-2048.KV-8Jan.jpg',
    additionalImages: [
      'https://www.nissan.in/content/dam/Nissan/in/vehicles/x-trail/overview/8-Nissan-X-TRAIL-VLP-Banner-2880x2048--D2.jpg',
      'https://www.nissan.in/content/dam/Nissan/in/vehicles/x-trail/overview/Nissan%20X-TRAIL%20Side%20Angle.png.ximg.l_3_m.smart.png'
    ],
    description: 'Nissan\'s globally renowned flagship 7-seater SUV brings Variable Compression (VC-Turbo) mild-hybrid powertrain innovation to India. Experience commanding stance, double panoramic glass roof, 3rd row modular seating, and shift-by-wire automatic transmission.',
    mileage: '13.7 kmpl*',
    engine: '1.5L KR15 VC-Turbo 3-Cyl with 12V ALiS Mild Hybrid',
    power: '163 PS Power / 300 Nm Torque',
    safetyRating: 'Euro NCAP 5-Star Safety Architecture',
    groundClearance: '210 mm',
    seatingCapacity: '7 Seater (3 Rows)',
    transmission: ['Shift-by-Wire 3rd Gen Xtronic CVT with Paddle Shifters'],
    fuelTypes: ['Petrol Mild Hybrid'],
    colors: [
      { name: 'Diamond Black', hex: '#151515', code: 'G41' },
      { name: 'Champagne Silver', hex: '#d1c7bd', code: 'KAZ' },
      { name: 'Pearl White', hex: '#f4f4f4', code: 'QAB' }
    ],
    variants: [
      {
        name: 'X-Trail STD 1.5 VC-Turbo CVT',
        price: '₹ 48.20 Lakh*',
        transmission: 'X-Tronic CVT',
        fuel: 'Petrol Mild-Hybrid',
        keyFeatures: [
          'Variable Compression Turbo (VC-Turbo)',
          'Dual Pane Panoramic Sunroof',
          'Intelligent Around View Monitor with Moving Object Detection',
          '12.3-inch Full Digital Cluster + 12.3-inch Touchscreen Navigation',
          '7 Airbags & Electronic Parking Brake with Auto Hold'
        ]
      }
    ],
    keyHighlights: [
      'World-First Variable Compression Turbo Engine (VC-Turbo)',
      'Spacious 7-Seater Modular Cabin with Sliding 2nd Row',
      'Dual Pane Electric Panoramic Moonroof',
      '3rd Gen X-Tronic CVT with Drive Mode Selector & Paddle Shifters'
    ]
  }
];

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-tekton',
    vehicleId: 'nissan-tekton',
    title: 'THE ALL-NEW NISSAN TEKTON',
    subtitle: 'Experience Bold Design & Unmatched Performance',
    priceNote: 'Starting from ₹ 10.50 Lakh*',
    desktopBanner: 'https://www.nissan.in/content/dam/Nissan/in/vehicles/takton/100500_Nissan-Tekton-September-Pace-Banner-Desktop-3000-x-1300.jpg.ximg.full.hero.jpg',
    ctaPrimary: 'EXPLORE TEKTON',
    ctaSecondary: 'BOOK TEST DRIVE'
  },
  {
    id: 'slide-gravite',
    vehicleId: 'nissan-gravite',
    title: 'DRIVE HOME NEW NISSAN GRAVITE',
    subtitle: 'Urban Style Meets Intelligent Dual-Cylinder CNG Efficiency',
    priceNote: 'Starting from ₹ 6.99 Lakh*',
    desktopBanner: 'https://www.nissan.in/content/dam/Nissan/in/Home/hpi/100497_Nissan-Gravite-Sep.-Desktop-Banner-3000-x-1300.KV.jpg.ximg.full.hero.jpg',
    ctaPrimary: 'EXPLORE GRAVITE',
    ctaSecondary: 'CHECK EMI'
  },
  {
    id: 'slide-magnite',
    vehicleId: 'nissan-magnite',
    title: 'DRIVE HOME THE BOLD SUV',
    subtitle: 'India\'s 5-Star Global NCAP Compact SUV with 6 Airbags Standard',
    priceNote: 'Starting from ₹ 5.68 Lakh*',
    desktopBanner: 'https://www.nissan.in/content/dam/Nissan/in/Home/hpi/Magnite-Sep-Desktop-Banner-3000-x-1300.jpg.ximg.full.hero.jpg',
    ctaPrimary: 'EXPLORE MAGNITE',
    ctaSecondary: 'DOWNLOAD BROCHURE'
  },
  {
    id: 'slide-xtrail',
    vehicleId: 'nissan-x-trail',
    title: 'THE ALL-NEW NISSAN X-TRAIL',
    subtitle: 'Variable Compression VC-Turbo. Premium 7-Seater Luxury SUV.',
    priceNote: 'Starting from ₹ 48.20 Lakh*',
    desktopBanner: 'https://www.nissan.in/content/dam/Nissan/in/vehicles/x-trail/overview/Nissan-X-Trail-VLP-Desktop-2880-x-2048.KV-8Jan.jpg',
    ctaPrimary: 'EXPLORE X-TRAIL',
    ctaSecondary: 'LOCATE DEALER'
  },
  {
    id: 'slide-kuro',
    vehicleId: 'nissan-kuro',
    title: 'MAGNITE KURO SPECIAL EDITION',
    subtitle: 'The Darker Side of Bold. Blacked-out Aesthetics and Red Calipers.',
    priceNote: 'Starting from ₹ 8.27 Lakh*',
    desktopBanner: 'https://www.nissan.in/content/dam/Nissan/in/vehicles/new-kuro/Nissan-Sep.-Kuro-VLP-Desktop-2880-x-2048.KV-v1.jpg',
    ctaPrimary: 'EXPLORE KURO',
    ctaSecondary: 'BOOK TEST DRIVE'
  }
];

export const DEALERS_LIST: Dealer[] = [
  {
    id: 'd0-motihari',
    name: 'Tara Nissan - Motihari (Flagship Showroom & Workshop)',
    city: 'Motihari',
    state: 'Bihar',
    address: 'Near Toll Plaza, NH28 Expressway, Bankat, Bapudham Motihari, Bihar - 845402',
    phone: '+91 90310 05087',
    email: 'contact@taranissan.in',
    timing: 'Mon - Sun: 09:00 AM - 07:30 PM',
    isServiceCenter: true
  },
  {
    id: 'd1',
    name: 'Torque Nissan - Connaught Place',
    city: 'New Delhi',
    state: 'Delhi NCR',
    address: 'Block E, Inner Circle, Connaught Place, New Delhi - 110001',
    phone: '+91 11 4350 9900',
    email: 'delhi.sales@nissandealer.in',
    timing: 'Mon - Sun: 09:30 AM - 07:30 PM',
    isServiceCenter: true
  },
  {
    id: 'd2',
    name: 'Autorelli Nissan - Andheri West',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: 'Plot 42, New Link Road, Opp. Citi Mall, Andheri West, Mumbai - 400053',
    phone: '+91 22 6124 8800',
    email: 'mumbai.andheri@nissandealer.in',
    timing: 'Mon - Sun: 09:00 AM - 08:00 PM',
    isServiceCenter: true
  },
  {
    id: 'd3',
    name: 'Surya Nissan - Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    address: '100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru - 560038',
    phone: '+91 80 4115 7700',
    email: 'bangalore.sales@nissandealer.in',
    timing: 'Mon - Sun: 09:30 AM - 08:00 PM',
    isServiceCenter: true
  },
  {
    id: 'd4',
    name: 'Jubilant Nissan - Anna Salai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    address: '752 Anna Salai, Thousand Lights, Chennai - 600002',
    phone: '+91 44 4299 1100',
    email: 'chennai.central@nissandealer.in',
    timing: 'Mon - Sun: 09:00 AM - 07:30 PM',
    isServiceCenter: true
  },
  {
    id: 'd5',
    name: 'Ritu Nissan - HITEC City',
    city: 'Hyderabad',
    state: 'Telangana',
    address: 'Cyber Towers Main Road, Madhapur, HITEC City, Hyderabad - 500081',
    phone: '+91 40 6733 4400',
    email: 'hyderabad.sales@nissandealer.in',
    timing: 'Mon - Sun: 09:30 AM - 08:00 PM',
    isServiceCenter: true
  },
  {
    id: 'd6',
    name: 'Shiv Nissan - SG Highway',
    city: 'Ahmedabad',
    state: 'Gujarat',
    address: 'Near ISKCON Cross Roads, SG Highway, Ahmedabad - 380015',
    phone: '+91 79 4008 3300',
    email: 'ahmedabad.sales@nissandealer.in',
    timing: 'Mon - Sun: 09:00 AM - 07:30 PM',
    isServiceCenter: true
  },
  {
    id: 'd7',
    name: 'Pinnacle Nissan - Park Street',
    city: 'Kolkata',
    state: 'West Bengal',
    address: '18 Park Street, Near Chowringhee, Kolkata - 700071',
    phone: '+91 33 2229 5500',
    email: 'kolkata.sales@nissandealer.in',
    timing: 'Mon - Sun: 09:30 AM - 07:00 PM',
    isServiceCenter: true
  },
  {
    id: 'd8',
    name: 'Ace Nissan - Baner Road',
    city: 'Pune',
    state: 'Maharashtra',
    address: 'Survey No. 48, Baner Main Road, Pune - 411045',
    phone: '+91 20 6680 2200',
    email: 'pune.sales@nissandealer.in',
    timing: 'Mon - Sun: 09:00 AM - 08:00 PM',
    isServiceCenter: true
  }
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'n1',
    title: 'Nissan Unveils The All-New Tekton SUV in India with Advanced ADAS Technology',
    date: 'September 01, 2026',
    category: 'PRODUCT LAUNCH',
    summary: 'Nissan Motor India expands its portfolio with the launch of the futuristic Tekton compact SUV featuring Level 2 ADAS and cutting-edge digital cockpit connectivity.',
    imageUrl: 'https://www.nissan.in/content/dam/Nissan/in/vehicles/takton/100500_Nissan-Tekton-September-Pace-Banner-Desktop-3000-x-1300.jpg.ximg.full.hero.jpg'
  },
  {
    id: 'n2',
    title: 'Nissan Magnite Achieves Historic 5-Star Global NCAP Safety Rating with 6 Standard Airbags',
    date: 'July 09, 2026',
    category: 'SAFETY RECOGNITION',
    summary: 'Demonstrating Nissan’s relentless commitment to passenger protection, the New Magnite scores full 5-star adult occupant protection across stringent crash standards.',
    imageUrl: 'https://www.nissan.in/content/dam/Nissan/in/Home/hpi/Magnite-Sep-Desktop-Banner-3000-x-1300.jpg.ximg.full.hero.jpg'
  },
  {
    id: 'n3',
    title: 'Nissan India Introduces Gravite Dual-Cylinder CNG Delivering 28.5 km/kg Mileage',
    date: 'May 04, 2026',
    category: 'SUSTAINABILITY',
    summary: 'The new Gravite bi-fuel CNG variant solves the luggage conundrum with clever underbody twin cylinders while offering exceptional low emissions and fuel savings.',
    imageUrl: 'https://www.nissan.in/content/dam/Nissan/in/Home/hpi/100497_Nissan-Gravite-Sep.-Desktop-Banner-3000-x-1300.KV.jpg.ximg.full.hero.jpg'
  }
];
