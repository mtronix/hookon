/**
  Package: hookon
  Hook your React app on our hooks
  Version: 0.0.1-alpha.2
  Build: Sun, 17 Feb 2019 18:32:41 GMT
  @license: MIT
  @preserve
*/
import { useState, useRef, useEffect } from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function useHover() {
    var _a = __read(useState(false), 2), isHovered = _a[0], setHovered = _a[1];
    var elemRef = useRef(null);
    var currentRef = elemRef.current;
    var onMouseOver = function () { return setHovered(true); };
    var onMouseOut = function () { return setHovered(false); };
    var addListeners = function () {
        if (currentRef instanceof Element) {
            currentRef.addEventListener('mouseover', onMouseOver);
            currentRef.addEventListener('mouseout', onMouseOut);
        }
    };
    var removeListeners = function () {
        if (currentRef instanceof Element) {
            currentRef.removeEventListener('mouseover', onMouseOver);
            currentRef.removeEventListener('mouseout', onMouseOut);
        }
    };
    useEffect(function () {
        addListeners();
        return removeListeners;
    }, [currentRef]);
    return [elemRef, isHovered];
}

export { useHover };
