import { ToastNotificationInitializer, DialogLayoutDisplay } from "@costlydeveloper/ngx-awesome-popup";

export class Toaster_Service
{
   static toastNotification_S(val:any) {
        const newToastNotification = new ToastNotificationInitializer();
        newToastNotification.setTitle('Success!');
        newToastNotification.setMessage(val);
    
        // Choose layout color type
        newToastNotification.setConfig({
          LayoutType: DialogLayoutDisplay.SUCCESS // SUCCESS | INFO | NONE | DANGER | WARNING
        });
    
        // Simply open the toast
        newToastNotification.openToastNotification$();
      }

      static  toastNotification_D(val:any) {
        const newToastNotification = new ToastNotificationInitializer();
        newToastNotification.setTitle('Danger!');
        newToastNotification.setMessage(val);
    
        // Choose layout color type
        newToastNotification.setConfig({
          LayoutType: DialogLayoutDisplay.DANGER // SUCCESS | INFO | NONE | DANGER | WARNING
        });
    
        // Simply open the toast
        newToastNotification.openToastNotification$();
      }
      static  toastNotification_I(val:any) {
        const newToastNotification = new ToastNotificationInitializer();
        newToastNotification.setTitle('Info!');
        newToastNotification.setMessage(val);
    
        // Choose layout color type
        newToastNotification.setConfig({
          LayoutType: DialogLayoutDisplay.INFO // SUCCESS | INFO | NONE | DANGER | WARNING
        });
    
        // Simply open the toast
        newToastNotification.openToastNotification$();
      }

      toastNotification_W(val:any) {
        const newToastNotification = new ToastNotificationInitializer();
        newToastNotification.setTitle('Warning!');
        newToastNotification.setMessage(val);
    
        // Choose layout color type
        newToastNotification.setConfig({
          LayoutType: DialogLayoutDisplay.WARNING // SUCCESS | INFO | NONE | DANGER | WARNING
        });
    
        // Simply open the toast
        newToastNotification.openToastNotification$();
      }
}