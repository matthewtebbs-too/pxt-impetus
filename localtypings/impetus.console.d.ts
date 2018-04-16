/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

//@ts-ignore
//% color="#002050" icon="\uf120" block="Console" weight=0
//% advanced=true
declare namespace console {
    /**
     * Write a line of text to the console output.
     * @param value to send
     */
    //% blockId=console_log
    //% block="console|log %text" weight=90
    //% text.shadowOptions.toString=true
    //% shim=console::log
    function log(text: string): void;

    /**
     * Write a name:value pair as a line of text to the console output.
     * @param name of the value, eg: "x"
     * @param value to write
     */
    //% blockId=console_log_value
    //% block="console|log value %name|= %value" weight=88
    //% value.shadowOptions.toString=true
    //% shim=console::logValue
    function logValue(name: string, value: string): void;
}