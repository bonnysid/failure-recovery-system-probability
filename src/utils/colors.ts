export const COLORS = {
    black: '#000',
    white: '#fff',

    darkGray150: '#1a2024',
    darkGray140: '#252c32',
    darkGray130: '#303940',
    darkGray120: '#3c464e',
    darkGray110: '#48535b',

    gray100: '#5b6871',
    gray90: '#6e7c87',
    gray80: '#84919a',
    gray70: '#9aa6ac',
    gray60: '#b0babf',

    lightGray50: '#d5dadd',
    lightGray40: '#dde2e4',
    lightGray30: '#e5e9eb',
    lightGray20: '#eef0f2',
    lightGray10: '#f6f8f9',

    blue100: '#002266',
    blue90: '#023997',
    blue80: '#0452c8',
    blue70: '#0e73f6',
    blue60: '#4094f7',
    blue50: '#6bb3fa',
    blue40: '#9bcffd',
    blue30: '#d7edff',
    blue20: '#ebf7ff',
    blue10: '#f6fcff',

    red100: '#4d0004',
    red90: '#8d0104',
    red80: '#cc0905',
    red70: '#f2271c',
    red60: '#f76659',
    red50: '#fa8d7f',
    red40: '#fdaea1',
    red30: '#fed6cd',
    red20: '#ffefeb',
    red10: '#fffbfa',

    green100: '#003d06',
    green90: '#066f14',
    green80: '#119c2b',
    green70: '#22c348',
    green60: '#64d77f',
    green50: '#7de796',
    green40: '#9cf7b1',
    green30: '#bbfbd0',
    green20: '#ebfff1',
    green10: '#f5fff8',

    yellow100: '#4d2a00',
    yellow90: '#835101',
    yellow80: '#d29404',
    yellow70: '#f8c51b',
    yellow60: '#f8dd4e',
    yellow50: '#fbec7e',
    yellow40: '#fcf27d',
    yellow30: '#fef99f',
    yellow20: '#fffcc2',
    yellow10: '#fffeeb',

    purple100: '#350080',
    purple90: '#5606b2',
    purple80: '#7e10e5',
    purple70: '#a23fee',
    purple60: '#c479f3',
    purple50: '#d691f8',
    purple40: '#e8b1fc',
    purple30: '#f5d2fe',
    purple20: '#fcf0ff',
    purple10: '#fefaff',

    teal100: '#003833',
    teal90: '#046c54',
    teal80: '#0d9676',
    teal70: '#1ac19d',
    teal60: '#38d9b9',
    teal50: '#62e4d3',
    teal40: '#8ceee6',
    teal30: '#bbf6f4',
    teal20: '#e4fcfc',
    teal10: '#f1fdfd',

    coster: '#38d9b9',
    clouder: '#c479f3',
    architect: '#3fc4ee'
};

const defaultColors: string[] = [
    '#044fbf',
    '#fa7d43',
    '#1AC19D',
    '#fa0202',
    '#02d1fa',
    '#F8C51B',
    '#A23FEE',
    '#8d8d8d',
    '#507ea5',
    '#537d0a',
    '#de7ff8',
    '#89d38b',
    '#b75668',
];

const maxIndex = defaultColors.length - 1;

const HSVtoRGB = (hsv: number[]) => {
    let h = hsv[0];
    if (h === 0) {
        h = 1;
    }
    if (h === 360) {
        h = 359;
    }

    h = h / 360;
    const s = hsv[1] / 100;
    const v = hsv[2] / 100;

    const h_i = Math.floor(h * 6);
    const f = h * 6 - h_i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    let r = 256;
    let g = 256;
    let b = 256;

    switch (h_i) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        case 5:
            r = v;
            g = p;
            b = q;
            break;
    }

    return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
};

