// imports (as you know goes to the beginning of the file).
import { Component } from '@angular/core';
import {
    ToastNotificationInitializer,
    DialogLayoutDisplay,
    ToastUserViewTypeEnum,
    ToastProgressBarEnum,
    ToastPositionEnum,
} from '@costlydeveloper/ngx-awesome-popup';



export class Toaster {
    public static sucessToast(message: string){
        var messageToDisplay = message !== "" ? message : "It was a sucess!"
        const newToastNotification = new ToastNotificationInitializer();
        newToastNotification.setTitle("SUCCESS");
        newToastNotification.setMessage(messageToDisplay);

        // Choose layout color type
        newToastNotification.setConfig({
            AutoCloseDelay: 5000, // optional
            TextPosition: 'left', // optional
            LayoutType: DialogLayoutDisplay.SUCCESS, // SUCCESS | INFO | NONE | DANGER | WARNING
            ProgressBar: ToastProgressBarEnum.NONE, // INCREASE | DECREASE | NONE
            ToastUserViewType: ToastUserViewTypeEnum.SIMPLE, // STANDARD | SIMPLE
            // TOP_LEFT | TOP_CENTER | TOP_RIGHT | TOP_FULL_WIDTH | BOTTOM_LEFT | BOTTOM_CENTER | BOTTOM_RIGHT | BOTTOM_FULL_WIDTH
            ToastPosition: ToastPositionEnum.TOP_FULL_WIDTH,
        });
        // Simply open the popup
        newToastNotification.openToastNotification$();
    }

    public static failureToast(title: string, message: string) {
        var titleToDisplay = title !== "" ? title : "Failure"
        var messageToDisplay = message !== "" ? message : "Something went wrong@"

        const newToastNotification = new ToastNotificationInitializer();
        newToastNotification.setTitle(titleToDisplay);
        newToastNotification.setMessage(messageToDisplay);

        // Choose layout color type
        newToastNotification.setConfig({
        AutoCloseDelay: 5000, // optional
        TextPosition: 'left', // optional
        LayoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER | WARNING
        ProgressBar: ToastProgressBarEnum.NONE, // INCREASE | DECREASE | NONE
        ToastUserViewType: ToastUserViewTypeEnum.SIMPLE, // STANDARD | SIMPLE
         // TOP_LEFT | TOP_CENTER | TOP_RIGHT | TOP_FULL_WIDTH | BOTTOM_LEFT | BOTTOM_CENTER | BOTTOM_RIGHT | BOTTOM_FULL_WIDTH
        ToastPosition: ToastPositionEnum.TOP_FULL_WIDTH,
        });

        // Simply open the popup
        newToastNotification.openToastNotification$();
    }

}
