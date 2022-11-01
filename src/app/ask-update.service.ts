import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwUpdate } from '@angular/service-worker';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class AskUpdateService {
  constructor(private swUpdate: SwUpdate,
    private dialog: MatDialog) {
    console.log('Check for updates');
    swUpdate.versionUpdates.subscribe(_ => this.askUserToUpdate());
  }

  askUserToUpdate() {
    console.log('Asking for update');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '80%',
      data: 'Une nouvelle version est disponible, voulez-vous la télécharger ?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        window.location.reload();
    });
  }
}