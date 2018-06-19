/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference types='pxt-core/built/pxtsim'/>

/// <reference path='../shared/enums.ts'/>

import { singletonWorldBoard } from './_board';
import {
    keyboardScopeIdFromKey,
    MouseEvent_Internal,
    mouseScopeIdFromButton,
    ScopeId,
} from './_events';

namespace pxsimImpetus.input {
    export function onKeyEvent(key: KeyboardKey | string, event: KeyEvent, handler: pxsim.RefAction) {
        singletonWorldBoard().events!.listen(keyboardScopeIdFromKey(key), event, handler);
    }

    export function onMouseEnter(handler: pxsim.RefAction) {
        singletonWorldBoard().events!.listen(ScopeId.MouseDevice, MouseEvent_Internal.Enter, handler);
    }

    export function onMouseMove(handler: pxsim.RefAction) {
        singletonWorldBoard().events!.listen(ScopeId.MouseDevice, MouseEvent_Internal.Move, handler);
    }

    export function onMouseLeave(handler: pxsim.RefAction) {
        singletonWorldBoard().events!.listen(ScopeId.MouseDevice, MouseEvent_Internal.Leave, handler);
    }

    export function onMouseButtonEvent(button: MouseButton, event: MouseButtonEvent, handler: pxsim.RefAction) {
        singletonWorldBoard().events!.listen(mouseScopeIdFromButton(button), event, handler);
    }
}
