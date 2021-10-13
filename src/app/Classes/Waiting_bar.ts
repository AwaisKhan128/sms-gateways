import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class Snake_Waiting
{
    constructor(public snackBar: MatSnackBar)
    {
        
    }

    start_bar(str:any)
    {
        this.snackBar.open(str);
    }

    close_bar()
    {
        this.snackBar.dismiss();
    }



    
}