const RGBtoHSV = (rgb: number[]) => {
    const r = rgb[0];
    const g = rgb[1];
    const b = rgb[2];

    const rabs = r / 255;
    const gabs = g / 255;
    const babs = b / 255;

    let rr;
    let gg;
    let bb;
    let h = 0;
    let s;
    const v = Math.max(rabs, gabs, babs);
    const diff = v - Math.min(rabs, gabs, babs);
    const diffc = (c: number) => (v - c) / 6 / diff + 1 / 2;
    const percentRoundFn = (num: number) => Math.round(num * 100) / 100;

    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(rabs);
        gg = diffc(gabs);
        bb = diffc(babs);

        if (rabs === v) {
            h = bb - gg;
        } else if (gabs === v) {
            h = 1 / 3 + rr - bb;
        } else if (babs === v) {
            h = 2 / 3 + gg - rr;
        }
        if (h < 0) {
            h += 1;
        } else if (h > 1) {
            h -= 1;
        }
    }
    return [Math.round(h * 360), percentRoundFn(s * 100), percentRoundFn(v * 100)];
};

const HEXtoRGB = (hex: string) => {
    const rgbColor = parseInt(hex.substring(1), 16);
    const r = (rgbColor >> 16) & 0xff;
    const g = (rgbColor >> 8) & 0xff;
    const b = (rgbColor >> 0) & 0xff;

    return [r, g, b];
};

const checkDarkness = (rgb: number[]) => {
    const r = rgb[0];
    const g = rgb[1];
    const b = rgb[2];
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    return luma > 50;
};

const componentToHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
};

const RGBtoHEX = (rgb: number[]) => {
    const r = rgb[0];
    const g = rgb[1];
    const b = rgb[2];
    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

const MIN_COUNT = 3000;

const MIN_S = 30;
const MIN_V = 40;
const MAX_S = 80;
const MAX_V = 100;

const DEFAULTS_STEP_S = 15;
const DEFAULTS_STEP_V = 10;

const MAX_S_CHANGES = (MAX_S - MIN_S) / DEFAULTS_STEP_S;

const generateColor = (color: string, colorChanges: { s: number; v: number }): number[] => {
    const rgb = HEXtoRGB(color);
    const hsv = RGBtoHSV(rgb);

    if (colorChanges.s >= MAX_S_CHANGES) {
        colorChanges.v += 1;
        colorChanges.s = 1;
    } else {
        colorChanges.s += 1;
    }

    const newS = (hsv[1] + colorChanges.s * DEFAULTS_STEP_S) % 100;
    const newV = (hsv[2] + colorChanges.v * DEFAULTS_STEP_V) % 100;

    if (newS > MAX_S) {
        hsv[1] = MAX_S - DEFAULTS_STEP_S * colorChanges.s;
    } else if (newS < MIN_S) {
        hsv[1] = MIN_S + DEFAULTS_STEP_S * colorChanges.s;
    } else {
        hsv[1] = newS;
    }

    if (newV > MAX_V) {
        hsv[2] = MAX_V - DEFAULTS_STEP_V * colorChanges.v;
    } else if (newV < MIN_V) {
        hsv[2] = MIN_V + DEFAULTS_STEP_V * colorChanges.v;
    } else {
        hsv[2] = newV;
    }

    return HSVtoRGB(hsv);
};

export const generateColors = (count: number) => {
    const storageColors = JSON.parse(localStorage.getItem('COLORS') || '[]');

    if (storageColors.length) {
        return storageColors;
    }

    const colors: string[] = [];
    const defaultColorsChanges: {
        [key: string]: {
            s: number;
            v: number;
        };
    } = {};

    for (let itemIndex = 0; itemIndex < count; itemIndex++) {
        const color =
            itemIndex > maxIndex ? defaultColors[itemIndex % maxIndex] : defaultColors[itemIndex];

        if (!defaultColorsChanges[color]) {
            defaultColorsChanges[color] = {
                s: 0,
                v: 0,
            };
        }

        const colorChanges = defaultColorsChanges[color];

        const colorRGB = generateColor(color, colorChanges);

        colors.push(`rgb(${colorRGB[0]}, ${colorRGB[1]}, ${colorRGB[2]})`);
    }

    localStorage.setItem('COLORS', JSON.stringify([...defaultColors, ...colors]));

    return [...defaultColors, ...colors];
};