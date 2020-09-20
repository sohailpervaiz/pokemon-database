
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pokedex } from './models/pokedex.model';
import { UpdatePokedex, AddPokedex, GetPagedPokedex } from './store/pokedex.action';
import { Store } from '@ngxs/store';

export interface DialogData {
    pokedex: Pokedex;
    flag: boolean;
}

@Component({
    selector: 'dialogAddUpdateRecord',
    templateUrl: 'dialogAddUpdateRecord.html',
})
export class DialogAddUpdateRecord {

    constructor(
        public dialogRef: MatDialogRef<DialogAddUpdateRecord>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData, private store: Store) { }



    updatePokedex() {
        this.store.dispatch(new UpdatePokedex(this.data.pokedex, this.data.pokedex.Id.toString()));
        this.dialogRef.close();
    }

    addPokedex() {
        this.store.dispatch(new AddPokedex(this.data.pokedex));
        this.store.dispatch(new GetPagedPokedex("",""));
        this.dialogRef.close();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}