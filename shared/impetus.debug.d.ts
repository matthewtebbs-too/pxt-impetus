/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

//% color="#505050" icon="\uf188" block="Debug" weight=5
//% advanced=true
declare namespace debug {
    /**
     * Show render statistics.
     * @param shown shown?
     */
    //% blockId=debug_renderstatistics
    //% block="debug|render statistics %shown=fieldeditors_toggleOnOff"
    //% shim=debug::renderStatistics
    function renderStatistics(shown: boolean): void;
}