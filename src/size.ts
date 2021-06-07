export enum SizeType {
    NORMAL,
    IPAD,
    IPHONEX,
}

export const designSizeNormal = { width: 720, height: 1280 };
export const designSizeIpad = { width: 960, height: 1280 };
export const designSizeIphoneX = { width: 720, height: 1600 };
export const designSizes = [ designSizeNormal, designSizeIpad, designSizeIphoneX ];