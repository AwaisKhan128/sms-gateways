
import { DatePipe } from '@angular/common';

export class DateHandler {
    private static convertTime12to24 = time12h => {
        const [time, modifier] = time12h.split(" ");
       
        let [hours, minutes] = time.split(":");
       
        if (hours === "12") {
          hours = "00";
        }
       
        if (modifier === "PM") {
          hours = parseInt(hours, 10) + 12;
        }
       
        return `${hours}:${minutes}`;
      };

    public static convertToUnixTimestamp(pickedDate: string, pickedTime: string): number {
        var convertedTime = this.convertTime12to24(pickedTime);
        var datePipe = new DatePipe("en-US");
        var convertedDate = datePipe.transform(pickedDate, "yyyy-MM-dd");
        var newDate = new Date(convertedDate + " " + pickedTime)
        const unixTime =  new Date(newDate).getTime() / 1000
        console.log(unixTime)
        return unixTime
      }
}