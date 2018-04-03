/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="_runtime.ts"/>

namespace pxsim {
    export class Helper {
        public static btVector3FromThree(vec: THREE.Vector3): Ammo.btVector3 {
            return new Ammo.btVector3(vec.x, vec.y, vec.z);
        }

        public static btQuaternionFromThree(qtr: THREE.Quaternion): Ammo.btQuaternion {
            return new Ammo.btQuaternion(qtr.x, qtr.y, qtr.z, qtr.w);
        }

        public static applyFn<T, R>(input: T | T[], fn: (t: T) => R): R | R[] {
            return Array.isArray(input) ? input.map(fn) : fn(input);
        }

        public static safeObjectDispose(dispoableobject: rt.IObjectDisposable | null) {
            if (dispoableobject) {
                dispoableobject.dispose();
            }
        }

        public static safeAmmoObjectDestroy(ammoobject: any | null) {
            if (ammoobject) {
                Ammo.destroy(ammoobject);
            }
        }
    }
}
