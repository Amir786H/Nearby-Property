import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const [shortDimension, longDimension] =
    SCREEN_WIDTH < SCREEN_HEIGHT
        ? [SCREEN_WIDTH, SCREEN_HEIGHT]
        : [SCREEN_HEIGHT, SCREEN_WIDTH];

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 812;

/**
 * Scales a given size to match the width of the screen relative to the
 * guidelineBaseWidth.
 *
 * @param size the size to scale
 * @returns the scaled size
 */
export const scale = (size: number) =>
    Math.round(
        PixelRatio.roundToNearestPixel(
            (shortDimension / guidelineBaseWidth) * (size as number)
        )
    );

/**
 * Scales a given size to match the height of the screen relative to the
 * guidelineBaseHeight.
 *
 * @param size the size to scale
 * @returns the scaled size
 */

export const verticalScale = (size: number) =>
    Math.round(
        PixelRatio.roundToNearestPixel(
            (longDimension / guidelineBaseHeight) * (size as number)
        )
    );


