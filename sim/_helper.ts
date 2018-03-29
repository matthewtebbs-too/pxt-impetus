/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

namespace pxsim {
    export class Helper {
        public static btVector3FromThree(vec: THREE.Vector3): Ammo.btVector3 {
            return new Ammo.btVector3(vec.x, vec.y, vec.z);
        }

        public static btQuaternionFromThree(qtr: THREE.Quaternion): Ammo.btQuaternion {
            return new Ammo.btQuaternion(qtr.x, qtr.y, qtr.z, qtr.w);
        }

        public static safeAmmoDestroy(object: any) {
            if (object) {
                Ammo.destroy(object);
            }
        }
    }
}
