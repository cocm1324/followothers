  
/**
 *
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const getPixels = require('get-pixels');

class Swatch {
    static get DEFAULT_DEPTH () {
        return 4;
    }

    static load (image) {
        return new Promise((resolve, reject) => {
            getPixels(image, (err, pixels) => {
                if (err) {
                    reject(err);
                }

                resolve(Swatch._convertPixelsToRGB(pixels));
            });
        });
    }

    static _convertPixelsToRGB (pixels) {
        const width = pixels.shape[0];
        const height = pixels.shape[1];
        const rgbVals = [];
        
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const index = (y * width + x) * 4;
                rgbVals.push({
                    r: pixels.data[index],
                    g: pixels.data[index + 1],
                    b: pixels.data[index + 2]
                });
            }
        }

        return rgbVals;
    }

    static _findBiggestRange (rgbVals) {
        let rMin = Number.POSITIVE_INFINITY;
        let rMax = Number.NEGATIVE_INFINITY;

        let gMin = Number.POSITIVE_INFINITY;
        let gMax = Number.NEGATIVE_INFINITY;

        let bMin = Number.POSITIVE_INFINITY;
        let bMax = Number.NEGATIVE_INFINITY;

        rgbVals.forEach(pixel => {
            rMin = Math.min(rMin, pixel.r);
            rMax = Math.max(rMax, pixel.r);
            gMin = Math.min(gMin, pixel.r);
            gMax = Math.max(gMax, pixel.r);
            bMin = Math.min(bMin, pixel.r);
            bMax = Math.max(bMax, pixel.r);
        });

        const rRange = rMax - rMin;
        const gRange = gMax - gMin;
        const bRange = bMax - bMin;

        const biggestRange = Math.max(rRange, gRange, bRange);
        if (biggestRange === rRange) {
            return 'r';
        } else if (biggestRange === gRange) {
            return 'g';
        } else {
            return 'b';
        }
    }

    static quantize (rgbVals, depth=0, maxDepth=Swatch.DEFAULT_DEPTH) {
        if (depth === 0) {
            console.log(`Quantizing to ${Math.pow(2, maxDepth)} buckets`);
        }

        
    }
}