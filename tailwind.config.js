const colors = require('tailwindcss/colors')

module.exports = {
  prefix: 'tw-',
  mode: 'jit',
  content: [
    './src/components/**/*.{html,js,vue}',
    './src/layouts/**/*.{html,js,vue}',
    './src/pages/**/*.{html,js,vue}',
    './src/App.vue'
  ],
  darkMode: 'media',
  theme: {
    screens: {
      sm: '412px',
      md: '768px',
      lg: '1024px'
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      red: colors.red,
      yellow: colors.amber,
      green: colors.emerald,
      blue: colors.blue,
      indigo: colors.indigo,
      purple: colors.violet,
      pink: colors.pink
    },
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      2: '2px',
      3: '3px',
      4: '4px'
      // 6: '6px',
      // 8: '8px'
    },
    borderRadius: {
      // none: '0px',
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      // xl: '0.75rem',
      // '2xl': '1rem',
      // '3xl': '1.5rem',
      full: '9999px'
    },
    extend: {
      boxShadow: {
        'sm-intense': '0 0 1rem 1px rgba(53,53,53,0.25)'
      },
      dropShadow: {
        'sm-intense': '0 0 1rem 1px rgba(53,53,53,0.25)'
      },
      fontSize: {
        '2xs': ['0.7rem', { lineHeight: '1rem' }],
        '3xs': ['0.65rem', { lineHeight: '1' }],
        '4xs': ['0.6rem', { lineHeight: '1' }],
        '5xs': ['0.55rem', { lineHeight: '1' }],
        '6xs': ['0.5rem', { lineHeight: '1' }],
        '7xs': ['0.45rem', { lineHeight: '1' }],
        '8xs': ['0.4rem', { lineHeight: '1' }]
      },
      animation: {
        'header-fade-in': 'fade-in 1s linear forwards',
        'fade-in': 'fade-in 1s linear forwards',
        'fade-out': 'fade-out 1s linear forwards',
        'kf-ease-out-elastic': 'kf-ease-out-elastic 1s linease forwards',
        'slide-in-from-top-left': 'slide-in-from-top-left 1s forwards'
      },
      keyframes: {
        'header-fade-in': {
          '0%': { opacity: 0, transform: 'translate3d(-1rem, -2rem, 0)' },
          '100%': { opacity: 1, transform: 'translate3d(0, 0, 0)' }
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        'fade-out': {
          '0%': { opacity: 'inherit' },
          '100%': { opacity: 0 }
        },
        'slide-in-from-top-left': {
          '0%': { transform: 'translate3d(-1rem, -2rem, 0)' },
          '100%': { transform: 'translate3d(0, 0 , 0)' }
        },
        'kf-ease-out-elastic': {
          '0%': { transform: 'translateY(0%)' },
          '16%': { transform: 'translateY(-132.27%)' },
          '28%': { transform: 'translateY(-86.88%)' },
          '44%': { transform: 'translateY(-104.63%)' },
          '59%': { transform: 'translateY(-98.36%)' },
          '73%': { transform: 'translateY(-100.58%)' },
          '88%': { transform: 'translateY(-99.8%)' },
          '100%': { transform: 'translateY(-100%)' }
        }
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        bounce: 'cubic-bezier(0.64, 0.57, 0.67, 1.53)',
        bounce2: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
      },
      spacing: {
        7: '1.75rem',
        8: '2rem',
        12: '3rem',
        13: '3.25rem',
        15: '3.75rem',
        17: '4.25rem',
        18: '4.5rem',
        19: '4.75rem',
        25: '6.25rem',
        33: '8.25rem', // needed for editor min height
        41: '10.25rem',
        42: '10.5rem',
        43: '10.75rem',
        53: '13.25rem',
        54: '13.5rem',
        55: '13.75rem',
        56: '14rem',
        60: '15rem',
        64: '16rem',
        68: '17rem',
        70: '17.5rem',
        72: '18rem',
        73: '18.25rem',
        74: '18.5rem',
        75: '18.75rem',
        76: '19rem',
        78: '19.5rem',
        81: '20.25rem',
        82: '20.5rem',
        83: '20.75rem',
        84: '21rem',
        85: '21.25rem',
        86: '21.5rem',
        87: '21.75rem',
        88: '22rem',
        89: '22.25rem',
        90: '22.5rem',
        91: '22.75rem',
        92: '23rem',
        93: '23.25rem',
        94: '23.5rem',
        95: '23.75rem',
        // 96: '24rem',
        97: '24.25rem',
        98: '24.5rem',
        99: '24.75rem',
        100: '25rem',
        101: '25.25rem',
        102: '25.5rem',
        103: '25.75rem',
        104: '26rem',
        105: '26.25rem',
        106: '26.5rem',
        107: '26,75rem',
        108: '27rem',
        109: '27.25rem',
        110: '27.5rem',
        111: '27.75rem',
        112: '28rem',
        113: '28.25rem',
        114: '28.5rem',
        115: '28.75rem',
        116: '29rem',
        117: '29.25rem',
        118: '29.5rem',
        119: '29.75rem',
        120: '30rem',
        121: '30.25rem',
        122: '30.5rem',
        123: '30.75rem',
        124: '31rem',
        125: '31.25rem',
        126: '31.5rem',
        127: '31.75rem',
        128: '32rem',
        129: '32.25rem',
        130: '32.5rem',
        131: '32.75rem',
        132: '33rem',
        133: '33.25rem',
        134: '33.5rem',
        135: '33.75rem',
        136: '34rem',
        137: '34.25rem',
        138: '34.5rem',
        139: '34.75rem',
        140: '35rem',
        141: '35.25rem',
        142: '35.5rem',
        143: '35.75rem',
        144: '36rem'
      },
      zIndex: {
        '-10': '-10',
        '-1': '-1',
        60: '60',
        70: '70',
        80: '80',
        90: '90',
        100: '100',
        110: '110',
        120: '120',
        130: '130',
        140: '140',
        150: '150',
        100000: '100000',
        100010: '100010',
        logo: '30',
        content: '80',
        sidebar: '100',
        'nav-toggle-btn': '600',
        'modal-bg': '100000',
        'modal-content': '100010'
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ['group-focus']
    }
  },
  plugins: []
}
